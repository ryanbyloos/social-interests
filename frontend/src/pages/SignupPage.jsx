import Signup from '../components/Signup';
import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';

import { ChakraProvider, theme, VStack } from '@chakra-ui/react';
function SignupPage() {
    return (
        <ChakraProvider theme={theme}>
            <NavbarHome />
            <div style={{ height: "100vh" }}>
                <VStack spacing={16} >
                    <Signup />
                    <Footer />
                </VStack>
            </div>
        </ChakraProvider>
    );
}

export default SignupPage;