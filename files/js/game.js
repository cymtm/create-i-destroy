// Core game logic for Create.I.Destroy
import { scenarios } from './scenarios.js';
import {
  renderScenario,
  renderProgressBar,
  renderFeedback,
  renderXP,
  renderAchievement,
} from './ui.js';
import { randomBetween, shuffle } from './utils.js';
import { checkAchievements, loadAchievements, saveAchievements } from './achievements.js';
import { startTutorial, isTutorialActive } from './tutorial.js';

// Simple sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = type;
  
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function updateHintDisplay() {
  const choiceButtons = document.querySelectorAll('.choice-btn');
  choiceButtons.forEach(btn => {
    const keyHint = btn.querySelector('span[style*="opacity"]');
    if (keyHint) {
      keyHint.style.display = gameSettings.showHints ? 'inline' : 'none';
    }
  });
}

function playSoundEffect(effectType) {
  if (!gameSettings.soundEnabled) return;
  
  const volume = gameSettings.masterVolume / 100 * 0.1; // Scale to reasonable volume
  
  function playTone(frequency, duration, type = 'sine') {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }
  
  switch(effectType) {
    case 'choice':
      playTone(800, 0.1, 'square');
      break;
    case 'success':
      playTone(660, 0.3, 'sine');
      setTimeout(() => playTone(880, 0.3, 'sine'), 100);
      break;
    case 'fail':
      playTone(220, 0.5, 'sawtooth');
      break;
    case 'legendary':
      // Epic sound sequence
      playTone(440, 0.2, 'sine');
      setTimeout(() => playTone(550, 0.2, 'sine'), 150);
      setTimeout(() => playTone(660, 0.3, 'sine'), 300);
      setTimeout(() => playTone(880, 0.4, 'sine'), 500);
      break;
    case 'tick':
      playTone(1000, 0.05, 'square');
      break;
    case 'levelup':
      // Level up fanfare
      playTone(523, 0.2, 'sine'); // C
      setTimeout(() => playTone(659, 0.2, 'sine'), 200); // E
      setTimeout(() => playTone(784, 0.2, 'sine'), 400); // G
      setTimeout(() => playTone(1047, 0.4, 'sine'), 600); // C high
      break;
    case 'achievement':
      // Achievement unlock
      playTone(698, 0.15, 'sine'); // F
      setTimeout(() => playTone(880, 0.15, 'sine'), 150); // A
      setTimeout(() => playTone(1047, 0.3, 'sine'), 300); // C
      break;
    case 'tab':
      playTone(600, 0.08, 'square');
      break;
    case 'hover':
      playTone(400, 0.05, 'triangle');
      break;
  }
}

let state = {
  xp: 0,
  survival: 0,
  combo: 0,
  scenarioQueue: [],
  current: null,
  locked: false,
  legendaryTimer: 0,
  gamesPlayed: 0,
  totalChoices: 0,
  sessionChoices: 0,
  highestCombo: 0,
  difficulty: 'normal', // easy, normal, hard, nightmare
  
  // Enhanced tracking for achievements
  difficultyStats: {
    easy: 0,
    normal: 0,
    hard: 0,
    nightmare: 0
  },
  highRiskChoices: 0,
  safeChoices: 0,
  quickChoices: 0,
  slowChoices: 0,
  legendaryMoments: 0,
  
  // Character progression
  totalXP: 0,
  totalSurvival: 0,
  characterLevel: 1,
  skillPoints: 0,
  
  // Skills/Abilities
  skills: {
    wisdom: 0,      // Increases XP gain
    fortune: 0,     // Increases survival gain
    intuition: 0,   // Extends decision time
    courage: 0,     // Bonus for high-risk choices
    balance: 0      // Bonus for balanced play
  }
};

const difficultySettings = {
  easy: { time: 5, xpMultiplier: 0.8, survivalMultiplier: 1.2 },
  normal: { time: 3, xpMultiplier: 1.0, survivalMultiplier: 1.0 },
  hard: { time: 2, xpMultiplier: 1.3, survivalMultiplier: 0.8 },
  nightmare: { time: 1.5, xpMultiplier: 1.5, survivalMultiplier: 0.5 }
};

