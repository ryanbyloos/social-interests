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




function BookCard(props) {
    const { name, pic } = props;
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
                    src={pic}
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

export default function BookList() {

    const [bookList, setBookList] = useState([]);
    const [search, setSearch] = useState('');

    function fetchBooks(name) {
        return fetch(`https://openlibrary.org/search.json?q=${encodeURI(name)}&fields=title,author_name,cover_i&limit=10`)
            .then(response => response.json())
            .then(data => {
                setBookList(data.docs);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchBooks(search);
    }, [search]);

    const books = []
    for (let i = 0; i < bookList.length; i++) {
        books.push(<BookCard name={bookList[i].title} pic={`https://covers.openlibrary.org/b/id/${bookList[i].cover_i}.jpg`} />)
    }

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
                {/* <Input type='tel' placeholder='Chercher un livre' value={search} onChange={() => setSearch()}/> */}
                <Input type='text' placeholder='Chercher un livre' value={search} onChange={(e) => setSearch(e.target.value)}/>

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
                {/* <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}> */}
                <SimpleGrid columns={{ base: 4, md: 6 }} spacing={{ base: 2, lg: 2 }}>
                    {books}
                </SimpleGrid>
            </Box>
        </Container>
    );
}