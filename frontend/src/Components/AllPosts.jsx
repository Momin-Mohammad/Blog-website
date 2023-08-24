import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
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
        borderBottom={useColorModeValue('1.5px solid black', '1.5px solid white')}
        >
            { loading?<LoadingContent />
            :
              latestOrder.map((ele)=>
                    <Box
                    padding={"2% 1%"}
                    borderBottom={"1.5px solid orange"}
                     key={ele.id}>
                        <PostDisplay
                    image={ele.image}
                    date={ele.date}
                    time={ele.time}
                    desc={ele.desc}
                    heading={ele.heading}
                    genre={ele.genre}
                    />
                    <Box>
                        <Button onClick={()=>navigate(`/admin/editpost/${ele.id}`)}>Edit</Button>
                        <Button onClick={()=>deletePost(ele.id)}>Delete</Button>
                    </Box>
                    </Box>
                )
            }
        </Box>
    )
}