function nextScenario() {
  if (!state.scenarioQueue.length) {
    state.scenarioQueue = shuffle([...scenarios]);
  }
  state.current = state.scenarioQueue.pop();
}

async function playScenario() {
  state.locked = false;
  nextScenario();
  renderScenario(state.current);
  renderProgressBar(100);
  renderFeedback('ANCIENT PROPHECY UNFOLDS...', 'flame');
  changeBackground();

  // Decision timer - affected by difficulty and intuition skill
  const difficultyConfig = difficultySettings[state.difficulty];
  let choiceWindow = difficultyConfig.time + (state.skills.intuition * 0.3); // Intuition extends time
  let interval = 100; // ms
  let elapsed = 0;
  let progress = 100;
  let choiceMade = false;
  let timer;

  function onChoice(key) {
    if (state.locked) return;
    const choice = state.current.choices.find((c) => c.key === key);
    if (!choice) return;
    state.locked = true;
    choiceMade = true;
    document.removeEventListener('keydown', keyHandler);

    playSoundEffect('choice');
    
    // Track choice timing and type
    const timeUsed = elapsed / 1000;
    const timeLimit = choiceWindow;
    
    if (timeUsed < 0.5) {
      state.quickChoices = (state.quickChoices || 0) + 1;
    } else if (timeUsed > timeLimit * 0.8) {
      state.slowChoices = (state.slowChoices || 0) + 1;
    }
    
    // Classify choice risk level based on XP vs survival ratio
    const xpRatio = choice.result.xp / (choice.result.xp + choice.result.survival);
    if (xpRatio > 0.7) {
      state.highRiskChoices = (state.highRiskChoices || 0) + 1;
    } else if (xpRatio < 0.3) {
      state.safeChoices = (state.safeChoices || 0) + 1;
    }

    // Animate result
    renderScenario(state.current, key);
    renderFeedback(
      choice.result.feedback,
      choice.result.survival ? 'success' : 'fail',
    );
    
    // Play success/fail sound
    playSoundEffect(choice.result.xp >= 15 ? 'success' : 'fail');
    
    renderXP(choice.result.xp, choice.result.survival);
    
    // Apply difficulty multipliers and skill bonuses
    const difficultySettings = {
      easy: { time: 5, xpMultiplier: 0.8, survivalMultiplier: 1.2 },
      normal: { time: 3, xpMultiplier: 1.0, survivalMultiplier: 1.0 },
      hard: { time: 2, xpMultiplier: 1.3, survivalMultiplier: 0.8 },
      nightmare: { time: 1.5, xpMultiplier: 1.5, survivalMultiplier: 0.5 }
    };
    const difficultyConfig = difficultySettings[state.difficulty];
    let adjustedXP = Math.round(choice.result.xp * difficultyConfig.xpMultiplier);
    let adjustedSurvival = Math.round(choice.result.survival * difficultyConfig.survivalMultiplier);
    
    // Apply skill bonuses
    adjustedXP += Math.floor(adjustedXP * (state.skills.wisdom * 0.1));
    adjustedSurvival += Math.floor(adjustedSurvival * (state.skills.fortune * 0.1));
    
    // Courage bonus for high-risk choices
    if (xpRatio > 0.7) {
      adjustedXP += Math.floor(adjustedXP * (state.skills.courage * 0.15));
    }
    
    // Balance bonus for moderate choices
    if (xpRatio >= 0.3 && xpRatio <= 0.7) {
      const bonus = Math.floor((adjustedXP + adjustedSurvival) * (state.skills.balance * 0.1));
      adjustedXP += Math.floor(bonus * 0.5);
      adjustedSurvival += Math.floor(bonus * 0.5);
    }
    
    state.xp += adjustedXP;
    state.survival += adjustedSurvival;
    state.totalChoices += 1;
    state.sessionChoices = (state.sessionChoices || 0) + 1;
    state.totalXP += adjustedXP;
    state.totalSurvival += adjustedSurvival;
    
    // Check for level up
    checkLevelUp();
    
    updateTotalStats();
    if (choice.result.xp >= 10) {
      state.combo += 1;
      if (state.combo > state.highestCombo) {
        state.highestCombo = state.combo;
      }
      if (state.combo >= 3) {
        playSoundEffect('legendary');
        renderAchievement('🔥LEGENDARY MOMENT🔥');
        state.legendaryTimer = Date.now();
        state.legendaryMoments = (state.legendaryMoments || 0) + 1;
        state.combo = 0;
      }
    } else {
      state.combo = 0;
    }
    saveGame();
    
    // Check for new achievements
    const newAchievements = checkAchievements(state);
    if (newAchievements.length > 0) {
      saveAchievements();
      // Show the first new achievement
      setTimeout(() => {
        const achievement = newAchievements[0];
        const tierIcon = getTierIcon(achievement.tier);
        renderAchievement(`${tierIcon} ${achievement.name} ${tierIcon}`);
        playSoundEffect('achievement');
      }, 1000);
    }
    clearInterval(timer);

    setTimeout(() => {
      renderFeedback(`REALITY SHIFT IN 3...2...1...`, 'flame');
    }, 800);
    setTimeout(() => {
      playScenario();
    }, 2200);
  }

  function keyHandler(e) {
    // Prevent game interactions during tutorial
    if (isTutorialActive()) return;
    
    const k = e.key.toUpperCase();
    onChoice(k);
  }

  document.addEventListener('keydown', keyHandler);

  // Progress bar and auto-lock
  timer = setInterval(() => {
    elapsed += interval;
    progress = Math.max(0, 100 - (elapsed / (choiceWindow * 1000)) * 100);
    renderProgressBar(progress, progress < 40);

    // Add ticking sound when time is running low
    if (progress < 40 && progress > 0 && elapsed % 500 < interval) {
      playSoundEffect('tick');
    }

    if (elapsed >= choiceWindow * 1000 && !choiceMade) {
      state.locked = true;
      document.removeEventListener('keydown', keyHandler);

      playSoundEffect('fail');
      
      // Auto-pick: fail state
      renderScenario(state.current);
      renderFeedback('⚡ CHOICE LOCKED IN... TOO LATE!', 'fail');
      renderXP(0, 0);
      state.combo = 0;

      setTimeout(() => {
        renderFeedback(`REALITY SHIFT IN 3...2...1...`, 'flame');
      }, 800);
      setTimeout(() => {
        playScenario();
      }, 2000);

      clearInterval(timer);
    }
  }, interval);
}

