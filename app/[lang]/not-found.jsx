import { Center, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Btn from '../ui/button/Btn';

const NotFound = () => {
  return (
    <Center flexDir={'column'} gap={6} h={480}>
      <Heading as={'h1'} fontWeight={'bold'}>
        Not Found
      </Heading>
      <Text>Looks like this page doesn&apos;t exist.</Text>

      <Link href="/">
        <Btn>Return Home</Btn>
      </Link>
    </Center>
  );
};

export default NotFound;
