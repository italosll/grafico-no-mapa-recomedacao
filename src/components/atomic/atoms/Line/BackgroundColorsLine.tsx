/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';

type BackgroundColorsLineProps = {
    colors:Array<string>
    name:string
    percent:string|number
}
export default function BackgroundColorsLine({ colors, name, percent }:BackgroundColorsLineProps) {
  return (

    <Flex
      bg="#EAEAEA"
      my="5px"
      w="100%"
      h="40px"
      borderRadius="13px"
      alignItems="center"
      px="7px"
      fontSize="18px"
      fontWeight="black"
    >
      {colors.map((color, index) => {
        const isFirst = index === 0;
        const isLast = index === colors?.length - 1;
        return (
          <Flex
            key={index}
            borderStartRadius={isFirst ? '7px' : '0px'}
            borderEndRadius={isLast ? '7px' : '0px'}
            w="29px"
            h="29px"
            background={color}
          />
        );
      })}
      <Text ml="10px">{name}</Text>
      <Text ml="auto">{`${percent}%`}</Text>
    </Flex>
  );
}
