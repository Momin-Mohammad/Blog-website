import { Box, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import PostDisplay from "./PostDisplay";
import CommentSection from "./CommentSection";
import AllComments from "./AllComments";
import { useDispatch } from "react-redux";
import { addCommentAction } from "../Redux/PostsRedux/posts.actions";
import SubscriptionForm from "./SubscriptionForm";
import { DB_posts_URL } from "../utils";

export default function Post(){
    const {heading} = useParams();
    const toast = useToast();
    const[post,setPost] = useState([]);
    const[allComments,setAllComments] = useState([]);
    const dispatch = useDispatch();
 
    const addComment = ({comment,setComment})=>{
        const userLoggedIn = localStorage.getItem("newsSiteUserLoggedIn");
        if(!userLoggedIn){
            window.scrollTo(0,1000);
            toast({
                title: "Please verify you account before commenting",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            return
        } 
        if(!comment){
            toast({
                title: "Please write some comment",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
         return;
        }
        let addNewComment = {
            comment : comment
        }
        allComments.length?setAllComments([...allComments,addNewComment]):setAllComments([addNewComment])
        dispatch(addCommentAction({heading,addNewComment}));
        setComment(""); 
     }

    useEffect(()=>{
        axios.get(`${DB_posts_URL}?q=${heading}`)
        .then(res=>{
            if(res.data[0].comments){
                setAllComments(res.data[0].comments)
            }
            setPost(res.data[0])}).catch(err=>console.log(err))
    },[])
    return(
        <Box 
        textAlign={"start"}>
            <PostDisplay
            image = {post.image}
            heading = {post.heading}
            time = {post.time}
            desc = {post.desc}
            date = {post.date}
            genre={post.genre}
             />
             <Box 
             padding={"0% 1%"}
             whiteSpace={"pre-wrap"}>{post.content}</Box>

             <Box 
             margin={"2% 0% 5% 0%"}
             w={{base:"100%",sm:"100%",md:"70%",lg:"60%"}}
             borderRight={"2px solid gray"}
             borderRadius={"10px"}
             p={"2% 1%"}>
                <CommentSection addComment={addComment} />
            <Box>
                    {
                        allComments?.map((ele,index)=>
                        <Box key={index}><AllComments comment={ele.comment} /></Box>
                        )
                    }
            </Box>
             </Box>

             <SubscriptionForm />
        </Box>
    )
}