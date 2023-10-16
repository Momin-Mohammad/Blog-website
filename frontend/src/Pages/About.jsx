import {
  Box,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import photo from "../photos/Mohammad-Momin.png";
import SubscriptionForm from '../Components/SubscriptionForm';

const About = () => {

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
      <Box whiteSpace={"pre-wrap"}  
      fontWeight={600} 
      textAlign="start" 
      margin={"auto"} 
      fontSize={"large"}
      w={"80%"}>Hi! I am Mohammad Momin, a Full Stack Web Developer from Maharashtra.
        <br/>Its good to see you on my website page. I post daily news on this website.
         Please subscribe below to get notifications for latest news first hand.

      </Box>  

      <SubscriptionForm />
    </Box>
  </Box>
  </Box>
  );
};

export default About;