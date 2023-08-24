import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logo from "../photos/logo.gif";
import { Link } from 'react-router-dom';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
      <Box
       w={"100%"} position={'sticky'} 
       top={"0px"} bg={useColorModeValue('gray.200', 'black')} 
       zIndex={1}
       >
        <Flex 
        px={4} w={"100%"} h={16} 
        alignItems={'center'} justifyContent={'space-between'}
        borderBottom={useColorModeValue('2px solid black', '2px solid white')}
        >
          <Box w={{base:"20%", sm:"10%", md:"7%", lg:"8%" }} h={"100%"}>
            <Link to="/"><Image h={"100%"} src={logo} alt="logo" /></Link>
            </Box>

          <Flex alignItems={'center'}>
            <Stack 
            fontWeight={600} 
            direction={'row'} 
            spacing={9}
            fontSize={{base:"14px", sm:"12px", md:"16px", lg:"18px"}}
            >

            <Text
                marginTop={"1.5%"}
                ><Link to="/" >Home</Link></Text>

                <Text 
                marginTop={"1.5%"}
                ><Link to="/about" >About</Link></Text>
                

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

            </Stack>
          </Flex>
        </Flex>
      </Box>
  );
}