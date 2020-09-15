//处理.html代码
const gulp = require("gulp");
const rename = require("gulp-rename");
const minifyCss = require("gulp-minify-css");
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
//处理后缀.js的数据
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
//处理图片
gulp.task("images",function(){
    return gulp.src("images/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
//处理数据.json
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})
//处理scss文件
const sass = require("gulp-sass");
gulp.task("sass",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//一个rename对应一个文件
gulp.task("sassAll",function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//设置一个专门拷贝php数据的任务
gulp.task("php", function(){
    return gulp.src("*.php")
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload());
})
//一次性执行多个任务
gulp.task("build",gulp.series(["copy-html","scripts","images","data","sass","sassAll","php"], async function(){
    console.log("项目建立成功");
}))
//启动监听
const watch = require("gulp-watch");
gulp.task("watch",async function(){
    gulp.watch("*.html",gulp.series("copy-html"));
    gulp.watch(["*.js","!gulpfile.js"] , gulp.series("scripts"));
    gulp.watch("images/*.{jpg,png}",gulp.series("images"));
    gulp.watch(["*.json","!package.json"],gulp.series("data"));
    gulp.watch("stylesheet/index.scss",gulp.series("sass"));
    gulp.watch("stylesheet/*.scss",gulp.series("sassAll"));
    gulp.watch("*.php",gulp.series("php"));

})
//启动服务器
const connect = require("gulp-connect");
const { dest } = require("gulp");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:2222,
        livereload:true
    })
})
gulp.task("default",gulp.series(gulp.parallel(["watch","server"])));