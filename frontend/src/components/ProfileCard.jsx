import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  useColorModeValue,
  Stack,
  Button,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

export default function ProfileCard({ username, bio, myProfile }) {
  const [friendButton, setFriendButton] = useState(null);

  const updateFriendButton = () => {
    if (!myProfile) {
      setFriendButton(
        <Center>
          <Stack mt={8} direction={"row"} spacing={4}>
            <Button flex={"none"} fontSize={"sm"} rounded={"full"}>
              {" "}
              Ajouter{" "}
            </Button>
          </Stack>
        </Center>
      );
    } else {
      setFriendButton(null);
    }
  };

  useEffect(() => {
    updateFriendButton();
  }, [myProfile]);

  return (
    <Center py={6}>
      <Box
        maxW={"900px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          // src={
          //   'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          // }
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {username}
        </Heading>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {bio}
        </Text>
        {friendButton}
      </Box>
    </Center>
  );
}
