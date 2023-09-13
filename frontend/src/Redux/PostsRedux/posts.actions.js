import { DB_posts_URL } from "../../utils";
import { PostFailure, PostLoading, PostSuccess, getAllPost } from "./posts.types";
import axios from "axios";

export const getAllPostsAction = (genre)=>(dispatch)=>{
     dispatch({type:PostLoading});
    axios.get(DB_posts_URL)
    .then(res=>{
        if(genre==="all"){
            dispatch({type:getAllPost,payload:{data:res.data.posts,genre:genre}})
        }else{
            let filteredPosts = res.data?.posts.filter((ele)=>ele.genre===genre);
            dispatch({type:getAllPost,payload:{data:filteredPosts,genre:genre}})
        }
        
    }).catch(err=>dispatch({type:PostFailure}));
}

export const addPostData = (data)=>()=>{
    axios.post(`${DB_posts_URL}/addPost`,data)
    .then(res=>{
        console.log(res.data.posts)
        // getAllPostsAction();
    }).catch(err=>console.log("err:",err))
}

export const addCommentAction = ({heading,addNewComment})=>()=>{
    axios.get(`${DB_posts_URL}/${heading}`)
    .then(res=>{
        console.log("checkThis:",res.data.post)
        let id=res.data.post[0]._id
        axios.patch(`${DB_posts_URL}/${id}`,addNewComment)
        .then(res=>console.log("In the end:",res.data.post)).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
}

export const deletePostAction = (id)=>()=>{
    axios.delete(`${DB_posts_URL}/deletepost/${id}`)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
}

export const editPostAction =({heading,formData})=>()=>{
    axios.patch(`${DB_posts_URL}/editpost/${heading}`,formData)
    .then(res=> console.log(res.data.post)).catch(err=>console.log(err))
}