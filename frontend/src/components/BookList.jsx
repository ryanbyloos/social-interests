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

import { getBooks, removeBook, whoami } from "../api/userAPI";
import { useState, useEffect, React } from "react";
import { SearchIcon } from "@chakra-ui/icons";

function BookCard({ name, author, pic, id, handleDeleteBook }) {
  return (
    <Box px={{ base: 2, md: 4 }} py={"5"} shadow={"md"} rounded={"lg"}>
      <CloseButton
        float={"right"}
        size="sm"
        color={"gray.300"}
        _hover={{
          color: "red.500",
        }}
        onClick={() => {
          handleDeleteBook(id);
        }}
      />
      <Container centerContent>
        <Image
          size={"md"}
          src={`https://covers.openlibrary.org/b/id/${pic}-S.jpg`}
          alt={"Book Alt"}
          mb={4}
          pos={"relative"}
        ></Image>
        <Text>{name}</Text>
        <Text fontSize={"xs"} color={"gray.500"}>
          {author}
        </Text>
      </Container>
    </Box>
  );
}

export default function BookList({ books, refresh, setRefresh }) {
  const [search, setSearch] = useState("");
  const [bookCardList, setBookCardList] = useState([]);

  const handleDeleteBook = (id) =>
    whoami().then((user) => {
      removeBook(user.userId, id);
      setRefresh(!refresh);
    });

  const updateBooks = () => {
    setBookCardList([]);
    for (let index = 0; index < books.length; index++) {
      const bookId = books[index];
      getBooks(bookId).then((data) => {
        if (data.title.toLowerCase().includes(search.toLowerCase())) {
          setBookCardList((bookCardList) => [
            ...bookCardList,
            <BookCard
              name={data.title}
              author={data.author[0]}
              pic={data.image}
              id={data._id}
              key={data.title}
              handleDeleteBook={handleDeleteBook}
            />,
          ]);
        }
      });
    }
  };

  useEffect(() => {
    updateBooks();
  }, [books, search]);

  return (
    <Container maxW={"900px"} maxH={"270px"}>
      <HStack>
        <Text
          fontSize={"2xl"}
          fontFamily={"body"}
          textAlign={"left"}
          paddingBottom={5}
        >
          Livres
        </Text>{" "}
        <Text paddingBottom={4} color={"gray.500"}>
          {books.length}
        </Text>
      </HStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Chercher un livre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Box
        maxW={"900px"}
        maxH={"230px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
          {bookCardList}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
