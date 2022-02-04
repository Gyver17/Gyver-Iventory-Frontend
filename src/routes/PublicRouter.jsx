import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authProvider";

const PublicRouter = () => {
    const [state] = useContext(AuthContext)
    const { user } = state

    return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRouter
