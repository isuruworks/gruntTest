//Object
var util = {};

//init
util = {
	ua : function () {
		var userAgent = window.navigator.userAgent.toLowerCase();
		var appVersion = window.navigator.appVersion.toLowerCase();

		if (userAgent.indexOf("ipad") > -1) {
			userAgent = "iPad";
		}
		else if (userAgent.indexOf("iphone") > -1) {
			userAgent = "iPhone";
		}
		else if (userAgent.indexOf("Android") > -1) {
			userAgent = "Android";
		}
		else if (userAgent.indexOf("msie") > -1) {
			userAgent = "IE";
		}
		else if (userAgent.indexOf("firefox") > -1) {
			userAgent = "Firefox";
		}
		else if (userAgent.indexOf("opera") > -1) {
			userAgent = "Opera";
		}
		else if (userAgent.indexOf("chrome") > -1) {
			userAgent = "Chrome";
		}
		else if (userAgent.indexOf("safari") > -1) {
			userAgent = "Safari";
		}
		else {
			userAgent = "Unknown";
		};
		return userAgent;
	},
	pcsp : function(){ // pc:true / sp:false
		if(util.ua() == 'iPad' || util.ua() == 'iPhone' || util.ua() == 'Android'){
			var bln = false;
		}else{
			var bln = true;
		};
		return bln;
	},
	sw : function () {
		if ( window.innerWidth ) {return window.innerWidth;}
		else if ( document.documentElement && document.documentElement.clientWidth != 0 ) {return document.documentElement.clientWidth;}
		else if ( document.body ) {return document.body.clientWidth;};
		return 0;
	},
	sh : function () {
		if ( window.innerHeight ) {return window.innerHeight;}
		else if ( document.documentElement && document.documentElement.clientHeight != 0 ) {return document.documentElement.clientHeight;}
		else if ( document.body ) {return document.body.clientHeight;};
	},
	scrollX : function () {
		return document.documentElement.scrollLeft || document.body.scrollLeft;
	},
	scrollY : function () {
		return document.documentElement.scrollTop || document.body.scrollTop;
	},
	smoothScroll : function () {
		$('a[href^=#]').click(function() {
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? "html" : href);
			var position = target.offset().top;
			$($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	},
	elementHeight : function (elem) {
		var elem = $(elem);
		var maxHeight = 0;
		for(var i = 0,len = elem.length;i < len;i++){
			if(maxHeight < elem.height()) maxHeight = elem.height();
		};
		$('.box').css({height: maxHeight});
	},
	footerFixed : function (elem) {
		var elem = $(elem);
		var elemH = elem.height();
		winH = $(window).height();
		bodyH = $('body').height();
		if(winH > bodyH) var intH = winH;
		else var intH = bodyH;
		console.log(intH);
		elem.css({top: intH - elemH,left: 0});
	},
	addEvent : function (elem,lis,fn) {
		try{
			elem.addEventListener(lis,fn,false);
		}catch(e){
			elem.attachEvent("on"+lis,fn);
		};
	},
	removeEvent : function (elem,lis,fn) {
		try{
			elem.removeEventListener(lis,fn,false);
		}catch(e){
			elem.detachEvent("on"+lis,fn);
		};
	},
	getQuery : function(){
		var that = this;
		var result = {};
		if( 1 < window.location.search.length ){
			var query = window.location.search.substring( 1 );
			var parameters = query.split( '&' );
			for( var i = 0; i < parameters.length; i++ ){
				var element = parameters[ i ].split( '=' );
				var paramName = decodeURIComponent( element[ 0 ] );
				var paramValue = decodeURIComponent( element[ 1 ] );
				result[ paramName ] = paramValue;
			};
		};
		return result;
	},
	// util.ratioCulc(外枠W,外枠H,内枠W,内枠H,小さい方[true]か大きい方[false])
	ratioCulc : function(num1,num2,num3,num4,bln){
		var that = this;
		var ratioW = num1 / num3;
		var ratioH = num2 / num4;
		if(bln){
			var ratio = ratioW < ratioH? ratioW : ratioH;
		}else{
			var ratio = ratioW > ratioH? ratioW : ratioH;
		};
		var ary = [];
		ary[0] = num3 * ratio;
		ary[1] = num4 * ratio;
		ary[2] = ratio;
		return ary;
	}
};
