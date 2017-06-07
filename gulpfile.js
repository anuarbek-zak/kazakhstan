const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const  del = require('del');
const image = require('gulp-image');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');
const combiner = require('stream-combiner2');
// const gutil = require("gulp-util");


gulp.task('css', () =>{

  const combined = combiner.obj([
      gulp.src('frontend/**/*.less')
          .pipe(less())
          .pipe(autoprefixer({
              browsers: ['last 4 versions'],
              cascade: false
          }))
          .pipe(cleanCSS())
          .pipe(concatCss("index.css"))
        .pipe(gulp.dest('public'))
  ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));

  return combined;
});

gulp.task('html',()=>{
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('js',()=>{
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('clean' ,()=> {
    return del('dist');
});

gulp.task('watch',()=> {
    gulp.watch('index.less',['less']);
});


gulp.task('image', ()=> {
  gulp.src('images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default',['clean','html','css','js','image']);