import EditProfile from "../components/EditProfile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useParams } from "react-router-dom";

import { VStack } from "@chakra-ui/react";
function EditProfilePage() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <VStack spacing={16}>
          <EditProfile id={id} />
          <Footer />
        </VStack>
      </div>
    </>
  );
}

export default EditProfilePage;
