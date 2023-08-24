import { Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import About from "../Pages/About";
import App from "../App";
import HomePage from "../Pages/HomePage";
import Post from "../Components/Post";
import AdminPage from "../Pages/AdminPage";
import EditPost from "../Pages/EditPost";

export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About/>} />
            <Route path="/post/:heading" element={<Post/>} />
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/admin/editpost/:id" element={<EditPost/>} />
        </Routes>
    )
}