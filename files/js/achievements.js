// Achievement system for Warren.System.Break

export const achievements = [
  {
    id: 'first_choice',
    name: '🎯 FIRST BREACH',
    description: 'Make your first decision in the Warren',
    condition: (state) => state.totalChoices >= 1
  },
  {
    id: 'survivor',
    name: '🧠 MIND INTACT',
    description: 'Preserve 50 sanity points in one iteration',
    condition: (state) => state.survival >= 50
  },
  {
    id: 'speed_demon',
    name: '⚡ STATIC ADDICT',
    description: 'Absorb 100 static in one iteration',
    condition: (state) => state.xp >= 100
  },
  {
    id: 'veteran',
    name: '🔄 RECURSIVE VETERAN',
    description: 'Survive 10 iterations',
    condition: (state) => state.gamesPlayed >= 10
  },
  {
    id: 'combo_master',
    name: '🌀 COHERENCE MASTER',
    description: 'Achieve a 5-decision coherence streak',
    condition: (state) => state.highestCombo >= 5
  },
  {
    id: 'choice_addict',
    name: '🎲 DECISION ENGINE',
    description: 'Make 100 total decisions across all iterations',
    condition: (state) => state.totalChoices >= 100
  },
  {
    id: 'reality_bender',
    name: '🤖 THEX-9 KINSHIP',
    description: 'Reach 200 static and 100 sanity in one iteration',
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
  const saved = localStorage.getItem('warrenSystemAchievements');
  if (saved) {
    unlockedAchievements = new Set(JSON.parse(saved));
  }
}

export function saveAchievements() {
  localStorage.setItem('warrenSystemAchievements', JSON.stringify([...unlockedAchievements]));
}

export function getUnlockedAchievements() {
  return [...unlockedAchievements];
}