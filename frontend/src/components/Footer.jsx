import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  
  export default function SmallWithLogoLeft() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        width={'100%'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text> </Text>
          <Text>© 2022 Social Interests, inc. All rights reserved</Text>
          <Text> </Text>
        </Container>
      </Box>
    );
  }