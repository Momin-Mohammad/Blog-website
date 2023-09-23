import { Box } from "@chakra-ui/react";
import AddPost from "../Components/AddPost";
import AllPost from "../Components/AllPosts";
import { useEffect, useState } from "react";
import { deletePostAction, getAllPostsAction } from "../Redux/PostsRedux/posts.actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DB_posts_URL } from "../utils";

export default function AdminPage(){
    const[postAdded,setPostAdded] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        axios.get(DB_posts_URL).then(res=>{
            setPostAdded(res.data.posts)})
        .catch(err=>{
            alert("Some error occured. If you are the site owner please check the console")
            console.log(err)})
    },[])

    const onAddingPost = (newData)=>{
        setPostAdded([...postAdded,newData]);
    }

    const deletePost = (postId)=>{
        let filterPost = postAdded.filter((ele)=>ele._id!==postId);
        setPostAdded(filterPost);
        dispatch(deletePostAction(postId))
    }
    return(
    <Box
    overflowX={"hidden"}
    >
        <AddPost onAddingPost = {onAddingPost}/>
        <AllPost 
        deletePost={deletePost}
        allPosts={postAdded}/>
    </Box>
    )
}