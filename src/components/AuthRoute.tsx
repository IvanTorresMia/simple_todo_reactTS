import React, { ReactNode, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const AuthCheck = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
        navigate("/");
      } else {
        navigate("/login");
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthRoute;
