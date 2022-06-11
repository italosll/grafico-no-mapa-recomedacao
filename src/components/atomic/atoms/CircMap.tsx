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
  Marker,
  // ZoomableGroup,
} from 'react-simple-maps';

import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { polygon } from '@turf/turf';
import {
  plotSections,
  getBbox,
  getLimits,
  plotGrid,
  getCenters,
  colorInRange,
} from '../../../core/Core';
import goias from '../../../maps/goias.json';

// import grid from '../../grid/grid.json';

export const CircMap = ({ percentages, colors, ...props }) => {
  const gridItemSize = 20; // km^2
  const bbox = getBbox(goias.features); // bbox original shape
  const grid = plotGrid(bbox, gridItemSize, goias);
  const centers = getCenters(grid.features);
  const cliped = plotSections(goias, percentages);
  const limits = getLimits(cliped);

  const test = (circ) => {
    for (let l = 0; l < limits.length; l++) {
      if (
        colorInRange(circ.geometry.coordinates[1], limits[l][0], limits[l][1])
      ) {
        return colors[l];
      }
    }
  };

  return (
    <>
      <Flex {...props}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 5500, rotate: [49.5, 16, 0] }}
        >
          {centers.map((circ, index) => (
            <Marker key={index} coordinates={circ.geometry.coordinates}>
              <circle
                r={8}
                fill={test(circ)}
                stroke="transparent"
                strokeWidth={2}
              />
            </Marker>
          ))}
        </ComposableMap>
      </Flex>
    </>
  );
};

export default Map;
