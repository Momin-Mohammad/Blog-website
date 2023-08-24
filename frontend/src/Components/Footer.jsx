import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue('gray.300', 'black')}
        color={useColorModeValue('gray.700', 'gray.200')}
        position={"fixed"}
        bottom={"0px"}
        w={'100%'}
        borderTop={useColorModeValue('2px solid black', '2px solid white')}
        >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={1}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>All rights reserved</Text>
        </Container>
      </Box>
    );
  }