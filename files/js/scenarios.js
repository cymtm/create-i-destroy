// Game scenarios for Create.I.Destroy

export const scenarios = [
  {
    id: 1,
    text: "🌀 DIMENSIONAL RIFT DETECTED 🌀\nA tear in reality appears before you. Strange whispers echo from within. Something is calling...",
    choices: [
      {
        key: 'Q',
        label: 'LEAP INTO THE VOID',
        result: {
          feedback: '⚡ You embrace the unknown! Reality bends around you!',
          xp: 15,
          survival: 10
        }
      },
      {
        key: 'W',
        label: 'SEAL THE RIFT',
        result: {
          feedback: '🛡️ You stabilize reality, but miss the adventure...',
          xp: 5,
          survival: 15
        }
      },
      {
        key: 'E',
        label: 'INVESTIGATE CAUTIOUSLY',
        result: {
          feedback: '🔍 Careful observation reveals secrets of the cosmos!',
          xp: 12,
          survival: 8
        }
      }
    ]
  },
  {
    id: 2,
    text: "⚔️ SHADOW ASSASSIN EMERGES ⚔️\nFrom the darkness, a cloaked figure strikes! Their blade gleams with otherworldly energy!",
    choices: [
      {
        key: 'Q',
        label: 'COUNTER-ATTACK',
        result: {
          feedback: '💥 Your reflexes are lightning! The assassin retreats!',
          xp: 18,
          survival: 5
        }
      },
      {
        key: 'W',
        label: 'DODGE AND FLEE',
        result: {
          feedback: '💨 Speed saves your life! You escape into the night!',
          xp: 8,
          survival: 12
        }
      },
      {
        key: 'E',
        label: 'NEGOTIATE',
        result: {
          feedback: '🗣️ Words cut deeper than blades! You form an alliance!',
          xp: 20,
          survival: 3
        }
      }
    ]
  },
  {
    id: 3,
    text: "🔥 INFERNAL PORTAL OPENS 🔥\nThe ground cracks and hellfire erupts! Demonic entities begin to emerge!",
    choices: [
      {
        key: 'Q',
        label: 'BANISH THE DEMONS',
        result: {
          feedback: '✨ Your will proves stronger than darkness itself!',
          xp: 22,
          survival: 1
        }
      },
      {
        key: 'W',
        label: 'JOIN THE CHAOS',
        result: {
          feedback: '😈 You embrace the infernal power! Reality trembles!',
          xp: 16,
          survival: 7
        }
      },
      {
        key: 'E',
        label: 'SEEK HIGHER GROUND',
        result: {
          feedback: '🏃 Strategic retreat! You find sanctuary above!',
          xp: 6,
          survival: 18
        }
      }
    ]
  },
  {
    id: 4,
    text: "❄️ FROZEN WASTELAND SPREADS ❄️\nAn unnatural winter consumes everything! The cold threatens to freeze time itself!",
    choices: [
      {
        key: 'Q',
        label: 'IGNITE INNER FIRE',
        result: {
          feedback: '🔥 Your passion melts the eternal ice! Spring returns!',
          xp: 14,
          survival: 9
        }
      },
      {
        key: 'W',
        label: 'ADAPT TO THE COLD',
        result: {
          feedback: '🧊 You become one with winter! Ice bends to your will!',
          xp: 11,
          survival: 14
        }
      },
      {
        key: 'E',
        label: 'FIND SHELTER',
        result: {
          feedback: '🏠 Survival instincts guide you to warmth and safety!',
          xp: 7,
          survival: 16
        }
      }
    ]
  },
  {
    id: 5,
    text: "🌟 COSMIC ENTITY APPEARS 🌟\nA being of pure starlight descends! It offers forbidden knowledge that could reshape existence!",
    choices: [
      {
        key: 'Q',
        label: 'ACCEPT THE KNOWLEDGE',
        result: {
          feedback: '🧠 Your mind expands beyond mortal limits! TRANSCENDENCE!',
          xp: 25,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'REJECT THE OFFER',
        result: {
          feedback: '🛡️ Your humanity remains intact! Wisdom in restraint!',
          xp: 8,
          survival: 20
        }
      },
      {
        key: 'E',
        label: 'BARGAIN FOR PARTIAL TRUTH',
        result: {
          feedback: '⚖️ Clever negotiation! You gain power without corruption!',
          xp: 17,
          survival: 11
        }
      }
    ]
  },
  {
    id: 6,
    text: "⚡ REALITY STORM APPROACHING ⚡\nThe fabric of existence tears apart! Laws of physics become mere suggestions!",
    choices: [
      {
        key: 'Q',
        label: 'RIDE THE STORM',
        result: {
          feedback: '🌪️ You surf the chaos waves! Reality bends to your will!',
          xp: 19,
          survival: 4
        }
      },
      {
        key: 'W',
        label: 'CREATE A REALITY ANCHOR',
        result: {
          feedback: '⚓ Your will stabilizes the storm! Order from chaos!',
          xp: 13,
          survival: 13
        }
      },
      {
        key: 'E',
        label: 'PHASE BETWEEN REALITIES',
        result: {
          feedback: '👻 You slip between worlds! The storm passes harmlessly!',
          xp: 10,
          survival: 17
        }
      }
    ]
  },
  {
    id: 7,
    text: "🕳️ VOID WHISPERS SECRETS 🕳️\nThe emptiness between worlds speaks! It knows your deepest fears and desires!",
    choices: [
      {
        key: 'Q',
        label: 'LISTEN TO THE WHISPERS',
        result: {
          feedback: '👂 Dark truths reveal themselves! Knowledge is power!',
          xp: 21,
          survival: 2
        }
      },
      {
        key: 'W',
        label: 'SILENCE THE VOID',
        result: {
          feedback: '🤫 Your will overcomes nothingness! Silence reigns!',
          xp: 12,
          survival: 15
        }
      },
      {
        key: 'E',
        label: 'WHISPER BACK',
        result: {
          feedback: '🗣️ You speak to infinity! The void becomes your ally!',
          xp: 16,
          survival: 8
        }
      }
    ]
  },
  {
    id: 8,
    text: "🌀 TIME LOOP DETECTED 🌀\nYou realize you've been here before... and before... and before. Break the cycle!",
    choices: [
      {
        key: 'Q',
        label: 'SHATTER THE LOOP',
        result: {
          feedback: '💥 Time explodes around you! Linear existence restored!',
          xp: 23,
          survival: 1
        }
      },
      {
        key: 'W',
        label: 'USE THE LOOP',
        result: {
          feedback: '⏰ Perfect repetition! You master the moment!',
          xp: 15,
          survival: 12
        }
      },
      {
        key: 'E',
        label: 'ACCEPT ETERNITY',
        result: {
          feedback: '♾️ Infinite patience! You find peace in repetition!',
          xp: 9,
          survival: 19
        }
      }
    ]
  },
  {
    id: 9,
    text: "🐉 ANCIENT DRAGON AWAKENS 🐉\nA colossal wyrm emerges from the earth's core! Its eyes burn with the fury of millennia!",
    choices: [
      {
        key: 'Q',
        label: 'CHALLENGE THE DRAGON',
        result: {
          feedback: '⚔️ Your courage is legendary! The dragon respects your spirit!',
          xp: 30,
          survival: 1
        }
      },
      {
        key: 'W',
        label: 'OFFER TRIBUTE',
        result: {
          feedback: '💎 Wisdom and wealth save the day! The dragon retreats!',
          xp: 12,
          survival: 18
        }
      },
      {
        key: 'E',
        label: 'SPEAK THE ANCIENT WORDS',
        result: {
          feedback: '📜 Forgotten magic still flows! The dragon becomes your ally!',
          xp: 25,
          survival: 8
        }
      }
    ]
  },
  {
    id: 10,
    text: "🌊 TSUNAMI OF SOULS 🌊\nA wave of departed spirits crashes toward you! They seek to reclaim the living world!",
    choices: [
      {
        key: 'Q',
        label: 'DIVE INTO THE WAVE',
        result: {
          feedback: '👻 You join the eternal dance! Death and life become one!',
          xp: 28,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'CREATE A SPIRITUAL BARRIER',
        result: {
          feedback: '✨ Your will parts the sea of souls! Life preserves!',
          xp: 15,
          survival: 16
        }
      },
      {
        key: 'E',
        label: 'GUIDE THEM TO PEACE',
        result: {
          feedback: '🕊️ Your compassion calms the restless dead! Harmony restored!',
          xp: 22,
          survival: 6
        }
      }
    ]
  },
  {
    id: 11,
    text: "🌙 LUNAR ECLIPSE OF POWER 🌙\nThe moon turns blood red! Dark energies surge through the cosmos!",
    choices: [
      {
        key: 'Q',
        label: 'ABSORB THE DARK POWER',
        result: {
          feedback: '🌑 Darkness flows through you! You become night incarnate!',
          xp: 26,
          survival: 3
        }
      },
      {
        key: 'W',
        label: 'REFLECT THE LIGHT',
        result: {
          feedback: '💫 You become a beacon! Light conquers the eclipse!',
          xp: 18,
          survival: 14
        }
      },
      {
        key: 'E',
        label: 'BALANCE THE FORCES',
        result: {
          feedback: '⚖️ Perfect equilibrium! Light and dark unite within you!',
          xp: 24,
          survival: 9
        }
      }
    ]
  },
  {
    id: 12,
    text: "🔮 CRYSTAL OF INFINITE POSSIBILITY 🔮\nA perfect gem contains every potential future! Touch it and reshape destiny!",
    choices: [
      {
        key: 'Q',
        label: 'SHATTER ALL POSSIBILITIES',
        result: {
          feedback: '💥 Pure chaos! Reality becomes a wild storm of potential!',
          xp: 35,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'CHOOSE ONE PERFECT FUTURE',
        result: {
          feedback: '🎯 Destiny locked! You forge the ideal timeline!',
          xp: 20,
          survival: 15
        }
      },
      {
        key: 'E',
        label: 'MERGE ALL TIMELINES',
        result: {
          feedback: '🌀 Infinite convergence! You become the master of fate!',
          xp: 32,
          survival: 2
        }
      }
    ]
  }
];