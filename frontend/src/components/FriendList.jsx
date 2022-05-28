import {
  Box,
  SimpleGrid,
  Avatar,
  Container,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";

import { getUserByName } from "../api/userAPI";
import { SearchIcon } from "@chakra-ui/icons";

function FriendCard({ name, pic }) {
  const navigate = useNavigate();

  function goToProfile(username) {
    getUserByName(username).then((data) => {
      console.log(data._id);
      navigate(`/u/${data._id}`);
    });
  }
  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px "}
      borderColor={"gray.800"}
      rounded={"lg"}
      
    >
      <Container centerContent>
        <Avatar
          size={"lg"}
          src={pic}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          onClick={() => goToProfile(name)}
          cursor={"pointer"}	
        />
        <Box>
          <Text>{name}</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default function FriendList({ friends }) {
  let [search, setSearch] = useState("");
  let [friendCardList, setFriendCardList] = useState([]);

  const updateFriends = () => {
    setFriendCardList([]);
    for (let index = 0; index < friends.length; index++) {
      const friendId = friends[index];
      fetch(`http://localhost:8080/api/user?id=${friendId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then((data) => {
          setFriendCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        });
    }
  };

  useEffect(() => {
    updateFriends();
  }, [friends]);

  return (
    <Container maxW={"900px"} maxH={"240px"}>
      <Heading
        fontSize={"2xl"}
        fontFamily={"body"}
        textAlign={"left"}
        paddingBottom={5}
      >
        Amis
      </Heading>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Chercher un ami"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Box
        maxW={"900px"}
        maxH={"160px"}
        w={"full"}
        bg={"white"}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
          {friendCardList}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
