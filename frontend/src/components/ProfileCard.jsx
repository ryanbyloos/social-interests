import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SocialProfileSimple() {
    return (
      <Center py={6}>
        <Box
          maxW={'900px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Lindsey James
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            This is my bio and I'm a software engineer.
          </Text>
        </Box>
      </Center>
    );
  }