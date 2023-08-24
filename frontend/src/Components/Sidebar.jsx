import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import PostGenre from "./PostGenre";

export default function SideBar(){
    const { colorMode, toggleColorMode } = useColorMode();
   
    return(
      <Box 
      overflow={"auto"}
      // h={{sm:"auto" ,md:"90vh", lg:"100vh"}} 
      w={{sm:"100%" ,md:"13%", lg:"10%"}} 
      boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px" 
      bg={useColorModeValue('gray.500', 'gray.300')}
      display={{base:"flex", sm:"flex",md:"block",lg:"block"}}
      justifyContent={{base:"space-around",sm:"space-around"}}
      >

        <PostGenre genre="politics" />
        <PostGenre genre="crime" />
        <PostGenre genre="fashion" />

      </Box>
    )
}