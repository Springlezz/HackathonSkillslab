import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';


export default {
    input: 'src/index.tsx',
    output: {
        file: 'build/bundle.js',
        format: 'iife'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('development')
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
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
            extensions: ['.js', '.ts', '.jsx', '.tsx']
        }),
        postcss({
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName: '[local]_[name]_[hash:base64:3]'
            },
            autoModules: false,
            extract: true
        })
    ]
};