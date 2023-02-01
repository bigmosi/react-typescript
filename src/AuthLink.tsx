import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { gql, useMutation } from "@apollo/client";

const signOutMutation = gql`
  mutation signOutUser {
    signOut {
      user {
        id
        email
      }
    }
  }
`;

export const AuthLink = ({ children }: {children: React.ReactNode}) => {
  const [signOutUser] = useMutation(signOutMutation);
  const contextValues = useContext(AuthContext);
  const history = useHistory();

  if (contextValues === undefined ) {
    return null;
  }

  const {isAuthenticated, setAuthInfo} = contextValues;

  const handleSignOut = async () => {
    await signOutUser();
    setAuthInfo({ userData: null });
    history.push("/auth/sign-in");
  };

  return isAuthenticated ? (
    <Link onClick={handleSignOut} to="#">
      Sign Out
    </Link>
  ) : (
    <Link to="/auth/sign-in">{children}</Link>
  );
};
