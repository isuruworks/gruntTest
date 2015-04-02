console.log('aaa');

var obj = {};

window.onload = function(){
	obj.init();
};

obj = {
	init : function(){
		var that = this;
		console.log('load');
	}
};