export {};
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable import/extensions */
// /* eslint-disable react/function-component-definition */
// /* eslint-disable react/jsx-filename-extension */
// /* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react/jsx-no-useless-fragment */
// /* eslint-disable react/prop-types */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable no-redeclare */
// /* eslint-disable max-len */
// /* eslint-disable consistent-return */
// /* eslint-disable react/jsx-no-bind */
// /* eslint-disable no-unused-vars */
// /* eslint-disable array-callback-return */
// /* eslint-disable camelcase */
// /* eslint-disable no-shadow */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-plusplus */
// /* eslint-disable no-use-before-define */
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Line,
//   // ZoomableGroup,
// } from 'react-simple-maps';

// import { useEffect, useState } from 'react';
// import { Flex } from '@chakra-ui/layout';
// import { polygon } from '@turf/turf';
// import {
//   plotSections,
//   getBbox,
//   getLimits,
//   getLinesOnAxisXY,
//   getGridPointsPerLines,
//   getAllLines,
//   getAllLineStrings,
//   colorInRange,
// } from '../../../core/Core';
// import goias from '../../../maps/goias.json';

// export const LineMap = ({ percentages, colors, ...props }) => {
//   const scaleFactor = 25;
//   const strokeWidth = 20;

//   const bbox = getBbox(goias.features);
//   const polyMap = polygon([goias.features[0].geometry.coordinates[0]]);
//   const linesOnAxisXY = getLinesOnAxisXY(scaleFactor, bbox);
//   const linesOnAxisX = linesOnAxisXY[0];
//   const linesOnAxisY = linesOnAxisXY[1];

//   const gridPointsPerLines = getGridPointsPerLines(
//     scaleFactor,
//     linesOnAxisX,
//     linesOnAxisY,
//   );
//   const lines = getAllLines(gridPointsPerLines, polyMap);
//   const lineStrings = getAllLineStrings(lines);
//   const cliped = plotSections(goias, percentages);
//   const limits = getLimits(cliped);

//   const test = (lines) => {
//     for (let l = 0; l < limits.length; l++) {
//       if (
//         colorInRange(
//           lines.geometry.coordinates[0][1],
//           limits[l][0],
//           limits[l][1],
//         )
//       ) {
//         return colors[l];
//       }
//     }
//   };

//   return (
//     <>
//       <Flex {...props}>
//         <ComposableMap
//           projection="geoMercator"
//           projectionConfig={{ scale: 5500, rotate: [49.5, 16, 0] }}
//         >
//           {/* <ZoomableGroup zoom={1}> */}
//           {/* <Graticule stroke="#DDD" /> */}
//           <Geographies
//             // geography={geoUrl}
//             fill="transparent"
//             // stroke="#FFFFFF"
//             strokeWidth={0.5}
//           >
//             {({ geographies }) => geographies.map((geo, index) => (
//               <Geography key={index} geography={geo} />
//             ))}
//           </Geographies>
//           {lineStrings.map((line, index) => (
//             <Line
//               from={[
//                 line.geometry.coordinates[0][0],
//                 line.geometry.coordinates[0][1],
//               ]}
//               to={[
//                 line.geometry.coordinates[1][0],
//                 line.geometry.coordinates[1][1],
//               ]}
//               stroke={test(line)}
//               strokeWidth={strokeWidth}
//               strokeLinecap="round"
//             />
//           ))}

//           {/* </ZoomableGroup> */}
//         </ComposableMap>
//       </Flex>
//     </>
//   );
// };

// export default Map;
