/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import { Flex, Text } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import SelectTextLabeled from './SelectTextLabeled';

const ageOptions = ['0-10', '11-20', '21-30', '31-40', '41-50', '50+'];
const sexOptions = ['Masculino', 'Feminino'];
const visualImpairmentOptions = [
  'nenhuma',
  'Astgmatismo',
  'Miopia',

];
const educationLevelOptions = [
  'alfabetizado',
  'Ens. Fundamental Completo',
  'Ens. Médio Completo',
  'Ens. Superior Completo',
  'Pós-Graduação Completo',
];

function isInto(array, stringSearch) {
  if (array.find((index) => index === stringSearch) !== undefined) {
    return true;
  }
  return false;
}

export default function ContextQuestions({
  age, setAge, educationLevel, setEducationLevel,
}) {
  return (

    <Flex flexDirection="row">
      {/* <InputTextLabeled /> */}
      <SelectTextLabeled
        label="Idade"
        options={ageOptions}
        value={age}
        setValue={setAge}
      />
      <SelectTextLabeled
        label="Grau de Escolariadade"
        options={educationLevelOptions}
        value={educationLevel}
        setValue={setEducationLevel}
      />
    </Flex>

  );
}
