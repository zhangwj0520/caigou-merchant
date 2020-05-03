import { lazy } from 'react';
import { injectReducer } from '@store/index';

const modulesFiles = require.context('@pages', true, /module.js$/);
const paths = modulesFiles.keys();

function loadable(str) {
  return lazy(async () => {
    const path = `./${str}/module.js`;
    if (paths.includes(path)) {
      import(`@pages/${str}/module.js`).then((mod) => {
        const { reducer, name } = mod.default;
        injectReducer(name, reducer);
      });
    }
    return import(`@pages/${str}`);
  });
}

export default loadable;
