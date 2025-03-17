"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "../components/types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  //Used to Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check with your backend
        const storedUser = localStorage.getItem("user");
        const storedRememberMe = localStorage.getItem("rememberMe") === "true";

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setRememberMe(storedRememberMe);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Used to set up inactivity timer if user is logged in and rememberMe is false
  useEffect(() => {
    if (user && !rememberMe) {
      resetInactivityTimer();

      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];

      const resetTimer = () => resetInactivityTimer();

      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      return () => {
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }

        events.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [user, rememberMe]);

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // This sets Auto logout after 1 minute (60000 ms) of inactivity
    const newTimer = setTimeout(() => {
      logout();
      router.push("/auth/login");
    }, 60000);

    setInactivityTimer(newTimer);
  };

  const login = async (
    email: string,
    password: string,
    keepLoggedIn: boolean
  ) => {
    setIsLoading(true);

    try {
      // In a real app, you would call your API here
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser = {
        id: "user-123",
        email,
        fullName: "Mock User",
      };

      setUser(mockUser);
      setRememberMe(keepLoggedIn);

      // For Storing in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("rememberMe", keepLoggedIn.toString());

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    setIsLoading(true);

    try {
      // In a real app, you would call your API here
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
