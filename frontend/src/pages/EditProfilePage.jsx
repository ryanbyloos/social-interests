import EditProfile from "../components/EditProfile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { VStack } from "@chakra-ui/react";

/**
 * @returns the edit profile page
 */
function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!("token" in localStorage)) {
      navigate("/");
    }
  }, []);

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
