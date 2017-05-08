/**
 * Created by majdfouqhaa on 5/3/17.
 */
var gulp = require('gulp'),
    g_util = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass')
    ;

// Lets define sources to watch 
var coffeeSource = ['components/coffee/*.coffee'],
	jsSource = ['components/scripts/*.js'],
	sassSource = ['components/sass/style.scss']
	;
// Now we can initialize a gulp task -> lets do that
gulp.task('coffee',function(){
	// Choose the source to watch
	gulp.src(coffeeSource)
	// Pipe the process/ task to be done there
	.pipe(coffee({
		// Options related to gulp-coffee -> check gulp-coffee repo on git-hub
		bare	:true
	}))
	// To prevent gulp process blocking, means when error happens continue the work
	.on('error',g_util.log)
	// Finally, choose the destination for output
	.pipe(gulp.dest('components/scripts'))
});


// Concatenating javaScript files using gulp-concat
gulp.task('jsConcat',function(){

	gulp.src(jsSource)
		.pipe(concat('script.js'))
		// Adding browserify to fetch packages automatically
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))

});

/*

	Note: because we are using compass in this project we need to use gulp-compass. But, if we want to use sass only we can use gulp-sass that will hold all that stuff.

	Don't forget -> use return sass(sourceFile) instead of gulp.src(soruceFile). 

*/

//Compiling Sass files to style.css
gulp.task('sass',function(){

	gulp.src(sassSource)
		.pipe(compass({
			sass 		 :'components/sass',
			image    :'builds/development/images',
			style    :'expanded'
		}))
		.on('error', g_util.log)
		.pipe(gulp.dest('builds/development/css'))

});
// After creating all required tasks, we need to watch them auto -> so to do that
// WE have to create a watch task. Let's do that 
gulp.task('watch', function() {
		
	// Here we have to specify what to watch and tasks related to it 
	gulp.watch(coffeeSource, ['coffee']);
	gulp.watch(jsSource, ['jsConcat']);
	gulp.watch('components/sass/*.scss', ['sass']);

});

// WE can fire a gulp command alone. As a result, it will look for default task
// Which is created down below

gulp.task('default', ['coffee', 'jsConcat', 'sass', 'watch']);