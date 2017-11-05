import gulp from 'gulp';
import gulpIf from 'gulp-if';
import liveReload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',()=>{
    return gulp.src('app/**/*.ejs')
        .pipe(gulp.dest('server'))
        .pipe(gulpIf(args.watch,liveReload()))
});