function getTierIcon(tier) {
  const tierIcons = {
    bronze: '🥉',
    silver: '🥈', 
    gold: '🥇',
    legendary: '🌟',
    mythic: '👑'
  };
  return tierIcons[tier] || '🏆';
}

function checkLevelUp() {
  const experienceNeeded = state.characterLevel * 100;
  if (state.totalXP >= experienceNeeded) {
    state.characterLevel += 1;
    state.skillPoints += 1;
    renderAchievement(`🆙 LEVEL ${state.characterLevel}! +1 SKILL POINT`);
    playSoundEffect('levelup');
  }
}

function getExperienceProgress() {
  const experienceNeeded = state.characterLevel * 100;
  const currentProgress = state.totalXP % 100;
  return Math.min(100, (currentProgress / 100) * 100);
}

function changeBackground() {
  const colors = [
    'linear-gradient(45deg, #0a0a0a, #1a0a1a, #0a1a1a)',
    'linear-gradient(45deg, #1a0a0a, #0a1a0a, #0a0a1a)',
    'linear-gradient(45deg, #2a0a0a, #0a2a0a, #0a0a2a)',
    'linear-gradient(45deg, #1a1a0a, #1a0a1a, #0a1a1a)',
    'linear-gradient(45deg, #1a1510, #2d2520, #1f1914)',
    'linear-gradient(45deg, #2a1a10, #3d2a20, #2f2414)',
    'linear-gradient(45deg, #1a0a2a, #2a1a3a, #1a2a1a)'
  ];
  const randomIndex = randomBetween(0, colors.length - 1);
  document.body.style.background = colors[randomIndex];
  document.body.style.backgroundSize = '400% 400%';
}

