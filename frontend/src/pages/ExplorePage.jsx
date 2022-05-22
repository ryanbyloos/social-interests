
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
import { useState, useEffect } from 'react';



function MyProfilePage() {
    const [filter, setFilter] = useState("Utilisateurs");
    const [search, setSearch] = useState("");


    const updateResults = () => {
        console.log("updateResults");
        if (filter === "Utilisateurs") {

        }
        else if (filter === "Livres") {

        }
        else if (filter === "Films") {

        }
    }

    useEffect(() => {
        updateResults();
    }, [search]);

    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <>
                <VStack spacing="30vh" >
                    <Spacer />
                    <HStack textAlign="center" fontSize="md" paddingTop={'4em'}>
                        <Menu>
                            <MenuButton shadow={'lg'} as={Button} width={'10em'}>
                                {filter}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setFilter('Utilisateurs')}>Utilisateurs</MenuItem>
                                <MenuItem onClick={() => setFilter('Livres')}>Livres</MenuItem>
                                <MenuItem onClick={() => setFilter('Films')}>Films</MenuItem>
                            </MenuList>
                        </Menu>
                        <Input placeholder='Cherchez ...' size='lg' shadow={'lg'} value={search} maxWidth={"900px"} onChange={(e) => setSearch(e.target.value)} />
                    </HStack>
                    <Spacer />
                    <Footer />
                </VStack>
            </>
        </ChakraProvider>
    );
}

export default MyProfilePage;
