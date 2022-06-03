import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { logIn } from "../api/authAPI";

import React from "react";

/**
 * @description Login component used in the LoginPage component
 * @returns the component to log in
 */
export default function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username.match(/^[a-zA-Z0-9_]{3,20}$/) !== null &&
      password.length >= 8
    ) {
      logIn(username, password).then((data) => {
        localStorage.setItem("token", data.token);
        navigate(`/u/${data.userId}`);
      });
    } else {
      alert("Nom d'utilisateur ou mot de passe invalide");
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Se connecter</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Nom d'utilisateur</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button shadow={"md"} onClick={(e) => handleLogin(e)}>
                Se connecter
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
