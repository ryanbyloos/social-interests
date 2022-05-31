import { HStack } from "@chakra-ui/react";
import { useState, useLayoutEffect, React } from "react";

import { getUserById } from "../api/userAPI";
import FriendCard from "./FriendCard";
import UserList from "./UserList";

export default function FriendList({ following, followers }) {
  const [searchFollowing, setSearchFollowing] = useState("");
  const [searchFollowers, setSearchFollowers] = useState("");
  const [followingCardList, setFollowingCardList] = useState([]);
  const [followersCardList, setFollowersCardList] = useState([]);

  const updateFriends = () => {
    setFollowersCardList([]);
    setFollowingCardList([]);
    for (let index = 0; index < following.length; index++) {
      const friendId = following[index];
      getUserById(friendId).then((data) => {
        if (
          data.username.toLowerCase().includes(searchFollowing.toLowerCase())
        ) {
          setFollowingCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        }
      });
    }
    for (let index = 0; index < followers.length; index++) {
      const friendId = followers[index];
      getUserById(friendId).then((data) => {
        if (
          data.username.toLowerCase().includes(searchFollowers.toLowerCase())
        ) {
          setFollowersCardList((friendCardList) => [
            ...friendCardList,
            <FriendCard
              name={data.username}
              pic={data.avatar}
              key={data._id}
            />,
          ]);
        }
      });
    }
  };

  useLayoutEffect(() => {
    updateFriends();
  }, [following, followers, searchFollowing, searchFollowers]);

  return (
    <HStack width={"80%"} maxW={"900px"}>
      <UserList
        title={"Following"}
        list={following}
        search={searchFollowing}
        setSearch={setSearchFollowing}
        cardList={followingCardList}
      />
      <UserList
        title={"Followers"}
        list={followers}
        search={searchFollowers}
        setSearch={setSearchFollowers}
        cardList={followersCardList}
      />
    </HStack>
  );
}
