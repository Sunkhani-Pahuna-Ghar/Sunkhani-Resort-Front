// Small fetch wrapper for the Sunkhani backend.
// Success responses are { data: ... }; errors follow Nest's { statusCode, message, error }.

const API_URL: string = (
  (import.meta as any).env?.VITE_API_URL || "http://localhost:5001/api"
).replace(/\/+$/, "");

const TOKEN_KEY = "sunkhani_token";
export const AUTH_EXPIRED_EVENT = "sunkhani:auth-expired";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: user simply has to sign in again next visit */
  }
}

export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function request<T>(path: string, opts: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token && opts.auth !== false) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "NETWORK", "Could not reach the server. Please try again.");
  }

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  if (!res.ok) {
    const raw = json?.message;
    const message = Array.isArray(raw) ? raw.join(", ") : raw || res.statusText || "Request failed";
    const code = typeof json?.error === "string" ? json.error : `HTTP_${res.status}`;
    if (res.status === 401 && token) {
      setToken(null);
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw new ApiError(res.status, code, message);
  }

  return (json && "data" in json ? json.data : json) as T;
}
