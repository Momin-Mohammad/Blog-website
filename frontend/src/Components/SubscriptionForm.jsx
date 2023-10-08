import { Box, Button, Input, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import emailjs from "emailjs-com"
import axios from "axios";
import { useEffect, useState } from "react";
import { DB_users_URL } from "../utils";

export default function SubscriptionForm(){
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();
    const[email,setEmail] = useState("");
    const[name,setName] = useState("");
    const[loading,setLoading] = useState(false);

    const subscribeUser = async(e)=>{
      e.preventDefault();
      setLoading(true)
      let userData = {
        name : name,
        email : email
      }
      let target = e.target;
      const sendEmail=(target)=>{
        emailjs.sendForm("service_3zd16a9","template_b362yiv",target,"_NArWfJNHOJvYpAV4")
        .then(res=>{
          console.log("Inside")
          toast({
            title: `Email verification status : ${res.text}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch(err=>{
          toast({
            title: "Error occured while sending email. If you are the site owner, please check the console",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          console.log(err)})
      }

      axios.get(`https://emailverification.whoisxmlapi.com/api/v2?apiKey=at_wPEBcNpjHiqV2hCrnZX0O3jMOG0mm&emailAddress=${email}`)
      .then(res=>{
        if(res.data.smtpCheck === "true"){
          axios.post(`${DB_users_URL}/subscribe`,userData)
           .then(res=>{
              toast({
                  title: res.data.msg,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                })
                localStorage.setItem("newsSiteUserLoggedIn",name);
                if(res.data.msg === "Thank You for subscribing"){
                  sendEmail(target)
                }
           }).catch(err=>{
            toast({
              title: "Error occured while registering user. If you are the site owner, please check the console",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            console.log(err)});
        }else{
          toast({
              title: "Invalid email address. Please check for spelling mistake",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
        }
        setLoading(false)
      })
      .catch(err=>{
        toast({
          title: "Error occured while verifying email. If you are the site owner, please check the console",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        console.log(err)})
    
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
        value={name} name="name" isRequired onChange={(e)=>setName(e.target.value)} marginBottom={"2%"} 
        color={useColorModeValue('black', 'white')} 
        border={"1.5px solid black"} 
        type="text" 
        placeholder='enter name'/>
        <Input 
        required
        name="email"
        value={email} isRequired onChange={(e)=>setEmail(e.target.value)} marginBottom={"2%"} 
        color={useColorModeValue('black', 'white')} 
        border={"1.5px solid black"} 
        type="email" 
        placeholder='email@gmail.com'/>
        <Button type={"submit"} 
        bgColor={useColorModeValue('transparent', 'black')} 
        border={"1.5px solid black"} >{loading?"Checking email, please wait":"Subscribe"}</Button>
        </form>
      </Box>
    )
}