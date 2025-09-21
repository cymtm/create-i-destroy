# Create.I.Destroy - Mystical Choice Game

CREATE.I.DESTROY is a mystical choice-based web game built with HTML5, CSS, and JavaScript ES6 modules. Players navigate ancient trials by making timed decisions that affect their Wisdom (XP) and Fortune (survival) stats.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test the Repository
**NEVER CANCEL builds or tests - they complete quickly but set appropriate timeouts to be safe.**

- **Install dependencies**: `pnpm install` -- takes ~10 seconds. Set timeout to 60+ seconds.
- **Build the app package**: `pnpm run build` -- takes ~6 seconds. Set timeout to 120+ seconds. NEVER CANCEL.
- **Run tests**: `pnpm --filter app test` -- takes ~5 seconds. Set timeout to 120+ seconds. NEVER CANCEL.
- **Lint the code**: `pnpm run lint` -- takes ~6 seconds. Set timeout to 120+ seconds.

### Run the Web Game
- **ALWAYS install dependencies first**: Run `pnpm install` before serving the game.
- **Serve the game**: `python3 -m http.server 8000` (from repository root)
- **Access the game**: Navigate to `http://localhost:8000`
- **Game loads in phases**: First shows loading screen "AWAKENING THE ANCIENT SPIRITS...", then may show tutorial overlay or main game.

### Key Directories and Files
- **`index.html`**: Main game entry point
- **`files/js/`**: All game JavaScript modules
  - `game.js`: Core game logic and state management
  - `scenarios.js`: Game scenarios and choice definitions
  - `achievements.js`: Achievement system
  - `tutorial.js`: Tutorial system
  - `ui.js`: UI rendering functions
  - `utils.js`: Utility functions
- **`styles.css`**: Game styling
- **`packages/app/`**: TypeScript package for testing core functionality
  - `src/`: TypeScript source files
  - `tests/`: Vitest test files
  - `dist/`: Compiled JavaScript output

## Validation Requirements

### Manual Game Testing
**ALWAYS manually validate changes by playing through the game scenarios:**

1. **Start the server**: `python3 -m http.server 8000`
2. **Load the game**: Navigate to `http://localhost:8000`
3. **Test tutorial system**: Either complete the tutorial or skip it
4. **Test UI interactions**:
   - Click "📜 Chronicles" button to open stats modal
   - Click "⚙️ Settings" button to open settings modal
   - Test difficulty selector dropdown
   - Try "🔄 Begin Anew" restart functionality
5. **Test game mechanics**: 
   - If the game loads past the tutorial, try pressing Q, W, or E keys to make choices
   - Verify that Wisdom and Fortune stats update
   - Check that choices affect the progression
6. **Take a screenshot** of the working game to document the state

### Pre-commit Validation
**Always run before committing changes:**
- `pnpm run build` -- Must pass without errors. Takes ~6 seconds.
- `pnpm run lint` -- Must pass (warnings are acceptable). Takes ~6 seconds.
- `pnpm --filter app test` -- All tests must pass. Takes ~5 seconds.
- **Manual game test** -- Game must load and basic UI must be functional.

## Build System and Dependencies

### Package Management
- **Primary**: Uses `pnpm` for dependency management (packageManager specified as pnpm@10.13.1)
- **Alternative**: Can use `npm` but pnpm is preferred for consistency
- **Install pnpm globally**: `npm install -g pnpm`

### Project Structure
- **Monorepo**: Uses pnpm workspaces with packages in `packages/` directory
- **Main package**: `packages/app` contains TypeScript code with tests
- **Game files**: Located directly in repository root (`files/js/`, `index.html`, `styles.css`)

### Dependencies
- **Development**: ESLint for linting, TypeScript for the app package, Vitest for testing
- **Runtime**: Pure vanilla JavaScript ES6 modules, no external runtime dependencies
- **Browser compatibility**: Uses modern JavaScript features (ES6 modules, optional chaining)

## Common Issues and Troubleshooting

### JavaScript Syntax Errors
- **Check for duplicate functions**: The codebase previously had duplicate `hideStats()` function definitions
- **Validate syntax**: Use `node --check files/js/[filename].js` to check individual files
- **ESLint helps**: The linter catches most syntax issues

### Game Loading Issues
- **Loading screen stuck**: Game may stay on "AWAKENING THE ANCIENT SPIRITS..." - this is normal initially
- **Missing tutorial**: If tutorial doesn't appear, check browser console for JavaScript errors
- **UI not responding**: Ensure all JavaScript modules load correctly (check network tab)

### Build Failures
- **Missing src files**: The `packages/app/src/` directory must contain `core.ts`, `types.ts`, and `index.ts`
- **TypeScript errors**: Check `packages/app/tsconfig.json` for configuration issues
- **pnpm filter issues**: Use `pnpm --filter app [command]` for app-specific commands

## Frequent Validations

### After Making Code Changes
1. **Immediate syntax check**: `node --check files/js/[modified-file].js`
2. **Lint check**: `pnpm run lint`
3. **Build check**: `pnpm run build` 
4. **Test run**: `pnpm --filter app test`
5. **Manual validation**: Serve and test the game UI

### Code Quality Expectations
- **ESLint warnings**: Acceptable (current codebase has 4 warnings for unused variables)
- **ESLint errors**: Must be fixed before committing
- **Test coverage**: All tests in `packages/app/tests/` must pass
- **Manual testing**: Game must load and basic interactions must work

## Development Workflow

### Making Changes to Game Logic
1. **Edit files in `files/js/`**: Game logic, scenarios, UI, etc.
2. **Test immediately**: Check syntax with Node.js
3. **Serve and test**: Start HTTP server and validate game works
4. **Run full validation**: Build, lint, test, manual verification

### Making Changes to TypeScript Code
1. **Edit files in `packages/app/src/`**: Core functionality and types
2. **Build immediately**: `pnpm run build`
3. **Run tests**: `pnpm --filter app test`
4. **Verify integration**: Ensure game still works if it uses the TypeScript code

### Adding New Features
- **Game content**: Add to appropriate files in `files/js/` (scenarios, achievements, etc.)
- **Core functionality**: Add to `packages/app/src/` with corresponding tests
- **UI elements**: Update `index.html`, `styles.css`, and `files/js/ui.js`
- **Always validate end-to-end**: New features must work in the actual game

## Repository Context
- **Type**: Web-based mystical choice game
- **Target audience**: Players who enjoy decision-based narrative games
- **Key features**: Timed choices, character progression, achievement system, tutorial
- **Technical stack**: Vanilla JavaScript, HTML5, CSS3, TypeScript (for testing)
- **Deployment**: Static web files served via HTTP server

Remember: This is a complete, functional game. Always test your changes by actually playing through scenarios to ensure the user experience remains intact.