import React from "react";
import {
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
  hasBook,
  hasMovie,
  whoami,
  addBook,
  addMovie,
} from "../api/userAPI";
import { getBookByName } from "../api/bookAPI";
import { getMovieByName } from "../api/movieAPI";
import FriendCard from "../components/FriendCard";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

/**
 * @returns the explore page
 */
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

  const handleHasBook = async (id, bookId) => {
    const res = await hasBook(id, bookId);
    return res;
  };

  const handleHasMovie = async (id, movieId) => {
    const res = await hasMovie(id, movieId);
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
            <FriendCard
              name={user.username}
              pic={""}
              similarity={user.similarity}
              key={user.id}
            />,
          ]);
        });
      });
    });
  };

  const updateResults = () => {
    whoami()
      .then((user) => {
        return user;
      })
      .then((me) => {
        setResults([]);
        if (filter === "Utilisateurs") {
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
        } else if (filter === "Livres" && search !== "") {
          getBookByName(search).then((res) => {
            res.map((book) => {
              handleHasBook(me.userId, book._id).then((hasBook) => {
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
                      {!hasBook ? (
                        <Button onClick={() => handleAddBook(book._id)}>
                          <AddIcon />
                        </Button>
                      ) : (
                        <Text>Déjà ajouté</Text>
                      )}
                    </Td>
                  </Tr>,
                ]);
              });
            });
          });
        } else if (filter === "Films" && search !== "") {
          getMovieByName(search).then((res) => {
            res.map((movie) => {
              handleHasMovie(me.userId, movie._id).then((hasMovie) => {
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
                      {!hasMovie ? (
                        <Button onClick={() => handleAddMovie(movie._id)}>
                          <AddIcon />
                        </Button>
                      ) : (
                        <Text>Déjà ajouté</Text>
                      )}
                    </Td>
                  </Tr>,
                ]);
              });
            });
          });
        }
      });
  };

  useLayoutEffect(() => {
    updateResults();
  }, [refresh, search]);

  useEffect(() => {
    updateSuggestions();
    if (!("token" in localStorage)) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <>
        <VStack paddingTop="15vh">
          <UserList
            title="Suggestions"
            list={suggestions}
            cardList={suggestions}
          />
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
              placeholder="Chercher ..."
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
