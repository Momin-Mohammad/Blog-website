import { Box, Image, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addPostData, editPostAction} from "../Redux/PostsRedux/posts.actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DB_posts_URL } from "../utils";
export default function AddPost({onAddingPost}){
    const {heading} = useParams();
    console.log(heading)
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
        console.log("ID present")
        axios.get(`${DB_posts_URL}/${heading}`)
        .then(res=>{
            console.log(res.data)
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
        formData.append('genre',genre)
        console.log("NewData:",formData)
            onAddingPost(formData);
            dispatch(addPostData(formData));
        }
        setImg("");
        setPostHeading("");
        setDesc("");
        setContent("");
        setGenre("");
        
    }

    // const convertToBase64  =(imageFile)=>{
    //     return new Promise((resolve,reject)=>{
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(imageFile);
    //         fileReader.onload =()=>{
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror =(error)=>{
    //             reject(error);
    //         }
    //     })
    // }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        //const toBase64 = await convertToBase64(file)
        console.log("toBase64 :",file);
        setImg(file);
      }
    return(
        <Box p={2} w={"70%"} margin={"auto"} textAlign={"center"}>
            <form onSubmit={submitPostData} encType="multipart/form-data" >
               {Img?<Image margin={"auto"} w={"50%"} src={Img.name} alt="postImg"/>:null}
               <Input
               required
               name="image"
               w={{base:"70%",sm:"70%",md:"40%",lg:"30%"}}
               border={"0px"}
               marginTop={"1%"} 
               onChange={(e)=>handleImageUpload(e)} 
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
                <Input marginTop={"1%"}  type="submit" value="Submit"/>
            </form>
        </Box>
    )
}