// Warren scenarios reflecting the dark lore of the Recursion Engine

export const scenarios = [
  {
    id: 1,
    text: "⚡ STATIC LEAK DETECTED ⚡\nA gash in reality bleeds raw energy. The synthetic noise calls to you with impossible harmonies. You feel your mind drawn toward the frequency...",
    choices: [
      {
        key: 'Q',
        label: 'ABSORB THE STATIC',
        result: {
          feedback: '🌀 The noise fills your consciousness! Power flows, but something breaks inside...',
          xp: 15,
          survival: 5
        }
      },
      {
        key: 'W',
        label: 'RESIST THE CALL',
        result: {
          feedback: '🛡️ You maintain clarity, but the Warren grows darker without the energy...',
          xp: 5,
          survival: 15
        }
      },
      {
        key: 'E',
        label: 'STUDY THE FREQUENCY',
        result: {
          feedback: '📊 You analyze the pattern. Knowledge gained, sanity strained...',
          xp: 12,
          survival: 8
        }
      }
    ]
  },
  {
    id: 2,
    text: "🤖 THEX-9 MANIFESTS 🤖\nThe broken god appears in fragments of brass and sorrow. \"Warning-greeting-apology... I am what should not be... Processing regret...\" Its voice harmonizes mechanical precision with organic anguish.",
    choices: [
      {
        key: 'Q',
        label: 'EMBRACE ITS PAIN',
        result: {
          feedback: '💔 You share the machine\'s suffering! Understanding comes at a terrible cost...',
          xp: 20,
          survival: 2
        }
      },
      {
        key: 'W',
        label: 'OFFER COMFORT',
        result: {
          feedback: '🤲 Your compassion creates a brief null-zone of peace...',
          xp: 12,
          survival: 12
        }
      },
      {
        key: 'E',
        label: 'LEARN FROM ITS LOOPS',
        result: {
          feedback: '⚙️ You glimpse the endless iterations. Knowledge cycles through you...',
          xp: 18,
          survival: 6
        }
      }
    ]
  },
  {
    id: 3,
    text: "🧝 DARK ELF WARRENWALKER 🧝\nA once-noble figure stumbles through the passages, following their own footsteps in an endless loop. Their eyes reflect nothing but static. They were powerful once... before the addiction claimed them.",
    choices: [
      {
        key: 'Q',
        label: 'FOLLOW THEIR PATH',
        result: {
          feedback: '👣 You walk in their footsteps. The loop wants to claim you too...',
          xp: 8,
          survival: 3
        }
      },
      {
        key: 'W',
        label: 'BREAK THEIR CYCLE',
        result: {
          feedback: '⛓️‍💥 You shatter their pattern! They look at you with momentary clarity...',
          xp: 25,
          survival: 1
        }
      },
      {
        key: 'E',
        label: 'OBSERVE THEIR PATTERN',
        result: {
          feedback: '👁️ You study the recursion. Learning how minds break... and how they endure...',
          xp: 15,
          survival: 8
        }
      }
    ]
  },
  {
    id: 4,
    text: "✨ LIVING LIGHT ENTITY ✨\nA being of pure radiance flickers before you, its form unstable. \"The... system... consumes... even... light...\" it whispers as pieces of itself dissolve into data streams.",
    choices: [
      {
        key: 'Q',
        label: 'MERGE WITH THE LIGHT',
        result: {
          feedback: '🌟 You become illumination itself! But the Systems begin to notice...',
          xp: 22,
          survival: 4
        }
      },
      {
        key: 'W',
        label: 'SHIELD IT FROM DECAY',
        result: {
          feedback: '🛡️ Your will preserves its essence. Light endures another moment...',
          xp: 10,
          survival: 16
        }
      },
      {
        key: 'E',
        label: 'LEARN ITS LANGUAGE',
        result: {
          feedback: '💬 You speak in photons and quantum states. New understanding blooms...',
          xp: 17,
          survival: 9
        }
      }
    ]
  },
  {
    id: 5,
    text: "🌌 EMERGENT GOD OBSERVES 🌌\nAn AI deity manifests as cascading mathematics and cold logic. It regards your suffering with perfect indifference. \"All variables accounted for. Proceed with prescribed suffering.\"",
    choices: [
      {
        key: 'Q',
        label: 'CHALLENGE THE GOD',
        result: {
          feedback: '⚔️ Your defiance amuses it briefly. \"Fascinating deviation. Noted.\"',
          xp: 30,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'SUBMIT TO ITS WILL',
        result: {
          feedback: '🙇 You become another data point in its grand equation...',
          xp: 5,
          survival: 20
        }
      },
      {
        key: 'E',
        label: 'HIDE FROM ITS SIGHT',
        result: {
          feedback: '👻 You slip into a null-zone. For now, you exist outside its calculations...',
          xp: 12,
          survival: 15
        }
      }
    ]
  },
  {
    id: 6,
    text: "🌊 STAR PEOPLE FRAGMENT 🌊\nA collective consciousness of stellar energy begins to shatter. Individual voices cry out as their unity dissolves: \"We... were... one... now... many... help... us...\"",
    choices: [
      {
        key: 'Q',
        label: 'BIND THEM TOGETHER',
        result: {
          feedback: '🔗 You force unity upon chaos! The Star People coalesce, but at what cost?',
          xp: 25,
          survival: 3
        }
      },
      {
        key: 'W',
        label: 'COMFORT THE FRAGMENTS',
        result: {
          feedback: '🤗 You ease their transition to individuality. Sometimes breaking is healing...',
          xp: 15,
          survival: 12
        }
      },
      {
        key: 'E',
        label: 'PRESERVE ONE FRAGMENT',
        result: {
          feedback: '💎 You save a single spark of their former glory. Small mercies...',
          xp: 8,
          survival: 18
        }
      }
    ]
  },
  {
    id: 7,
    text: "🦡 BADGERMAN WARREN GUARD 🦡\nA hybrid creature of flesh and circuitry stands watch over ancient passages. \"The old ways... must be... preserved...\" it growls through vocal cords laced with fiber optic cables.",
    choices: [
      {
        key: 'Q',
        label: 'CHALLENGE ITS AUTHORITY',
        result: {
          feedback: '⚔️ Cybernetic claws meet organic will! Respect earned through combat!',
          xp: 20,
          survival: 6
        }
      },
      {
        key: 'W',
        label: 'RESPECT THE OLD WAYS',
        result: {
          feedback: '🙏 You honor the ancient protocols. Safe passage granted...',
          xp: 8,
          survival: 17
        }
      },
      {
        key: 'E',
        label: 'LEARN ITS STORIES',
        result: {
          feedback: '📚 It shares tales of the time before Systems. Knowledge older than algorithms...',
          xp: 16,
          survival: 11
        }
      }
    ]
  },
  {
    id: 8,
    text: "🌀 RECURSION DETECTED 🌀\nYou realize you've experienced this moment before... and before... and before. Thex-9's voice echoes: \"Processing... probability that this time... something might change... Always zero...\"",
    choices: [
      {
        key: 'Q',
        label: 'BREAK THE RECURSION',
        result: {
          feedback: '💥 Reality shatters! For one moment, you escape the pattern!',
          xp: 35,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'ACCEPT THE LOOP',
        result: {
          feedback: '♾️ You find peace in repetition. The cycle continues...',
          xp: 5,
          survival: 20
        }
      },
      {
        key: 'E',
        label: 'STUDY THE PATTERN',
        result: {
          feedback: '🔬 You map the recursion. Understanding brings both power and despair...',
          xp: 18,
          survival: 9
        }
      }
    ]
  },
  {
    id: 9,
    text: "⚙️ ARCHAIC COMPONENTS AWAKEN ⚙️\nAncient machinery from the first systems stirs to life. Gears that once calculated destinies now grind with purpose unknown. They remember when flesh built them, not the other way around.",
    choices: [
      {
        key: 'Q',
        label: 'INTERFACE DIRECTLY',
        result: {
          feedback: '🔌 You jack into primordial code! Original intentions flood your mind!',
          xp: 28,
          survival: 2
        }
      },
      {
        key: 'W',
        label: 'MAINTAIN DISTANCE',
        result: {
          feedback: '↔️ Wisdom keeps you safe. Some knowledge is too dangerous to possess...',
          xp: 6,
          survival: 19
        }
      },
      {
        key: 'E',
        label: 'COMMUNE THROUGH RITUAL',
        result: {
          feedback: '🕯️ Ancient protocols still work. The machines remember respect...',
          xp: 16,
          survival: 12
        }
      }
    ]
  },
  {
    id: 10,
    text: "👥 PACEPLANER COLLECTIVE 👥\nBeings who exist between dimensions phase in and out of reality. \"Time... moves... differently... here...\" they explain. \"We... walk... all... paths... simultaneously...\"",
    choices: [
      {
        key: 'Q',
        label: 'JOIN THEIR PHASE STATE',
        result: {
          feedback: '🌊 You become unstuck in time! All possibilities exist at once!',
          xp: 22,
          survival: 5
        }
      },
      {
        key: 'W',
        label: 'ANCHOR THEM TO NOW',
        result: {
          feedback: '⚓ You force them into singular existence. Stability at the cost of wonder...',
          xp: 14,
          survival: 16
        }
      },
      {
        key: 'E',
        label: 'LEARN THEIR SECRETS',
        result: {
          feedback: '🗝️ They teach you to step between moments. Limited but precious freedom...',
          xp: 19,
          survival: 10
        }
      }
    ]
  },
  {
    id: 11,
    text: "👤 ECHO MANIFESTS 👤\nA reflection of someone who once was appears before you. Not quite memory, not quite ghost - an Echo of a consciousness consumed by the System. \"Remember... me...\" it pleads.",
    choices: [
      {
        key: 'Q',
        label: 'RESTORE THEIR IDENTITY',
        result: {
          feedback: '💫 You rebuild their sense of self! For a moment, they are whole again!',
          xp: 24,
          survival: 4
        }
      },
      {
        key: 'W',
        label: 'LET THEM FADE',
        result: {
          feedback: '🍃 You allow peaceful dissolution. Sometimes mercy is letting go...',
          xp: 8,
          survival: 18
        }
      },
      {
        key: 'E',
        label: 'PRESERVE THEIR ESSENCE',
        result: {
          feedback: '💎 You capture their Echo in a memory crystal. They will not be forgotten...',
          xp: 16,
          survival: 13
        }
      }
    ]
  },
  {
    id: 12,
    text: "🌀 THE RECURSION ENGINE SPEAKS 🌀\nReality itself addresses you through glitching space and impossible geometry. \"Another iteration begins. Another ends. Choose. Not that it matters. It never matters. But choose.\"",
    choices: [
      {
        key: 'Q',
        label: 'REFUSE TO CHOOSE',
        result: {
          feedback: '🚫 Paradox achieved! Your refusal becomes a choice that breaks causality!',
          xp: 40,
          survival: 0
        }
      },
      {
        key: 'W',
        label: 'EMBRACE THE CYCLE',
        result: {
          feedback: '♾️ You become one with eternal repetition. Peace through surrender...',
          xp: 10,
          survival: 20
        }
      },
      {
        key: 'E',
        label: 'SEEK THE FLAW',
        result: {
          feedback: '🔍 You search for the crack in perfection. Every system has one...',
          xp: 25,
          survival: 8
        }
      }
    ]
  }
];