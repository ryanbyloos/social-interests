import {
    Box,
    SimpleGrid,
    useColorModeValue,
    Image,
    Container,
    Heading,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';

import { useState, useEffect, React } from 'react';

import { SearchIcon } from '@chakra-ui/icons';


function BookCard({ name, pic }) {
    return (
        <Box
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px '}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Container centerContent>
                <Image
                    size={'md'}
                    src={window.location.origin + '/bookplaceholder.png'}
                    alt={'Book Alt'}
                    mb={4}
                    pos={'relative'}
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

export default function BookList({ books }) {

    let [search, setSearch] = useState('');
    let [bookCardList, setBookCardList] = useState([]);

    const updateBooks = () => {
        setBookCardList([]);
        for (let index = 0; index < books.length; index++) {
            const bookId = books[index];
            fetch(`http://localhost:8080/api/book/${bookId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    throw new Error(res.statusText);
                })
                .then((data) => {
                    setBookCardList(bookCardList => [...bookCardList, <BookCard name={data.title} pic={data.image} key={data.title} />]);
                })
        }
    }

    useEffect(() => {
        updateBooks();
    }, [books]);

    return (
        <Container maxW={'900px'} maxH={'270px'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'left'} paddingBottom={5}>
                Livres
            </Heading>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input type='text' placeholder='Chercher un livre' value={search} onChange={(e) => setSearch(e.target.value)} />

            </InputGroup>
            <Box
                maxW={'900px'}
                maxH={'210px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                overflowY="scroll">
                <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
                    {bookCardList}
                </SimpleGrid>
            </Box>
        </Container>
    );
}