import { Box, Image, Text } from "@chakra-ui/react";
import SideBar from "../Components/Sidebar";
import PostContent from "../Components/PostContent";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function HomePage(){
    return(
        <Box 
        display={{base:"block", sm:"block",md:"flex",lg:"flex"}}>     
            <SideBar />
            <PostContent />
        </Box>
    )
}