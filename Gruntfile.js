module.exports = function(grunt) {

/**************************************************
開発時
CSS:sass => autoprefixer
JS: jshint

納品時
フォルダコピーしていらないファイルを削除して
css,jsをminify化
copy => clean => uglify => cssmin
**************************************************/

//Gruntの設定
grunt.initConfig({

	pkg: grunt.file.readJSON('package.json'),

	// ローカルサーバー設定
	connect: {
		options: {},
		livereload: {
			options: {
				base: 'dev/',// rootを設定
				open: true
			}
		}
	},

	sprite: {
		all:{
			src: 'dev/_assets/_sprite/*.png',
			destCSS: 'dev/_assets/_sass/_sprite.scss',
			destImg: 'dev/_assets/img/sprite.png'
		}
	},

	jshint: {
		// 対象となるファイルを定義します
		files: ['dev/_assets/js/src/*.js'],
		// JSHintを構成します。(参照: http://www.jshint.com/docs/)
		options: {
			// JSHintの初期値を上書きしたい場合、ここにオプションを更に追加します
			globals: {
				jQuery: true,
				console: true,
				module: true
			}
		}
	},
	concat: {
		files: {
			// 元ファイルの指定。
			src : ['dev/_assets/js/lib/*.js','!dev/_assets/js/lib/scripts.min.js'],
			// 出力ファイルの名前・パス指定
			dest: 'dev/_assets/js/lib/scripts.min.js'
		}
	},
	sass: {
		target: {
			src: 'dev/_assets/_sass/*.scss',
			dest: 'dev/_assets/css/style.css'
		},
		options: {
			sourcemap: 'none'
		}
	},
	autoprefixer: {
		target: {
			src: 'dev/_assets/css/style.css',
			dest: 'dev/_assets/css/style.css'
		},
		option: {
			browsers: ['last 2 version', 'ie 8', 'ie 9']
		}
	},
	// 公開用にcssを圧縮
	cssmin: {
		target: {
			expand: true,
			cwd: 'dev/_assets/css',
			src: '*.css',
			dest: 'dist/_assets/css',
			ext: '.css'
		}
	},
	// 公開用にjsを圧縮
	uglify: {
		task1: {
			options: {
				banner: '/* \n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  \n main.js\n*/\n',
				compress: {
					drop_console: true
				}
			},
			src: 'dev/_assets/js/src/main.js',
			dest: 'dist/_assets/js/src/main.js'
		},
		task2: {
			options: {
				banner: '/* \n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  \n lin.min.js\n*/\n',
				compress: {
					drop_console: true
				}
			},
			src: 'dev/_assets/js/lib/scripts.min.js',
			dest: 'dist/_assets/js/lib/scripts.min.js'
		}
	},
	// 公開用にdistフォルダにコピー
	copy: {
		dist: {
			expand: true,
			cwd: 'dev/',
			dest: 'dist',
			src: '**'
		}
	},
	// 公開フォルダから不要なデータを削除
	clean: {
		build: [
			'dist/_assets/_sass',
			'dist/_assets/js/lib/jquery-1.11.2.min.js',
			'dist/_assets/js/lib/util.js'
		]
	},

	// 監視
	watch:{
		options: {
			livereload: true
		},
		js: {
			files: ['dev/_assets/js/src/*.js'],
			tasks: ['jshint']
		},
		jsLib: {
			files: ['dev/_assets/js/lib/*.js','!scripts.min.js'],
			tasks: ['concat']
		},
		sass: {
			files: ['dev/_assets/_sass/*.scss'],
			tasks: ['sass','autoprefixer']
		},
		livereload: {
			files: ['dev/**/*']
		}
	}
});

grunt.loadNpmTasks('grunt-spritesmith');

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-htmlmin');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');


grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');


// タスクの登録
grunt.registerTask('default', ['connect', 'watch']);
grunt.registerTask('build', ['copy', 'clean', 'uglify', 'cssmin']);
grunt.registerTask('sprite', ['sprite']);

};