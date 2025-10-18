# Security Policy

## Overview

CREATE.I.DESTROY is a client-side browser game that prioritizes user security and data protection. This document outlines our security practices and how to report security vulnerabilities.

## Security Practices

### Data Storage

All game data is stored locally in the browser using `localStorage`:

- **Save Data**: Game progress, character stats, and achievements
- **Settings**: User preferences and game settings
- **Tutorial Status**: Whether the tutorial has been completed

**Security Measures:**
- All data is validated before being loaded from localStorage
- Type checking ensures data integrity
- Malformed or corrupted data is safely rejected
- No sensitive personal information is collected or stored

### Input Validation

The game implements comprehensive input validation:

1. **Save Data Import**:
   - File size limited to 1MB to prevent DoS attacks
   - JSON structure validation before processing
   - Type checking for all imported fields
   - Safe defaults for missing or invalid data

2. **localStorage Data**:
   - All loaded data is validated against expected types
   - Numeric values are range-checked
   - Invalid difficulty settings default to 'normal'
   - Corrupted save data is safely ignored

3. **User Inputs**:
   - Keyboard inputs are filtered to expected keys (Q, W, E, Escape)
   - Settings values are clamped to valid ranges
   - Volume settings limited to 0-100 range

### Content Security

The game is designed with security in mind:

- **No External Dependencies**: Pure vanilla JavaScript with no runtime dependencies
- **No Network Requests**: All game logic runs entirely client-side (except optional font loading)
- **No User-Generated Content**: All game content is static and pre-defined
- **No Eval or Dynamic Code**: No use of `eval()` or `Function()` constructors

### Browser Security Features

We recommend enabling the following Content Security Policy headers when deploying:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:
```

### Privacy

- **No Analytics**: No tracking or analytics scripts
- **No Cookies**: No cookies are set
- **No External Services**: No data is sent to external servers
- **Local Only**: All data stays on the user's device

## Known Security Considerations

### localStorage Limitations

- Data is stored in plain text and accessible to other scripts on the same domain
- Users should be aware that save data can be viewed/modified using browser developer tools
- This is acceptable for a game with no competitive multiplayer or monetary value

### Web Audio API

- Uses Web Audio API for sound effects
- Volume is automatically limited to safe levels (10% base volume)
- Users can control master volume and disable sounds entirely

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it by:

1. **DO NOT** open a public GitHub issue
2. Email the maintainer at the contact listed in the repository
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond within 48 hours and work to address the issue promptly.

## Security Updates

Security updates are released as needed. Users should:

- Use the latest version from the `main` branch
- Check the GitHub repository for security advisories
- Review the CHANGELOG for security-related updates

## Best Practices for Deployment

When deploying CREATE.I.DESTROY:

1. **HTTPS Only**: Always serve the game over HTTPS
2. **CSP Headers**: Implement Content Security Policy headers
3. **Subdomain Isolation**: Consider serving on a dedicated subdomain
4. **Regular Updates**: Keep the codebase updated with latest security patches
5. **Secure Headers**: Implement security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## Security Testing

The codebase undergoes:

- **CodeQL Analysis**: Automated security scanning on every commit
- **ESLint**: Code quality and potential security issue detection
- **Manual Review**: Security-focused code reviews for all changes
- **Input Validation Testing**: Comprehensive tests for data validation

## Acknowledgments

We appreciate the security research community and welcome responsible disclosure of security issues.

## License

This security policy is part of the CREATE.I.DESTROY project and is licensed under the MIT License.

Last Updated: 2025-10-18
