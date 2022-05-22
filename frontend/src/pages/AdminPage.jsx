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
import { getAllUsers, deleteUser } from '../api/userAPI';


function MyProfilePage() {

    // const [users, setUsers] = React.useState([]);
    const [tr, setTr] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    const handleClick = (id) => {
        setRefresh(!refresh);
        deleteUser(id);
    }

    React.useEffect(() => {
        setTr([]);
        getAllUsers().then(res => {
            res.map(user => {
                setTr(tr => [...tr, 
                <Tr key={user._id}>
                    <Td>{user.username}</Td>
                    <Td><Button onClick={() => handleClick(user._id)}>Supprimer</Button></Td>
                </Tr>]);
            })
        })
    }, [refresh]);


    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <VStack spacing="60vh">
                <TableContainer paddingTop={"5em"} maxWidth={"900px"}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Utilisateur</Th>
                                <Th>Éditer</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tr}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Footer />
            </VStack>
        </ChakraProvider>
    );
}

export default MyProfilePage;


