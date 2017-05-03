/**
 * Created by majdfouqhaa on 5/3/17.
 */
var gulp = require('gulp'),
    g_util = require('gulp-util'),
    coffee = require('gulp-coffee');

// Lets define sources to watch 
var coffeeSource = ['components/coffie/*.coffee'];

// Now we can initialize a gulp task -> lets do that
gulp.task('coffee',function(){
	// Choose the source to watch
	gulp.src(coffeeSource)
	// Pipe the process/ task to be done there
	.pipe(coffee({
		// Options related to gulp-coffee -> check gulp-coffee repo on github
		bare	:true
	}))
	// To prevent gulp process blocking, means when error happens continuo the work
	.on('error',g_util.log)
	// Finally, choose the destination for output
	.pipe(gulp.dest('components/scripts'))
});
