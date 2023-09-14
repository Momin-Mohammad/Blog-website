import { Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const navigate = useNavigate();
    let userLoggedIn = localStorage.getItem("NewsSiteAdminToken");
    if(userLoggedIn){
        return children
    }else{
        return <Navigate to="/admin/login" />
    }
}