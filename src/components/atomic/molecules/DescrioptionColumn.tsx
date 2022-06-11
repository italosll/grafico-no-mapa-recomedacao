/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import ContextLine from '../atoms/Line/ContextLine';

export default function DescriptionColumn(
  {
    ageIntervalsOfProfile, sexPercentages, scholarships, impairmentsPercentage,
  },
) {
  const ages = ageIntervalsOfProfile;
  const sex = sexPercentages;
  const impairment = impairmentsPercentage;

  return (

    <Flex
      w="250px"
      h="670px"
      m="10px"
      direction="column"
      fontSize="18px"
      color="#3F3E3E"
      bg="#FFF"
      textAlign="left"
      p="20px"
      borderRadius="25"
    >

      <Text textAlign="center" fontSize="20px" fontWeight="bold">Descrição do grupo:</Text>

      <Text mt="30px" fontWeight="bold">Idade:</Text>
      <ContextLine label={ages?.[0]?.[0]} value={ages?.[0]?.[1]} />
      <ContextLine label={ages?.[1]?.[0]} value={ages?.[1]?.[1]} />
      <ContextLine label={ages?.[2]?.[0]} value={ages?.[2]?.[1]} />

      <Text mt="20px" fontWeight="bold">Sexo:</Text>
      <ContextLine label={sex?.[0]?.[0]} value={sex?.[0]?.[1]} />
      <ContextLine label={sex?.[1]?.[0]} value={sex?.[1]?.[1]} />

      <Text mt="20px" fontWeight="bold">Escolaridade:</Text>
      <ContextLine label={scholarships?.[0]?.[0]} value={scholarships?.[0]?.[1]} />
      <ContextLine label={scholarships?.[1]?.[0]} value={scholarships?.[1]?.[1]} />

      <Text mt="20px" fontWeight="bold">Deficiencia visual:</Text>
      <ContextLine label={impairment?.[0]?.[0]} value={impairment?.[0]?.[1]} />
      <ContextLine label={impairment?.[1]?.[0]} value={impairment?.[1]?.[1]} />
      <ContextLine label={impairment?.[2]?.[0]} value={impairment?.[2]?.[1]} />

    </Flex>

  );
}