function updateTotalStats() {
  const xpElement = document.getElementById('xp-total');
  const survivalElement = document.getElementById('survival-total');
  if (xpElement) xpElement.textContent = `⚡ Wisdom: ${state.xp}`;
  if (survivalElement) survivalElement.textContent = `🏺 Fortune: ${state.survival}`;
  
  // Update character level display if it exists
  const levelElement = document.getElementById('character-level');
  if (levelElement) {
    levelElement.textContent = `Lv.${state.characterLevel}`;
  }
}

function saveGame() {
  if (!gameSettings.autoSave) return;
  
  const saveData = {
    ...state,
    timestamp: Date.now()
  };
  localStorage.setItem('createiDestroySave', JSON.stringify(saveData));
}

function loadGame() {
  const saveData = localStorage.getItem('createiDestroySave');
  if (saveData) {
    const parsed = JSON.parse(saveData);
    // Load persistent stats
    state.gamesPlayed = parsed.gamesPlayed || 0;
    state.totalChoices = parsed.totalChoices || 0;
    state.highestCombo = parsed.highestCombo || 0;
    state.difficulty = parsed.difficulty || 'normal';
    
    // Load enhanced tracking
    state.difficultyStats = parsed.difficultyStats || {
      easy: 0, normal: 0, hard: 0, nightmare: 0
    };
    state.highRiskChoices = parsed.highRiskChoices || 0;
    state.safeChoices = parsed.safeChoices || 0;
    state.quickChoices = parsed.quickChoices || 0;
    state.slowChoices = parsed.slowChoices || 0;
    state.legendaryMoments = parsed.legendaryMoments || 0;
    
    // Load character progression
    state.totalXP = parsed.totalXP || 0;
    state.totalSurvival = parsed.totalSurvival || 0;
    state.characterLevel = parsed.characterLevel || 1;
    state.skillPoints = parsed.skillPoints || 0;
    state.skills = parsed.skills || {
      wisdom: 0, fortune: 0, intuition: 0, courage: 0, balance: 0
    };
    
    return true;
  }
  return false;
}

function resetGameSession() {
  // Track difficulty stats before reset
  if (state.difficultyStats) {
    state.difficultyStats[state.difficulty] = (state.difficultyStats[state.difficulty] || 0) + 1;
  }
  
  state.xp = 0;
  state.survival = 0;
  state.combo = 0;
  state.scenarioQueue = [];
  state.current = null;
  state.locked = false;
  state.legendaryTimer = 0;
  state.sessionChoices = 0;
  updateTotalStats();
}

// Game settings with defaults
let gameSettings = {
  masterVolume: 50,
  soundEnabled: true,
  autoSave: true,
  showHints: true,
  reducedMotion: false
};

function loadSettings() {
  const saved = localStorage.getItem('createiDestroySettings');
  if (saved) {
    gameSettings = { ...gameSettings, ...JSON.parse(saved) };
  }
}

function saveSettings() {
  localStorage.setItem('createiDestroySettings', JSON.stringify(gameSettings));
}

