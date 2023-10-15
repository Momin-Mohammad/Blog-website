import { Box, Button, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import PostDisplay from "./PostDisplay";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction } from "../Redux/PostsRedux/posts.actions";
import LoadingContent from "./LoadingContent";
import { useNavigate } from "react-router-dom";

export default function AllPost({deletePost,allPosts}){
    const { colorMode, toggleColorMode } = useColorMode();
    const loading = useSelector(store=>store.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let latestOrder = [...allPosts].reverse();
    useEffect(()=>{
        dispatch(getAllPostsAction("all"));
    },[])
    return(
        <Box
        borderTop={useColorModeValue('1.5px solid black', '1.5px solid white')}
        borderBottom={useColorModeValue('1.5px solid black', '1.5px solid white')}
        >
            <Text 
            fontSize={"xx-large"}
            fontWeight={"600"}
            borderBottom={useColorModeValue('1.5px solid black', '1.5px solid white')}
            borderTop={useColorModeValue('1.5px solid black', '1.5px solid white')}
            >{allPosts.length?"All Posts":"No post added"}</Text>
            { loading?<LoadingContent />
            :
              latestOrder.map((ele,index)=>
                    <Box
                    padding={"2% 1%"}
                    borderBottom={"4px solid gray"}
                     key={ele.index}>
                        <PostDisplay
                    image={ele.images[0].path||ele.images}
                    date={ele.date}
                    time={ele.time}
                    desc={ele.desc}
                    heading={ele.heading}
                    genre={ele.genre}
                    />
                    <Box display={"flex"} justifyContent={"center"} gap="5%">
                        <Button bgColor={"orange.500"} onClick={()=>navigate(`/admin/editpost/${ele.heading}`)}>Edit</Button>
                        <Button bgColor={"red"} onClick={()=>deletePost(ele._id)}>Delete</Button>
                    </Box>
                    </Box>
                )
            }
        </Box>
    )
}