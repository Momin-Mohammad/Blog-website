import { Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const navigate = useNavigate();
    let adminLoggedIn = localStorage.getItem("NewsSiteAdminToken");
    if(adminLoggedIn){
        return children
    }else{
        return <Navigate to="/admin/login" />
    }
}