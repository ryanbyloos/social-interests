import {
  Box,
  SimpleGrid,
  Image,
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect, React } from "react";
import { getMovies, removeMovie, whoami } from "../api/userAPI";
import ItemCard from "./ItemCard";

function MovieCard({ name, author, id, handleDeleteMovie }) {
  return (
    <ItemCard
      name={name}
      author={author}
      pic={`${window.location.origin}/movieplaceholder.png`}
      id={id}
      handleDelete={handleDeleteMovie}
    />
  );
}

export default function MovieList({ movies, refresh, setRefresh }) {
  let [search, setSearch] = useState("");
  let [movieCardList, setMovieCardList] = useState([]);

  const handleDeleteMovie = (id) =>
    whoami().then((user) => {
      removeMovie(user.userId, id);
      setRefresh(!refresh);
    });

  const updateMovies = () => {
    console.log("updateMovies", movies);
    setMovieCardList([]);
    for (let index = 0; index < movies.length; index++) {
      console.log("movies[index]", movies[index]);
      const movieId = movies[index];
      getMovies(movieId).then((data) => {
        if (data.title.toLowerCase().includes(search.toLowerCase())) {
          setMovieCardList((movieCardList) => [
            ...movieCardList,
            <MovieCard
              name={data.title}
              author={data.author[0]}
              id={data._id}
              key={data.title}
              handleDeleteMovie={handleDeleteMovie}
            />,
          ]);
        }
      });
    }
  };

  useEffect(() => {
    updateMovies();
  }, [movies, search]);

  return (
    <Container maxW={"900px"}>
      <HStack>
        <Text
          fontSize={"2xl"}
          fontFamily={"body"}
          textAlign={"left"}
          paddingBottom={5}
        >
          Films
        </Text>{" "}
        <Text paddingBottom={4} color={"gray.500"}>
          {movies.length}
        </Text>
      </HStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Chercher un film"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Box
        maxW={"900px"}
        height={"300px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2, lg: 2 }}>
          {movieCardList}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
