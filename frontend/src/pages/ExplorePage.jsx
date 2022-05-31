import React from "react";
import {
  Box,
  VStack,
  Input,
  Spacer,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Image,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  getAllUsers,
  getSimilarity,
  getMostSimilar,
  addFriend,
  hasFriend,
  whoami,
  addBook,
  addMovie,
} from "../api/userAPI";
import { getBookByName } from "../api/bookAPI";
import { getMovieByName } from "../api/movieAPI";
import { useNavigate } from "react-router-dom";

function ExplorePage() {
  const [filter, setFilter] = useState("Utilisateurs");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleAddFriend = (friendId) => {
    whoami().then((me) => {
      addFriend(me.userId, friendId).then(() => {
        setRefresh(!refresh);
      });
    });
  };

  const handleAddBook = (bookId) => {
    whoami().then((me) => {
      addBook(me.userId, bookId).then(() => {
        setRefresh(!refresh);
      });
    });
  };

  const handleAddMovie = (movieId) => {
    whoami().then((me) => {
      addMovie(me.userId, movieId).then(() => {
        setRefresh(!refresh);
      });
    });
  };

  const goToProfile = (id) => {
    navigate(`/u/${id}`);
  };

  const handleHasFriend = async (id, friendId) => {
    const res = await hasFriend(id, friendId);
    return res;
  };

  const handleSimilarity = async (id, friendId) => {
    const res = await getSimilarity(id, friendId);
    return res.result;
  };

  const updateSuggestions = () => {
    setSuggestions([]);
    whoami().then((me) => {
      getMostSimilar(me.userId).then((res) => {
        res.map((user) => {
          setSuggestions((prev) => [
            ...prev,
            <Tr key={user.id}>
              <Td>{user.username}</Td>
              <Td>{user.similarity}</Td>
            </Tr>,
          ]);
        });
      });
    });
  };

  const updateResults = () => {
    if (filter === "Utilisateurs") {
      whoami()
        .then((user) => {
          return user;
        })
        .then((me) => {
          setResults([]);
          getAllUsers().then((res) => {
            res.map((user) => {
              handleHasFriend(me.userId, user._id).then((res) => {
                handleSimilarity(me.userId, user._id).then((similarity) => {
                  if (
                    search !== "" &&
                    user.username
                      .toLowerCase()
                      .includes(search.toLowerCase()) &&
                    user._id !== me.userId &&
                    !res
                  ) {
                    setResults((results) => [
                      ...results,
                      <Tr key={user._id}>
                        <Td>{user.username + ` (${similarity})`}</Td>
                        <Td>
                          <Button onClick={() => goToProfile(user._id)}>
                            Voir le profil
                          </Button>
                        </Td>
                        <Td>
                          <Button onClick={() => handleAddFriend(user._id)}>
                            Ajouter
                          </Button>
                        </Td>
                      </Tr>,
                    ]);
                  }
                });
              });
            });
          });
        });
    } else if (filter === "Livres" && search !== "") {
      getBookByName(search).then((res) => {
        setResults([]);
        console.log(res);
        res.map((book) => {
          setResults((results) => [
            ...results,
            <Tr key={book._id}>
              <Td>
                <Image
                  src={`https://covers.openlibrary.org/b/id/${book.image}-S.jpg`}
                  alt={book.title}
                />
              </Td>
              <Td>
                {book.title.length > 40
                  ? book.title.substring(0, 36) + "..."
                  : book.title}
              </Td>
              <Td>
                {book.author.length < 1
                  ? ""
                  : book.author[0].length > 24
                  ? book.author[0].substring(0, 20) + "..."
                  : book.author[0]}
              </Td>
              <Td>
                <Button onClick={() => handleAddBook(book._id)}>
                  <AddIcon />
                </Button>
              </Td>
            </Tr>,
          ]);
        });
      });
    } else if (filter === "Films" && search !== "") {
      getMovieByName(search).then((res) => {
        setResults([]);
        res.map((movie) => {
          setResults((results) => [
            ...results,
            <Tr key={movie._id}>
              <Td>
                <Image
                  src={`movieplaceholder.png`}
                  maxWidth="48px"
                  alt={movie.title}
                />
              </Td>
              <Td>
                {movie.title.length > 40
                  ? movie.title.substring(0, 36) + "..."
                  : movie.title}
              </Td>
              <Td>
                {movie.author[0] > 30
                  ? movie.author[0].substring(0, 36) + "..."
                  : movie.author[0]}
              </Td>
              <Td>
                <Button onClick={() => handleAddMovie(movie._id)}>
                  <AddIcon />
                </Button>
              </Td>
            </Tr>,
          ]);
        });
      });
    }
  };

  useLayoutEffect(() => {
    updateResults();
  }, [refresh, search]);

  useEffect(() => {
    updateSuggestions();
  }, []);

  return (
    <>
      <Navbar />
      <>
        <VStack paddingTop="15vh">
          <Text fontSize={"xl"}>Suggestions</Text>
          <TableContainer>
            <Table variant="stripped" size="sm">
              <Thead>
                <Tr>
                  <Th>Utilisateurs</Th>
                  <Th>Score de similarité</Th>
                </Tr>
              </Thead>
              <Tbody>{suggestions}</Tbody>
            </Table>
          </TableContainer>
          <Spacer />
          <HStack textAlign="center" fontSize="md" paddingTop={"4em"}>
            <Menu>
              <MenuButton shadow={"md"} as={Button} width={"10em"}>
                {filter}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setFilter("Utilisateurs");
                    setRefresh(!refresh);
                  }}
                >
                  Utilisateurs
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter("Livres");
                    setRefresh(!refresh);
                  }}
                >
                  Livres
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter("Films");
                    setRefresh(!refresh);
                  }}
                >
                  Films
                </MenuItem>
              </MenuList>
            </Menu>
            <Input
              placeholder="Cherchez ..."
              size="lg"
              shadow={"md"}
              value={search}
              maxWidth={"900px"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </HStack>
          <TableContainer width={"60em"} height={"25em"} overflowY={"scroll"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{filter}</Th>
                  <Th> </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>{results}</Tbody>
            </Table>
          </TableContainer>
          <Spacer />
          <Footer />
        </VStack>
      </>
    </>
  );
}

export default ExplorePage;
