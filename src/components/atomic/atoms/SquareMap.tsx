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
//   Marker,
//   // ZoomableGroup,
// } from 'react-simple-maps';

// import { useContext, useEffect, useState } from 'react';
// import { Flex } from '@chakra-ui/layout';
// import {
//   getCenters, colorInRange, getBbox, getLimits, plotGrid, plotSections,
// } from '../../../core/Core';
// import goias from '../../../maps/goias.json';

// import grid from '../../grid/grid.json';

// import theme from '../../../styles/theme';

// import { Limits as GlobalArray } from '../../limits/Limits';
// import { MapContext } from '../../../contexts/MapContext';

// // export const CircMap = ({ limits, colors, ...props }) => {
// //   const centers = getCenters(grid.features);

// //   const test = (circ) => {
// //     for (let l = 0; l < limits.length; l++) {
// //       if (
// //         colorInRange(circ.geometry.coordinates[1], limits[l][0], limits[l][1])
// //       ) {
// //         return colors[l];
// //       }
// //     }
// //   };

// export const SquareMap = ({
//   percentages,
//   colors,
//   rotateParam = [49.5, 16, 0],
//   ...props
// }) => {
//   // const { actualLimits, centers } = useContext(MapContext);
//   // const centers = getCenters(grid.features);

//   const gridItemSize = 20; // km^2
//   const bbox = getBbox(goias.features); // bbox original shape
//   const grid = plotGrid(bbox, gridItemSize, goias);
//   const centers = getCenters(grid.features);
//   const cliped = plotSections(goias, percentages);
//   const limits = getLimits(cliped);

//   const test = (circ) => {
//     for (let l = 0; l < limits.length; l++) {
//       if (
//         colorInRange(
//           circ.geometry.coordinates[1],
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
//           projectionConfig={{ scale: 5500, rotate: rotateParam }}
//         >
//           {centers?.map((circ, index) => (
//             <Marker key={index} coordinates={circ.geometry.coordinates}>
//               <rect width="13" height="13" fill={test(circ)} />
//             </Marker>
//           ))}
//         </ComposableMap>
//       </Flex>
//     </>
//   );
// };

// export default Map;
