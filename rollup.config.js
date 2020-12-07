import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const terser = require('rollup-plugin-terser').terser

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/presenta-block-flowchartjs.min.js',
    format: 'umd',
    name: 'PresentaBlockFlowchartjs',
    sourcemap: false
  },
  watch: {
    exclude: 'dist/*',
    include: 'src/**'
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    commonjs(),
    postcss({
      modules: {
        globalModulePaths: [
          /global/
        ]
      },
      autoModules: false,
      plugins: [
        autoprefixer({ grid: true }),
        cssnano({ preset: 'default' })
      ]
    })
  ]
}
