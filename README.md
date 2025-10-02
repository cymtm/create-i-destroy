# CREATE.I.DESTROY 🌟

A mystical choice-based web game where your decisions shape reality itself!

## 🎮 About the Game

**CREATE.I.DESTROY** is an immersive browser-based narrative game that challenges players to make critical decisions under time pressure. Navigate through ancient trials, balance wisdom and fortune, and unlock achievements as you progress through mystical scenarios.

### ✨ Key Features

- **🎯 Dynamic Choice System**: Make decisions using Q, W, or E keys
- **⏰ Time Pressure Mechanics**: Each choice has a countdown timer
- **📈 Character Progression**: Level up and gain experience through your choices
- **⚖️ Dual Stats System**:
  - **⚡ Wisdom**: Represents knowledge and power
  - **🏺 Fortune**: Represents survival and luck
- **🏆 Achievement System**: Unlock achievements across 5 tiers (Bronze 🥉, Silver 🥈, Gold 🥇, Legendary 🌟, Mythic 👑)
- **⚔️ Four Difficulty Levels**:
  - 🟢 Novice (10s per choice)
  - 🟡 Adept (7s per choice)
  - 🟠 Master (5s per choice)
  - 🔴 Legendary (3s per choice)
- **📊 Detailed Statistics**: Track your playstyle and progress
- **🎨 Beautiful UI**: Mystical theme with animated backgrounds
- **🔊 Sound Effects**: Immersive audio feedback
- **📚 Tutorial System**: Learn the game mechanics step-by-step

## 🚀 How to Play

### Online (Itch.io)
Visit our Itch.io page to play directly in your browser!

### Local Development
```bash
# Clone the repository
git clone https://github.com/cymtm/create-i-destroy.git
cd create-i-destroy

# Install dependencies
pnpm install

# Serve the game locally
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Controls
- **Q, W, E**: Make choices
- **Click buttons**: Navigate menus and UI elements
- **ESC**: Close modals

## 🎯 Game Mechanics

### Wisdom vs Fortune
Each choice presents a balance between wisdom (experience points) and fortune (survival):
- **High Risk**: More wisdom, less fortune
- **Balanced**: Equal wisdom and fortune
- **Safe**: More fortune, less wisdom

### Leveling System
- Gain total wisdom to level up your character
- Each level unlocks new achievements
- Track your progress in the Chronicles

### Combo System
- Make consecutive good choices to build combos
- Higher combos increase your score multiplier
- Breaking combos resets the multiplier

## 🏆 Achievements

Unlock achievements by:
- Making your first choice
- Reaching wisdom/fortune milestones
- Building combo streaks
- Completing difficulty challenges
- And many more secret achievements!

## 🛠️ Technology Stack

- **Frontend**: Pure vanilla JavaScript ES6 modules
- **Styling**: CSS3 with animations
- **Audio**: Web Audio API for sound effects
- **Storage**: LocalStorage for save data
- **Testing**: Vitest for unit tests
- **Build**: TypeScript compilation for app package

## 📦 Project Structure

```
create-i-destroy/
├── index.html              # Main game entry point
├── styles.css              # Game styling
├── files/
│   └── js/
│       ├── game.js         # Core game logic
│       ├── scenarios.js    # Game scenarios
│       ├── achievements.js # Achievement system
│       ├── tutorial.js     # Tutorial system
│       ├── ui.js           # UI rendering
│       └── utils.js        # Utility functions
└── packages/
    └── app/                # TypeScript package for testing
```

## 🧪 Development

### Build & Test
```bash
# Install dependencies
pnpm install

# Build the app package
pnpm run build

# Run tests
pnpm --filter app test

# Lint code
pnpm run lint
```

### Code Quality
- ESLint for code linting
- TypeScript for type safety in tests
- Vitest for unit testing

## 📄 License

MIT License - See LICENSE file for details

## 👥 Credits

**Developed by**: cymtm
**Game Design**: Ancient mystical traditions and cosmic inspiration

## 🌟 Support

If you enjoy CREATE.I.DESTROY:
- ⭐ Star this repository
- 🎮 Share with friends
- 🐛 Report bugs via GitHub issues
- 💡 Suggest features

## 🔮 Future Plans

- More scenarios and endings
- Additional achievements
- Mobile-responsive design improvements
- Sound settings and music tracks
- Leaderboards and score tracking
- Multiple save slots

---

**Ready to shape your destiny? Begin your journey now!** 🚀
