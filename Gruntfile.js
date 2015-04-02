module.exports = function(grunt) {

/**************************************************
開発時
CSS:sass => autoprefixer
JS: jshint

納品時
フォルダコピーしていらないファイルを削除して
css,jsをminify化
copy => clean => concat => uglify => cssmin
**************************************************/

//Gruntの設定
grunt.initConfig({

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
			src : 'dev/_assets/js/lib/*.js',
			// 出力ファイルの名前・パス指定
			dest: 'dev/_assets/js/src/lib.min.js'
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: 'dev/_assets/js/src/main.js',
			dest: 'dev/_assets/js/src/main.min.js'
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
	cssmin: {
		target: {
			expand: true,
			src: ['dev/_assets/**/*.css', '!*.min.css'],
			// 出力先はそのまま
			dest: './',
			// ファイルの拡張子をファイル名.min.cssにする
			ext: '.min.css'
		}
	},

	// 監視
	watch:{
		options: {
			livereload: true
		},
		js: {
			files: ['dev/_assets/js/src/*.js'],
			tasks: ['jshint','concat','uglify']
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


grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');


grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');


// タスクの登録
grunt.registerTask('default', ['connect', 'watch']);
grunt.registerTask('build', ['copy', 'clean', 'concat', 'uglify', 'cssmin']);

};