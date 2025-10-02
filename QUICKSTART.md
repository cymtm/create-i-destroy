# Quick Start Guide - CREATE.I.DESTROY

## For Players

### Play Online
Visit our Itch.io page: [Coming Soon]

### Play Locally
1. Download the repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. Start playing!

No installation or build required - it's a pure web game!

## For Developers

### Prerequisites
- Node.js 18+ or compatible
- pnpm 10.13.1 (or npm as alternative)
- Modern web browser
- Python 3 (for local server)

### Quick Setup
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

### Development Workflow
```bash
# Run all validation checks
pnpm run build  # Build TypeScript package
pnpm run lint   # Lint all code
pnpm --filter app test  # Run tests

# Deploy to Itch.io
pnpm run deploy:build    # Create dist/ with optimized files
pnpm run deploy:package  # Create ZIP for upload
```

### Project Structure
```
create-i-destroy/
├── index.html           # Main entry point
├── styles.css           # All game styling
├── favicon.svg          # Browser tab icon
├── files/
│   └── js/
│       ├── game.js      # Core game logic and state
│       ├── scenarios.js # All game scenarios (25+)
│       ├── achievements.js # Achievement system (30+)
│       ├── tutorial.js  # Tutorial overlay system
│       ├── ui.js        # UI rendering functions
│       └── utils.js     # Helper functions
├── packages/
│   └── app/             # TypeScript testing package
│       ├── src/         # Core functionality
│       └── tests/       # Unit tests
└── scripts/
    ├── build-deploy.js  # Build for deployment
    └── package-deploy.js # Create ZIP package
```

## Common Tasks

### Adding New Scenarios
1. Edit `files/js/scenarios.js`
2. Add new scenario object with choices
3. Test in browser
4. Validate with lint: `pnpm run lint`

### Adding New Achievements
1. Edit `files/js/achievements.js`
2. Add achievement with condition function
3. Test by triggering the condition
4. Check achievement unlocks in game

### Modifying UI
1. Edit `styles.css` for styling
2. Edit `files/js/ui.js` for rendering logic
3. Edit `index.html` for structure
4. Test in browser with live reload

### Running Tests
```bash
# Run all tests
pnpm --filter app test

# Watch mode (auto-rerun on changes)
pnpm --filter app test --watch
```

### Linting
```bash
# Lint all files
pnpm run lint

# Lint specific file
npx eslint files/js/game.js
```

## Troubleshooting

### Game doesn't load
- Check browser console for JavaScript errors
- Ensure you're serving via HTTP server, not opening file:// directly
- Clear browser cache and reload

### Dependencies not installing
```bash
# Clear and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build fails
```bash
# Check Node version (need 18+)
node --version

# Reinstall app dependencies
cd packages/app
pnpm install
cd ../..
```

### Tests fail
```bash
# Clean and rebuild
pnpm run build
pnpm --filter app test
```

## Tips for Development

### Hot Reload Development
```bash
# Terminal 1: Serve the game
python3 -m http.server 8000

# Terminal 2: Watch for changes (if using)
# Just refresh browser after edits - no build step needed!
```

### Browser DevTools
- **F12** - Open developer tools
- **Console tab** - View game logs and errors
- **Network tab** - Check file loading
- **Application > Local Storage** - View saved game data

### Testing Scenarios
The game shuffles scenarios, so to test a specific one:
1. Edit `files/js/game.js`
2. Modify scenario selection logic temporarily
3. Test your scenario
4. Revert changes

### Debugging Achievements
Open browser console and check:
```javascript
localStorage.getItem('achievements')
```

To reset achievements:
```javascript
localStorage.clear()
```

## Performance Tips

### Keep it Fast
- Game should load in < 1 second
- Each frame should render quickly
- Avoid heavy animations
- Optimize images if adding any

### Browser Compatibility
Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

## Contributing

### Code Style
- Use ES6 module syntax
- Follow existing code structure
- Add comments for complex logic
- Keep functions small and focused

### Before Submitting PR
1. Run all validation: `pnpm run build && pnpm run lint && pnpm --filter app test`
2. Test manually in browser
3. Check for console errors
4. Verify game still works after changes
5. Update documentation if needed

## Resources

- **Repository**: https://github.com/cymtm/create-i-destroy
- **Issues**: https://github.com/cymtm/create-i-destroy/issues
- **Itch.io Guide**: See ITCH_DEPLOYMENT.md
- **Game Info**: See GAME_INFO.md

## Need Help?

1. Check existing documentation (README.md, ITCH_DEPLOYMENT.md)
2. Search GitHub issues
3. Open new issue with:
   - What you're trying to do
   - What's happening
   - Error messages
   - Browser/OS info

---

**Happy coding! Make it mystical! ✨**
