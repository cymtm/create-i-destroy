# Deployment Guide for CREATE.I.DESTROY

This guide provides step-by-step instructions for deploying the game to GitHub Pages.

## Prerequisites

- Repository administrator access
- GitHub Pages enabled for the repository

## Initial GitHub Pages Setup

1. **Navigate to Repository Settings**
   - Go to https://github.com/cymtm/create-i-destroy/settings

2. **Enable GitHub Pages**
   - Click on "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - Save changes

3. **Verify Workflow Permissions**
   - Go to Settings → Actions → General
   - Under "Workflow permissions":
     - Ensure "Read and write permissions" is selected
     - Ensure "Allow GitHub Actions to create and approve pull requests" is checked
   - Save if changes were made

## Deployment Methods

### Automatic Deployment (Recommended)

The game automatically deploys when changes are pushed to the `main` branch:

1. Merge a PR or push directly to `main`
2. GitHub Actions automatically runs the deploy workflow
3. Check the Actions tab to monitor deployment progress
4. Game will be live at: https://cymtm.github.io/create-i-destroy

### Manual Deployment

To manually trigger a deployment:

1. Go to the Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow" button
6. Monitor progress in the Actions tab

## Monitoring Deployments

### Check Workflow Status

1. Go to: https://github.com/cymtm/create-i-destroy/actions
2. Look for recent workflow runs
3. Click on a run to see detailed logs
4. Each deployment includes:
   - Dependency installation
   - TypeScript build
   - Code linting
   - Test execution
   - Pages deployment

### Verify Deployment

1. Visit: https://cymtm.github.io/create-i-destroy
2. Game should load with tutorial
3. Test basic functionality:
   - Tutorial loads/skips correctly
   - Game scenarios appear
   - Stats update on choices
   - UI buttons work (Chronicles, Settings, etc.)

## Troubleshooting

### Deployment Fails

If deployment fails, check:

1. **Build errors**: Review the "Build TypeScript package" step
2. **Test failures**: Review the "Run tests" step
3. **Lint errors**: Review the "Lint code" step
4. **Pages setup**: Ensure GitHub Pages is configured correctly

### Game Not Loading

If the game deploys but doesn't load:

1. Check browser console for JavaScript errors
2. Verify all files are included in deployment artifact
3. Check that file paths are correct (relative, not absolute)
4. Ensure `.gitignore` doesn't exclude necessary files

### Permission Errors

If you see permission errors:

1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Re-run the failed workflow

## CI/CD Pipeline

Every push to `main` and every PR triggers:

1. **CI Workflow** (`ci.yml`)
   - Validates builds
   - Runs linting
   - Executes tests
   - Runs on PR and main branch pushes

2. **Deploy Workflow** (`deploy.yml`)
   - Only runs on main branch pushes
   - Includes all CI checks
   - Deploys to GitHub Pages if all checks pass

## Deployment Checklist

Before merging to main:

- [ ] All tests pass locally: `pnpm --filter app test`
- [ ] Build succeeds locally: `pnpm run build`
- [ ] Lint passes locally: `pnpm run lint`
- [ ] Game loads correctly in browser
- [ ] Manual testing completed (tutorial, choices, UI)

## Custom Domain (Optional)

To use a custom domain:

1. Go to Settings → Pages
2. Enter your custom domain under "Custom domain"
3. Add appropriate DNS records with your domain provider:
   - A records pointing to GitHub's IP addresses, or
   - CNAME record pointing to cymtm.github.io
4. Wait for DNS propagation (can take up to 48 hours)
5. Enable HTTPS once DNS is configured

## Support

For issues or questions:
- Open an issue: https://github.com/cymtm/create-i-destroy/issues
- Check workflow logs in the Actions tab
- Review the README.md for additional information
