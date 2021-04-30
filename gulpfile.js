const distFolder = "dist";
const srcFolder = "src";

const paths = {
    src: {
        css: srcFolder + "/scss/**/*.scss",
        js: srcFolder + "/js/**/*.js",
        image: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        font: srcFolder + "/font/**/*.{woff,woff2,ttf,eot}",
        html: [srcFolder + "/html/**/*.html", "!" + srcFolder + "/html/**/_*.html"],
    },
    dist: {
        css: distFolder + "/css/",
        js: distFolder + "/js/",
        image: distFolder + "/img/",
        font: distFolder + "/font/",
        html: "./"
    },
    watch: {
        css: srcFolder + "/scss/**/*.scss",
        js: srcFolder + "/js/**/*.js",
        html: srcFolder + "/html/**/*.html",
    },
    clean: "./" + distFolder + "/",
}

const {src, dest} = require("gulp"),
    {series, parallel} = require("gulp"),
    gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    del = require("del"),
    scss = require("gulp-sass"),
    cleanCss = require("gulp-clean-css"),
    uglifyJs = require("gulp-uglify"),
    imageMin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    autoprefixer = require("gulp-autoprefixer"),
    fileInclude = require("gulp-file-include"),
    mediaQueryOptimizer = require("gulp-group-css-media-queries");


function brswSync() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        port: 3000,
        notify: false
    })
}

function css(){
    return src(paths.src.css)
        .pipe(concat("styles.min.css"))
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            overrideBrowserList: ["last 2 versions"],
            cascade: true
        }))
        .pipe(mediaQueryOptimizer())
        .pipe(cleanCss())
        .pipe(dest(paths.dist.css))
        .pipe(browserSync.stream())
}

function js(){
    return src(paths.src.js)
        .pipe(concat("scripts.min.js"))
        .pipe(uglifyJs())
        .pipe(dest(paths.dist.js))
        .pipe(browserSync.stream())
}

function html() {
    return src(paths.src.html)
        .pipe(fileInclude())
        .pipe(dest(paths.dist.html))
        .pipe(browserSync.stream())
}

function fonts() {
    return src(paths.src.font)
        .pipe(dest(paths.dist.font))
}

function img(){
    return src(paths.src.image)
        .pipe(imageMin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 5,
        }))
        .pipe(dest(paths.dist.image))
        .pipe(browserSync.stream())
}

function watchFiles() {
    gulp.watch([paths.watch.css], css);
    gulp.watch([paths.watch.js], js);
    gulp.watch([paths.watch.html], html);
}

function clean() {
    return del(paths.clean);
}

const build = series(clean, css, fonts, js, html, img);
const dev = parallel(brswSync, watchFiles, series(img, fonts, css, js, html));

exports.default = build;
exports.dev = dev;
exports.build = build;
