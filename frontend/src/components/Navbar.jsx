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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { whoami } from "../api/userAPI";
import { isAdmin } from "../api/authAPI";

/**
 * @description Navbar component used everywhere except in login and signup
 * @param {Object} props 
 * @returns a Box that is a navigation bar
 */
export default function Navbar({ myProfile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [admin, setAdmin] = useState(false);

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

  useEffect(() => {
    isAdmin().then((data) => {
      setAdmin(data.isAdmin);
    });
  }, []);

  return (
    <>
      <Box
        bg={"gray.100"}
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
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={goToEditMyProfile}>Modifier profil</MenuItem>
                {admin ? (
                  <MenuItem
                    onClick={() => navigate("/admin" + location.search)}
                  >
                    Interface admin
                  </MenuItem>
                ) : null}
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
