import { create } from "zustand";

import type { AuthUser, LoginCredentials, SignUpPayload } from "@/types/auth";

type RegisteredUser = AuthUser & {
  password: string;
};

type AuthActionResult = {
  success: boolean;
  error?: string;
};

type AuthState = {
  currentUser: AuthUser | null;
  registeredUsers: RegisteredUser[];
  login: (credentials: LoginCredentials) => AuthActionResult;
  logout: () => void;
  signUp: (payload: SignUpPayload) => AuthActionResult;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  registeredUsers: [],
  login: ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const user = get().registeredUsers.find(
      (entry) => entry.email === normalizedEmail && entry.password === password,
    );

    if (!user) {
      return {
        success: false,
        error: "We could not find a user with this email and password.",
      };
    }

    set({
      currentUser: {
        id: user.id,
        customerId: user.customerId,
        email: user.email,
        name: user.name,
      },
    });

    return { success: true };
  },
  logout: () => set({ currentUser: null }),
  signUp: ({ email, name, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!name.trim() || !normalizedEmail || !password.trim()) {
      return {
        success: false,
        error: "Name, email, and password are required.",
      };
    }

    const existingUser = get().registeredUsers.find(
      (entry) => entry.email === normalizedEmail,
    );

    if (existingUser) {
      return {
        success: false,
        error: "This email is already registered. Please log in instead.",
      };
    }

    const customerId = get().registeredUsers.length + 1;
    const registeredUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      customerId,
      email: normalizedEmail,
      name: name.trim(),
      password,
    };

    set((state) => ({
      currentUser: {
        id: registeredUser.id,
        customerId: registeredUser.customerId,
        email: registeredUser.email,
        name: registeredUser.name,
      },
      registeredUsers: [...state.registeredUsers, registeredUser],
    }));

    return { success: true };
  },
}));
