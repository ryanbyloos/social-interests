import {
    Box,
    Flex,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

import { useLocation, useNavigate } from 'react-router-dom';


export default function Simple() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} as="header" position="fixed" w="100%">
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><b>Social Interests</b></Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                        </HStack>
                    </HStack>
                    <Flex
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button
                            display={'inline-flex'}
                            fontSize={'sm'}
                            margin={3}
                            color={'white'}
                            bg={'blue.400'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={() => navigate("/" + location.search)}>
                            Se connecter
                        </Button>
                        <Button
                            display={'inline-flex'}
                            fontSize={'sm'}
                            margin={3}
                            color={'white'}
                            bg={'blue.400'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={() => navigate("/signup" + location.search)}>
                            S'enregistrer
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}