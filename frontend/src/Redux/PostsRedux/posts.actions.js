import { DB_posts_URL } from "../../utils";
import { PostFailure, PostLoading, getAllPost } from "./posts.types";
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
        alert("Post added successfully")
    }).catch(err=>alert(`Error : ${err}`))
}

export const addCommentAction = ({heading,addNewComment})=>()=>{
    axios.get(`${DB_posts_URL}/${heading}`)
    .then(res=>{
        let id=res.data.post[0]._id
        axios.patch(`${DB_posts_URL}/${id}`,addNewComment)
        .then(res=>console.log("Comment Added:",res.data)).catch(err=>alert(`Error : ${err}`));
    }).catch(err=>alert(`Error : ${err}`));
}

export const deletePostAction = (id)=>()=>{
    axios.delete(`${DB_posts_URL}/deletepost/${id}`)
    .then(res=>alert("Post deleted successfully"))
    .catch(err=>alert(`Error : ${err}`))
}

export const editPostAction =({heading,formData})=>()=>{
    axios.patch(`${DB_posts_URL}/editpost/${heading}`,formData)
    .then(res=>alert("Post editted successfully")).catch(err=>alert(`Error : ${err}`))
}