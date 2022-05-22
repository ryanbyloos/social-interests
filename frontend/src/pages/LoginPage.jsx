import Login from "../components/Login";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";

import { ChakraProvider, theme, VStack } from "@chakra-ui/react";
function LoginPage() {
  return (
    <ChakraProvider theme={theme}>
      <NavbarHome />
      <div style={{ height: "100vh" }}>
        <VStack spacing={16}>
          <Login />
          <Footer />
        </VStack>
      </div>
    </ChakraProvider>
  );
}

export default LoginPage;
