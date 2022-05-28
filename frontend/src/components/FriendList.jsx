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
  HStack,
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
      // px={10}
      // py={"5"}
      width={"8em"}
      shadow={"md"}
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
        <Text>{name}</Text>
      </Container>
    </Box>
  );
}

export default function FriendList({ following, followers }) {
  let [search, setSearch] = useState("");
  let [followingCardList, setFollowingCardList] = useState([]);
  let [followersCardList, setFollowersCardList] = useState([]);

  const updateFriends = () => {
    setFollowersCardList([]);
    setFollowingCardList([]);
    for (let index = 0; index < following.length; index++) {
      const friendId = following[index];
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
          setFollowingCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        });
    }
    for (let index = 0; index < followers.length; index++) {
      const friendId = followers[index];
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
          setFollowersCardList((friendCardList) => [
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
  }, [following, followers]);

  return (
    <HStack>
      <Container maxW={"450px"} maxH={"240px"}>
        <Heading
          fontSize={"2xl"}
          fontFamily={"body"}
          textAlign={"left"}
          paddingBottom={5}
        >
          Following
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
          boxShadow={"md"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          overflowY="scroll"
        >
          <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
            {followingCardList}
          </SimpleGrid>
        </Box>
      </Container>
      <Container maxW={"450px"}>
        <Heading
          fontSize={"2xl"}
          fontFamily={"body"}
          textAlign={"left"}
          paddingBottom={5}
        >
          Followers
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
          boxShadow={"md"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          overflowY="scroll"
        >
          <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
            {followersCardList}
          </SimpleGrid>
        </Box>
      </Container>
    </HStack>
  );
}
