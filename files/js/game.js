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

let state = {
  xp: 0,
  survival: 0,
  combo: 0,
  scenarioQueue: [],
  current: null,
  locked: false,
  legendaryTimer: 0,
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
  renderFeedback('REALITY BREACH DETECTED...', 'flame');
  changeBackground();

  // Decision timer
  let choiceWindow = 3; // seconds for decision
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

    // Animate result
    renderScenario(state.current, key);
    renderFeedback(
      choice.result.feedback,
      choice.result.survival ? 'success' : 'fail',
    );
    renderXP(choice.result.xp, choice.result.survival);
    state.xp += choice.result.xp;
    state.survival += choice.result.survival;
    updateTotalStats();
    if (choice.result.xp >= 10) {
      state.combo += 1;
      if (state.combo >= 3) {
        renderAchievement('🔥LEGENDARY MOMENT🔥');
        state.legendaryTimer = Date.now();
        state.combo = 0;
      }
    } else {
      state.combo = 0;
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

    if (elapsed >= choiceWindow * 1000 && !choiceMade) {
      state.locked = true;
      document.removeEventListener('keydown', keyHandler);

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
  if (xpElement) xpElement.textContent = `⚡ XP: ${state.xp}`;
  if (survivalElement) survivalElement.textContent = `🏆 Survival: ${state.survival}`;
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
  updateTotalStats();
  playScenario();
  changeBackground(); // Set initial background
});
