'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import sherpa        from 'style-sherpa';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import ns            from 'gulp-natural-sort';
import scorm         from 'gulp-scorm-manifest';
import uncss         from 'uncss';
import autoprefixer  from 'autoprefixer';

// Sort JSON
var sortjson = require('gulp-json-sort').default;

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Pull in global.json to use in SCORM manifest
const globaljson = JSON.parse(fs.readFileSync('./src/data/global.json'));

// Load settings from settings.yml
// --------------------------------------------------------------
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// --------------------------------------------------------------
// Build Tasks
// --------------------------------------------------------------

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
 gulp.series(clean, delJson, fm2json, pages, gulp.parallel(sass, javascript, solojs, images, icons, copy, copydata), server));

// Build the site, run the server, and watch for file changes
// --------------------------------------------------------------
gulp.task('default',
  gulp.series('build', watch));

// Delete the "dist" folder
// This happens every time a build starts
// --------------------------------------------------------------
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
// --------------------------------------------------------------
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// --------------------------------------------------------------
// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
// --------------------------------------------------------------
function copydata() {
  return gulp.src(['src/data/global.json','src/data/pages.json'])
    .pipe(gulp.dest(PATHS.dist + '/data'));
}

// Copy page templates into finished HTML files
// --------------------------------------------------------------
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}', { since: gulp.lastRun(pages) })
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    // minify html
    .pipe($.if(PRODUCTION, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    })))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// --------------------------------------------------------------
// Create JSON files
// --------------------------------------------------------------

// Run json task
// --------------------------------------------------------------
gulp.task('json',
  gulp.series(delJson,fm2json));

// Delete the json file
// --------------------------------------------------------------
function delJson(done) {
  rimraf('src/data/pages.json', done);
}

// Generate a json file from front matter.
// --------------------------------------------------------------
function fm2json() {
  return gulp.src('src/pages/**/**/*.html')
    .pipe(require('gulp-gray-matter')())
    .pipe($.data(function(file){

      var relpath = file.relative;
      var path    = relpath.replace(/\\/g,"/"); //flip the window path slashes

      var levels  = path.substring(0, path.lastIndexOf("/")); //get rid of filename

      var l1var   = levels.split('/')[0]; // first level
      var level1  = l1var ? "L1-" + l1var : "";

      var l2var   = levels.split('/')[1]; // second level
      var level2  = l2var ? "L2-" + l2var : "";

      file.data.level2 = level2,
      file.data.level1 = level1,
      file.data.levels = level1 + level2,
      file.data.base   = file.stem,
      file.data.path   = path,

      // including these prevents them from showing up unnecessarily.
      file.data.flush = file.flush,
      file.data.transition = file.transition,
      file.data.body = file.body,
      file.data.layout = file.layout,
      file.data.modules = file.modules,
      file.data.content = file.content
    }))
    .pipe(ns())
    .pipe($.pluck('data', 'pages.json'))
    .pipe($.data(function(file){
      file.contents = new Buffer(JSON.stringify(file.data))
    }))
    .pipe(sortjson({
      space: 2
    }))
    .pipe(gulp.dest('src/data'))
    .pipe(gulp.dest(PATHS.dist + '/data/'))
}


// --------------------------------------------------------------
// Sass
// --------------------------------------------------------------

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src([
    'src/assets/scss/app.scss',
    // 'src/assets/scss/styleguide/styleguide.scss'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}


let webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
}

// --------------------------------------------------------------
// Javascript
// --------------------------------------------------------------

// Combine JavaScript into one file
// In production, the file is minified
// --------------------------------------------------------------
function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Bundle course specific js files
// In production, the file is minified
// --------------------------------------------------------------
function coursejs() {
  return gulp.src(PATHS.coursejs)
    .pipe($.sourcemaps.init())
    .pipe($.concat('course.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}


// Copy javascript files to "dist" folder
// In production, the file is minified
// --------------------------------------------------------------
function solojs() {
  return gulp.src(PATHS.solojs)
    .pipe($.sourcemaps.init())
    .pipe($.babel({ignore: ['what-input.js','jeopSolo.js','ddMulti.js','doOrDoNot.js','dragDrop.js']}))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}


// --------------------------------------------------------------
// SCORM
// --------------------------------------------------------------

function manifest() {
  var cid = globaljson.courseID;
  return gulp.src(PATHS.dist + '/**/*')
    .pipe($.if(PRODUCTION, scorm({
      version: '2004',
      courseId: cid.toLowerCase(),
      SCOtitle: cid.toUpperCase(),
      moduleTitle: globaljson.course,
      launchPage: 'index.html',
      path: '',
      fileName: 'imsmanifest.xml'
    })))
    .pipe(gulp.dest(PATHS.dist));
}

// --------------------------------------------------------------
// Assets
// --------------------------------------------------------------

// Copy images to the "dist" folder
// In production, the images are compressed
// --------------------------------------------------------------
function images() {
  return gulp.src([
    'src/assets/img/**/*',
    'src/assets/svg/*',
    '!src/assets/img/placeholders',
    '!src/assets/img/icons'
  ])
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Create SVG sprite sheet - custom
// --------------------------------------------------------------
function icons() {
  return gulp.src('src/assets/svg/icons/*.svg')
  .pipe($.svgSprite({
    mode: {
      css: {
        dest:   "./",
        layout: "packed",
        sprite: 'img/sprite.svg',
        common: "o-icon",
        prefix: "o-icon-",
        bust: false,
        render: {
          scss: {
            // dest: "scss/objects/_objects.svg-icons.scss",
            template: "src/assets/scss/templates/_templates.svg-icons.scss"
          }
        }
      },
    },
  }))
  .pipe(gulp.dest(PATHS.dist + '/assets/'));
}


// --------------------------------------------------------------
// Clean after production output
// --------------------------------------------------------------
function spotclean(done) {
  rimraf( PATHS.dist + '/styleguide', done);
}

// --------------------------------------------------------------
// Browser sync and file watch
// --------------------------------------------------------------

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/assets/svg/icons/*.svg').on('all', gulp.series(icons, browser.reload));
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.{html,hbs}').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass));
  gulp.watch('src/assets/js/**/**/*.js').on('all', gulp.series(javascript, solojs, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/helpers/**/*').on('all', gulp.series(resetPages, pages, browser.reload));
}
