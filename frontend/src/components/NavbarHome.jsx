import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { useLocation, useNavigate } from 'react-router-dom';

const Links = [];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} as="header" position="fixed" w="100%">
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><b>Social Interests</b></Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            margin={3}
                            fontWeight={600}
                            color={'white'}
                            bg={'blue.400'}
                            href={'/'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={() => navigate("/" + location.search)}>
                            Se connecter
                        </Button>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            margin={3}
                            fontWeight={600}
                            color={'white'}
                            bg={'blue.400'}
                            href={'/signup'}
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