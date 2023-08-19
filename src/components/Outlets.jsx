import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function SignOutOutlet() {
  const { auth } = useContext(AuthContext);
  return auth && auth?.token ? <Outlet /> : <Navigate to="/" />;
}

function SignInOutlet() {
  const { auth } = useContext(AuthContext);
  return auth && auth?.token ? <Navigate to="/home" /> : <Outlet />;
}

export { SignOutOutlet, SignInOutlet };
