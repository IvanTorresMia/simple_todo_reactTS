import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const AuthContext = React.createContext<{ user: string | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<string | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const getAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });

    return () => getAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
