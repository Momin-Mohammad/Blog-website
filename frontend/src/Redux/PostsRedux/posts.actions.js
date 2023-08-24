import { PostFailure, PostLoading, PostSuccess, getAllPost } from "./posts.types";
import axios from "axios";

const baseUrl = "http://localhost:8080/posts";

export const getAllPostsAction = (genre)=>(dispatch)=>{
     dispatch({type:PostLoading});
    axios.get(baseUrl)
    .then(res=>{
        if(genre==="all"){
            dispatch({type:getAllPost,payload:{data:res.data,genre:genre}})
        }else{
            let filteredPosts = res.data?.filter((ele)=>ele.genre===genre);
            dispatch({type:getAllPost,payload:{data:filteredPosts,genre:genre}})
        }
        
    }).catch(err=>dispatch({type:PostFailure}));
}

export const addPostData = (data)=>()=>{
    axios.post(baseUrl,data)
    .then(res=>{
        console.log(res.data)
        // getAllPostsAction();
    }).catch(err=>console.log("err:",err))
}

export const addCommentAction = ({heading,addNewComment})=>()=>{

    let comments;
    let id;
    axios.get(`${baseUrl}?q=${heading}`)
    .then(res=>{
        id=res.data[0].id
        if(res.data[0].comments){
           comments ={comments : [...res.data[0]?.comments,addNewComment]}
        }else{
            comments = {
                comments : [addNewComment]
            }
        }
        console.log("comments:",comments)
        axios.patch(`${baseUrl}/${id}`,comments).then(res=>console.log(res.data.comments)).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
}

export const deletePostAction = (id)=>()=>{
    axios.delete(`${baseUrl}/${id}`).then(res=>console.log(res.data))
    .catch(err=>console.log(err))
}

export const editPostAction =({id,newData})=>()=>{
    axios.patch(`${baseUrl}/${id}`,newData)
    .then(res=> console.log(res.data)).catch(err=>console.log(err))
}