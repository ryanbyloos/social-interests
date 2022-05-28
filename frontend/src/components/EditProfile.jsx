import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack
} from "@chakra-ui/react";

import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { getUserById, updateUser } from "../api/userAPI";

export default function EditProfile({ id }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [user, setUser] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const updatedUser = {};
    if (username !== "") {
      updatedUser.username = username;
    }
    if (bio !== "") {
      updatedUser.bio = bio;
    }
    if (password !== "") {
      updatedUser.password = password;
    }
    updateUser(id, updatedUser).then((data) => {
      navigate(`/u/${id}`);
    });
  };

  React.useEffect(() => {
    getUserById(id).then((data) => {
      setUser(data);
    });
  }, [id, location]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={"white"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={"2xl"}>
          Éditer le profil
        </Heading>
        <FormControl id="username">
          <FormLabel>Nom d'utilisateur</FormLabel>
          <Input
            defaultValue={user?.username}
            placeholder={user?.username}
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Description</FormLabel>
          <Input
            defaultValue={user?.bio}
            placeholder={user?.bio}
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Nouveau mot de passe</FormLabel>
          <Input
            placeholder="Mot de passe"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="cpassword">
          <FormLabel>Confirmer mot de passe</FormLabel>
          <Input
            placeholder="Mot de passe"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </FormControl>
        <HStack spacing={6}>
          <Button
            w="full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            w="full"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
