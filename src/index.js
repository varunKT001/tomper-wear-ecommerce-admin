import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';

ReactDOM.render(
  <UserProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </UserProvider>,
  document.getElementById('root')
);
