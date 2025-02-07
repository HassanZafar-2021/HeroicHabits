import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the AuthContext's value
interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
}

// Create the AuthContext with an initial empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  // Save the token to localStorage whenever it changes
  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