function showSettings() {
  const modal = document.getElementById('settings-modal');
  
  // Update UI elements with current settings
  document.getElementById('master-volume').value = gameSettings.masterVolume;
  document.getElementById('volume-display').textContent = `${gameSettings.masterVolume}%`;
  document.getElementById('sound-toggle').className = `setting-toggle ${gameSettings.soundEnabled ? 'active' : ''}`;
  document.getElementById('sound-toggle').textContent = gameSettings.soundEnabled ? 'ON' : 'OFF';
  document.getElementById('autosave-toggle').className = `setting-toggle ${gameSettings.autoSave ? 'active' : ''}`;
  document.getElementById('autosave-toggle').textContent = gameSettings.autoSave ? 'ON' : 'OFF';
  document.getElementById('hints-toggle').className = `setting-toggle ${gameSettings.showHints ? 'active' : ''}`;
  document.getElementById('hints-toggle').textContent = gameSettings.showHints ? 'ON' : 'OFF';
  document.getElementById('motion-toggle').className = `setting-toggle ${gameSettings.reducedMotion ? 'active' : ''}`;
  document.getElementById('motion-toggle').textContent = gameSettings.reducedMotion ? 'ON' : 'OFF';
  
  modal.classList.remove('hidden');
}

function hideSettings() {
  const modal = document.getElementById('settings-modal');
  modal.classList.add('hidden');
}

