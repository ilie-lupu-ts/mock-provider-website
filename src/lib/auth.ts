export const AUTH_STORAGE_KEY = "mockProviderAuth";

export const HARDCODED_EMAIL = "demo@provider.com";
export const HARDCODED_PASSWORD = "Password123!";

export type StoredAuth = {
  isAuthenticated: boolean;
  userEmail: string | null;
};

export type AuthContextValue = StoredAuth & {
  login: (email: string) => void;
  logout: () => void;
};

export const loadStoredAuth = (): StoredAuth => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, userEmail: null };
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return { isAuthenticated: false, userEmail: null };
  }

  try {
    const parsed = JSON.parse(raw) as StoredAuth;
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      userEmail: parsed.userEmail ?? null,
    };
  } catch {
    return { isAuthenticated: false, userEmail: null };
  }
};

export const persistAuth = (auth: StoredAuth) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};
