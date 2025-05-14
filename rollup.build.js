import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';


export default {
    input: 'src/index.tsx',
    output: {
        name: 'paint',
        file: 'build/paint.js',
        format: 'iife'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__REACT_DEVTOOLS_GLOBAL_HOOK__': 'undefined'
        }),
        resolve(),
        commonjs({ sourceMap: false }),
        typescript({
            compilerOptions: {
                jsx: 'preserve',
                allowImportingTsExtensions: true,
                noEmit: true,
                allowSyntheticDefaultImports: true
            },
            noForceEmit: true
        }),
        babel({
            babelHelpers: 'bundled',
            presets: [
                '@babel/preset-react', '@babel/preset-typescript',
                ['@babel/preset-env', {
                    useBuiltIns: 'usage',
                    corejs: 3
                }]
            ],
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
            exclude: ['node_modules/core-js/**'],
        }),
        terser({
            compress: {
                unsafe: true
            },
            format: {
                comments: false
            }
        }),
        postcss({
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName: '[hash:base64:3]'
            },
            autoModules: false,
            minimize: {
                preset: ['cssnano-preset-advanced']
            },
            extract: true
        })
    ]
};