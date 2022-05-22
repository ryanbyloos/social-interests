import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { whoami } from "../api/userAPI";

export default function Navbar({ id, myProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const goToMyProfile = () => {
    whoami().then((data) => {
      navigate(`/u/${data.userId}`);
    });
  };

  const goToEditMyProfile = () => {
    whoami().then((data) => {
      navigate(`/u/${data.userId}/edit`);
    });
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        shadow={"md"}
        px={4}
        as="header"
        position="fixed"
        zIndex={3}
        w="100%"
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          position="static"
        >
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <b>Social Interests</b>
            </Box>
            <HStack as={"nav"} spacing={4} display={"flex"}>
              <Link onClick={goToMyProfile}>
                {" "}
                {myProfile ? <b>Mon profil</b> : "Mon profil"}{" "}
              </Link>
              <Link onClick={() => navigate("/explore" + location.search)}>
                {" "}
                {pathname === "/explore" ? <b>Explorer</b> : "Explorer"}{" "}
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  // src={
                  //   'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  // }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={goToEditMyProfile}>Modifier profil</MenuItem>
                <MenuItem onClick={() => navigate("/admin" + location.search)}>
                  Interface admin
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    navigate("/" + location.search);
                    localStorage.removeItem("token");
                  }}
                >
                  Se déconnecter
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
