import { Box, Image, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PostDisplay({image,heading,desc,time,date,genre}){
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    return(
        <Box
        borderBottom={useColorModeValue('1.5px solid black', '1.5px solid white')}
        p={"1%"}
        position={"relative"}
        >
            <Box
            display={{base:"block",sm:"block",md:"flex",lg:"flex"}}
            justifyContent={"start"}
            gap={"2%"}
            >
            <Box
            w={{base:"50%",sm:"50%",md:"40%",lg:"30%"}}
            ><Image w={"100%"} h={"100%"} src={`/postimages/${image}`} alt="Post image" />
            </Box>
            <Box
            w={"100%"}
            textAlign={"start"}>
            <Text
            fontSize={{base:"medium",sm:"medium",md:"larger",lg:"larger"}}
            fontWeight={"600"}
            cursor={"pointer"}
            _hover={{textDecoration:"underline"}}
            onClick={()=>navigate(`/post/${heading}`)} 
            >{heading}
            </Text>
            <Text
            fontSize={{base:"medium"}}
            marginTop={{base:"4%",sm:"4%",md:"2%",lg:"2%"}}
            marginBottom={{base:"10%",sm:"10%",md:"5%",lg:"5%"}}
            >{desc}</Text>
            <Box
            fontSize={{base:"small"}}
            w={"100%"}
            marginTop={"10%"}
            display={"flex"}
            gap={"3%"}
            position={"absolute"} bottom={"0px"}
            opacity={"50%"}
            >
            <Text>Date : {date}</Text>
            <Text>Time : {time}</Text>
            <Text>Genre : {genre}</Text>
            </Box>
            </Box>
            </Box>
            
        </Box>
    )
}