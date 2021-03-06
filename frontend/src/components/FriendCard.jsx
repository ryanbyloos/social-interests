import { Box, Avatar, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getUserByName } from "../api/userAPI";

/**
 * @description FriendCard component used in the FriendList component
 * @param {Object} props 
 * @returns a list of users in a Box
 */
export default function FriendCard({ name, pic, similarity }) {
  const navigate = useNavigate();

  function goToProfile(username) {
    getUserByName(username).then((data) => {
      navigate(`/u/${data._id}`);
    });
  }
  return (
    <Box shadow={"md"} rounded={"lg"}>
      <Avatar
        src={pic}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
        onClick={() => goToProfile(name)}
        cursor={"pointer"}
      />
      <Text>{name}</Text>
      {similarity !== null ? (
        <Tooltip hasArrow label={`Vous avez ${similarity} intérêts en commun.`}>
          <Text>{similarity}</Text>
        </Tooltip>
      ) : null}
    </Box>
  );
}
