import { Text } from '@chakra-ui/react';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text>
          <h1>Something went wrong</h1>
        </Text>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
