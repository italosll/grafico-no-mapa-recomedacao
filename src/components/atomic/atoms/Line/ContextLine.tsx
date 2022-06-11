/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';

type BackgroundColorsLineProps = {
    label:string
    value:string|number
}
export default function ContextLine({ label, value }:BackgroundColorsLineProps) {
  return (
    <Flex mt="5px">
      <Text>{label}</Text>
      <Text ml="auto">{`${value}%`}</Text>
    </Flex>

  );
}
