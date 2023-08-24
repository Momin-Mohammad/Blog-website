import { Box } from "@chakra-ui/react";
import AddPost from "../Components/AddPost";
import AllPost from "../Components/AllPosts";
import { useEffect, useState } from "react";
import { deletePostAction, getAllPostsAction } from "../Redux/PostsRedux/posts.actions";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function AdminPage(){
    const[postAdded,setPostAdded] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        axios.get("http://localhost:8080/posts").then(res=>{
            console.log(res.data)
            setPostAdded(res.data)})
        .catch(err=>console.log(err))
    },[])

    const onAddingPost = (newData)=>{
        setPostAdded([...postAdded,newData]);
    }

    const deletePost = (postId)=>{
        let filterPost = postAdded.filter((ele)=>ele.id!==postId);
        setPostAdded(filterPost);
        dispatch(deletePostAction(postId))
    }
    return(
    <Box>
        <AddPost onAddingPost = {onAddingPost}/>
        <AllPost 
        deletePost={deletePost}
        allPosts={postAdded}/>
    </Box>
    )
}