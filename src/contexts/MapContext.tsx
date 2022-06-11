/* eslint-disable import/prefer-default-export */

import { Feature, Point } from '@turf/helpers';
import {
  createContext, useContext, useEffect, useState,
} from 'react';

import grid from '../components/grid/grid.json';
import { getCenters } from '../core/Core';
import { Limits as GlobalArray } from '../components/limits/Limits';

interface MapContextProps {
  actualLimits: Array<number> | any;
  centers: Array<Feature<Point>>;
}

export const MapContext = createContext({} as MapContextProps);

export function MapContextProvider({ children }) {
  const [actualLimits, setActualLimits] = useState(GlobalArray[0]);
  const [centers] = useState(getCenters(grid.features));


  useEffect(() => {
      setActualLimits([30,30,40]);
  }, []);

  return (
    <MapContext.Provider
      value={{
        actualLimits,
        centers,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
