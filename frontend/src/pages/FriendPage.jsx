import {
  ChakraProvider,
  Box,
  theme,
  VStack,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import FriendProfileCard from '../components/FriendProfileCard';
import FriendList from '../components/FriendList';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';

import { useParams } from 'react-router-dom';
import { useState, useEffect, React } from 'react';

function FriendPage() {

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);


  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <Box textAlign="center" fontSize="xl" as="main" paddingTop={'4em'}>
          <FriendProfileCard />
        </Box>
        {/* <Container maxW='3xl' centerContent> */}
        {/* <HStack align="center">
          {[...Array(5)].map(() =>
            <FriendCard />
          )}
        </HStack> */}
        <VStack spacing={16} >
          {/* <FriendList />
          <BookList />
          <MovieList  /> */}
          <Footer />
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default FriendPage;
