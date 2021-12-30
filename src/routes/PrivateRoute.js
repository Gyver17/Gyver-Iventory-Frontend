import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authProvider";

const PrivateRoute = ({ children }) => {
    const [state] = useContext(AuthContext)
    const { user } = state

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
