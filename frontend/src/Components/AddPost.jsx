import { Box, Image, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addPostData, editPostAction} from "../Redux/PostsRedux/posts.actions";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DB_posts_URL } from "../utils";
export default function AddPost({onAddingPost}){
    const {heading} = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const[Img,setImg] = useState([]);
    const[postHeading,setPostHeading] = useState("");
    const[desc,setDesc] = useState("");
    const[content,setContent] = useState("");
    const[genre,setGenre] = useState("");
    const dispatch = useDispatch();
   
    let date =  new Date();
    let day = date.getDate()
    let month = date.getMonth();
    month++;
    if(month < 10){
        month = "0" + month
    }
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
   },[]);

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

    const submitPostData =async(e)=>{
        e.preventDefault();
        let formData = new FormData();
        if(heading){
            formData.append('heading',postHeading)
            formData.append('desc',desc)
            formData.append('content',content)
            formData.append('genre',genre)
            dispatch(editPostAction({heading,formData}))
            toast({
                title: `Post with the heading ${postHeading} editted successfully.`,
                status: 'success',
                duration: 10000,
                isClosable: true,
              })
        }else{
            //Necessary to do, otherwise the image data will be empty at the backend
            for(let i=0;i<Img.length;i++){
                formData.append('images',Img[i])
            }
        formData.append('heading',postHeading)
        formData.append('desc',desc)
        formData.append('content',content)
        formData.append('date',day + "-" + month + "-" + year)
        formData.append('time',hours +":" + minutes)
        formData.append('genre',genre);
        let base64URL = await convertToBase64(Img[0]);
        let newData = {
          images : base64URL,
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
        if(heading){
            navigate("/admin")
        }
        
    }
    
    return(
        <Box p={2} w={"70%"} margin={"auto"} textAlign={"center"}>
            <form onSubmit={submitPostData} encType="multipart/form-data" >
               {/* {Img?<Image margin={"auto"} w={"50%"} src={Img.name} alt="postImg"/>:null} */}
             <Input
               cursor={"pointer"}
               required
               multiple
               name="images"
               w={{base:"80%",sm:"80%",md:"50%",lg:"40%"}}
               border={"0px"}
               marginTop={"1%"} 
               onChange={(e)=>setImg(e.target.files)} 
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
                  <option value='science'>Science</option>
                  <option value='crime'>Crime</option>
                  <option value='world'>World</option>
                </Select>
                <Input cursor={"pointer"} marginTop={"1%"}  type="submit" value="Submit"/>
            </form>
        </Box>
    )
}