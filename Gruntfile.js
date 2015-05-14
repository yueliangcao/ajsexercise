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
                    livereload: 35729 //����ǰ�������Ķ˿�  35729
                },

                files: [  //�����ļ��ĸı�ͻ�ʵʱˢ����ҳ
                  '*.html'
                ]
            }
        }
    });

    // Ĭ�ϱ�ִ�е������б�
    grunt.registerTask('default', function () {
        grunt.task.run(['connect:server', 'watch']);
    });

};