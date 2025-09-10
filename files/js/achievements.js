// Achievement system for Create.I.Destroy

export const achievements = [
  // Beginner Achievements
  {
    id: 'first_choice',
    name: '🎯 FIRST STEP',
    description: 'Make your first choice',
    condition: (state) => state.totalChoices >= 1,
    tier: 'bronze'
  },
  {
    id: 'first_wisdom',
    name: '⚡ SPARK OF INSIGHT',
    description: 'Gain your first wisdom point',
    condition: (state) => state.xp > 0,
    tier: 'bronze'
  },
  {
    id: 'first_survival',
    name: '🏺 INITIAL FORTUNE',
    description: 'Survive your first trial',
    condition: (state) => state.survival > 0,
    tier: 'bronze'
  },
  
  // Progression Achievements
  {
    id: 'survivor',
    name: '🛡️ SURVIVOR',
    description: 'Reach 50 survival points in one session',
    condition: (state) => state.survival >= 50,
    tier: 'silver'
  },
  {
    id: 'speed_demon',
    name: '⚡ SPEED DEMON',
    description: 'Reach 100 XP in one session',
    condition: (state) => state.xp >= 100,
    tier: 'silver'
  },
  {
    id: 'wisdom_seeker',
    name: '🧠 WISDOM SEEKER',
    description: 'Reach 200 XP in one session',
    condition: (state) => state.xp >= 200,
    tier: 'gold'
  },
  {
    id: 'fortune_master',
    name: '💎 FORTUNE MASTER',
    description: 'Reach 150 survival in one session',
    condition: (state) => state.survival >= 150,
    tier: 'gold'
  },
  {
    id: 'transcendent',
    name: '🌟 TRANSCENDENT',
    description: 'Reach 500 XP in one session',
    condition: (state) => state.xp >= 500,
    tier: 'legendary'
  },
  {
    id: 'immortal',
    name: '♾️ IMMORTAL',
    description: 'Reach 300 survival in one session',
    condition: (state) => state.survival >= 300,
    tier: 'legendary'
  },
  
  // Experience Achievements
  {
    id: 'veteran',
    name: '🏆 VETERAN',
    description: 'Play 10 games',
    condition: (state) => state.gamesPlayed >= 10,
    tier: 'silver'
  },
  {
    id: 'experienced',
    name: '🎖️ EXPERIENCED',
    description: 'Play 25 games',
    condition: (state) => state.gamesPlayed >= 25,
    tier: 'gold'
  },
  {
    id: 'master_player',
    name: '👑 MASTER PLAYER',
    description: 'Play 50 games',
    condition: (state) => state.gamesPlayed >= 50,
    tier: 'legendary'
  },
  {
    id: 'eternal_wanderer',
    name: '🌌 ETERNAL WANDERER',
    description: 'Play 100 games',
    condition: (state) => state.gamesPlayed >= 100,
    tier: 'mythic'
  },
  
  // Choice Achievements
  {
    id: 'choice_maker',
    name: '🎲 CHOICE MAKER',
    description: 'Make 25 total choices',
    condition: (state) => state.totalChoices >= 25,
    tier: 'bronze'
  },
  {
    id: 'decision_master',
    name: '⚖️ DECISION MASTER',
    description: 'Make 50 total choices',
    condition: (state) => state.totalChoices >= 50,
    tier: 'silver'
  },
  {
    id: 'choice_addict',
    name: '🎰 CHOICE ADDICT',
    description: 'Make 100 total choices',
    condition: (state) => state.totalChoices >= 100,
    tier: 'gold'
  },
  {
    id: 'fate_weaver',
    name: '🕸️ FATE WEAVER',
    description: 'Make 250 total choices',
    condition: (state) => state.totalChoices >= 250,
    tier: 'legendary'
  },
  {
    id: 'reality_sculptor',
    name: '🗿 REALITY SCULPTOR',
    description: 'Make 500 total choices',
    condition: (state) => state.totalChoices >= 500,
    tier: 'mythic'
  },
  
  // Combo Achievements
  {
    id: 'combo_starter',
    name: '🔥 COMBO STARTER',
    description: 'Achieve a 3-hit combo',
    condition: (state) => state.highestCombo >= 3,
    tier: 'bronze'
  },
  {
    id: 'combo_master',
    name: '⚡ COMBO MASTER',
    description: 'Achieve a 5-hit combo',
    condition: (state) => state.highestCombo >= 5,
    tier: 'silver'
  },
  {
    id: 'combo_legend',
    name: '💥 COMBO LEGEND',
    description: 'Achieve a 8-hit combo',
    condition: (state) => state.highestCombo >= 8,
    tier: 'gold'
  },
  {
    id: 'combo_god',
    name: '🌟 COMBO GOD',
    description: 'Achieve a 12-hit combo',
    condition: (state) => state.highestCombo >= 12,
    tier: 'legendary'
  },
  {
    id: 'infinite_chain',
    name: '♾️ INFINITE CHAIN',
    description: 'Achieve a 20-hit combo',
    condition: (state) => state.highestCombo >= 20,
    tier: 'mythic'
  },
  
  // Balanced Achievements
  {
    id: 'balanced_soul',
    name: '⚖️ BALANCED SOUL',
    description: 'Reach 50 XP and 50 survival in one session',
    condition: (state) => state.xp >= 50 && state.survival >= 50,
    tier: 'silver'
  },
  {
    id: 'reality_bender',
    name: '🌀 REALITY BENDER',
    description: 'Reach 200 XP and 100 survival in one session',
    condition: (state) => state.xp >= 200 && state.survival >= 100,
    tier: 'gold'
  },
  {
    id: 'cosmic_master',
    name: '🌌 COSMIC MASTER',
    description: 'Reach 300 XP and 200 survival in one session',
    condition: (state) => state.xp >= 300 && state.survival >= 200,
    tier: 'legendary'
  },
  {
    id: 'universal_being',
    name: '🌟 UNIVERSAL BEING',
    description: 'Reach 500 XP and 300 survival in one session',
    condition: (state) => state.xp >= 500 && state.survival >= 300,
    tier: 'mythic'
  },
  
  // Difficulty Achievements
  {
    id: 'easy_master',
    name: '🟢 NOVICE GRADUATE',
    description: 'Play 10 games on Novice difficulty',
    condition: (state) => (state.difficultyStats?.easy || 0) >= 10,
    tier: 'bronze'
  },
  {
    id: 'normal_veteran',
    name: '🟡 ADEPT WARRIOR',
    description: 'Play 15 games on Adept difficulty',
    condition: (state) => (state.difficultyStats?.normal || 0) >= 15,
    tier: 'silver'
  },
  {
    id: 'hard_conqueror',
    name: '🟠 MASTER CONQUEROR',
    description: 'Play 10 games on Master difficulty',
    condition: (state) => (state.difficultyStats?.hard || 0) >= 10,
    tier: 'gold'
  },
  {
    id: 'nightmare_survivor',
    name: '🔴 LEGENDARY SURVIVOR',
    description: 'Play 5 games on Legendary difficulty',
    condition: (state) => (state.difficultyStats?.nightmare || 0) >= 5,
    tier: 'legendary'
  },
  {
    id: 'difficulty_master',
    name: '🎯 DIFFICULTY MASTER',
    description: 'Play games on all difficulty levels',
    condition: (state) => {
      const stats = state.difficultyStats || {};
      return stats.easy >= 1 && stats.normal >= 1 && stats.hard >= 1 && stats.nightmare >= 1;
    },
    tier: 'legendary'
  },
  
  // Special Achievements
  {
    id: 'risk_taker',
    name: '💀 RISK TAKER',
    description: 'Choose high-risk options 20 times',
    condition: (state) => (state.highRiskChoices || 0) >= 20,
    tier: 'silver'
  },
  {
    id: 'cautious_soul',
    name: '🛡️ CAUTIOUS SOUL',
    description: 'Choose safe options 30 times',
    condition: (state) => (state.safeChoices || 0) >= 30,
    tier: 'silver'
  },
  {
    id: 'speed_runner',
    name: '⚡ SPEED RUNNER',
    description: 'Make 10 choices in under 1 second each',
    condition: (state) => (state.quickChoices || 0) >= 10,
    tier: 'gold'
  },
  {
    id: 'contemplator',
    name: '🤔 CONTEMPLATOR',
    description: 'Use full time for 15 decisions',
    condition: (state) => (state.slowChoices || 0) >= 15,
    tier: 'bronze'
  },
  {
    id: 'perfect_balance',
    name: '⚖️ PERFECT BALANCE',
    description: 'Have exactly equal XP and survival (50+ each)',
    condition: (state) => state.xp >= 50 && state.survival >= 50 && state.xp === state.survival,
    tier: 'legendary'
  },
  {
    id: 'session_marathon',
    name: '🏃 SESSION MARATHON',
    description: 'Make 50 choices in a single session',
    condition: (state) => (state.sessionChoices || 0) >= 50,
    tier: 'gold'
  },
  {
    id: 'legendary_moment_master',
    name: '🔥 LEGENDARY MOMENT MASTER',
    description: 'Trigger 10 legendary moments',
    condition: (state) => (state.legendaryMoments || 0) >= 10,
    tier: 'legendary'
  },
  {
    id: 'achievement_hunter',
    name: '🏆 ACHIEVEMENT HUNTER',
    description: 'Unlock 15 achievements',
    condition: (state, achievements) => achievements.length >= 15,
    tier: 'legendary'
  },
  {
    id: 'completionist',
    name: '👑 COMPLETIONIST',
    description: 'Unlock all other achievements',
    condition: (state, achievements) => achievements.length >= 34, // All minus this one
    tier: 'mythic'
  }
];

let unlockedAchievements = new Set();

export function checkAchievements(state) {
  const newAchievements = [];
  
  achievements.forEach(achievement => {
    if (!unlockedAchievements.has(achievement.id)) {
      let unlocked = false;
      
      // Special case for achievement_hunter and completionist
      if (achievement.id === 'achievement_hunter' || achievement.id === 'completionist') {
        unlocked = achievement.condition(state, [...unlockedAchievements]);
      } else {
        unlocked = achievement.condition(state);
      }
      
      if (unlocked) {
        unlockedAchievements.add(achievement.id);
        newAchievements.push(achievement);
      }
    }
  });
  
  return newAchievements;
}

export function getAchievementsByTier() {
  const tiers = {
    bronze: [],
    silver: [],
    gold: [],
    legendary: [],
    mythic: []
  };
  
  achievements.forEach(achievement => {
    const tier = achievement.tier || 'bronze';
    tiers[tier].push(achievement);
  });
  
  return tiers;
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