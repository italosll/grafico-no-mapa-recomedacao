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
  Flex, FlexProps, Text, TextProps,
} from '@chakra-ui/layout';
import React from 'react';
import { FcApproval } from 'react-icons/fc';
// import { BarMap } from '../../atoms/BarMap';
import {
  BarMap, CircMap, SquaredMap, LineMap,
} from 'react-geo-grapher';
// import { CircMap } from '../../atoms/CircMap';
// import { LineMap } from '../../atoms/LineMap';
// import { SquareMap } from '../../atoms/SquareMap';

import goias from '../../../../maps/goias.json';

export default function BigCard(
  {
    primary = '#FFF',
    secondary = '#EAEAEA',
    accent = '#12ca31',
    text = '#3F3E3E',
    isBigCard = false,
    mapPercentage,
  },

) {
  const TextW = isBigCard ? '210px' : '140px';

  const percentTitle = isBigCard ? 'Percentual de indicação:' : 'Indicação:';
  const accuracyTitle = isBigCard ? 'Acertos em questões por quantidade de seções:' : 'Acertos:';

  const badgeColor = ():string => {
    if (mapPercentage[3] === 'Muito Difícil') { return '#F43'; }
    if (mapPercentage[3] === 'Difícil') { return '#ff9633'; }
    if (mapPercentage[3] === 'Ok') { return '#5c5600'; }
    if (mapPercentage[3] === 'Fácil') { return '#6bca12'; }
    return accent;
  };

  return (
    <Flex
      {...Card(primary, text, isBigCard)}
    >
      <Text mt="10px" fontSize="22px" fontWeight="black">
        {mapPercentage[0]}
      </Text>
      <Flex
        mt="10px"
        borderRadius="25px"
        h={isBigCard ? '210px' : '150px'}
        w={isBigCard ? '210px' : '150px'}
        bg={secondary}
      >
        {mapPercentage[0] === 'BarMap' && (

          <BarMap
            style={{
              width: '100%', height: '100%', margin: 'auto', background: secondary, borderRadius: '20px',
            }}
            geojson={goias}
            percents={[40, 30, 30]}
            colors={['#040DA6', '#10863C', '#920B8E']}
          />
        )}
        {mapPercentage[0] === 'LineMap' && (

          <LineMap
            style={{
              width: '100%', height: '100%', margin: 'auto', paddingTop: '20px', background: secondary, borderRadius: '20px',
            }}
            geojson={goias}
            percents={[40, 30, 30]}
            colors={['#040DA6', '#10863C', '#920B8E']}
            scale={4700}
            scaleFactor={30}
            strokeWidth={15}
          />
        )}
        {mapPercentage[0] === 'CircMap' && (

          <CircMap
            style={{
              width: '100%', height: '100%', margin: 'auto', paddingTop: '20px', background: secondary, borderRadius: '20px',
            }}
            geojson={goias}
            percents={[40, 30, 30]}
            colors={['#040DA6', '#10863C', '#920B8E']}
            scale={4700}
            spacing={20}
            itemSize={8}
          />
        )}
        {mapPercentage[0] === 'SquaredMap' && (

          <SquaredMap
            style={{
              width: '100%', height: '100%', margin: 'auto', paddingTop: '20px', background: secondary, borderRadius: '20px',
            }}
            geojson={goias}
            percents={[40, 30, 30]}
            colors={['#040DA6', '#10863C', '#920B8E']}
            scale={4700}
            spacing={25}
            itemSize={15}
          />
        )}
      </Flex>
      <Text mt="20px" fontSize="22px" w="100%" textAlign="center">
        {percentTitle}
      </Text>
      <Flex>
        <FcApproval size="30" />
        <Text fontSize="22px" color={accent} fontWeight="black">
          {`${mapPercentage[1]}%`}
        </Text>
      </Flex>

      <Text mt="20px" mb="10px" fontSize="18px" w={TextW} textAlign={isBigCard ? 'left' : 'center'}>
        {accuracyTitle}
      </Text>

      <Text {...AcText(isBigCard)}>
        {`3-${mapPercentage[2]?.acc_amount_3_sections}%`}
      </Text>
      <Text {...AcText(isBigCard)}>
        {`5-${mapPercentage[2]?.acc_amount_5_sections}%`}
      </Text>
      <Text {...AcText(isBigCard)}>
        {`7-${mapPercentage[2]?.acc_amount_7_sections}%`}
      </Text>

      <Text mt="20px" mb="5px" fontSize="16px" w={TextW} textAlign="left">
        Fácil de enterder:
      </Text>
      <Text
        {...Badge(secondary, badgeColor(), TextW)}
      >
        {mapPercentage[3]}
      </Text>
    </Flex>
  );
}

const AcText = (isBigCard):TextProps => ({
  fontSize: '20px', w: isBigCard ? '210' : '140px', textAlign: isBigCard ? 'left' : 'center',
});

const Card = (primaryColor:string, textColor:string, isBigCard:boolean):FlexProps => ({
  m: '10px',
  borderRadius: '25px',
  direction: 'column',
  alignItems: 'center',
  bg: primaryColor,
  w: isBigCard ? '250px' : '170px',
  h: isBigCard ? '670px' : '545px',
  px: '10px',
  color: textColor,
});

const Badge = (secondaryColor:string, accentColor:string, TextW:string):TextProps => ({
  mb: '20px',
  fontSize: '18px',
  w: TextW,
  textAlign: 'center',
  bg: secondaryColor,
  color: accentColor,
  h: '42px',
  borderRadius: '15px',
  verticalAlign: 'center',
  fontWeight: 'black',
  lineHeight: '42px',
});
