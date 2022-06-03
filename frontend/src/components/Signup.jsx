import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/authAPI";

/**
 * @description SignupCard component used in the SignupPage component
 * @returns the component to sign up
 */
export default function SignupCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      username.match(/^[a-zA-Z0-9_]{3,20}$/) !== null &&
      password.length >= 8
    ) {
      signUp(username, password).then((data) => {
        navigate(`/`);
      });
    } else {
      alert("Nom d'utilisateur ou mot de passe invalide");
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            S'enregister
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormHelperText>
                Le nom d'utilisateur doit être unique et ne peut contenir que
                des lettres, des chiffres et des tirets bas. Il ne peut contenir
                qu'entre 3 et 20 caractères.
              </FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Le mot de passe doit contenir au moins 8 caractères.
              </FormHelperText>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button shadow={"md"} onClick={(e) => handleSignup(e)}>
                S'enregistrer
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
