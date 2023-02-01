import React from "react";

interface AuthContextValues {
  authInfo:AuthoInfo;
  isAuthenticated: boolean;
  setAuthInfo:  React.Dispatch<React.SetStateAction<AuthoInfo>>;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<undefined | AuthContextValues>(undefined);
const Provider = AuthContext.Provider;

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: string;
}

interface AuthoInfo {
  userData:  UserData | null
}

export function AuthProvider({ children }: Props) {
  const [authInfo, setAuthInfo] = React.useState<AuthoInfo>({
    userData: null,
  });

  const isAuthenticated = authInfo.userData !== null;

  const isAdmin = authInfo.userData?.role === "ADMIN";

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo, isAdmin }}>
      {children}
    </Provider>
  );
}

 export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    return null;
  }

  return context;
}
