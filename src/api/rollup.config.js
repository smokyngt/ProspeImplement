import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/prosperify-sdk.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/prosperify-sdk.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser(),
  ],
  external: [
    'axios', // Assuming axios is used for HTTP requests
  ],
};