/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import {
  Flex,
} from '@chakra-ui/react';

import React from 'react';
import { BarMap } from 'react-geo-grapher';
import goias from '../maps/goias.json';
import acre from '../maps/acre.json';
import alagoas from '../maps/alagoas.json';

export default function Teste() {
  return (
    <Flex w="100vw" h="100vh" bg="#345" justifyContent="center" alignItems="center">

      <BarMap
        style={{
          width: '1000px', height: '1000px', margin: 'auto', background: '#f2f2f2', borderRadius: '20px',
        }}
        geojson={alagoas}
        percents={[40, 30, 30]}
        colors={['#040DA6', '#10863C', '#920B8E']}
      />
    </Flex>

  );
}
