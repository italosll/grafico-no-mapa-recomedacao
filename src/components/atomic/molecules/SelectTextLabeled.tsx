/* eslint-disable react/no-array-index-key */
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

import { Button, ButtonProps } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { FlexProps, Select } from '@chakra-ui/react';

import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

const ContainerMenuProps: FlexProps = {
  direction: 'column',
  position: 'absolute',
  marginTop: { base: '40px' },
  zIndex: '1',
  background: 'white',
  border: 'solid 2px lightgray',
  width: { base: '78vw', md: '68vw', lg: '35vw' },
  maxWidth: { lg: '350px' },
  roundedBottom: '3xl',
  overflow: 'hidden',
};

const SelectProps: any = {
  background: 'white',
  border: 'solid 2px lightgray',
  width: { base: '100%', lg: '35vw' },
  maxWidth: { lg: '350px' },
  rounded: '3xl',
};

const OptionProps: ButtonProps = {
  rounded: 'none',
  _focus: { background: 'lightgray' },
};
type SelectTextLabeledProps = {
  label: string;
  options: Array<string>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};
export default function SelectTextLabeled({
  label,
  options,
  value,
  setValue,
}: SelectTextLabeledProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   const key = localStorage?.getItem(
  //     label
  //       .replaceAll(' ', '_')
  //       .toLowerCase()
  //       .normalize('NFD')
  //       .replace(/[\u0300-\u036f]/g, ''),
  //   );
  //   if (key) setValue(key);
  // }, []);

  return (
    <Flex direction="column" margin="10px">
      <Text color="white" marginRight="auto">
        {label}
      </Text>
      <Flex color="blue" direction="column">
        <Flex
          onClick={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
        >
          <Select
            {...SelectProps}
            onChange={(e) => setValue(e.target.value)}
          >
            {options?.map((option, index) => (
              <option
                value={option}
                key={index}
              >
                {option}
              </option>
            ))}
          </Select>
        </Flex>

      </Flex>
      <Text color="transparent">erro</Text>
    </Flex>
  );
}
