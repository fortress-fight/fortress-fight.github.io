(function  () {
    var imgMask = document.getElementById('imgMask'),
		wrap3D = document.getElementById('wrap3D'),
		wrap2D = document.getElementById('wrap2D'),
		arrPos=[],   //储存 参考坐标
		num=0,
		ball_list= document.querySelector('.ball_list'),
		ball_lis = ball_list.children,  //页面主体结构
		len = 60,
		arrDeg=[]	//旋转位置
		degPos = []; //圆圈形状的坐标
		btns= document.querySelector('.btns'),
		flag = true,  //图片没有聚合在一起
		startIndex = 0,
		scrollT = 0,
		dropNub = 0,
		prev = document.getElementById('prev'),
		next = document.getElementById('next'),
		iNow = 0,
		btnColor = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
			  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
			  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
			  '#FF5722'];
		btn_text = btns.querySelector('.btn_text'); //按钮




	// setTimeout(function(){
	// 	ball_list.style.display='block';
	// },1300);
	comPosition ();	   //获取参考坐标
	pageInite (); // 页面主结构生成
	btns.onclick = btnChange;

	for (var i = 0; i < ball_lis.length; i++) {
	    ball_lis[i].index = i;
	    ball_lis[i].onclick = fnJuhe;
	}

	function fnJuhe () { //li的点击事件
		if(flag){
			wrap2D.addEventListener('mousewheel',stopScroll);
			wrap2D.addEventListener('DOMMouseScroll',stopScroll);
			imgMask.style.display = 'block';
			var innerH = window.innerHeight,  //可视区宽高
			innerW = window.innerWidth - 16,
			startX = (innerW - 600) / 2,
			startY = (innerH - 480) / 2 - 20,
			x = this.index%5;  //第几列
			iNow = this.index;
		    startIndex = x !=0 ? this.index - x: this.index; //开始聚合的第一个li的索引
		    startIndex = startIndex > ball_lis.length-20 ? ball_lis.length-20: startIndex;
		    scrollT = ball_lis[startIndex].offsetTop - 10;
		    if(startIndex == ball_lis.length-20){ //当前点击的是最后四行的时候，滚动高度的设置
		    	scrollT = ball_lis[ball_lis.length-25].offsetTop;
		    }
		    wrap2D.scrollTop = scrollT;
		    console.log(scrollT);
		    backImgShow (this.index,startIndex,startX,startY,scrollT);
		    prev.style.left = startX - 100 + 'px';
		    next.style.right = startX - 100 + 'px';
		    prev.onclick = function () {
		    	iNow--;
		    	iNow = iNow < 0 ? arrImg.length - 1: iNow;
		        showBigImg (iNow,startIndex);
		    };
		    next.onclick = function () {
		    	iNow++;
		    	iNow = iNow == arrImg.length ?  0: iNow;
		        showBigImg (iNow,startIndex);
		    };
		}else{
			wrap2D.removeEventListener('mousewheel',stopScroll);
			wrap2D.removeEventListener('DOMMouseScroll',stopScroll);
			imgMask.style.display = 'none';
			backImgNone ();  //从聚合状态返回原位置
			prev.style.left = -82 + 'px';
		    next.style.right = -82 + 'px';
		}
	}

	function showBigImg (n,start) { //2D下点击变成大图后，上一张、下一张，切换图片
		if(prev.timer){
			return;
		}
		var a = 0;
        prev.timer = setInterval(function() {
            ball_lis[start + a].style.backgroundImage = 'url('+arrImg[n]+')';
            a ++;
            if(a == 20){
            	clearInterval(prev.timer);
            	prev.timer = 0;
            }
        },20);
    }

	function backImgShow (nub,startIndex,startX,startY,scrollT) {  //从原位置返回聚合状态
		console.log(scrollT);
	    for (var i = startIndex; i < startIndex+20; i++) {
	    		ball_lis[i].style.borderWidth = 0;
	    		ball_lis[i].style.zIndex = 50;
	    		ball_lis[i].style.boxShadow = 'none';
				ball_lis[i].children[0].style.opacity = 0;
	    		ball_lis[i].style.backgroundImage = 'url('+arrImg[nub]+')';
	    		ball_lis[i].style.backgroundPosition = (60-i%5*120) + 'px '+ (-parseInt((i-startIndex)/5)*120) + 'px';
	    	    ball_lis[i].style.borderRadius = 0;
	    	    mTween(ball_lis[i],{left:startX + (i%5)*121,top:startY + parseInt((i-startIndex)/5)*121 + scrollT},200,'linear');
	    	}
			flag = false;
	}

	function backImgNone () {  //从聚合状态返回原位置
	    for (var i = startIndex; i < startIndex + 20; i++) {
	    	ball_lis[i].style.zIndex = 1;
	    	ball_lis[i].style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
	    	ball_lis[i].children[0].style.opacity = 1;
    	     mTween(ball_lis[i],{left:arrPos[i][0] - 60,top:arrPos[i][1] - 60},200,'linear');
    	    ball_lis[i].style.borderRadius = '50px';
		}
		flag = true;
	}

	function createImg(obj){
		var img= document.createElement('img');
		img.src=arrImg[obj.index];
		obj.appendChild(img);
	}




	function btnChange() {
		switch (btn_text.innerHTML) {
			case '展开':
				fnOpenTo2D ();
				break;
			case '3D':
				setTimeout(function() {
					ball_list.style.height = 0;
				    wrap3D.style.top = 0;
				},500);
				fn3Dto2D();
				break;
			case '2D':
				wrap3D.style.top = '-100%';
				fnOpenTo2D ();
				break;
		}

	}

	function fnOpenTo2D () {
		var n = 0;
		var iTimer = 0;
		ball_list.style.height = 140*(arrImg.length/5) + 'px';
		iTimer = setInterval(function () {
		    beginPage(ball_lis[n]);
		    n++;
		    btn_text.innerHTML = '';
		    btn_text.style.backgroundImage = 'url(img/loading.gif)';
		    if(n == arrImg.length){
		    	clearInterval(iTimer);
		    	setTimeout(function() {
		    	    btn_text.innerHTML = '3D';
		    	    btn_text.style.backgroundImage = '';
		    	    btns.onclick = btnChange;
		    	},80)

		    }
		},20);

	}
	function fn3Dto2D () { //2D=>3D
		var g = 0;
	    for (var i = 0; i < ball_lis.length; i++) {
	        var Rect = ball_lis[i].getBoundingClientRect();
	        ball_lis[i].style.position = 'fixed';
	        if(Rect.top > 0 && Rect.top < document.documentElement.clientHeight - 120){
	        	setTime (ball_lis[i]);
	        	g++;
	        }else {
	        	ball_lis[i].style.width = 0;
	        	ball_lis[i].style.height = 0;
	        	ball_lis[i].style.margin = '-5px 0 0 -5px';
	        	ball_lis[i].style.borderWidth = '5px';
	        	ball_lis[i].style.boxShadow = '5px solid rgba(255,255,255,.3)';
	        	ball_lis[i].style.left = degPos[i][0] + 'px';
	        	ball_lis[i].style.top =  degPos[i][1] + 'px';
	        }
	    }
	    function setTime (obj) {
		    setTimeout(function() {
	    	    backAndHidden(obj);
	    	},g*30 + 5);
		}
	}



	function backAndHidden(obj){  //点击3D按钮时，元素收起的单个元素运动函数，3D的页面结构出来
		btns.onclick = null;
		btn_text.innerHTML = '';
		btn_text.style.backgroundImage = 'url(img/loading.gif)';
		clearInterval(obj.timer);//清除定时器注意
		obj.iSpeed = 0;
		dropNub ++;
		obj.timer = setInterval(function(){
			obj.iSpeed += 7;
			var T = obj.offsetTop + obj.iSpeed;
			if(T > document.documentElement.clientHeight - obj.offsetHeight){
				T = document.documentElement.clientHeight - obj.offsetHeight;
				obj.iSpeed *= -1;
				obj.iSpeed *= 0.6;
			}
			obj.style.top = T + 'px';
			if( Math.abs(obj.iSpeed)<=5 && Math.abs(document.documentElement.clientHeight-T-obj.offsetHeight)<=5 ){
				clearInterval(obj.timer);
				obj.iSpeed = 0;
				obj.style.margin = '-5px 0 0 -5px'
				obj.style.top = T + 'px';
				obj.style.borderStyle = 'solid';
				obj.style.borderRadius = '50%';
				obj.style.boxShadow = '5px solid rgba(255,255,255,.3)';
				mTween(obj,{left: degPos[obj.index][0],top: degPos[obj.index][1],width:0,height:0,borderWidth:5},300,"easeIn",function() {
				    dropNub--;
				    //alert(dropNub);
				    if(dropNub == 1){
		    			btn_text.style.backgroundImage = '';
				    	btn_text.innerHTML='2D';
				    	btns.onclick = btnChange;
				    }
				});
			}
		},20);
	}

	function beginPage(obj){  //图片的从初始位置   到  目标位置（页面显示完成）
		obj.style.margin = 0;
		obj.style.position = 'absolute';
		// obj.style.borderRadius='50px';
		// obj.style.width = '120px';
		// obj.style.height = '120px';
		// obj.style.left = arrPos[obj.index][0]-60 + 'px';
		// obj.style.top = arrPos[obj.index][1]-60 + 'px';
		// obj.style.borderWidth = 0;

		mTween(obj,{left:arrPos[obj.index][0],top:arrPos[obj.index][1]},200,'linear',function(){
			obj.style.borderRadius='50px';
			mTween(obj,{width:120,height:120,left:arrPos[obj.index][0]-60,top:arrPos[obj.index][1]-60},400,'bounceOut'	,function(){
				mTween(obj,{borderWidth:0},200,'linear');
			});
		});
	}

	function pageInite () {  //页面初始化，生成页面结构
		var R=65,    //大小球半径和
			BtnsL=100,   //btns的 left值
			BtnsT=400;  //btns的 top值


	    for(var i=0;i<arrImg.length;i++){ //添加 ball_lis 的开始的位置
			var li= document.createElement('li');
			ball_list.appendChild(li);
		}
		/*----------------设置 每个ball_lis 的开始的位置 -----------------------*/
		for(var i=1;i<31;i++){
			var deg = Math.PI* 2*i/30-0.12;
			var x=R*Math.cos(deg);
			var y=R*Math.sin(deg);
			arrDeg.push([x,y]);
		}
		for(var i=0;i<ball_lis.length;i++){
			ball_lis[i].style.left=arrDeg[i%30][0]+BtnsL+'px';
			ball_lis[i].style.top=BtnsT+ arrDeg[i%30][1]+'px';
			ball_lis[i].style.borderColor = btnColor[i%btnColor.length];
			degPos.push([arrDeg[i%30][0]+BtnsL,BtnsT+ arrDeg[i%30][1]]);
		}
		for(var i=0;i<ball_lis.length;i++){
			ball_lis[i].index=i;
			createImg(ball_lis[i]);
		}
	}

	function comPosition () { //储存坐标
		var x = (document.documentElement.clientWidth - 180*5)/2;
	    var t = 10;
	    for (var i = 0; i < arrImg.length; i++) {
	        arrPos.push([x + 90 + i%5*180,parseInt(i/5)*140 + 70]);
	    }
	}

	function stopScroll (ev) {
	    ev.preventDefault();
	}
})();