/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */

import {
  point,
  featureCollection,
  envelope,
  bboxPolygon,
  bboxClip,
  BBox,
  polygon,
  area,
  centerOfMass,
  squareGrid,
  lineString,
  lineIntersect,
  booleanWithin,
  Polygon,
  Feature,
  Units,
  MultiPolygon,
} from '@turf/turf';

type squareGridProps = {
  units?: Units;
  properties?: {};
  mask?:
    | Polygon
    | MultiPolygon
    | Feature<Polygon | MultiPolygon, { [name: string]: any }>;
};

export function getBbox(data) {
  const coordinates = data[0].geometry.coordinates[0];
  const turfPoints = [];

  coordinates.map((value) => {
    turfPoints.push(point([value[0], value[1]]));
  });

  const featureCollectionOfPoints = featureCollection(turfPoints);
  const enveloped = envelope(featureCollectionOfPoints);
  const poly = bboxPolygon(enveloped.bbox);
  return poly;
}

export function plotSections(map, percentages) {
  const bbox = getBbox(map?.features); // bbox original shape
  let bboxAuxiliary = getBbox(map?.features); // bbox auxiliary
  const clipedSections = [];

  for (let i = 0; i < percentages?.length; i++) {
    const higherLimit = bboxAuxiliary?.geometry?.coordinates[0][2][1];
    const inferiorLimit = bboxAuxiliary?.geometry?.coordinates[0][1][1];
    clipedSections[i] = definePolyBasedPercentage(
      map,
      bboxAuxiliary,
      percentages[i],
      inferiorLimit,
      higherLimit,
    );
    bboxAuxiliary = getPersonalizedBbox(
      bbox,
      bboxAuxiliary?.geometry?.coordinates[0][2][1],
    ); // getBbox([clipedSections[0]]).bbox[3]
  }

  return clipedSections;
}

export function definePolyBasedPercentage(
  map,
  bboxAuxiliary,
  targetPercentage,
  inferiorLimit,
  higherLimit,
) {
  const totalArea = calcularAreaOriginal(map.features);
  const interval = higherLimit - inferiorLimit;
  const distribution = [];

  for (let i = 0; i < 100; i++) {
    distribution[99 - i] = higherLimit - (interval * i) / 100;
  }

  let previousClipedArea = bboxClip(
    map.features[0].geometry,
    bboxAuxiliary.bbox,
  );

  for (let j = 0; j < 100; j++) {
    const aux = distribution[j];
    bboxAuxiliary.bbox[3] = aux;
    bboxAuxiliary.geometry.coordinates[0][2][1] = aux;
    bboxAuxiliary.geometry.coordinates[0][3][1] = aux;
    const cliped = bboxClip(map.features[0].geometry, bboxAuxiliary.bbox);

    const clipedArea = calcularAreaOriginal([cliped]);
    const clipedPercentualOfTotalArea = (clipedArea * 100) / totalArea;

    if (clipedPercentualOfTotalArea >= targetPercentage) {
      previousClipedArea = cliped;
      break;
    } else previousClipedArea = cliped;
  }
  return previousClipedArea;
}

export function calcularAreaOriginal(data) {
  const polygonSelected = polygon(data[0].geometry.coordinates);
  const areaSelected = area(polygonSelected);
  return areaSelected;
}

export function getPersonalizedBbox(bbox, newInferiorLimit) {
  const bbox_teste: BBox = [
    bbox.bbox[0],
    newInferiorLimit,
    bbox.bbox[2],
    bbox.bbox[3],
  ];
  const poly = bboxPolygon(bbox_teste);
  return poly;
}

export function getLimits(cliped) {
  const limits = [];

  for (let i = 0; i < cliped.length; i++) {
    const sectionsBbox = [];
    sectionsBbox[i] = getBbox([cliped[i]]);
    limits[i] = [
      sectionsBbox[i].geometry.coordinates[0][0][1],
      sectionsBbox[i].geometry.coordinates[0][2][1],
    ];
  }

  return limits;
}