function exportSaveData() {
  const saveData = {
    game: JSON.parse(localStorage.getItem('createiDestroySave') || '{}'),
    achievements: JSON.parse(localStorage.getItem('createiDestroyAchievements') || '[]'),
    settings: gameSettings,
    tutorial: localStorage.getItem('createiDestroyTutorialComplete') || 'false',
    exportDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(saveData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `create-i-destroy-save-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  renderAchievement('💾 SAVE DATA EXPORTED!');
}

function importSaveData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        
        if (confirm('This will overwrite your current save data. Are you sure?')) {
          if (saveData.game) {
            localStorage.setItem('createiDestroySave', JSON.stringify(saveData.game));
          }
          if (saveData.achievements) {
            localStorage.setItem('createiDestroyAchievements', JSON.stringify(saveData.achievements));
          }
          if (saveData.settings) {
            gameSettings = { ...gameSettings, ...saveData.settings };
            saveSettings();
          }
          if (saveData.tutorial) {
            localStorage.setItem('createiDestroyTutorialComplete', saveData.tutorial);
          }
          
          renderAchievement('📥 SAVE DATA IMPORTED!');
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } catch (error) {
        alert('Invalid save file format!');
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

function resetAllData() {
  if (confirm('This will permanently delete ALL your progress, achievements, and settings. Are you absolutely sure?')) {
    if (confirm('This action cannot be undone. Confirm deletion of all data?')) {
      localStorage.removeItem('createiDestroySave');
      localStorage.removeItem('createiDestroyAchievements');
      localStorage.removeItem('createiDestroySettings');
      localStorage.removeItem('createiDestroyTutorialComplete');
      
      renderAchievement('🗑️ ALL DATA RESET!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
}

function restartTutorial() {
  localStorage.removeItem('createiDestroyTutorialComplete');
  renderAchievement('🎓 TUTORIAL RESET!');
  setTimeout(() => {
    location.reload();
  }, 1500);
}

function showStats() {
  const modal = document.getElementById('stats-modal');
  const difficultyNames = {
    'easy': 'Novice',
    'normal': 'Adept', 
    'hard': 'Master',
    'nightmare': 'Legendary'
  };
  
  // Update basic stats
  document.getElementById('current-difficulty').textContent = difficultyNames[state.difficulty] || state.difficulty;
  document.getElementById('games-played').textContent = state.gamesPlayed;
  document.getElementById('total-choices').textContent = state.totalChoices;
  document.getElementById('highest-combo').textContent = state.highestCombo;
  document.getElementById('session-xp').textContent = state.xp;
  document.getElementById('session-survival').textContent = state.survival;
  
  // Add new advanced stats if elements exist
  const updateIfExists = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  
  updateIfExists('character-level-stat', state.characterLevel);
  updateIfExists('skill-points-stat', state.skillPoints);
  updateIfExists('total-xp-stat', state.totalXP);
  updateIfExists('total-survival-stat', state.totalSurvival);
  updateIfExists('legendary-moments-stat', state.legendaryMoments || 0);
  updateIfExists('high-risk-choices-stat', state.highRiskChoices || 0);
  updateIfExists('safe-choices-stat', state.safeChoices || 0);
  updateIfExists('quick-choices-stat', state.quickChoices || 0);
  updateIfExists('session-choices-stat', state.sessionChoices || 0);
  
  // Difficulty breakdown
  updateIfExists('easy-games-stat', state.difficultyStats?.easy || 0);
  updateIfExists('normal-games-stat', state.difficultyStats?.normal || 0);
  updateIfExists('hard-games-stat', state.difficultyStats?.hard || 0);
  updateIfExists('nightmare-games-stat', state.difficultyStats?.nightmare || 0);
  
  // Experience progress
  updateIfExists('experience-progress', `${getExperienceProgress().toFixed(1)}%`);
  
  modal.classList.remove('hidden');
}

function hideStats() {
  const modal = document.getElementById('stats-modal');
  modal.classList.add('hidden');
}
  const modal = document.getElementById('stats-modal');
  const difficultyNames = {
    'easy': 'Novice',
    'normal': 'Adept', 
    'hard': 'Master',
    'nightmare': 'Legendary'
  };
  
  // Update basic stats
  document.getElementById('current-difficulty').textContent = difficultyNames[state.difficulty] || state.difficulty;
  document.getElementById('games-played').textContent = state.gamesPlayed;
  document.getElementById('total-choices').textContent = state.totalChoices;
  document.getElementById('highest-combo').textContent = state.highestCombo;
  document.getElementById('session-xp').textContent = state.xp;
  document.getElementById('session-survival').textContent = state.survival;
  
  // Add new advanced stats if elements exist
  const updateIfExists = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  
  updateIfExists('character-level-stat', state.characterLevel);
  updateIfExists('skill-points-stat', state.skillPoints);
  updateIfExists('total-xp-stat', state.totalXP);
  updateIfExists('total-survival-stat', state.totalSurvival);
  updateIfExists('legendary-moments-stat', state.legendaryMoments || 0);
  updateIfExists('high-risk-choices-stat', state.highRiskChoices || 0);
  updateIfExists('safe-choices-stat', state.safeChoices || 0);
  updateIfExists('quick-choices-stat', state.quickChoices || 0);
  updateIfExists('session-choices-stat', state.sessionChoices || 0);
  
  // Difficulty breakdown
  updateIfExists('easy-games-stat', state.difficultyStats?.easy || 0);
  updateIfExists('normal-games-stat', state.difficultyStats?.normal || 0);
  updateIfExists('hard-games-stat', state.difficultyStats?.hard || 0);
  updateIfExists('nightmare-games-stat', state.difficultyStats?.nightmare || 0);
  
  // Experience progress
  updateIfExists('experience-progress', `${getExperienceProgress().toFixed(1)}%`);
  
  modal.classList.remove('hidden');
}

function hideStats() {
  const modal = document.getElementById('stats-modal');
  modal.classList.add('hidden');
}

function restartGame() {
  if (confirm('Are you sure you want to restart? This will reset your current session progress.')) {
    resetGameSession();
    playScenario();
    changeBackground();
  }
}

function startGameAfterTutorial() {
  playScenario();
  changeBackground();
}

// Make function globally available
window.startGameAfterTutorial = startGameAfterTutorial;

function initializeUI() {
  const statsBtn = document.getElementById('stats-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const restartBtn = document.getElementById('restart-btn');
  const closeStats = document.getElementById('close-stats');
  const closeSettings = document.getElementById('close-settings');
  const statsModal = document.getElementById('stats-modal');
  const settingsModal = document.getElementById('settings-modal');
  const difficultySelect = document.getElementById('difficulty-select');

  statsBtn.addEventListener('click', showStats);
  settingsBtn.addEventListener('click', showSettings);
  restartBtn.addEventListener('click', restartGame);
  closeStats.addEventListener('click', hideStats);
  closeSettings.addEventListener('click', hideSettings);
  
  // Settings controls
  const volumeSlider = document.getElementById('master-volume');
  const volumeDisplay = document.getElementById('volume-display');
  const soundToggle = document.getElementById('sound-toggle');
  const autosaveToggle = document.getElementById('autosave-toggle');
  const hintsToggle = document.getElementById('hints-toggle');
  const motionToggle = document.getElementById('motion-toggle');
  const restartTutorialBtn = document.getElementById('restart-tutorial');
  const exportSaveBtn = document.getElementById('export-save');
  const importSaveBtn = document.getElementById('import-save');
  const resetAllBtn = document.getElementById('reset-all');
  
  volumeSlider.addEventListener('input', (e) => {
    gameSettings.masterVolume = parseInt(e.target.value);
    volumeDisplay.textContent = `${gameSettings.masterVolume}%`;
    saveSettings();
  });
  
  soundToggle.addEventListener('click', () => {
    gameSettings.soundEnabled = !gameSettings.soundEnabled;
    soundToggle.className = `setting-toggle ${gameSettings.soundEnabled ? 'active' : ''}`;
    soundToggle.textContent = gameSettings.soundEnabled ? 'ON' : 'OFF';
    saveSettings();
    playSoundEffect('choice');
  });
  
  autosaveToggle.addEventListener('click', () => {
    gameSettings.autoSave = !gameSettings.autoSave;
    autosaveToggle.className = `setting-toggle ${gameSettings.autoSave ? 'active' : ''}`;
    autosaveToggle.textContent = gameSettings.autoSave ? 'ON' : 'OFF';
    saveSettings();
    playSoundEffect('choice');
  });
  
  hintsToggle.addEventListener('click', () => {
    gameSettings.showHints = !gameSettings.showHints;
    hintsToggle.className = `setting-toggle ${gameSettings.showHints ? 'active' : ''}`;
    hintsToggle.textContent = gameSettings.showHints ? 'ON' : 'OFF';
    saveSettings();
    playSoundEffect('choice');
    
    // Update hint display immediately
    updateHintDisplay();
  });
  
  motionToggle.addEventListener('click', () => {
    gameSettings.reducedMotion = !gameSettings.reducedMotion;
    motionToggle.className = `setting-toggle ${gameSettings.reducedMotion ? 'active' : ''}`;
    motionToggle.textContent = gameSettings.reducedMotion ? 'ON' : 'OFF';
    saveSettings();
    playSoundEffect('choice');
    
    // Apply reduced motion
    document.body.style.animation = gameSettings.reducedMotion ? 'none' : '';
  });
  
  restartTutorialBtn.addEventListener('click', restartTutorial);
  exportSaveBtn.addEventListener('click', exportSaveData);
  importSaveBtn.addEventListener('click', importSaveData);
  resetAllBtn.addEventListener('click', resetAllData);
  
  // Difficulty selector
  difficultySelect.addEventListener('change', (e) => {
    state.difficulty = e.target.value;
    if (gameSettings.autoSave) saveGame();
    playSoundEffect('choice');
  });
  
  // Load saved difficulty
  difficultySelect.value = state.difficulty;
  
  // Close modals when clicking outside
  [statsModal, settingsModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  
  // ESC key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!statsModal.classList.contains('hidden')) {
        hideStats();
      }
      if (!settingsModal.classList.contains('hidden')) {
        hideSettings();
      }
    }
  });
  
  // Tab switching functionality
  const statTabs = document.querySelectorAll('.stat-tab');
  const statContents = document.querySelectorAll('.stat-tab-content');
  
  statTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Remove active class from all tabs and contents
      statTabs.forEach(t => t.classList.remove('active'));
      statContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      playSoundEffect('tab');
    });
  });
  
  // Update hint display on load
  updateHintDisplay();
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadGame();
  loadAchievements();
  
  // Track this session
  state.gamesPlayed += 1;
  state.difficultyStats[state.difficulty] = (state.difficultyStats[state.difficulty] || 0) + 1;
  
  updateTotalStats();
  initializeUI();
  
  // Start tutorial for new players, otherwise start game
  if (!startTutorial()) {
    playScenario();
    changeBackground(); // Set initial background
  }
});
