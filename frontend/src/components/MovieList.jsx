import {
  Box,
  SimpleGrid,
  Image,
  Container,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  CloseButton,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { getMovies } from "../api/userAPI";

import { useState, useEffect, React } from "react";

function MovieCard({ name, pic }) {
  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px "}
      borderColor={"gray.800"}
      rounded={"lg"}
    >
      <CloseButton
        float={"right"}
        size="sm"
        color={"gray.300"}
        _hover={{
          color: "red.500",
        }}
      />
      <Container centerContent>
        <Image
          size={"md"}
          src={`${window.location.origin}/movieplaceholder.png`}
          alt={"Book Alt"}
          mb={4}
          pos={"relative"}
        />
        <Box>
          <Text>{name}</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default function MovieList({ movies }) {
  let [search, setSearch] = useState("");
  let [movieCardList, setMovieCardList] = useState([]);

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
            <MovieCard name={data.title} pic={data.image} key={data.title} />,
          ]);
        }
      });
    }
  };

  useEffect(() => {
    updateMovies();
  }, [movies, search]);

  return (
    <Container maxW={"900px"} maxH={"270px"}>
      <Heading
        fontSize={"2xl"}
        fontFamily={"body"}
        textAlign={"left"}
        paddingBottom={5}
      >
        Films
      </Heading>
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
        maxH={"210px"}
        w={"full"}
        bg={"white"}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
          {movieCardList}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
