/**
 * API client for Jointlly backend.
 * Base URL from VITE_API_URL; tokens stored in localStorage.
 */

const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL;
  return typeof url === "string" && url ? url.replace(/\/$/, "") : "http://127.0.0.1:8000";
};

const TOKEN_KEYS = {
  access: "access_token",
  refresh: "refresh_token",
} as const;

export type BackendRole = "LANDOWNER" | "PROFESSIONAL";

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: BackendRole;
  is_active: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: ApiUser;
}

/** Get stored access token for auth header */
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEYS.access);
}

/** Get stored refresh token */
export function getRefreshToken(): string | null {
  return localStorage.getItem(TOKEN_KEYS.refresh);
}

/** Store tokens in localStorage (call after login/register success) */
export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(TOKEN_KEYS.access, access);
  localStorage.setItem(TOKEN_KEYS.refresh, refresh);
}

/** Clear tokens from localStorage (call on logout) */
export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
}

/** Build Authorization header value for authenticated requests */
export function authHeader(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "detail" in data)
        ? (Array.isArray((data as { detail: unknown }).detail)
            ? (data as { detail: unknown[] }).detail.map((d: unknown) => String(d)).join(", ")
            : String((data as { detail: unknown }).detail))
        : res.statusText || "Request failed";
    if (import.meta.env.DEV) console.warn("[API] Error", res.status, res.url, data);
    throw new Error(message);
  }

  return data as T;
}

const isDev = import.meta.env.DEV;

/**
 * Login with email and password.
 * Body: application/x-www-form-urlencoded (OAuth2 style).
 */
export async function login(email: string, password: string): Promise<TokenResponse> {
  const base = getBaseUrl();
  const url = `${base}/api/v1/auth/login`;
  const body = new URLSearchParams({
    username: email,
    password,
  }).toString();

  if (isDev) console.log("[API] POST", url, { username: email });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await handleResponse<TokenResponse>(res);
  if (isDev) console.log("[API] Login response:", res.status, data);
  return data;
}

/**
 * Register a new user.
 * Body: JSON with name, email, password, role (LANDOWNER | PROFESSIONAL).
 */
export async function register(
  name: string,
  email: string,
  password: string,
  role: BackendRole
): Promise<TokenResponse> {
  const base = getBaseUrl();
  const url = `${base}/api/v1/auth/register`;
  const body = JSON.stringify({ name, email, password, role });

  if (isDev) console.log("[API] POST", url, { name, email, role });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await handleResponse<TokenResponse>(res);
  if (isDev) console.log("[API] Register response:", res.status, data);
  return data;
}

/**
 * Get current user (requires valid access token).
 */
export async function getMe(): Promise<ApiUser> {
  const base = getBaseUrl();
  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${base}/api/v1/auth/me`, {
    method: "GET",
    headers: { ...authHeader() },
  });

  return handleResponse<ApiUser>(res);
}

/**
 * Refresh access token using refresh_token.
 */
export async function refreshToken(): Promise<TokenResponse> {
  const base = getBaseUrl();
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${base}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  const data = await handleResponse<TokenResponse>(res);
  setTokens(data.access_token, data.refresh_token);
  return data;
}
