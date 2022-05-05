import React from 'react';
import {
    ChakraProvider,
    theme,
    VStack,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Button,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function MyProfilePage() {
    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <div style={{ height: "100vh" }}>
                <VStack spacing={16} >
                    <TableContainer paddingTop={"5em"} width={"50%"}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Nom</Th>
                                    <Th>Prenom</Th>
                                    <Th>Adresse mail</Th>
                                    <Th>Éditer</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Nom</Td>
                                    <Td>Prenom</Td>
                                    <Td>adresse@mail.com</Td>
                                    <Td><Button>Éditer</Button></Td>
                                </Tr>
                                <Tr>
                                    <Td>Nom</Td>
                                    <Td>Prenom</Td>
                                    <Td>adresse@mail.com</Td>
                                    <Td><Button>Éditer</Button></Td>
                                </Tr>
                                <Tr>
                                    <Td>Nom</Td>
                                    <Td>Prenom</Td>
                                    <Td>adresse@mail.com</Td>
                                    <Td><Button>Éditer</Button></Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Footer />
                </VStack>
            </div>
        </ChakraProvider>
    );
}

export default MyProfilePage;


