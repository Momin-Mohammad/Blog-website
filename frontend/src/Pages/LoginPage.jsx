import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DB_admin_URL } from "../utils";

export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    const loginUser=(e)=>{
        e.preventDefault();
        let adminCredentials = {
            email : email,
            password : password
        }
        axios.post(`${DB_admin_URL}/login`,adminCredentials)
        .then(res=>{
            if(res.data.token){
                localStorage.setItem("NewsSiteAdminToken",res.data.token);
                toast({
                    title: res.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
                  navigate("/admin");
            }else{
                toast({
                    title: res.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
            }
        }).catch(err=>console.log(err))
    }
    return(
        <Box
        w={"60%"}
        p={"2%"}
        margin={"auto"}
        >
            <form onSubmit={loginUser}>
                <Input 
                required
                onChange={(e)=>setEmail(e.target.value)}
                type="email" placeholder="email@gmail.com"/>
                <Input 
                required
                margin={"2% 0%"}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" placeholder="enter password"/>
                <Button w={"50%"} type="submit">Login</Button>
            </form>
        </Box>
    )
}