'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
const url = "http://localhost:8080";

interface User {
  id: string;
  username: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  register: (username: string, email: string, password: string, type: string) => Promise<null | undefined | User>;
  login: (username: string, password: string) => Promise<void | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing token and fetch user data on initial load
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const register = async (username: string, email: string, password: string, type: string) => {
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, type }),
      });
  
      const data = await response.json();

      if (response.ok) {
        await login(username, password);
      } else {
        throw new Error(data.message);
      }

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.payload);
      }
  
      throw new Error(data.message);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${url}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}