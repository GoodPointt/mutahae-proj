import { Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="yellow.500"
      size="md"
    />
  );
};

export default Loading;
