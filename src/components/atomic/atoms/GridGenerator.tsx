/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import {
  getBbox, getLimits, plotGrid, plotSections,
} from '../../../core/Core';
import goias from '../../../maps/goias.json';

function saveJsonObjToFile(grid) {
  const saveObj = grid; // tmp

  // file setting
  const text = JSON.stringify(saveObj);
  const name = 'grid.json';
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
export default function SectionsGenerator() {
  const gridItemSize = 20; // km^2
  const bbox = getBbox(goias.features); // bbox original shape
  const grid = plotGrid(bbox, gridItemSize, goias);
  saveJsonObjToFile(grid);
  return <></>;
}
