import React from "react";
import { useParams } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendList from "../components/FriendList";
import BookList from "../components/BookList";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";

import { getUserById, whoami } from "../api/userAPI";

function ProfilePage() {
  const { id } = useParams();
  const [myProfile, setMyProfile] = React.useState(false);

  const [user, setUser] = React.useState({
    id: "",
    userName: "",
    bio: "",
    books: [],
    movies: [],
    friends: [],
  });

  const getUser = () => {
    whoami().then((data) => {
      setMyProfile(id === data.userId);
      getUserById(id).then((data) => {
        console.log(data);
        setUser({
          id: data._id,
          userName: data.username,
          bio: data.bio,
          books: data.books,
          movies: data.movies,
          friends: data.friends,
        });
      });
    });
  };

  React.useEffect(() => {
    getUser();
  }, [id]);

  return (
    <>
      <Navbar myProfile={myProfile} id={user.id} />
      <div style={{ height: "100vh" }}>
        <Box textAlign="center" fontSize="xl" as="main" paddingTop={"4em"}>
          <ProfileCard
            username={user.userName}
            bio={user.bio}
            myProfile={myProfile}
          />
        </Box>
        <VStack spacing={16}>
          <FriendList friends={user.friends} />
          <BookList books={user.books} />
          <MovieList movies={user.movies} />
          <Footer />
        </VStack>
      </div>
    </>
  );
}

export default ProfilePage;
