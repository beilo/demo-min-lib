import { defineConfig } from 'umi';
const pxtorem = require('postcss-pxtorem');

export default defineConfig({
    npmClient: 'pnpm',
    jsMinifier: 'terser',
    cssMinifier: 'cssnano',
    outputPath: 'build',

    cssLoaderModules: {
        localIdentName: '[path][name]__[local]',
    },
    extraBabelPlugins: [
        ['react-css-modules', {
            'generateScopedName': '[path][name]__[local]',
            webpackHotModuleReloading: true,
            handleMissingStyleName: 'warn',
            'filetypes': {
                '.less': {
                    'syntax': 'postcss-less',
                },
            },
        }] as any
    ],

    extraPostCSSPlugins: [
        pxtorem({
            rootValue: 100,
            propList: [
                '*',
                '!min-width',
                '!border',
                '!border-left',
                '!border-right',
                '!border-top',
                '!border-bottom',
            ],
            selectorBlackList: [
                'no_rem',
            ],
        }),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    // 引入被 external 库的 scripts
    // 区分 development 和 production，使用不同的产物
    scripts: process.env.NODE_ENV === 'development' ? [
        'https://cdn.staticfile.org/react/18.2.0/umd/react.development.js',
        'https://cdn.staticfile.org/react-dom/18.2.0/umd/react-dom.development.min.js',
    ] : [
        'https://cdn.staticfile.org/react/18.2.0/umd/react.production.min.js',
        'https://cdn.staticfile.org/react-dom/18.2.0/umd/react-dom.production.min.js',
    ],

});
