import React, { useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  useColorMode,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import {FaSmileBeam} from "react-icons/fa"
import photo from "../photos/Mohammad-Momin.png";
import aboutme_bg from "../photos/aboutme_bg.jpg"

const About = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();
    const[email,setEmail] = useState(null);
    const[name,setName] = useState(null);
    

    const subscribeUser = (e)=>{
      e.preventDefault();
      if(!email){
        toast({
          title: "Please fill all field",
          description: "Please check if the format is okay",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }else{
        toast({
          title: "Subscribed",
          description: "Hurray! you are subscribed",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setEmail("");
        setName("");
      }
    }

  return (
    <Box
     bgRepeat={"no-repeat"} bgSize={'cover'}
     padding={"3% 2%"}
     >
    <Box display={{sm:'block', md:"flex", lg:'flex'}} >
    <Box borderRadius="10px">
      <Image margin="auto" 
      w={{base:"70%",sm:"50%",md:"70%",lg:"90%"}} h={{base:"50%",sm:"40%",md:"70%",lg:"85%"}} 
      borderRadius="10px" src={photo}/>
    </Box> 
    <Box  w={{ sm:"100%", md:"80%", lg:"80%"}}>
      <Heading textAlign={"center"} marginBottom={"2%"} as={"h4"}>Mohammad Momin</Heading>
      <Text whiteSpace={"pre-wrap"}  
      fontWeight={600} 
      textAlign="start" 
      margin={"auto"} 
      fontSize={"large"}
      w={"80%"}>Hi! I am Mohammad Momin, a Full Stack Web Developer. I live in Bhiwandi, Maharashtra.
        <br/>Its good to see you on my website page. I post daily news on this website.
         Please subscribe below to get notifications for latest news first hand.

         <Text
         fontWeight={"600"}
         fontSize={"x-large"} 
         textAlign={"center"} 
         margin={"auto"} 
         w={"60%"} 
         marginTop={"5%"} 
         marginBottom={"5%"}>
        A democracy can thrive only as long as news and informations are truthful.
        <br/>
       <Text color={"yellow.500"}>- Ravish Kumar</Text> 
         </Text>
      </Text>
      
      <Box w={"40%"} margin={"auto"} marginTop={"2%"}>
        <form onSubmit={subscribeUser}>
        <Input value={name} isRequired onChange={(e)=>setName(e.target.value)} marginBottom={"2%"} 
        border={"1.5px solid black"} 
        color={"black"} type="text" 
        placeholder='enter name'/>
        <Input value={email} isRequired onChange={(e)=>setEmail(e.target.value)} marginBottom={"2%"} 
        border={"1.5px solid black"} 
        color={"black"} type="email" 
        placeholder='email@gmail.com'/>
        <Button type={"submit"} bgColor={useColorModeValue('transparent', 'black')} border={"1.5px solid black"} >Subscribe</Button>
        </form>
      </Box>
    </Box>
  </Box>
  </Box>
  );
};

export default About;