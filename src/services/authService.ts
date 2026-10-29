/**
 * ============================================================
 * JCLS Admin Authentication Service
 * ============================================================
 *
 * Authentication is handled client-side using a hashed password
 * stored in an environment variable. This is appropriate for a
 * static SPA where there is no backend server.
 *
 * SETUP:
 * 1. Set VITE_ADMIN_PASSWORD_HASH in your .env file.
 *    Generate a SHA-256 hash of your desired password at:
 *    https://emn178.github.io/online-tools/sha256.html
 *    or run: echo -n "yourpassword" | sha256sum
 *
 * 2. The default admin username is "admin" (can be changed via
 *    VITE_ADMIN_USERNAME env var).
 *
 * 3. Session expires after 8 hours of inactivity.
 *
 * IMPORTANT: This is a frontend-only auth solution. For production
 * with sensitive data, implement a proper backend API with server-
 * side authentication when adding a database layer.
 */

const SESSION_KEY = 'jcls_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}

/**
 * Simple SHA-256 hash using the Web Crypto API.
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  /**
   * Attempt to log in with the provided username and password.
   * Returns true if credentials match.
   */
  async login(username: string, password: string): Promise<boolean> {
    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const expectedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH || '';

    if (!expectedHash) {
      console.error('[authService] VITE_ADMIN_PASSWORD_HASH is not set. Admin login is disabled.');
      return false;
    }

    const inputHash = await sha256(password);
    const usernameMatch = username.toLowerCase().trim() === expectedUsername.toLowerCase();
    const passwordMatch = inputHash === expectedHash.toLowerCase();

    if (usernameMatch && passwordMatch) {
      const session: AdminSession = {
        authenticated: true,
        expiresAt: Date.now() + SESSION_DURATION_MS
      };
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } catch {
        // sessionStorage may be unavailable
      }
      return true;
    }
    return false;
  },

  /**
   * Check whether the current session is valid and not expired.
   */
  isAuthenticated(): boolean {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw) as AdminSession;
      if (!session.authenticated || Date.now() > session.expiresAt) {
        sessionStorage.removeItem(SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Extend session expiry on activity.
   */
  refreshSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const session = JSON.parse(raw) as AdminSession;
      session.expiresAt = Date.now() + SESSION_DURATION_MS;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  },

  /**
   * Log out the current administrator.
   */
  logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }
};
