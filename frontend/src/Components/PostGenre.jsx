import { Box, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getAllPostsAction } from "../Redux/PostsRedux/posts.actions";

export default function PostGenre({genre}){
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useDispatch();

    const changeGenre =(genre)=>{
      dispatch(getAllPostsAction(genre));
    }
    return(
        <Box 
        onClick={()=>changeGenre(genre)}
        _hover={{bgColor:"green"}}
        cursor={"pointer"}
        borderBottom={useColorModeValue('2px solid white', '2px solid black')}
        color={"black"}
         fontSize={{base:"12px", sm:"12px", md:"15px", lg:"17px"}}
         fontWeight={"600"}
         p={{ base:"4% 1.5%", sm:"4% 1.5%", md:"8% 1.5%", lg:"8% 1.5%"}}>
            <Text>{genre}</Text>
        </Box>
    )
}