import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

const Error = ({ msg }) => {
  return (
    <Alert
      status="error"
      pos={'fixed'}
      variant='solid'
      left={'50%'}
      transform={'translateX(-50%)'}
      // maxW={'90vw'} /* Adjust the maximum width as needed */
      whiteSpace={'nowrap'} /* Force the message to stay on a single line */
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default Error;
