import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPostsAction } from "../Redux/PostsRedux/posts.actions";
import PostDisplay from "./PostDisplay";
import LoadingContent from "./LoadingContent";
import axios from "axios";

export default function PostContent(){
    const dispatch = useDispatch()
    const content = useSelector(store=>store.allPosts);
    const postGenre = useSelector(store=>store.genre);
    const loading = useSelector(store=>store.loading);
   
    useEffect(()=>{
    dispatch(getAllPostsAction(postGenre));
    },[postGenre]);
    let reverseContent = [...content].reverse();
    return(
        <Box
        h={"100vh"}
        overflowY={"auto"}
        overflowX={"hidden"}
        w={"100%"}
        >
            { loading?<LoadingContent />
            :
                reverseContent?.map((ele)=>
                <div key={ele._id}>
                    <PostDisplay
                    image={ele.images[0].path}
                    date={ele.date}
                    desc={ele.desc}
                    time={ele.time}
                    heading={ele.heading}
                    genre={ele.genre}
                    />
                </div>
                )
            }
            {
               reverseContent.length?null:<Text>No News Added</Text>
            }
        </Box>
    )
}