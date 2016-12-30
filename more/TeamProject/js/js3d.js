transform3D ();
function transform3D (){
	var wrap3D = document.getElementById('wrap3D');
	var list = wrap3D.querySelector("#list3D");
	var lis = list.children;
	var oFrag = document.createDocumentFragment();
	var pre = document.getElementById('pre3D');
	var next = document.getElementById('next3D');
	var liW = 120;
	var liH = 120;
	var maxZ = 13;
	var minZ = 50;
	var tZ = 200;
	var nub= 0;
	var tab = true;
	
	var fDiv = [];

	var arr = [
		"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
		"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
		"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
		"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
		"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
		"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
		"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
		"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
		"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
		"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
	]


//-------------生成结构----------------------------------	
	
	pre.style.left = list.offsetLeft - 350 + 'px';
	next.style.right = (list.offsetLeft - 350) + 'px';
	for (var i = 0; i < 20; i++) {
		var li = document.createElement("li");
		li.index = i;
		li.cells = i%5;
		li.rows = parseInt(i/5);
		
		for (var j = 0; j < 6; j++) {
			var div = document.createElement("div");			
			li.appendChild(div);
		}
		
		oFrag.appendChild(li);
	}
	list.appendChild(oFrag);
	
	

     
//-----------------------添加事件------------------------    
    var divs = wrap3D.getElementsByTagName("div");
    newDiv(nub);
    
    newF(nub);
       
	for (var i = 0; i < lis.length; i++) {
		lis[i].addEventListener("click",nex);
	}
	
	next.addEventListener("click",nex);
	pre.addEventListener("click",prev);	
		


//--------------------函数-------------------------------
	//一、运动函数
	function fn(el,disX,disY) {

		var delay = Math.abs(disX) + Math.abs(disY);
		var disZ = Math.sqrt(disX*disX + disY*disY);
		var translateZ = (maxZ - disZ)/maxZ*tZ+minZ;
		var a = Math.random()-.5;
		var tran = 320;
		var rota = (Math.random()-.5)*720 
		switch (nub%5){
			case 0:
				break;
			case 3:a = 1,tran = 110,rota=1100;
				break;
			case 2:a = 1,tran = 1500,rota=1100;
				break;
			case 4:a = delay,tran =36,rota=1100;
				break;
			case 1:a = Math.abs(el.cells-2),tran =38,rota=740;
				break;
			default:
				break;
		}
		disX = disX == 0?.5:disX;
		disY = disY==0?.5:disY;
		var translateY = disY/Math.abs(disY)*Math.abs(disY)*tran*(a);
		var translateX = disX/Math.abs(disX)*Math.abs(disX)*tran*(a);
		var rotateY =  disX/Math.abs(disX)*360+rota;
		var rotateX =  disY/Math.abs(disY)*360+rota;
		setTimeout(function(){
			mTween(el,{
					translateZ: translateZ,
					translateX:translateX,
					translateY:translateY,
					rotateY:rotateY,
					rotateX:rotateX
				},1000,"easeOut");
		},10);
		setTimeout(function(){
			mTween(el,{
					translateX:1,
					translateY:1,
					rotateY:1080,
					rotateX:1080
				},1200,"easeOut");
		},1500);
	};
	
	//二、更换所有div的背景
	function newDiv(){
		for (var i = 0; i < divs.length; i++) {
	       divs[i].style.background = "url("+arr[nub]+")";
		   divs[i].style.backgroundSize = "120px 120px";
	    }
	};
	
	//三、更换最前面的div背景
	function newF(){
		for (var i = 0; i < lis.length; i++) { 
	        lis[i].firstElementChild.style.background = "url("+arr[nub]+")";
			lis[i].firstElementChild.style.backgroundSize = "600px 480px";
			lis[i].firstElementChild.cell = i%5;
			lis[i].firstElementChild.row = parseInt(i/5);
			lis[i].firstElementChild.style.backgroundPosition = -lis[i].firstElementChild.cell*liW + "px -" +(lis[i].firstElementChild.row*liH)+ "px";
	    }
	};
	
	
	//四、nex函数   下一张
	function nex() {
			if (tab){
				newDiv();
				nub++;
				if (nub>=arr.length) {
					nub=0;
				};
				flip();
			}		
	};
	//五、prev函数   上一张
	function prev () {
		if (tab){
			newDiv();
			nub--;
			if (nub<=0) {
				nub=arr.length-1;
			};
			flip();
		}
	};
	//六、 flip函数       运动切换
	function  flip(){
			tab= false;
			for (var i = 0; i < lis.length; i++) {
				var disX = lis[i].cells - lis[7].cells;
				var disY = lis[i].rows - lis[7].rows;
				fn(lis[i],disX,disY);
			};
			setTimeout(function() {
				newF();
				tab=true;
			},2000);
	}
}