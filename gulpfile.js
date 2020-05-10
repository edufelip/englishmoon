'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("node-sass")
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const img = require('gulp-imagemin')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const plumber = require('gulp-plumber')

// src paths
const js_src = './public/scripts/*.js'
const sass_src = './public/css/*.scss'

// dist paths
const js_dest = './public'
const js_dest_name = 'scripts.js'
const sass_dest = './public'
const sass_dest_name = 'styles.css'

gulp.task('sass', function(){
  return gulp.src(sass_src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(sass_dest))
})

gulp.task('scripts', function(){
  return gulp.src(js_src)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dest_name))
    .pipe(gulp.dest(js_dest))
})

gulp.task('default', function(){
  gulp.watch([js_src], ['scripts'])
})

