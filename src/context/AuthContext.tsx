import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { request, getToken, setToken, AUTH_EXPIRED_EVENT } from "../api/client";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "GUEST" | "ADMIN";
}

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (email: string, password: string, name?: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function splitName(name?: string): { firstName?: string; lastName?: string } {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  const rest = parts.slice(1).join(" ");
  return rest ? { firstName: parts[0], lastName: rest } : { firstName: parts[0] };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(() => !!getToken());

  useEffect(() => {
    if (!getToken()) return;
    let alive = true;
    request<AuthUser>("/auth/me")
      .then((u) => alive && setUser(u))
      .catch(() => alive && setUser(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, []);

  const finish = (r: AuthResponse) => {
    setToken(r.accessToken);
    setUser(r.user);
    return r.user;
  };

  const login = useCallback(
    async (email: string, password: string) =>
      finish(await request<AuthResponse>("/auth/login", { method: "POST", body: { email, password }, auth: false })),
    [],
  );

  const signup = useCallback(
    async (email: string, password: string, name?: string) =>
      finish(
        await request<AuthResponse>("/auth/register", {
          method: "POST",
          body: { email, password, ...splitName(name) },
          auth: false,
        }),
      ),
    [],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin: user?.role === "ADMIN", loading, login, signup, logout }),
    [user, loading, login, signup, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
