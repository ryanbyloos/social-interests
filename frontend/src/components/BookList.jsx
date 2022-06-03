import {
  Box,
  SimpleGrid,
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Center,
} from "@chakra-ui/react";

import { useState, useEffect, React } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { removeBook, whoami } from "../api/userAPI";
import { getBooks } from "../api/bookAPI";
import ItemCard from "./ItemCard";

/**
 * @description BookCard component used in the BookList component
 * @param {Object} props 
 * @returns an ItemCard for a book
 */
function BookCard({ name, author, pic, id, handleDeleteBook, myProfile }) {
  return (
    <ItemCard
      name={name}
      author={author}
      pic={`https://covers.openlibrary.org/b/id/${pic}-S.jpg`}
      id={id}
      handleDelete={handleDeleteBook}
      myProfile={myProfile}
    />
  );
}

/**
 * @description BookList component used in the Profile component
 * @param {Object} props 
 * @returns a list of BookCards in a Box
 */
export default function BookList({ books, refresh, setRefresh, myProfile }) {
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
              myProfile={myProfile}
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
    <Container maxW={"900px"}>
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
        height={"300px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        {bookCardList.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2, lg: 2 }}>
            {bookCardList}
          </SimpleGrid>
        ) : (
          <Center>
            <Text fontSize={"xl"}>Aucun livre</Text>
          </Center>
        )}
      </Box>
    </Container>
  );
}
