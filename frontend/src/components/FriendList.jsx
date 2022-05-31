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

import { getUserByName, getUserById } from "../api/userAPI";
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
    <Box width={"6em"} shadow={"md"} rounded={"lg"}>
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
      getUserById(friendId).then((data) => {
        setFollowingCardList((friendCardList) => [
          ...friendCardList,
          <FriendCard name={data.username} pic={data.avatar} key={data._id} />,
        ]);
      });
    }
    for (let index = 0; index < followers.length; index++) {
      const friendId = followers[index];
      getUserById(friendId).then((data) => {
        setFollowersCardList((friendCardList) => [
          ...friendCardList,
          <FriendCard name={data.username} pic={data.avatar} key={data._id} />,
        ]);
      });
    }
  };

  useEffect(() => {
    updateFriends();
  }, [following, followers]);

  return (
    <HStack width={"80%"} maxW={"900px"}>
      <Container maxW={"600px"} maxH={"240px"}>
        <HStack>
          <Text
            fontSize={"2xl"}
            fontFamily={"body"}
            textAlign={"left"}
            paddingBottom={5}
          >
            Following{" "}
          </Text>{" "}
          <Text paddingBottom={4} color={"gray.500"}>
            {following.length}
          </Text>
        </HStack>
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
          <SimpleGrid minChildWidth={"5.6em"} spacing={1}>
            {followingCardList}
          </SimpleGrid>
        </Box>
      </Container>
      <Container maxW={"600px"} maxH={"240px"}>
        <HStack>
          <Text
            fontSize={"2xl"}
            fontFamily={"body"}
            textAlign={"left"}
            paddingBottom={5}
          >
            Followers{" "}
          </Text>{" "}
          <Text paddingBottom={4} color={"gray.500"}>
            {followers.length}
          </Text>
        </HStack>
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
          <SimpleGrid minChildWidth={"5.6em"} spacing={1}>
            {followersCardList}
          </SimpleGrid>
        </Box>
      </Container>
    </HStack>
  );
}
