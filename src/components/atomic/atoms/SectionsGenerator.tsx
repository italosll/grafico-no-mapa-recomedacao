/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import {
  getBbox, getLimits, plotGrid, plotSections,
} from '../../../core/Core';
import goias from '../../../maps/goias.json';

function saveJsonObjToFile(limits) {
  const saveObj = limits; // tmp

  // file setting
  const text = JSON.stringify(saveObj);
  const name = 'q.json';
  const type = 'text/plain';

  // create file
  const a = document.createElement('a');
  const file = new Blob([text], { type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
export default function LimitsGenerator() {
  const percentages = [40, 30, 30];
  const cliped = plotSections(goias, percentages);
  const limits = getLimits(cliped);
  useEffect(() => {
    saveJsonObjToFile(limits);
  }, []);
  return <></>;
}
