// UI rendering for Create.I.Destroy

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

export function renderFeedback(text, type = '') {
  const fb = document.getElementById('feedback');
  if (fb) {
    fb.textContent = text;
    fb.className = 'feedback ' + type;
  }
}

export function renderXP(xp, survival) {
  const xpbar = document.getElementById('xpbar');
  if (xpbar) {
    xpbar.innerHTML = `
      <span class="xp">+${xp} WISDOM ⚡</span>
      <span class="xp">+${survival} FORTUNE 🏺</span>
    `;
  }
}

export function renderAchievement(text) {
  const achieve = document.getElementById('achieve');
  if (achieve) {
    achieve.innerHTML = `<div class="legendary">${text}</div>`;
    setTimeout(() => {
      achieve.innerHTML = '';
    }, 2000);
  }
}
