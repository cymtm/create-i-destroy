// Tutorial system for Create.I.Destroy

export const tutorialSteps = [
  {
    id: 'welcome',
    title: '🌟 Welcome to CREATE.I.DESTROY',
    content: 'Welcome, traveler, to an ancient realm where your choices shape reality itself! This mystical journey will test your wisdom and courage.',
    target: null,
    position: 'center'
  },
  {
    id: 'character_level',
    title: '📈 Character Progression',
    content: 'Your character level shows your overall progress. As you gain total experience, you\'ll level up and earn skill points!',
    target: '#character-level',
    position: 'bottom'
  },
  {
    id: 'stats',
    title: '⚡ Wisdom & Fortune',
    content: 'Wisdom (⚡) represents knowledge and power, while Fortune (🏺) represents survival and luck. Both are crucial for success!',
    target: '#xp-total',
    position: 'bottom'
  },
  {
    id: 'scenario',
    title: '📜 Ancient Prophecies',
    content: 'Each scenario presents a mystical challenge. Read carefully - your choice will determine the outcome!',
    target: '.scenario',
    position: 'top'
  },
  {
    id: 'choices',
    title: '🎯 Making Choices',
    content: 'Use Q, W, or E keys to make your choice quickly! Some choices are risky (high wisdom, low survival), others are safer.',
    target: '.choices',
    position: 'top'
  },
  {
    id: 'timer',
    title: '⏰ Time Pressure',
    content: 'Watch the progress bar! You have limited time to decide. The bar turns red when time is running low.',
    target: '#progressbar',
    position: 'top'
  },
  {
    id: 'difficulty',
    title: '⚔️ Difficulty Levels',
    content: 'Choose your trial difficulty! Higher difficulties give less time but better rewards. Start with Novice if you\'re new!',
    target: '#difficulty-select',
    position: 'bottom'
  },
  {
    id: 'chronicles',
    title: '📊 Chronicles of Fate',
    content: 'Click here to view detailed statistics, character progression, achievements, and analytics about your playstyle!',
    target: '#stats-btn',
    position: 'bottom'
  },
  {
    id: 'achievements',
    title: '🏆 Achievement System',
    content: 'Unlock achievements for various accomplishments! They\'re organized in tiers: Bronze 🥉, Silver 🥈, Gold 🥇, Legendary 🌟, and Mythic 👑.',
    target: null,
    position: 'center'
  },
  {
    id: 'ready',
    title: '🚀 Ready to Begin',
    content: 'You\'re ready to start your mystical journey! Remember: every choice shapes your destiny. Good luck, brave soul!',
    target: null,
    position: 'center'
  }
];

let currentStep = 0;
let tutorialActive = false;

export function startTutorial() {
  if (localStorage.getItem('createiDestroyTutorialComplete')) {
    return false;
  }
  
  tutorialActive = true;
  currentStep = 0;
  showTutorialStep();
  return true;
}

export function skipTutorial() {
  tutorialActive = false;
  hideTutorialOverlay();
  localStorage.setItem('createiDestroyTutorialComplete', 'true');
  
  // Start the actual game
  if (window.startGameAfterTutorial) {
    window.startGameAfterTutorial();
  }
}

export function nextTutorialStep() {
  currentStep++;
  if (currentStep >= tutorialSteps.length) {
    completeTutorial();
  } else {
    showTutorialStep();
  }
}

export function previousTutorialStep() {
  if (currentStep > 0) {
    currentStep--;
    showTutorialStep();
  }
}

function completeTutorial() {
  tutorialActive = false;
  hideTutorialOverlay();
  localStorage.setItem('createiDestroyTutorialComplete', 'true');
  
  // Show completion message
  const achievement = document.getElementById('achieve');
  if (achievement) {
    achievement.innerHTML = '<div class="legendary">🎓 TUTORIAL COMPLETE! 🎓</div>';
    setTimeout(() => {
      achievement.innerHTML = '';
    }, 3000);
  }
  
  // Start the actual game
  if (window.startGameAfterTutorial) {
    window.startGameAfterTutorial();
  }
}

function showTutorialStep() {
  const step = tutorialSteps[currentStep];
  if (!step) return;
  
  createTutorialOverlay();
  positionTutorial(step);
  
  // Highlight target element
  if (step.target) {
    highlightElement(step.target);
  }
}

