import {
  Box,
  CloseButton,
  Container,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export default function ItemCard({ name, author, pic, id, handleDelete }) {
  return (
    <Box px={{ base: 2, md: 4 }} py={"5"} shadow={"md"} rounded={"lg"}>
      <CloseButton
        float={"right"}
        size="sm"
        color={"gray.300"}
        _hover={{
          color: "red.500",
        }}
        onClick={() => {
          handleDelete(id);
        }}
      />
      <Container centerContent>
        <Image
          size={"md"}
          src={pic}
          alt={"Book Alt"}
          mb={4}
          pos={"relative"}
        ></Image>
        <Tooltip hasArrow label={name}>
          <Text>
            {name.length <= 20 ? name : name.substring(0, 17) + "..."}
          </Text>
        </Tooltip>
        <Text fontSize={"xs"} color={"gray.500"}>
          {author}
        </Text>
      </Container>
    </Box>
  );
}
