import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'bundle/sly-useragent.js',
      format: 'cjs'
    },
    {
      file: 'bundle/sly-useragent.es.js',
      format: 'es'
    },
    {
      file: 'bundle/sly-useragent.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [json()]
};
