import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';

  import { useLocation, useNavigate } from 'react-router-dom';
  
  export default function EditProfile(){
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        // 
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Éditer le profil
          </Heading>
          <FormControl id="userName">
            <FormLabel>Avatar</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ">
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Changer l'avatar</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="firstname" isRequired>
            <FormLabel>Prénom</FormLabel>
            <Input
              placeholder="Prénom"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="lastname" isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              placeholder="Nom"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Adresse mail</FormLabel>
            <Input
              placeholder="email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              placeholder="Mot de passe"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={() => navigate("/myprofile" + location.search)}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => navigate("/myprofile" + location.search)}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }