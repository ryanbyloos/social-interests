import Login from "../components/Login";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";

import { VStack } from "@chakra-ui/react";

/**
 * @returns the login page
 */
function LoginPage() {
  return (
    <>
      <NavbarHome />
      <div style={{ height: "100vh" }}>
        <VStack spacing={16}>
          <Login />
          <Footer />
        </VStack>
      </div>
    </>
  );
}

export default LoginPage;
