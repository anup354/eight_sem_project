import React, { createContext, useContext, useEffect, useState } from "react";

// type role = "ADMIN" | "USER";

type User = {
  role: string;
  token: string; 
  baseURL: string;
  firstname:string,
  lastname:string
};

type AuthContextValue = {
  user: User | undefined;
  loader: boolean;
  token: string | undefined;
  baseURL: string | undefined;
  // login: (token: string) => Promise<void>;
  login: (role: string, token: string,firstname:string,lastname:string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({children}:{children:JSX.Element}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoader(false);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    } else {
      setLoader(false);
    }
  }, []);

//   const login = async (role: role, token: string) => {
  const login = async (token: string,role: string,firstname:string,lastname:string) => {
    const newUser = {
      role,
      token,
      firstname,
      lastname
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", JSON.stringify(token));

    setUser(newUser);
    setToken(token);
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(undefined);
  };

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

  const value: AuthContextValue = {
    user,
    loader,
    token,
    login,
    logout,
    baseURL
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextValue => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

export { AuthProvider, useAuth };
