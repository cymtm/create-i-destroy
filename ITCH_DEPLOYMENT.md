# Itch.io Deployment Guide for CREATE.I.DESTROY

This guide will help you deploy CREATE.I.DESTROY to Itch.io.

## Prerequisites

1. An Itch.io account (create one at https://itch.io)
2. The game files prepared and tested locally
3. Cover art and screenshots (recommended)

## Preparing the Deployment Package

### Method 1: Using the Build Script (Recommended)

Run the build script to create a deployment-ready package:

```bash
pnpm run deploy:build
```

This will create a `dist/` directory with all necessary files optimized for deployment.

### Method 2: Manual Packaging

1. Create a new directory for deployment:
   ```bash
   mkdir -p create-i-destroy-itch
   ```

2. Copy the essential files:
   ```bash
   cp index.html create-i-destroy-itch/
   cp styles.css create-i-destroy-itch/
   cp favicon.svg create-i-destroy-itch/
   cp -r files create-i-destroy-itch/
   ```

3. Create a ZIP file:
   ```bash
   cd create-i-destroy-itch
   zip -r ../create-i-destroy-web.zip .
   ```

## Uploading to Itch.io

### Step 1: Create a New Project

1. Go to https://itch.io/dashboard
2. Click "Create new project"
3. Fill in the project details:
   - **Title**: CREATE.I.DESTROY
   - **Project URL**: choose a unique URL (e.g., `create-i-destroy`)
   - **Short description**: "A mystical choice-based game where your decisions shape reality itself"
   - **Classification**: Game
   - **Kind of project**: HTML

### Step 2: Configure Project Settings

#### Pricing
- Set to "No payments" for free game
- Or set a price/minimum price if you want to monetize

#### Details
- **Release status**: Released
- **Genre**: Choose appropriate genres:
  - Adventure
  - Interactive Fiction
  - Visual Novel
- **Tags**: Add relevant tags:
  - `choices-matter`
  - `mystical`
  - `decision-making`
  - `browser`
  - `story-rich`
  - `short`
  - `singleplayer`

### Step 3: Upload the Game

1. In the "Upload files" section:
   - Upload your ZIP file (`create-i-destroy-web.zip`)
   - Check "This file will be played in the browser"
   - Set the viewport dimensions:
     - Width: 1280
     - Height: 720
   - Check "Mobile friendly" (optional, game works on mobile)
   - Check "Embed in page"
   - Frame options: "Fullscreen button"

2. Save the upload

### Step 4: Add Media

#### Cover Image (Required)
- Dimensions: 630×500 pixels recommended
- Use a captivating screenshot or logo
- Should represent the game's mystical theme

#### Screenshots (Recommended)
Add 3-5 screenshots showing:
1. Tutorial screen
2. Main gameplay (scenario with choices)
3. Character progression/stats screen
4. Achievement screen
5. Different difficulty modes

#### GIF/Video (Optional but recommended)
- Short gameplay clip (10-30 seconds)
- Shows the choice-making mechanic
- Demonstrates the timer and feedback system

### Step 5: Write Description

Use this template or customize:

```markdown
# 🌟 CREATE.I.DESTROY

**Navigate ancient trials where your choices shape reality itself!**

## About the Game

CREATE.I.DESTROY is an immersive browser-based narrative game that challenges you to make critical decisions under time pressure. Every choice you make affects your character's wisdom and fortune, determining your path through mystical scenarios.

## ✨ Features

- **Dynamic Choice System**: Use Q, W, or E to make quick decisions
- **Character Progression**: Level up and gain experience
- **Dual Stats**: Balance Wisdom (⚡) and Fortune (🏺)
- **Achievement System**: Unlock 30+ achievements across 5 tiers
- **4 Difficulty Levels**: From Novice to Legendary
- **Beautiful UI**: Mystical theme with animated backgrounds
- **Sound Effects**: Immersive audio feedback

## 🎮 How to Play

1. Read each mystical scenario carefully
2. Choose your path using Q, W, or E keys before time runs out
3. Balance wisdom and fortune to progress
4. Unlock achievements and level up your character
5. Try different difficulties for new challenges!

## ⏱️ Playtime

- Single session: 5-15 minutes
- Full achievement completion: 2-3 hours
- Highly replayable with multiple strategies

## 🎯 Perfect For

- Fans of choice-based games
- Players who enjoy decision-making under pressure
- Story-driven game enthusiasts
- Quick gaming sessions
- Achievement hunters

**Ready to shape your destiny? Play now!**
```

### Step 6: Community Settings

- Enable comments if you want player feedback
- Set up discussion forums (optional)
- Configure rating and review settings

### Step 7: Launch

1. Review all settings
2. Click "Save" at the bottom
3. Set visibility to "Public" when ready to launch
4. Share your game link!

## Post-Launch

### Marketing Tips

1. **Share on social media**:
   - Twitter/X with #gamedev #indiegame #itchio
   - Reddit: r/WebGames, r/incremental_games, r/IndieGaming
   - Discord communities

2. **Gather feedback**:
   - Monitor comments and ratings
   - Update based on player suggestions
   - Fix any reported bugs quickly

3. **Update regularly**:
   - Add new scenarios
   - Expand achievement system
   - Improve based on analytics

### Analytics

Itch.io provides analytics:
- Page views
- Downloads/plays
- Average session time
- Player ratings
- Comments and feedback

Monitor these to understand player engagement.

## Updating the Game

When you need to update:

1. Make changes to your local files
2. Test thoroughly
3. Create a new ZIP package
4. Upload to Itch.io (it will version automatically)
5. Add changelog notes in the project description

## Troubleshooting

### Game doesn't load
- Check that index.html is at the root of your ZIP
- Ensure all file paths are relative (no absolute paths)
- Verify JavaScript console for errors

### Assets not loading
- Check file paths in HTML/CSS/JS
- Ensure all referenced files are included in ZIP
- Use relative paths only

### Sound not working
- Some browsers block autoplay audio
- Players may need to interact with page first
- Provide mute/unmute option

### Mobile issues
- Test on actual mobile devices
- Consider touch controls in addition to keyboard
- Adjust viewport settings if needed

## Support

For technical issues with the game itself:
- GitHub: https://github.com/cymtm/create-i-destroy/issues

For Itch.io platform issues:
- Itch.io support: https://itch.io/support

---

**Good luck with your launch! 🚀**
