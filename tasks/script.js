// Gulp包
import gulp from 'gulp';
// 用Gulp语句做if判断
import gulpIf from 'gulp-if';
// 在Gulp中处理文件拼接
import concat from 'gulp-concat';
// 打包使用webpack
import webpack from 'webpack';
// 结合webpack文件流
import gulpWebpack from 'webpack-stream';
// 文件重命名做标志
import named from 'vinyl-named';
// 浏览器实时刷新
import liveReload from 'gulp-livereload';
// 处理文件信息流
import plumber from 'gulp-plumber';
// 对文件进行重命名
import rename from 'gulp-rename';
// 压缩JS与CSS压缩
import uglify from 'gulp-uglify';
// 在命令行工具中输出用包
import {log,color} from 'gulp-util';
// 对命令行参数进行解析
import args from './util/args';

/* 创建脚本编译任务 */
gulp.task('script',()=>{
    return gulp.src(['app/js/index.js'])
        .pipe(plumber({
            errorHandle: function(){

            }
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }),null,(err,stats)=>{
            log(`Finished '${colors.cyan('script')}'`,stats.toString({
                chunks: false
            }))
            })
        /*生成文件到指定的目录内*/
        .pipe(gulp.dest('server/public/js'))
        /*对生成文件进行重命名并压缩*/
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        /*对压缩后的文件进行重新保存*/
        .pipe(uglify({
            compress: {
                properties:false
            },
            output: {
                'quote_keys': true
            }
        }))
        .pipe(gulp.dest('server/public/js'))
        /*监听文件自动刷新*/
        .pipe(gulpif(args.watch,liveReload()))
});