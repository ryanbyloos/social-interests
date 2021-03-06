import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
} from "@chakra-ui/react";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById, getUserByName, updateUser } from "../api/userAPI";

/**
 * @description EditProfile component used in the Profile component
 * @param {Object} props
 * @returns the component used to edit a user's profile
 */
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
    if (username.match(/^[a-zA-Z0-9_]{3,20}$/) !== null) {
      updatedUser.username = username;
      getUserByName(username)
        .then((user) => {
          if (user !== null) {
            alert("Ce nom d'utilisateur est déjà utilisé");
            navigate(-1);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (username === "") {
    } else {
      alert("Nom d'utilisateur invalide");
      return;
    }
    if (bio !== "") {
      updatedUser.bio = bio;
    }
    if (password.length >= 8) {
      updatedUser.password = password;
    } else if (password === "") {
    } else {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
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
        boxShadow={"md"}
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
            boxShadow={"md"}
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
            boxShadow={"md"}
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
            boxShadow={"md"}
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
            boxShadow={"md"}
          />
        </FormControl>
        <HStack spacing={6}>
          <Button w="full" boxShadow={"md"} onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button w="full" boxShadow={"md"} onClick={handleSubmit}>
            Confirmer
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}
