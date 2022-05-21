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

  // const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [bio, setUserBio] = React.useState('');
  const [books, setBooks] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  const getUser = (userId) => {
    fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((data) => {
        console.log(data);
        setUserName(data.username);
        setUserBio(data.bio);
        setBooks(data.books);
        setMovies(data.movies);
        setFriends(data.friends);
      })
  }
  const getUserId = () => {
    fetch('http://localhost:8080/api/auth/whoami', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((data) => {
        // setUserId(data.userId);
        getUser(data.userId);
      })
  }

  React.useEffect(() => {
    getUserId();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar location={"hello"} />
      <div style={{ height: "100vh" }}>
        <Box textAlign="center" fontSize="xl" as="main" paddingTop={'4em'}>
          <ProfileCard username={userName} bio={bio} />
        </Box>
        <VStack spacing={16} >
          <FriendList friends={friends} />
          <BookList books={books} />
          <MovieList movies={movies} />
          <Footer />
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default MyProfilePage;
