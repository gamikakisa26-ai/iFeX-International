import crypto from 'crypto';

// Single-admin auth: the password lives in server/.env (ADMIN_PASSWORD).
// On successful login we mint a random session token held in memory —
// this is intentionally lightweight for a single-operator admin panel.
// For multi-admin or production-hardened auth, swap this for a real
// user table + hashed passwords + JWT/session store.

const activeTokens = new Map(); // token -> expiry timestamp
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function verifyPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Constant-time comparison to avoid timing attacks
  const a = Buffer.from(String(password));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function issueToken() {
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.set(token, Date.now() + TOKEN_TTL_MS);
  return token;
}

export function revokeToken(token) {
  activeTokens.delete(token);
}

export function isTokenValid(token) {
  if (!token) return false;
  const expiry = activeTokens.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    activeTokens.delete(token);
    return false;
  }
  return true;
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!isTokenValid(token)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in again.' });
  }
  next();
}
