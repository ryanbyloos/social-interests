import {
    Box,
    SimpleGrid,
    useColorModeValue,
    Avatar,
    Container,
    Heading,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchIcon } from '@chakra-ui/icons';

function FriendCard(props) {
    const { name, pic } = props;
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Box
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Container centerContent>
                <Avatar
                    size={'md'}
                    src={pic}
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    onClick={() => navigate("/friend" + location.search)}
                />
                <Box>
                    <Text>
                        {name}
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}

export default function FriendList() {
    return (
        <Container maxW={'900px'} maxH={'230px'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'left'} paddingBottom={5}>
                Amis
            </Heading>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Chercher un ami' />
            </InputGroup>
            <Box
                maxW={'900px'}
                maxH={'160px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                overflowY="scroll">
                {/* <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}> */}
                <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                    <FriendCard
                        name={'FriendName'}
                        pic={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
                    />
                </SimpleGrid>
            </Box>
        </Container>
    );
}