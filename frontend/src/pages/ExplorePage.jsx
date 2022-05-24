import React from "react";
import {
  ChakraProvider,
  theme,
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
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { getAllUsers, addFriend, hasFriend, whoami } from "../api/userAPI";
import { useNavigate } from "react-router-dom";

function MyProfilePage() {
  const [filter, setFilter] = useState("Utilisateurs");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleAddFriend = (friendId) => {
    whoami().then((me) => {
      addFriend(me.userId, friendId).then(() => {
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
                if (
                  user.username.toLowerCase().includes(search.toLowerCase()) &&
                  user._id !== me.userId &&
                  !res
                ) {
                  setResults((results) => [
                    ...results,
                    <Tr key={user._id}>
                      <Td>{user.username}</Td>
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
        } else if (filter === "Livres") {
        } else if (filter === "Films") {
        }
      });
  };

  useEffect(() => {
    updateResults();
  }, [search, refresh]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <>
        <VStack paddingTop="30vh">
          <Spacer />
          <HStack textAlign="center" fontSize="md" paddingTop={"4em"}>
            <Menu>
              <MenuButton shadow={"lg"} as={Button} width={"10em"}>
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
              shadow={"lg"}
              value={search}
              maxWidth={"900px"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </HStack>
          <TableContainer width={"600px"} paddingBottom="35vh">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Utilisateurs</Th>
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
    </ChakraProvider>
  );
}

export default MyProfilePage;
