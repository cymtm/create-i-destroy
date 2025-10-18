// UI rendering for Create.I.Destroy

/**
 * Renders a scenario to the DOM with its choices
 * @param {Object} scenario - The scenario object to render
 * @param {string} scenario.text - The scenario description text
 * @param {Array} scenario.choices - Array of choice objects
 * @param {string} [selectedKey] - The key of the selected choice (if any)
 * @example
 * renderScenario({ text: 'A choice appears...', choices: [...] }, 'Q');
 */
export function renderScenario(scenario, selectedKey) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="scenario">${scenario.text}</div>
    <div class="choices">
      ${scenario.choices
        .map(
          (choice) => `
        <button class="choice-btn${selectedKey === choice.key ? ' active' : ''}" 
          data-key="${choice.key}">
          ${choice.label} <span style="opacity:0.5">[${choice.key}]</span>
        </button>
      `,
        )
        .join('')}
    </div>
    <div id="progressbar"></div>
    <div class="feedback" id="feedback"></div>
    <div id="xpbar"></div>
    <div id="achieve"></div>
  `;
  
  // Add click event listeners to choice buttons
  const choiceButtons = document.querySelectorAll('.choice-btn');
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-key');
      if (key && window.gameChoiceHandler) {
        window.gameChoiceHandler(key);
      }
    });
  });
}

/**
 * Renders a progress bar showing remaining time
 * @param {number} percent - Percentage of time remaining (0-100)
 * @param {boolean} [urgent=false] - Whether to show urgent styling (red color)
 * @example
 * renderProgressBar(75); // Shows 75% progress
 * renderProgressBar(25, true); // Shows 25% with urgent red styling
 */
export function renderProgressBar(percent, urgent = false) {
  const bar = document.getElementById('progressbar');
  if (!bar) return;
  bar.innerHTML = `
    <div class="progress-bar-bg">
      <div class="progress-bar-fill${urgent ? ' urgent' : ''}" 
           style="width:${percent}%;"></div>
    </div>
  `;
}

/**
 * Renders feedback text with optional styling
 * @param {string} text - Feedback message to display
 * @param {string} [type=''] - CSS class for styling (e.g., 'success', 'fail', 'flame')
 * @example
 * renderFeedback('Great choice!', 'success');
 * renderFeedback('Too slow!', 'fail');
 */
export function renderFeedback(text, type = '') {
  const fb = document.getElementById('feedback');
  if (fb) {
    fb.textContent = text;
    fb.className = 'feedback ' + type;
  }
}

/**
 * Renders XP and survival gains
 * @param {number} xp - Amount of wisdom/XP gained
 * @param {number} survival - Amount of fortune/survival gained
 * @example
 * renderXP(15, 10); // Shows "+15 WISDOM ⚡ +10 FORTUNE 🏺"
 */
export function renderXP(xp, survival) {
  const xpbar = document.getElementById('xpbar');
  if (xpbar) {
    xpbar.innerHTML = `
      <span class="xp">+${xp} WISDOM ⚡</span>
      <span class="xp">+${survival} FORTUNE 🏺</span>
    `;
  }
}

/**
 * Renders an achievement notification
 * @param {string} text - Achievement text to display
 * @example
 * renderAchievement('🏆 LEGENDARY MOMENT 🏆');
 */
export function renderAchievement(text) {
  const achieve = document.getElementById('achieve');
  if (achieve) {
    achieve.innerHTML = `<div class="legendary">${text}</div>`;
    setTimeout(() => {
      achieve.innerHTML = '';
    }, 2000);
  }
}
