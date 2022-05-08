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
                <VStack spacing="60vh">
                    <TableContainer paddingTop={"5em"} maxWidth={"900px"}>
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
        </ChakraProvider>
    );
}

export default MyProfilePage;


