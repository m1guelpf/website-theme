let mix = require('laravel-mix');
const WebpackZipBuild = require('webpack-zip-build');

require('mix-tailwindcss');

Mix.manifest.refresh = _ => void 0

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./**/*.hbs'],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
    .less('src/less/style.less', 'assets/css')
    .options({
        postCss: [
            require('tailwindcss'),
                require('autoprefixer'),
                ...mix.inProduction() ?
                [purgecss, require('cssnano')] :
                []
        ]
    })
    .js('src/js/index.js', 'assets/js')
    .setPublicPath('assets/');