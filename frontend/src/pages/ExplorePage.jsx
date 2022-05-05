
import React from 'react';
import {
    ChakraProvider,
    theme,
    VStack,
    Input,
    Spacer,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button

} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';



function MyProfilePage() {
    const [Filter, setFilter] = useState("Amis");
    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <div style={{ height: "100vh" }}>
                <VStack spacing="27vh" >
                    <Spacer />
                    <HStack textAlign="center" fontSize="md" paddingTop={'4em'} width={'30%'}>
                        <Menu>
                            <MenuButton as={Button}>
                                {Filter}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setFilter('Amis')}>Amis</MenuItem>
                                <MenuItem onClick={() => setFilter('Livres')}>Livres</MenuItem>
                                <MenuItem onClick={() => setFilter('Films')}>Films</MenuItem>
                            </MenuList>
                        </Menu>
                        <Input placeholder='Cherchez ...' size='lg' />
                    </HStack>
                    <Spacer />
                    <Footer />
                </VStack>
            </div>
        </ChakraProvider>
    );
}

export default MyProfilePage;
