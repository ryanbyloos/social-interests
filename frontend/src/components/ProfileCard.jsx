import { Heading, Avatar, Box, Center, Text, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { whoami, addFriend, hasFriend, removeFriend } from "../api/userAPI";
import { useLocation } from "react-router-dom";

export default function ProfileCard({
  username,
  bio,
  myProfile,
  refresh,
  setRefresh,
}) {
  const [friendButton, setFriendButton] = useState(null);
  const location = useLocation();

  const { id } = useParams();

  const handleAddFriend = (friendId) =>
    whoami().then((me) => {
      addFriend(me.userId, friendId).then(() => {
        setRefresh(!refresh);
      });
    });

  const handleRemoveFriend = (friendId) => {
    whoami().then((me) => {
      removeFriend(me.userId, friendId).then(() => {
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
        if (res) {
          return (
            <Button
              marginTop={".5em"}
              onClick={() => handleRemoveFriend(friendId)}
            >
              Arrêter de suivre
            </Button>
          );
        } else {
          return (
            <Button
              marginTop={".5em"}
              onClick={() => handleAddFriend(friendId)}
            >
              Suivre
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
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar size={"xl"} alt={"Avatar Alt"} mb={4} pos={"relative"} />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {username}
        </Heading>
        <Text textAlign={"center"} color={"gray.700"} px={3}>
          {bio}
        </Text>
        {friendButton}
      </Box>
    </Center>
  );
}
