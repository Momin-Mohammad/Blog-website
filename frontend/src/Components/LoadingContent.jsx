import { Box } from "@chakra-ui/react";
import styles from "./LoadingContent.module.css";

export default function LoadingContent(){
    return(
        <Box
        w={"100%"}
        h={"100%"}
        className={styles.LoadingContent_mainDiv}
        margin={"2%"}
        >
           <div><h2>Loading...</h2></div>
           <div></div>
           <div></div>
           <div></div>
        </Box>
    )
}