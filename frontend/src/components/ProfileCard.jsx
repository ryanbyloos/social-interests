import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { whoami, addFriend, hasFriend, removeFriend } from "../api/userAPI";
import { useLocation } from "react-router-dom";

export default function ProfileCard({ username, bio, myProfile }) {
  const [friendButton, setFriendButton] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  const { id } = useParams();

  const handleAddFriend = (friendId) =>
    whoami().then((me) => {
      addFriend(me.userId, friendId).then(() => {
        console.log("friend added", friendId);
        setRefresh(!refresh);
      });
    });

  const handleRemoveFriend = (friendId) => {
    whoami().then((me) => {
      removeFriend(me.userId, friendId).then(() => {
        console.log("friend removed", friendId);
        setRefresh(!refresh);
      });
    });
  };

  const handleHasFriend = async (friendId) =>
    whoami().then((me) => {
      const res = hasFriend(me.userId, friendId);
      return res;
    });

  const handleFriendButton = (friendId) => {
    return handleHasFriend(friendId)
      .then((res) => {
        console.log("res", res);
        if (res) {
          return (
            <Button onClick={() => handleRemoveFriend(friendId)}>
              Supprimer de mes amis
            </Button>
          );
        } else {
          return (
            <Button onClick={() => handleAddFriend(friendId)}>
              Ajouter à mes amis
            </Button>
          );
        }
      })
      .then((res) => {
        setFriendButton(res);
      });
  };

  const updateFriendButton = () => {
    whoami().then((me) => {
      if (me.userId === id) {
        setFriendButton(null);
      } else {
        handleFriendButton(id);
      }
    });
  };

  useEffect(() => {
    updateFriendButton();
  }, [myProfile, refresh, location]);

  return (
    <Center py={6}>
      <Box
        maxW={"900px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {username}
        </Heading>
        <Text
          textAlign={"center"}
          color={"gray.700"}
          px={3}
        >
          {bio}
        </Text>
        {friendButton}
      </Box>
    </Center>
  );
}
