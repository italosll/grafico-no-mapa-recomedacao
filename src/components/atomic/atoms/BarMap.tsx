/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-redeclare */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */

import {
  ComposableMap,
  Geographies,
  Geography,
  // ZoomableGroup,
} from 'react-simple-maps';

import { useEffect, useState } from 'react';
import { Flex, FlexProps } from '@chakra-ui/layout';
import { plotSections } from '../../../core/Core';
import goias from '../../../maps/goias.json';

export const BarMap = ({ limits, colors, ...props }) => {
  // const scaleFactor = 25;
  // const strokeWidth = '20px';
  // const percentages = [30, 20, 70];

  // const bbox = getBbox(goias.features);

  // const polyMap = polygon([goias.features[0].geometry.coordinates[0]]);

  // const linesOnAxisXY = getLinesOnAxisXY(scaleFactor, bbox);
  // const linesOnAxisX = linesOnAxisXY[0];
  // const linesOnAxisY = linesOnAxisXY[1];

  // const gridPointsPerLines = getGridPointsPerLines(
  //   scaleFactor,
  //   linesOnAxisX,
  //   linesOnAxisY,
  // );
  // const lines = getAllLines(gridPointsPerLines, polyMap);
  // const lineStrings = getAllLineStrings(lines);

  const [cliped, setCliped] = useState([]);

  useEffect(() => {
    setCliped(plotSections(goias, limits));
  }, [limits]);

  return (
    <>
      <Flex {...props}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 5500, rotate: [49.5, 16, 0] }}
        >
          {/* <ZoomableGroup zoom={1}> */}
          <Geographies geography={cliped}>
            {({ geographies }) => geographies.map((geo, index) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colors[index]}
              />
            ))}
          </Geographies>
          {/* </ZoomableGroup> */}
        </ComposableMap>
      </Flex>
    </>
  );
};

export default Map;
