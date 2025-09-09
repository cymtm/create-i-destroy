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

function playSoundEffect(effectType) {
  switch(effectType) {
    case 'choice':
      playSound(800, 0.1, 'square');
      break;
    case 'success':
      playSound(660, 0.3, 'sine');
      setTimeout(() => playSound(880, 0.3, 'sine'), 100);
      break;
    case 'fail':
      playSound(220, 0.5, 'sawtooth');
      break;
    case 'legendary':
      // Epic sound sequence
      playSound(440, 0.2, 'sine');
      setTimeout(() => playSound(550, 0.2, 'sine'), 150);
      setTimeout(() => playSound(660, 0.3, 'sine'), 300);
      break;
    case 'tick':
      playSound(1000, 0.05, 'square');
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
  highestCombo: 0,
  difficulty: 'normal', // easy, normal, hard, nightmare
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

  // Decision timer - affected by difficulty
  const difficulty = difficultySettings[state.difficulty];
  let choiceWindow = difficulty.time; // seconds for decision
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

    // Animate result
    renderScenario(state.current, key);
    renderFeedback(
      choice.result.feedback,
      choice.result.survival ? 'success' : 'fail',
    );
    
    // Play success/fail sound
    playSoundEffect(choice.result.survival > 5 ? 'success' : 'fail');
    
    renderXP(choice.result.xp, choice.result.survival);
    
    // Apply difficulty multipliers
    const difficulty = difficultySettings[state.difficulty];
    const adjustedXP = Math.round(choice.result.xp * difficulty.xpMultiplier);
    const adjustedSurvival = Math.round(choice.result.survival * difficulty.survivalMultiplier);
    
    state.xp += adjustedXP;
    state.survival += adjustedSurvival;
    state.totalChoices += 1;
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
        renderAchievement(`🎉 ${newAchievements[0].name} 🎉`);
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

function changeBackground() {
  const colors = [
    'linear-gradient(45deg, #0a0a0a, #1a0a1a, #0a1a1a)',
    'linear-gradient(45deg, #1a0a0a, #0a1a0a, #0a0a1a)',
    'linear-gradient(45deg, #2a0a0a, #0a2a0a, #0a0a2a)',
    'linear-gradient(45deg, #1a1a0a, #1a0a1a, #0a1a1a)'
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
}

function saveGame() {
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
    // Only load persistent stats, not current game state
    state.gamesPlayed = parsed.gamesPlayed || 0;
    state.totalChoices = parsed.totalChoices || 0;
    state.highestCombo = parsed.highestCombo || 0;
    state.difficulty = parsed.difficulty || 'normal';
    return true;
  }
  return false;
}

function resetGameSession() {
  state.xp = 0;
  state.survival = 0;
  state.combo = 0;
  state.scenarioQueue = [];
  state.current = null;
  state.locked = false;
  state.legendaryTimer = 0;
  updateTotalStats();
}

function showStats() {
  const modal = document.getElementById('stats-modal');
  const difficultyNames = {
    'easy': 'Novice',
    'normal': 'Adept', 
    'hard': 'Master',
    'nightmare': 'Legendary'
  };
  document.getElementById('current-difficulty').textContent = difficultyNames[state.difficulty] || state.difficulty;
  document.getElementById('games-played').textContent = state.gamesPlayed;
  document.getElementById('total-choices').textContent = state.totalChoices;
  document.getElementById('highest-combo').textContent = state.highestCombo;
  document.getElementById('session-xp').textContent = state.xp;
  document.getElementById('session-survival').textContent = state.survival;
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

function initializeUI() {
  const statsBtn = document.getElementById('stats-btn');
  const restartBtn = document.getElementById('restart-btn');
  const closeStats = document.getElementById('close-stats');
  const modal = document.getElementById('stats-modal');
  const difficultySelect = document.getElementById('difficulty-select');

  statsBtn.addEventListener('click', showStats);
  restartBtn.addEventListener('click', restartGame);
  closeStats.addEventListener('click', hideStats);
  
  // Difficulty selector
  difficultySelect.addEventListener('change', (e) => {
    state.difficulty = e.target.value;
    saveGame();
    playSoundEffect('choice');
  });
  
  // Load saved difficulty
  difficultySelect.value = state.difficulty;
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideStats();
    }
  });
  
  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      hideStats();
    }
  });
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
  loadGame();
  loadAchievements();
  state.gamesPlayed += 1;
  updateTotalStats();
  initializeUI();
  playScenario();
  changeBackground(); // Set initial background
});
