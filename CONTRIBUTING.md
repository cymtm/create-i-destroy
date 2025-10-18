# Contributing to CREATE.I.DESTROY

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project follows a simple code of conduct:

- Be respectful and constructive
- Focus on what is best for the community
- Show empathy towards other contributors
- Accept constructive criticism gracefully

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10.13.1+ (install with `npm install -g pnpm`)
- Python 3 (for local development server)
- Git

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/create-i-destroy.git
   cd create-i-destroy
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/cymtm/create-i-destroy.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Verify setup**:
   ```bash
   pnpm run build
   pnpm run lint
   pnpm --filter app test
   ```

## Development Process

### Making Changes

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation as needed

3. **Test your changes**:
   ```bash
   # Run linter
   pnpm run lint
   
   # Run tests
   pnpm --filter app test
   
   # Build to verify no errors
   pnpm run build
   
   # Manual testing
   python3 -m http.server 8000
   # Navigate to http://localhost:8000
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug with scenario loading"
   ```

### Commit Message Format

Use conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add new achievement tier
fix: resolve timer not starting issue
docs: update README with new features
test: add tests for utility functions
```

## Code Standards

### JavaScript Style

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Add JSDoc comments to all functions

**Example:**
```javascript
/**
 * Calculates the adjusted XP based on difficulty and skills
 * @param {number} baseXP - Base XP value from choice
 * @param {string} difficulty - Current difficulty level
 * @param {Object} skills - Player skill levels
 * @returns {number} Adjusted XP value
 */
function calculateAdjustedXP(baseXP, difficulty, skills) {
  const multiplier = difficultySettings[difficulty].xpMultiplier;
  const skillBonus = skills.wisdom * 0.1;
  return Math.round(baseXP * multiplier * (1 + skillBonus));
}
```

### File Organization

- Keep files under 1000 lines
- One module per file
- Export only what's needed
- Use named exports

### Constants

- Use UPPER_SNAKE_CASE for constants
- Group related constants together
- Add comments explaining purpose

```javascript
// Timer configuration
const TIMER_INTERVAL_MS = 100;
const TIMER_START_DELAY_MS = 100;
const URGENT_TIMER_THRESHOLD = 40;
```

### Error Handling

Always add proper error handling:

```javascript
try {
  const data = JSON.parse(savedData);
  // Process data
} catch (error) {
  console.error('Error loading data:', error);
  // Use safe defaults
}
```

## Testing Requirements

### Unit Tests

Add tests for all new utility functions:

```javascript
import { describe, it, expect } from 'vitest';

describe('newFunction', () => {
  it('should handle normal case', () => {
    expect(newFunction(5)).toBe(10);
  });
  
  it('should handle edge case: zero', () => {
    expect(newFunction(0)).toBe(0);
  });
  
  it('should throw error for invalid input', () => {
    expect(() => newFunction(null)).toThrow();
  });
});
```

### Manual Testing Checklist

Before submitting:

- [ ] Game loads without errors
- [ ] Tutorial works (or can be skipped)
- [ ] Scenarios display correctly
- [ ] Choices can be made with keyboard and mouse
- [ ] Timer works and is visible
- [ ] Stats update correctly
- [ ] Settings modal opens and works
- [ ] Chronicles modal opens and works
- [ ] Game can be restarted
- [ ] Sound effects play (if enabled)
- [ ] No console errors

## Submitting Changes

### Pull Request Process

1. **Update from upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Go to GitHub and click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Add screenshots for UI changes
   - Link related issues

### Pull Request Guidelines

**Title**: Use conventional commit format
```
feat: add new mystical scenario pack
fix: resolve achievement unlock bug
```

**Description**: Should include:
- What changed and why
- How to test the changes
- Screenshots (for UI changes)
- Breaking changes (if any)
- Related issues

**Example PR Description**:
```markdown
## Changes
Added 10 new scenarios with cosmic themes.

## Testing
1. Start new game
2. Play through scenarios
3. Verify new scenarios appear
4. Check that choices work correctly

## Screenshots
[Screenshot of new scenario]

Fixes #123
```

### Review Process

- Maintainers will review your PR
- Address any feedback promptly
- Be open to suggestions
- Update your PR as needed
- Once approved, it will be merged

## Reporting Bugs

### Before Submitting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Game version: [e.g., v1.0.0]

**Console errors**
Any error messages from browser console.
```

## Suggesting Enhancements

### Enhancement Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
Clear description of what you want.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other context or screenshots.
```

## Areas for Contribution

### High Priority

- [ ] New scenarios and choices
- [ ] Bug fixes
- [ ] Performance improvements
- [ ] Browser compatibility fixes
- [ ] Accessibility improvements

### Medium Priority

- [ ] New achievements
- [ ] UI/UX enhancements
- [ ] Documentation improvements
- [ ] Test coverage expansion

### Nice to Have

- [ ] New sound effects
- [ ] Visual themes
- [ ] Internationalization
- [ ] PWA features

## Questions?

- Check existing issues and discussions
- Read the [README](README.md)
- Review [ARCHITECTURE.md](ARCHITECTURE.md)
- Ask in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to CREATE.I.DESTROY! 🌟
