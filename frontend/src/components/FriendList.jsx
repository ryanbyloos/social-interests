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
import { useState, useLayoutEffect, React } from "react";

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
    <Box shadow={"md"} rounded={"lg"}>
      <Avatar
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
  const [searchFollowing, setSearchFollowing] = useState("");
  const [searchFollowers, setSearchFollowers] = useState("");
  const [followingCardList, setFollowingCardList] = useState([]);
  const [followersCardList, setFollowersCardList] = useState([]);

  const updateFriends = () => {
    setFollowersCardList([]);
    setFollowingCardList([]);
    for (let index = 0; index < following.length; index++) {
      const friendId = following[index];
      getUserById(friendId).then((data) => {
        if (
          data.username.toLowerCase().includes(searchFollowing.toLowerCase())
        ) {
          setFollowingCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        }
      });
    }
    for (let index = 0; index < followers.length; index++) {
      const friendId = followers[index];
      getUserById(friendId).then((data) => {
        if (
          data.username.toLowerCase().includes(searchFollowers.toLowerCase())
        ) {
          setFollowersCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        }
      });
    }
  };

  useLayoutEffect(() => {
    updateFriends();
  }, [following, followers, searchFollowing, searchFollowers]);

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
            value={searchFollowing}
            onChange={(e) => setSearchFollowing(e.target.value)}
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
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 2, lg: 2 }}
          >
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
            value={searchFollowers}
            onChange={(e) => setSearchFollowers(e.target.value)}
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
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 2, lg: 2 }}
          >
            {followersCardList}
          </SimpleGrid>
        </Box>
      </Container>
    </HStack>
  );
}
