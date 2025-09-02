// Achievement system for Create.I.Destroy

export const achievements = [
  {
    id: 'first_choice',
    name: '🎯 FIRST STEP',
    description: 'Make your first choice',
    condition: (state) => state.totalChoices >= 1
  },
  {
    id: 'survivor',
    name: '🛡️ SURVIVOR',
    description: 'Reach 50 survival points in one session',
    condition: (state) => state.survival >= 50
  },
  {
    id: 'speed_demon',
    name: '⚡ SPEED DEMON',
    description: 'Reach 100 XP in one session',
    condition: (state) => state.xp >= 100
  },
  {
    id: 'veteran',
    name: '🏆 VETERAN',
    description: 'Play 10 games',
    condition: (state) => state.gamesPlayed >= 10
  },
  {
    id: 'combo_master',
    name: '🔥 COMBO MASTER',
    description: 'Achieve a 5-hit combo',
    condition: (state) => state.highestCombo >= 5
  },
  {
    id: 'choice_addict',
    name: '🎲 CHOICE ADDICT',
    description: 'Make 100 total choices',
    condition: (state) => state.totalChoices >= 100
  },
  {
    id: 'reality_bender',
    name: '🌀 REALITY BENDER',
    description: 'Reach 200 XP and 100 survival in one session',
    condition: (state) => state.xp >= 200 && state.survival >= 100
  }
];

let unlockedAchievements = new Set();

export function checkAchievements(state) {
  const newAchievements = [];
  
  achievements.forEach(achievement => {
    if (!unlockedAchievements.has(achievement.id) && achievement.condition(state)) {
      unlockedAchievements.add(achievement.id);
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
}

export function loadAchievements() {
  const saved = localStorage.getItem('createiDestroyAchievements');
  if (saved) {
    unlockedAchievements = new Set(JSON.parse(saved));
  }
}

export function saveAchievements() {
  localStorage.setItem('createiDestroyAchievements', JSON.stringify([...unlockedAchievements]));
}

export function getUnlockedAchievements() {
  return [...unlockedAchievements];
}