import React from 'react';
import { HStack } from '@chakra-ui/react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

function Stars({ stars }) {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return <HStack>{tempStars}</HStack>;
}

export default Stars;
