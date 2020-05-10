'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("node-sass")
const autoprefixer = require('gulp-autoprefixer');
const imgmin = require('gulp-imagemin')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const plumber = require('gulp-plumber')

// src paths
const js_src = './public/scripts/*.js'
const sass_src = './public/css/*.scss'
const img_src = './public/images/*'
const uploads_src = './public/uploads/*'

// dist paths
const js_dest = './public'
const js_dest_name = 'scripts.js'
const sass_dest = './public'
const img_dest = './public/images'
const uploads_dest = './public/uploads'

function imgMinify() {
  
}

gulp.task('sass', function(){
  return gulp.src(sass_src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest(sass_dest))
})

gulp.task('scripts', function(){
  return gulp.src(js_src)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dest_name))
    .pipe(gulp.dest(js_dest))
})

gulp.task('images', function(){
  return gulp.src(img_src)
    .pipe(imgmin())
    .pipe(gulp.dest(img_dest))
})

gulp.task('uploads', function(){
  return gulp.src(uploads_src)
    .pipe(imgmin())
    .pipe(gulp.dest(uploads_dest))
})

gulp.task('default', function(){
  gulp.watch([js_src], gulp.series('scripts'));
  gulp.watch([sass_src], gulp.series('sass'));
  gulp.watch([img_src], gulp.series('images'));
  gulp.watch([uploads_src], gulp.series('uploads'));
})

