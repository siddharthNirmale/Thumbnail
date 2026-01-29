import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";
import toast from "react-hot-toast";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: { email: string; password: string }) => Promise<void>;
  signup: (user: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const { data } = await api.post("/api/auth/register", { name, email, password });

      if (data?.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }

      toast.success(data?.message || "Signup successful");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      if (data?.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }

      toast.success(data?.message || "Login successful");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");

      setUser(null);
      setIsLoggedIn(false);

      toast.success(data?.message || "Logged out successfully");
    } catch (error) {
      console.error(error);

      // Clear local session anyway
      setUser(null);
      setIsLoggedIn(false);

      toast.error("Logout failed, but local session cleared");
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/auth/verify");

      if (data?.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value: AuthContextProps = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
