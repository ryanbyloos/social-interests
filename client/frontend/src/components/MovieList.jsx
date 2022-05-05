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

import { SearchIcon } from '@chakra-ui/icons';

function MovieCard(props) {
    const { name, pic } = props;
    return (
        <Box
            px={{ base: 2, md: 4 }}
            py={'5'}
            // shadow={'xl'}
            border={'1px solid'}
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

export default function MovieList() {
    return (
        <Container maxW={'900px'} maxH={'270px'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'left'} paddingBottom={5}>
                Films
            </Heading>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Chercher un film' />
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
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                    <MovieCard
                        name={'MovieName'}
                        pic={'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg'}
                    />
                </SimpleGrid>
            </Box>
        </Container>
    );
}