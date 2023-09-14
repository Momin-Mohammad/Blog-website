import { Box, Heading, Text } from "@chakra-ui/react";

export default function AllComments({username,comment}){
    return(
        <Box 
        p={"1% 0%"}
        marginTop={"1%"}
        borderBottom={"1px solid gray"}
        whiteSpace={"pre-wrap"}>
            <Text fontWeight={"600"}
            >{username}</Text>
            <Text >{comment}</Text>
        </Box>
    )
}  