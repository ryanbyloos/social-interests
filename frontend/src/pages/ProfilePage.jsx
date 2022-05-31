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
  const [refresh, setRefresh] = React.useState(false);

  const [user, setUser] = React.useState({
    id: "",
    userName: "",
    bio: "",
    books: [],
    movies: [],
    following: [],
    followers: [],
  });

  const getUser = () => {
    whoami().then((data) => {
      setMyProfile(id === data.userId);
      getUserById(id).then((data) => {
        console.log(data);
        setUser({
          id: data.userId,
          userName: data.username,
          bio: data.bio,
          books: data.books,
          movies: data.movies,
          following: data.following,
          followers: data.followers,
        });
      });
    });
  };

  React.useEffect(() => {
    getUser();
  }, [id, refresh]);

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
          <FriendList following={user.following} followers={user.followers} />
          <BookList
            books={user.books}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <MovieList
            movies={user.movies}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <Footer />
        </VStack>
      </div>
    </>
  );
}

export default ProfilePage;