export function getCenters(featureCollection) {
  const centers = [];
  for (let i = 0; i < featureCollection.length; i++) {
    centers[i] = centerOfMass(featureCollection[i]);
  }
  return centers;
}

export function colorInRange(objectLongitude, limit1, limit2) {
  return (
    (objectLongitude >= limit1 && objectLongitude <= limit2)
    || (objectLongitude >= limit2 && objectLongitude <= limit1)
  );
}

export function plotGrid(bbox, km2, map) {
  const cellSide = km2;
  //  var options = {units: 'kilometers', mask:map};
  const options: squareGridProps = {
    units: 'kilometers',
    properties: {},
    mask: map,
  };
  const squareGrid1 = squareGrid(bbox.bbox, cellSide, options);
  // console.log(squareGrid);
  return squareGrid1;
}

export function getAllLineStrings(lines) {
  const lineStrings = [];

  for (let i = 0; i <= lines.length - 1; i++) {
    if (lines[i].length > 0) {
      if (lines[i].length < 2) lines[i].push(lines[i][0]);
      lineStrings[i] = lineString([
        [
          lines[i][0].geometry.coordinates[0],
          lines[i][0].geometry.coordinates[1],
        ],
        [
          lines[i][lines[i].length - 1].geometry.coordinates[0],
          lines[i][lines[i].length - 1].geometry.coordinates[1],
        ],
      ]);
    }
  }

  return lineStrings;
}

export function getLinesOnAxisXY(scaleFactor, bbox) {
  const limitTop = bbox.geometry.coordinates[0][2][1];
  const limitBottom = bbox.geometry.coordinates[0][0][1];
  const limitLeft = bbox.geometry.coordinates[0][0][0];
  const limitRight = bbox.geometry.coordinates[0][1][0];
  const spaceBetweenLinesX = getModuleInterval(
    limitTop,
    limitBottom,
    scaleFactor,
  );
  const spaceBetweenLinesY = getModuleInterval(
    limitLeft,
    limitRight,
    scaleFactor,
  );

  const linesOnAxisX = [];
  const linesOnAxisY = [];
  for (let i = 0; i <= scaleFactor; i++) {
    const positionY = limitBottom + spaceBetweenLinesX * i;
    const positionX = limitLeft + spaceBetweenLinesY * i;

    linesOnAxisX[i] = lineString([
      [limitLeft, positionY],
      [limitRight, positionY],
    ]);

    linesOnAxisY[i] = lineString([
      [positionX, limitBottom],
      [positionX, limitTop],
    ]);
  }

  return [linesOnAxisX, linesOnAxisY];
}

export function getGridPointsPerLines(scaleFactor, linesOnAxisX, linesOnAxisY) {
  const gridPointsPerLines = [[]];
  for (let k = 0; k <= scaleFactor; k++) {
    gridPointsPerLines[k] = [];

    for (let l = 0; l <= scaleFactor; l++) {
      // eslint-disable-next-line prefer-destructuring
      gridPointsPerLines[k][l] = lineIntersect(
        linesOnAxisX[k],
        linesOnAxisY[l],
      ).features[0];
    }
  }

  return gridPointsPerLines;
}

export function getAllLines(gridPointsPerLines, polyMap) {
  const lines = [[]];
  let actualLineIndex = 0;

  for (let i = 0; i <= gridPointsPerLines.length - 1; i++) {
    lines[actualLineIndex] = [];

    let pastPointIsInMap = false;

    for (let j = 0; j <= gridPointsPerLines[i].length - 1; j++) {
      const point = gridPointsPerLines[i][j];

      if (booleanWithin(point, polyMap)) {
        // actual point is in map ?
        lines[actualLineIndex].push(point);
        pastPointIsInMap = true;
      } else if (pastPointIsInMap) {
        actualLineIndex += 1;
        lines[actualLineIndex] = [];
        pastPointIsInMap = false;
      }
    }
  }

  return lines;
}

export function getModuleInterval(limit1, limit2, scaleFactor) {
  return Math.abs(
    (Math.abs(limit1) - Math.abs(limit2)) / Math.abs(scaleFactor),
  );
}
