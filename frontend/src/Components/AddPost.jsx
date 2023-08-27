import { Box, Image, Input, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addPostData, editPostAction} from "../Redux/PostsRedux/posts.actions";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddPost({onAddingPost}){
    const {id} = useParams();
    //console.log(id)
    const[Img,setImg] = useState("");
    const[heading,setHeading] = useState("");
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
    if(id){
        axios.get(`http://localhost:8080/posts/${id}`)
        .then(res=>{
            setHeading(res.data.heading)
            setDesc(res.data.desc)
            setContent(res.data.content)
            setGenre(res.data.genre)
        }).catch(err=>console.log(err))
    }
   },[])

    const submitPostData =(e)=>{
        e.preventDefault();
        let newData;
        if(id){
            newData={
            image : Img,
            heading : heading,
            desc : desc,
            content : content,
            genre : genre
            }
            dispatch(editPostAction({id,newData}))
            alert(`Post with heading: ${heading} editted successfully`)
        }else{
            newData = {
            image : Img,
            heading : heading,
            desc : desc,
            content : content,
            date : day+"-"+"0"+month+"-"+year,
            time : hours+":"+minutes,
            genre : genre
        }
            onAddingPost(newData)
            dispatch(addPostData(newData));
        }
        setImg("");
        setHeading("");
        setDesc("");
        setContent("");
        setGenre("");
        
    }

    const convertToBase64  =(imageFile)=>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload =()=>{
                resolve(fileReader.result);
            };
            fileReader.onerror =(error)=>{
                reject(error);
            }
        })
    }

    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        const toBase64 = await convertToBase64(file)
        setImg(toBase64);
      console.log("toBase64 :",toBase64);
      }
    return(
        <Box p={2} w={"70%"} margin={"auto"} textAlign={"center"}>
            <form onSubmit={submitPostData}>
               {Img?<Image margin={"auto"} w={"50%"} src={Img} alt="postImg"/>:null}
               <Input
               required
               w={{base:"70%",sm:"70%",md:"40%",lg:"30%"}}
               border={"0px"}
               marginTop={"1%"} 
               onChange={(e)=>handleImageUpload(e)} 
               type="file" />
               <Input
               value={heading}
               required
               marginTop={"1%"}  
               onChange={(e)=>setHeading(e.target.value)} 
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