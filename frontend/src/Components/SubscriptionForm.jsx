import { Box, Button, Input, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DB_users_URL } from "../utils";

export default function SubscriptionForm(){
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();
    const[email,setEmail] = useState("");
    const[name,setName] = useState("");

    const subscribeUser = async(e)=>{
      e.preventDefault();
      let userData = {
        name : name,
        email : email
      }
     axios.post(`${DB_users_URL}/subscribe`,userData)
     .then(res=>{
        toast({
            title: res.data.msg,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          localStorage.setItem("newsSiteUserLoggedIn",name)
     }).catch(err=>{
      toast({
        title: "Something went wrong. If you are the site owner, please check the console",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      console.log(err)});
     setEmail("");
     setName("");
    }
    return(
        <Box 
        textAlign={"center"} 
        w={"40%"} 
        margin={"auto"} 
        marginTop={"2%"}
        marginBottom={"2%"}>
            <Text color={"goldenrod"}>• Subscribe to my website to receive newletter</Text>
        <form onSubmit={subscribeUser}>
        <Input 
        required
        value={name} isRequired onChange={(e)=>setName(e.target.value)} marginBottom={"2%"} 
        color={useColorModeValue('black', 'white')} 
        border={"1.5px solid black"} 
        type="text" 
        placeholder='enter name'/>
        <Input 
        required
        value={email} isRequired onChange={(e)=>setEmail(e.target.value)} marginBottom={"2%"} 
        color={useColorModeValue('black', 'white')} 
        border={"1.5px solid black"} 
        type="email" 
        placeholder='email@gmail.com'/>
        <Button type={"submit"} 
        bgColor={useColorModeValue('transparent', 'black')} 
        border={"1.5px solid black"} >Subscribe</Button>
        </form>
      </Box>
    )
}