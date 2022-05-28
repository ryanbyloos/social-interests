import {
  Box,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={"gray.50"}
      color={"gray.700"}
      width={"100%"}
      position={"static"}
      bottom={0}
      left={0}
      right={0}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text> </Text>
        <Text>© 2022 Social Interests, inc. All rights reserved</Text>
        <Text> </Text>
      </Container>
    </Box>
  );
}
