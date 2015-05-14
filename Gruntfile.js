module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt)

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    debug: true
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: 35729 //监听前面声明的端口  35729
                },

                files: [  //下面文件的改变就会实时刷新网页
                  '*.html'
                ]
            }
        }
    });

    // 默认被执行的任务列表。
    grunt.registerTask('default', function () {
        grunt.task.run(['connect:server', 'watch']);
    });

};