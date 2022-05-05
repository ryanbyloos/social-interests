import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// const usePathname = () => {
//   const location = useLocation();
//   return location.pathname;
// }

// const Links = ['Mon profil', 'Explorer'];

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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
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
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <Link onClick={() => navigate("/myprofile" + location.search)}> {pathname==="/myprofile" ? <b>Mon profil</b> : "Mon profil" } </Link>
              <Link onClick={() => navigate("/explore" + location.search)}> {pathname==="/explore" ? <b>Explorer</b> : "Explorer" } </Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/myprofile/edit" + location.search)}>Modifier profil</MenuItem>
                <MenuItem onClick={() => navigate("/admin" + location.search)}>Interface admin</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => navigate("/" + location.search)}>Se déconnecter</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <NavLink> {"Mon profil"} </NavLink>
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}