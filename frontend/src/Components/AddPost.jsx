import { Box, Image, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addPostData, editPostAction} from "../Redux/PostsRedux/posts.actions";
import { generatePath, useParams } from "react-router-dom";
import axios from "axios";
import { DB_posts_URL } from "../utils";
export default function AddPost({onAddingPost}){
    const {heading} = useParams();
    const[Img,setImg] = useState("");
    const[postHeading,setPostHeading] = useState("");
    const[desc,setDesc] = useState("");
    const[content,setContent] = useState("");
    const[genre,setGenre] = useState("");
    const dispatch = useDispatch();
   
    let date =  new Date();
    let day = date.getDate()
    let month = date.getMonth();
    month++;
    let year = date.getFullYear();
    let minutes = date.getMinutes();
    let hours= date.getHours();

   useEffect(()=>{
    if(heading){
        axios.get(`${DB_posts_URL}/${heading}`)
        .then(res=>{
            setPostHeading(res.data.post[0].heading)
            setDesc(res.data.post[0].desc)
            setContent(res.data.post[0].content)
            setGenre(res.data.post[0].genre)
        }).catch(err=>console.log(err))
    }
   },[])

    const submitPostData =(e)=>{
        e.preventDefault();
        let formData = new FormData();
        if(heading){
            formData.append('image',Img)
            formData.append('heading',postHeading)
            formData.append('desc',desc)
            formData.append('content',content)
            formData.append('genre',genre)
            dispatch(editPostAction({heading,formData}))
            alert(`Post with heading: ${heading} editted successfully`)
        }else{
        formData.append('image',Img)
        formData.append('heading',postHeading)
        formData.append('desc',desc)
        formData.append('content',content)
        formData.append('date',day + "-" + "0" + month + "-" + year)
        formData.append('time',hours +":" + minutes)
        formData.append('genre',genre);

        let newData = {
          image : Img,
          heading : postHeading,
          desc : desc,
          content : content,
          date : day + "-" + "0" + month + "-" + year,
          time : hours +":" + minutes,
          genre : generatePath
        }
            onAddingPost(newData);
            dispatch(addPostData(formData));
        }
        setImg("");
        setPostHeading("");
        setDesc("");
        setContent("");
        setGenre("");
        
    }
    
    return(
        <Box p={2} w={"70%"} margin={"auto"} textAlign={"center"}>
            <form onSubmit={submitPostData} encType="multipart/form-data" >
               {/* {Img?<Image margin={"auto"} w={"50%"} src={Img.name} alt="postImg"/>:null} */}
               <Input
               cursor={"pointer"}
               required
               name="image"
               w={{base:"80%",sm:"80%",md:"50%",lg:"40%"}}
               border={"0px"}
               marginTop={"1%"} 
               onChange={(e)=>setImg(e.target.files[0])} 
               type="file" />
               <Input
               value={postHeading}
               required
               marginTop={"1%"}  
               onChange={(e)=>setPostHeading(e.target.value)} 
               type="text" placeholder="enter post headng" />
                <Textarea
                value={desc}
                required
                overflow={"auto"}
                marginTop={"1%"}
                h={"40vh"}
                onChange={(e)=>setDesc(e.target.value)} type="text" placeholder="enter short desc" />
                <Textarea
                value={content}
                required
                overflow={"auto"}
                marginTop={"1%"}
                h={"40vh"}
                onChange={(e)=>setContent(e.target.value)} type="text" placeholder="enter post content" />
                <Select
                value={genre}
                required
                marginTop={"1%"}
                onChange={(e)=>setGenre(e.target.value)} placeholder='Select option'
                >
                  <option value='politics'>politics</option>
                  <option value='crime'>crime</option>
                  <option value='fashion'>fashion</option>
                </Select>
                <Input cursor={"pointer"} marginTop={"1%"}  type="submit" value="Submit"/>
            </form>
        </Box>
    )
}