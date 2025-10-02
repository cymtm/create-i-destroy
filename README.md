# CREATE.I.DESTROY 🌟

A mystical choice-based web game where your decisions shape reality itself. Navigate ancient trials by making timed decisions that affect your Wisdom (XP) and Fortune (survival) stats.

## 🎮 Play the Game

**Live Game:** [https://cymtm.github.io/create-i-destroy](https://cymtm.github.io/create-i-destroy)

## ✨ Features

- **Timed Decision Making:** Make choices quickly with visual time pressure indicators
- **Character Progression:** Level up and earn skill points as you gain experience
- **Achievement System:** Unlock achievements across 5 tiers (Bronze 🥉, Silver 🥈, Gold 🥇, Legendary 🌟, Mythic 👑)
- **Multiple Difficulty Levels:** From Novice to Legendary, choose your challenge
- **Tutorial System:** Learn the game mechanics with an interactive tutorial
- **Rich Scenarios:** Navigate 40+ unique mystical scenarios with meaningful choices
- **Statistics Tracking:** View detailed analytics about your playstyle and progress

## 🚀 Quick Start

### Play Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cymtm/create-i-destroy.git
   cd create-i-destroy
   ```

2. **Install dependencies:**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Serve the game:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8000`

## 🛠️ Development

### Prerequisites

- Node.js 20+
- pnpm 10.13.1+
- Python 3 (for local server)

### Setup

```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install
```

### Build & Test

```bash
# Build the TypeScript package
pnpm run build

# Run linting
pnpm run lint

# Run tests
pnpm --filter app test
```

### Project Structure

```
create-i-destroy/
├── index.html              # Main game entry point
├── styles.css              # Game styling
├── files/
│   └── js/                 # Game JavaScript modules
│       ├── game.js         # Core game logic
│       ├── scenarios.js    # Game scenarios
│       ├── achievements.js # Achievement system
│       ├── tutorial.js     # Tutorial system
│       ├── ui.js          # UI rendering
│       └── utils.js       # Utility functions
├── packages/
│   └── app/               # TypeScript package
│       ├── src/           # TypeScript source
│       ├── tests/         # Vitest tests
│       └── dist/          # Compiled output
└── .github/
    └── workflows/         # CI/CD workflows
```

## 📦 Deployment

The game is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment Workflow

1. **Automatic Deployment:** Push to `main` branch triggers deployment
2. **Manual Deployment:** Use GitHub Actions "Deploy to GitHub Pages" workflow
3. **Pre-deployment Checks:**
   - TypeScript build succeeds
   - All tests pass
   - Code passes linting

### Manual Deployment Steps

If you need to deploy manually:

1. Ensure all tests pass: `pnpm --filter app test`
2. Ensure build succeeds: `pnpm run build`
3. Ensure linting passes: `pnpm run lint`
4. Push to main branch or trigger workflow manually

### GitHub Pages Configuration

The repository is configured to deploy from GitHub Actions:
- **Settings → Pages → Source:** GitHub Actions
- **Custom Domain:** (optional) Configure in repository settings

## 🎯 How to Play

1. **Choose Your Difficulty:** Select from Novice, Adept, Master, or Legendary
2. **Read the Scenario:** Each trial presents a mystical challenge
3. **Make Your Choice:** Press Q, W, or E to decide quickly
4. **Watch the Timer:** The progress bar shows your remaining time
5. **Track Your Progress:** Monitor Wisdom (⚡) and Fortune (🏺) stats
6. **Unlock Achievements:** Complete challenges to earn achievements

## 🏆 Achievement Tiers

- 🥉 **Bronze:** Entry-level achievements
- 🥈 **Silver:** Intermediate accomplishments
- 🥇 **Gold:** Advanced achievements
- 🌟 **Legendary:** Expert-level challenges
- 👑 **Mythic:** Ultimate achievements

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. All tests pass: `pnpm --filter app test`
2. Code passes linting: `pnpm run lint`
3. Build succeeds: `pnpm run build`
4. Manually test the game works correctly

## 📄 License

MIT

## 🙏 Acknowledgments

Built with vanilla JavaScript, HTML5, and CSS3. No external runtime dependencies required.

