import EditProfile from '../components/EditProfile';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { ChakraProvider, theme, VStack } from '@chakra-ui/react';
function EditProfilePage() {
    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <div style={{ height: "100vh" }}>
                <VStack spacing={16} >
                    <EditProfile />
                    <Footer />
                </VStack>
            </div>
        </ChakraProvider>
    );
}

export default EditProfilePage;
