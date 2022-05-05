import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  VStack,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import FriendList from '../components/FriendList';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';

function MyProfilePage() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar location={"hello"}/>
      <div style={{ height: "100vh" }}>
        <Box textAlign="center" fontSize="xl" as="main" paddingTop={'4em'}>
          <ProfileCard />
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

export default MyProfilePage;
