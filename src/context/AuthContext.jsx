import { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, loading, error] = [null, false, null];

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (error) {
      console.log(error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  }, [user, loading]);

  const _auth = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  // provider
  return <AuthContext.Provider value={_auth}>{children}</AuthContext.Provider>;
};
