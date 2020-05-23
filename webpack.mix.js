let mix = require('laravel-mix');

require('mix-tailwindcss');

Mix.manifest.refresh = _ => void 0

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
	.copy('src/fonts/*', 'assets/fonts')
    .options({
        postCss: [
            require('tailwindcss'),
			require('autoprefixer'),
        ]
    })
    .webpackConfig({
        output: {
            publicPath: '/assets/',
            chunkFilename: 'js/[name].js?[chunkhash]',
        },
    })
    .js('src/js/index.js', 'assets/js')
    .setPublicPath('assets/');