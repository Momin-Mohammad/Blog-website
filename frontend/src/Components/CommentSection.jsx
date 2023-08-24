import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCommentAction } from "../Redux/PostsRedux/posts.actions";
import AllComments from "./AllComments";

export default function CommentSection({addComment}){
    const[comment,setComment] = useState("");
    
    return(
        <Box>
        <Box
        display={"flex"}
        gap={"5%"}
        >
            <Textarea
            required
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
             type="text" alt="Add comment" />
            <Button onClick={()=>addComment({comment,setComment})}>comment</Button>
        </Box>
        </Box>
    )
}