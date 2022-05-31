import {
  Box,
  SimpleGrid,
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
} from "@chakra-ui/react";
import { React } from "react";

import { SearchIcon } from "@chakra-ui/icons";

export default function UserList({ title, list, search, setSearch, cardList }) {
  return (
    <Container width={"600px"} heigth={"240px"}>
      <HStack>
        <Text
          fontSize={"2xl"}
          fontFamily={"body"}
          textAlign={"left"}
          paddingBottom={5}
        >
          {title}
        </Text>
        <Text paddingBottom={4} color={"gray.500"}>
          {list.length}
        </Text>
      </HStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Chercher ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Box
        height={"160px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        overflowY="scroll"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 2, lg: 2 }}
        >
          {cardList}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
