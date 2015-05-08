/*!
 
 @Name : svgClock v1.2 - 时钟插件
 @Author: mayte
 @Site：http://mayte1990.github.io
 @License：MIT
 
 */

;!function(win){
"use strict";
var doc = document;
document.write("<script language='javascript' src='js/snap.svg.js'></script>"); 

win.svgClock = function(option){
	option = option || {};
	//配置
	var config = {
		width : option.width || 238,
		height : option.height ||  282,
	}
	config.cth = 45*config.width/238;
	config.x = config.width/2;
	config.y = config.height-(config.height-44)/2;
	config.ra = config.x;



	init(config);//调用

	//初始化调用
	function init(my){
		var width = my.width,height = my.height;
		var svg = container(width,height);
		animate(svg,my.ra,my.cth,width,height,my.x,my.y);
	};
	
	//初始化svg容器
	function container(width,height){
		var div = doc.createElement("div");
		doc.body.appendChild(div);
		div.innerHTML = '<svg display="none" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
		     +'<symbol id="icon-clock" viewBox="0 0 864 1024">'
		      +' <title>clock</title>'
		       +' <path class="path1" d="M471.392 524.746v-168.47h-78.565v168.47c-23.399 13.61-39.282 38.77-39.282 67.845 0 29.122 15.883 54.159 39.282 67.849v50.307h78.565v-50.307c23.439-13.69 39.286-38.727 39.286-67.849 0.004-29.075-15.847-54.236-39.286-67.845z"></path>'
		       +' <path class="path2" d="M776.177 331.246l86.049-86.426-83.318-83.54-86.045 86.426c-62.762-47.732-138.56-78.888-221.467-86.343v-80.78h39.286v-78.768h-157.133v78.768h39.282v80.769c-220.2 19.917-392.831 205.232-392.831 431.231 0 239.242 193.46 433.232 432.113 433.232 238.614 0 432.113-193.99 432.113-433.228 0-98.308-33.073-188.648-88.049-261.342zM432.113 947.055c-194.959 0-353.549-159-353.549-354.464s158.586-354.464 353.549-354.464c194.992 0 353.541 158.996 353.541 354.46s-158.549 354.467-353.541 354.467z"></path>'
		    +' </symbol>'
		 +'</svg>';
		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg.id = "svg";
		svg.setAttribute("width", width);
    	svg.setAttribute("height", height);
		svg.innerHTML = '<svg class="icon icon-clock"><use xlink:href="#icon-clock"></use></svg>';
		div.appendChild(svg);

		var s = Snap("#svg");
		s.image('c.png',0,0,width,height);
		return s;
	};

	//求角度
	function arc2(value,total,R,x,y){
	  	var alpha = 360 / total * value,
	      a = (90 - alpha) * Math.PI / 180,
	      x2 = x + R * Math.cos(a),
	      y2 = y - R * Math.sin(a);
	  	return "M"+x+","+(y-R)+"A"+R+","+R+","+0+","+(+(alpha > 180))+","+1+","+x2+","+y2+"L"+x+","+y+"Z";
	}

	//动画
	function animate(s,ra,cth,width,height,x,y){
		var time = 60,i=0,sec=60/time*1000,path=null;
		var timer = setInterval(function(){
		    var R = ra+cth;//扇形半径
		    var option={//扇形css属性
		      fill:"#00374C",
		      stroke:"#00374C",
		      opacity:1,
		      class:"cipath",  //置类名
		    }

		    var set = s.selectAll(".cipath").forEach(function(el,index){el.attr({opacity:0})});//把前一次的所有路径都置透明
		    if(time>i){
		      path = s.path(arc2(i,time,R,x,y)).attr(option);//调用方法画不同的扇形
		    }else{
		      s.circle(x,y,R).attr(option);//画满圆
		      //clearInterval(timer);
		      i=0;
		    }
		    s.image('c.png',0,0,width,height);//底层图片遮罩
		    i=i+1;
		},sec);
	}
};
}(window);