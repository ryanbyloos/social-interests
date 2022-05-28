import Signup from "../components/Signup";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";

import { VStack } from "@chakra-ui/react";
function SignupPage() {
  return (
    <>
      <NavbarHome />
      <div style={{ height: "100vh" }}>
        <VStack spacing={16}>
          <Signup />
          <Footer />
        </VStack>
      </div>
    </>
  );
}

export default SignupPage;
