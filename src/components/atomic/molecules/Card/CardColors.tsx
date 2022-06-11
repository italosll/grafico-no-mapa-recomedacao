/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import {
  Flex, Text,
} from '@chakra-ui/layout';
import { color } from '@chakra-ui/styled-system';
import React from 'react';
import Line from '../../atoms/Line/BackgroundColorsLine';

type LineType = {
  colors: string
  name: string
  percent : string| number
}

type CardColorsType = {

  line1: LineType
  line2: LineType
  line3: LineType
  percentLight: string | number,
  percentDark: string|number

}

export default function CardColors({
  line1, line2, line3, percentLight, percentDark,
}: CardColorsType) {
  const colorSchemes = {

    warm: ['#FE0022', '#FF6A6A', '#FF9537', '#FFD500', '#C84F32', '#FF5500'],
    cold: ['#040DA6', '#532178', '#10863C', '#23156A', '#004B51', '#920B8E'],
    neutral: ['#90B399', '#916996', '#DFDF95', '#B38F72', '#87B886', '#7A6357'],
  };

  return (
    <Flex
      m="10px"
      direction="column"
      fontSize="18px"
      color="#3F3E3E"
      bg="#FFF"
      textAlign="left"
      p="10px"
      borderRadius="25"
      fontWeight="black"
    >
      <Text mt="10px" ml="10px">Fundo:</Text>
      <Line colors={['#FFF']} name="Claro" percent={percentLight} />
      <Line colors={['#111']} name="Escuro" percent={percentDark} />

      <Text mt="10px" ml="10px">Esquema de cores:</Text>
      <Line colors={colorSchemes[line1.colors]} name={line1.name} percent={line1.percent} />
      <Line colors={colorSchemes[line2.colors]} name={line2.name} percent={line2.percent} />
      <Line colors={colorSchemes[line3.colors]} name={line3.name} percent={line3.percent} />

    </Flex>
  );
}