function createTutorialOverlay() {
  // Remove existing overlay
  const existing = document.getElementById('tutorial-overlay');
  if (existing) {
    existing.remove();
  }
  
  const step = tutorialSteps[currentStep];
  
  const overlay = document.createElement('div');
  overlay.id = 'tutorial-overlay';
  overlay.className = 'tutorial-overlay';
  
  overlay.innerHTML = `
    <div class="tutorial-backdrop"></div>
    <div class="tutorial-content" id="tutorial-content">
      <div class="tutorial-header">
        <h3 class="tutorial-title">${step.title}</h3>
        <div class="tutorial-progress">
          <span>${currentStep + 1} / ${tutorialSteps.length}</span>
        </div>
      </div>
      <div class="tutorial-body">
        <p class="tutorial-text">${step.content}</p>
      </div>
      <div class="tutorial-footer">
        <button class="tutorial-btn secondary" onclick="window.tutorialSkip()" id="tutorial-skip">
          ${currentStep === 0 ? 'Skip Tutorial' : 'Skip'}
        </button>
        ${currentStep > 0 ? 
          '<button class="tutorial-btn secondary" onclick="window.tutorialPrev()" id="tutorial-prev">Previous</button>' : 
          ''
        }
        <button class="tutorial-btn primary" onclick="window.tutorialNext()" id="tutorial-next">
          ${currentStep === tutorialSteps.length - 1 ? 'Start Playing!' : 'Next'}
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

function positionTutorial(step) {
  const content = document.getElementById('tutorial-content');
  if (!content) return;
  
  // Reset positioning
  content.style.position = 'fixed';
  content.style.top = '';
  content.style.left = '';
  content.style.right = '';
  content.style.bottom = '';
  content.style.transform = '';
  
  if (!step.target || step.position === 'center') {
    // Center the tutorial
    content.style.top = '50%';
    content.style.left = '50%';
    content.style.transform = 'translate(-50%, -50%)';
    return;
  }
  
  const target = document.querySelector(step.target);
  if (!target) {
    // If target not found, center it
    content.style.top = '50%';
    content.style.left = '50%';
    content.style.transform = 'translate(-50%, -50%)';
    return;
  }
  
  const targetRect = target.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  
  switch (step.position) {
    case 'top':
      content.style.left = `${targetRect.left + targetRect.width / 2 - contentRect.width / 2}px`;
      content.style.bottom = `${window.innerHeight - targetRect.top + 10}px`;
      break;
    case 'bottom':
      content.style.left = `${targetRect.left + targetRect.width / 2 - contentRect.width / 2}px`;
      content.style.top = `${targetRect.bottom + 10}px`;
      break;
    case 'left':
      content.style.right = `${window.innerWidth - targetRect.left + 10}px`;
      content.style.top = `${targetRect.top + targetRect.height / 2 - contentRect.height / 2}px`;
      break;
    case 'right':
      content.style.left = `${targetRect.right + 10}px`;
      content.style.top = `${targetRect.top + targetRect.height / 2 - contentRect.height / 2}px`;
      break;
  }
  
  // Ensure tutorial stays within viewport
  const rect = content.getBoundingClientRect();
  if (rect.left < 10) {
    content.style.left = '10px';
  }
  if (rect.right > window.innerWidth - 10) {
    content.style.left = `${window.innerWidth - rect.width - 10}px`;
  }
  if (rect.top < 10) {
    content.style.top = '10px';
  }
  if (rect.bottom > window.innerHeight - 10) {
    content.style.top = `${window.innerHeight - rect.height - 10}px`;
  }
}

function highlightElement(selector) {
  // Remove existing highlights
  document.querySelectorAll('.tutorial-highlight').forEach(el => {
    el.classList.remove('tutorial-highlight');
  });
  
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add('tutorial-highlight');
  }
}

function hideTutorialOverlay() {
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) {
    overlay.remove();
  }
  
  // Remove highlights
  document.querySelectorAll('.tutorial-highlight').forEach(el => {
    el.classList.remove('tutorial-highlight');
  });
}

// Global functions for tutorial navigation
window.tutorialNext = nextTutorialStep;
window.tutorialPrev = previousTutorialStep;
window.tutorialSkip = skipTutorial;

export function isTutorialActive() {
  return tutorialActive;
}