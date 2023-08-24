import { Box } from "@chakra-ui/react";
import SideBar from "../Components/Sidebar";
import PostContent from "../Components/PostContent";

export default function HomePage(){

    return(
        <Box 
        h={"100vh"}
        display={{base:"block", sm:"block",md:"flex",lg:"flex"}}>
            <SideBar />
            <PostContent />
        </Box>
    )
}