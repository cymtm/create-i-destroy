# Pre-Deployment Checklist for Itch.io

Use this checklist before deploying CREATE.I.DESTROY to Itch.io to ensure everything is ready.

## ✅ Code Quality

- [ ] All code changes committed
- [ ] Build passes: `pnpm run build`
- [ ] Linter passes: `pnpm run lint` (warnings OK, no errors)
- [ ] All tests pass: `pnpm --filter app test`
- [ ] No console errors in browser
- [ ] No broken functionality

## ✅ Game Testing

### Core Functionality
- [ ] Game loads without errors
- [ ] Tutorial system works (can complete or skip)
- [ ] Scenarios display correctly
- [ ] Q, W, E keys work for choices
- [ ] Timer countdown works and is visible
- [ ] Feedback shows after each choice
- [ ] Wisdom and Fortune stats update correctly
- [ ] Character level progresses properly

### UI Elements
- [ ] Chronicles button opens stats modal
- [ ] Settings button opens settings modal
- [ ] Begin Anew button restarts game (with confirmation)
- [ ] Difficulty selector changes difficulty
- [ ] Modal close buttons work
- [ ] All tabs in modals work
- [ ] Achievement notifications display

### Persistence
- [ ] Game saves progress to localStorage
- [ ] Stats persist across page reloads
- [ ] Achievements persist
- [ ] Settings persist

### Browser Compatibility
- [ ] Tested on Chrome/Edge
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile browser (optional)

## ✅ Content & Polish

- [ ] All scenarios are complete and tested
- [ ] No typos in scenario text
- [ ] All achievements are reachable
- [ ] Achievement descriptions are clear
- [ ] Tutorial steps are accurate
- [ ] Instructions are clear
- [ ] Favicon displays in browser tab

## ✅ Documentation

- [ ] README.md is complete and accurate
- [ ] ITCH_DEPLOYMENT.md is ready
- [ ] GAME_INFO.md has correct details
- [ ] LICENSE file is present
- [ ] QUICKSTART.md is up to date
- [ ] All GitHub links are correct

## ✅ Build & Package

- [ ] Run: `pnpm run deploy:build`
- [ ] Check dist/ directory has all files
- [ ] Test game from dist/ directory
- [ ] Run: `pnpm run deploy:package`
- [ ] Verify ZIP file created successfully
- [ ] Check ZIP file size (should be ~30-50KB)
- [ ] Extract and test ZIP contents locally

## ✅ Assets Prepared

### Required
- [ ] game files (index.html, styles.css, favicon.svg)
- [ ] JavaScript files (files/js/*.js)
- [ ] Build package (create-i-destroy-itch.zip)

### Recommended for Itch.io
- [ ] Cover image (630×500px)
- [ ] Screenshots (3-5 images showing gameplay)
- [ ] GIF or short video (10-30 seconds)
- [ ] Game description prepared
- [ ] Tags list prepared

### Cover Image Ideas
- Tutorial welcome screen
- Scenario with choices visible
- Character progression screen
- Achievement showcase
- Logo/title with mystical background

### Screenshot Suggestions
1. Tutorial screen showing welcome
2. A dramatic scenario (e.g., "REALITY TEARS APART")
3. Chronicles modal with stats
4. Achievement unlock notification
5. Different difficulty in action

## ✅ Metadata Ready

### Game Information
- [ ] Title: CREATE.I.DESTROY
- [ ] Subtitle: Ancient Trials of Fate
- [ ] Genre: Choice-based Adventure, Interactive Fiction
- [ ] Classification: Game
- [ ] Kind: HTML
- [ ] Price: Free (or set price)

### Description Points
- [ ] Hook sentence about mystical choices
- [ ] Key features list (8-10 bullet points)
- [ ] How to play instructions
- [ ] Playtime estimate
- [ ] Perfect for (target audience)
- [ ] Call to action

### Tags to Use
- [ ] choices-matter
- [ ] mystical
- [ ] decision-making
- [ ] browser
- [ ] story-rich
- [ ] short
- [ ] singleplayer
- [ ] fantasy
- [ ] adventure
- [ ] text-based

## ✅ Final Checks

- [ ] Version number updated to 1.0.0
- [ ] No debug code or console.log statements left
- [ ] No TODO comments in production code
- [ ] All placeholder text replaced
- [ ] All links working and correct
- [ ] Privacy-sensitive data removed
- [ ] No copyrighted material used

## ✅ Launch Preparation

### Before Upload
- [ ] Read ITCH_DEPLOYMENT.md completely
- [ ] Create Itch.io account if needed
- [ ] Prepare cover art and screenshots
- [ ] Write game description
- [ ] Plan launch announcement

### During Upload
- [ ] Upload ZIP file
- [ ] Mark as "played in browser"
- [ ] Set viewport: 1280×720
- [ ] Enable fullscreen button
- [ ] Add cover image
- [ ] Add screenshots
- [ ] Add GIF/video (if ready)
- [ ] Write description
- [ ] Add tags
- [ ] Set price/donation
- [ ] Configure community features

### After Upload
- [ ] Test game on Itch.io directly
- [ ] Check all screenshots display
- [ ] Verify description formatting
- [ ] Test on different browsers
- [ ] Set visibility to Public
- [ ] Share link with friends for testing

## ✅ Post-Launch

- [ ] Monitor comments for bugs
- [ ] Track analytics (views, plays, ratings)
- [ ] Respond to player feedback
- [ ] Plan updates based on feedback
- [ ] Share on social media
- [ ] Add link to README.md

## 🚨 Red Flags - Stop if Any Apply

- ❌ Critical bugs present
- ❌ Game doesn't load
- ❌ Console errors on startup
- ❌ Choices don't work
- ❌ Stats don't update
- ❌ Build fails
- ❌ Tests fail
- ❌ Lint has errors (warnings OK)
- ❌ Can't complete a game session

## 📋 Quick Validation Command

Run this to validate everything:
```bash
pnpm run build && pnpm run lint && pnpm --filter app test && pnpm run deploy:build && pnpm run deploy:package
```

If all pass and game works, you're ready! 🚀

## 📞 Getting Help

If stuck on any item:
1. Check ITCH_DEPLOYMENT.md
2. Check QUICKSTART.md  
3. Search GitHub issues
4. Create new issue with details

---

**Once all items are checked, you're ready to deploy!** ✨

Remember: It's better to delay launch to fix issues than to launch with problems. Quality matters!
