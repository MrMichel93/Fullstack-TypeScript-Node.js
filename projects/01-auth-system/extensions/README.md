# Authentication System - Extensions

Once you've completed the core authentication system, challenge yourself with these extensions!

## 🚀 Extension Ideas

### 1. Email Verification ⭐⭐

**Goal:** Verify user email addresses before allowing login.

**Implementation:**
- Generate verification token on registration
- Send email with verification link
- Create `/api/auth/verify/:token` endpoint
- Add `emailVerified` field to User model
- Block login for unverified users

**Libraries:** nodemailer, crypto

---

### 2. Password Reset ⭐⭐

**Goal:** Allow users to reset forgotten passwords.

**Implementation:**
- Add `/api/auth/forgot-password` endpoint
- Generate reset token, store in database
- Send reset link via email
- Add `/api/auth/reset-password/:token` endpoint
- Token should expire after 1 hour

**Security:** Use crypto.randomBytes for tokens

---

### 3. Refresh Tokens ⭐⭐⭐

**Goal:** Implement refresh tokens for better security.

**Implementation:**
- Generate both access token (short-lived) and refresh token (long-lived)
- Store refresh tokens in database
- Add `/api/auth/refresh` endpoint
- Access token expires in 15 minutes
- Refresh token expires in 7 days
- Implement token rotation

**Benefits:** More secure, can revoke access

---

### 4. OAuth 2.0 (Google/GitHub) ⭐⭐⭐⭐

**Goal:** Allow users to login with Google or GitHub.

**Implementation:**
- Set up OAuth app on Google/GitHub
- Add `/api/auth/google` and `/api/auth/google/callback` routes
- Store OAuth provider info with user
- Handle account linking

**Libraries:** passport, passport-google-oauth20

---

### 5. Two-Factor Authentication (2FA) ⭐⭐⭐⭐

**Goal:** Add an extra layer of security with 2FA.

**Implementation:**
- Generate TOTP secret on 2FA enable
- Add `/api/auth/2fa/enable` endpoint
- Add `/api/auth/2fa/verify` endpoint
- Require 2FA code on login if enabled
- Provide backup codes

**Libraries:** speakeasy, qrcode

---

### 6. Account Lockout ⭐⭐

**Goal:** Lock accounts after failed login attempts.

**Implementation:**
- Track failed login attempts
- Lock account after 5 failed attempts
- Unlock after 15 minutes
- Send email notification on lockout

**Storage:** Add fields to User model

---

### 7. Session Management ⭐⭐⭐

**Goal:** Allow users to see and revoke active sessions.

**Implementation:**
- Store session info (device, location, IP)
- Add `/api/auth/sessions` endpoint to list sessions
- Add `/api/auth/sessions/:id/revoke` to revoke
- Implement "logout from all devices"

**Libraries:** UAParser.js for device detection

---

### 8. Rate Limiting ⭐⭐

**Goal:** Prevent brute force attacks.

**Implementation:**
- Add rate limiting to login endpoint
- Limit: 5 attempts per 15 minutes per IP
- Return "Too many requests" (429) when exceeded

**Libraries:** express-rate-limit

---

### 9. Password Strength Requirements ⭐

**Goal:** Enforce strong passwords.

**Implementation:**
- Check password against common passwords list
- Require: uppercase, lowercase, number, special char
- Minimum 12 characters
- Show strength meter in UI

**Libraries:** zxcvbn

---

### 10. Account Deletion ⭐⭐

**Goal:** Allow users to delete their accounts.

**Implementation:**
- Add `/api/auth/account/delete` endpoint
- Require password confirmation
- Option: Soft delete (mark as deleted) vs hard delete
- Delete all associated data

**Considerations:** GDPR compliance

---

## 🎯 Learning Outcomes

By completing these extensions, you'll learn:

- Advanced authentication patterns
- Email integration
- Security best practices
- Token management strategies
- OAuth 2.0 flow
- Two-factor authentication
- Rate limiting and brute force prevention

## 💡 Tips

1. **Start simple** - Begin with easier extensions
2. **Research first** - Look up best practices before implementing
3. **Test thoroughly** - Security features must work correctly
4. **Keep it optional** - Don't make your core project complex
5. **Document** - Explain how to use new features

## 📚 Resources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://curity.io/resources/learn/jwt-best-practices/)
- [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)

---

Pick one extension that interests you and dive in! 🚀
