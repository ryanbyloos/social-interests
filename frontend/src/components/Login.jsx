import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function SimpleCard() {
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Se connecter</Heading>

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Adresse mail</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  navigate("/myprofile" + location.search);
                }}>
                Se connecter
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}