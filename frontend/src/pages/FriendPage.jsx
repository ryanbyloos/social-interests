import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  VStack,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import FriendCard from '../components/FriendCard';
import FriendList from '../components/FriendList';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';

function FriendPage() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <Box textAlign="center" fontSize="xl" as="main" paddingTop={'4em'}>
          <FriendCard />
        </Box>
        {/* <Container maxW='3xl' centerContent> */}
        {/* <HStack align="center">
          {[...Array(5)].map(() =>
            <FriendCard />
          )}
        </HStack> */}
        <VStack spacing={16} >
          <FriendList />
          <BookList />
          <MovieList  />
          <Footer />
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default FriendPage;