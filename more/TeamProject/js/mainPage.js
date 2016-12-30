
(function(window){

	
	window.openFlag = true;

/*------------------------打开详情页----------------*/
	function growOpen (json) {
		this.set = {
			obj: ''
		}
		for (attr in json) {
			this.set[attr] = json[attr];
		}
	}


	growOpen.prototype.inite = function(){
		for (var i = 0; i < this.set.obj.length; i++) {
			this.set.obj[i].onOff = true;
			this.set.obj[i].onclick = function () {
				var con = this.parentNode.querySelector('.wrap')
				var img = this.getElementsByTagName('img')[0];
				var min = this.parentNode.parentNode.querySelector('.mainImg');
				// console.log(min)
				var _this = this;
				if (this.onOff) {
					window.openFlag = false;
					// min.style.opacity = 0;
					mTween(min,{width: 800}, 300, 'linear', function () {
						con.style.opacity = 1;
						_this.style.width = '600px';
						_this.style.zIndex = '100';
						_this.style.height = '613px';
						_this.style.top = (_this.offsetTop - 150) + 'px';
						_this.style.backgroundImage = 'url()';
						setTimeout(function () {
							img.style.opacity = 1;
						}, 800)
					})
				} else {
					window.openFlag = true;
					this.style.width = '50px';
					this.style.height = '50px';
					this.style.top = (this.offsetTop + 150) + 'px';
					this.style.backgroundImage  = 'url(img/放大镜.png)';
					this.style.zIndex = '0';
					mTween(min,{width: 200}, 500, 'linear');

					setTimeout(function () {
						con.style.opacity = 0;
						img.style.opacity = 0;
					}, 800)
				}
				this.onOff =! this.onOff;
			}
		}
	};

/*--------------------打开导航------------------*/

	function circleNav (data) {
		this.setting = {
			home: '',
			btnCon: '',
			initeDeg: -45,
			endDeg: 360,
			iR: -150
		}
		for (attr in data) {
			this.setting[attr] = data[attr];
		}
	}

	circleNav.prototype.inite = function(){
		var _this = this;
		this.setting.home.onOff = true;

		this.setting.home.onclick = function () {
			_this.lanNav(this)
		};
	};

	circleNav.prototype.lanNav = function(obj){
		console.log(obj)
		if(obj.onOff){
			this.setting.home.style.transform = 'rotate(-360deg)';
			for(var i = 0; i<this.setting.btnCon.length; i++){
				var deg = (i/this.setting.btnCon.length) * (this.setting.endDeg-this.setting.initeDeg) * Math.PI / 180 + (this.setting.initeDeg)*Math.PI / 180;
				var x = Math.cos(deg) * this.setting.iR + this.setting.home.offsetWidth * 0.4;
				var y = Math.sin(deg) * this.setting.iR + this.setting.home.offsetHeight * 0.4;
				this.setting.btnCon[i].style.transition = 500+i*500+'ms';
				this.setting.btnCon[i].style.left = x +'px';
				this.setting.btnCon[i].style.top = y +'px';
				this.setting.btnCon[i].style.transform = 'translateX(-50%) translateY(-50%) rotate(-720deg)';
			}
		} else {// 为假的时候，就让他再回到0deg
			this.setting.home.style.transform = 'rotate(0deg)';
			for(var i = 0; i<this.setting.btnCon.length; i++){
				this.setting.btnCon[i].style.transition = (this.setting.btnCon.length-i)*500+'ms';
				this.setting.btnCon[i].style.left = '';
				this.setting.btnCon[i].style.top = '';
				this.setting.btnCon[i].style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)';

			}
		}
		obj.onOff = !obj.onOff;
	}



/* 改变背景 */

		var aMenu = document.querySelectorAll('.menu')
		var aMain = document.querySelectorAll('.home')
		var se = document.getElementById('se');
		var target = 0;
		var wheelOnOff = true;
		var imgs = document.querySelectorAll('.divimg');
		var bgData = [
			'img/barbarian-bg.jpg',
			'img/archer-bg.jpg',
			'img/coc-background.jpg',
			'img/goblin-bg.jpg'
		]

		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.backgroundImage = 'url('+ bgData[i] +')'
		}

		setTimeout(function(){
			mTween(se,{opacity: 100}, 500, 'linear');
			document.addEventListener('mousewheel', run);
			document.addEventListener('DOMMouseScroll', run);
		},2500)

		window.addEventListener('hashchange',function () {
			var a = locData.getHash().value;
			se.style.opacity=0;
			if (a == 'main') {
				// se.style.opacity=1;
				mTween(se,{opacity: 100}, 500, 'linear');
			};
		}, false)


		var colorArr=
			[
			'#f8d135',
			'rgba(232,130,288,.5)',
			'rgba(130,249,239,.5)',
			'rgba(130,249,178,.5)'
			];
		var imgUrl=
			[
			'images/page_3/3333.gif',
			'images/page_3/2222.gif',
			'images/page_3/1111.png',
			'images/page_3/4444.gif'
			]
		var s=0;
		var manImg=document.querySelector('.man'),
			motorImg=document.querySelector('.motor');
		var pipe =document.querySelector('.pipe');
		var manImgs=manImg.children,
			motorImgs=motorImg.children;

		function run () {
			if (!window.openFlag) {
				return;
			}
			function changeImg(){
				document.body.style.backgroundColor=colorArr[s];
				for(var i=0;i<manImgs.length;i++){
					manImgs[i].style.backgroundImage='url('+imgUrl[s]+')';
				}
				for(var i=0;i<motorImgs.length;i++){
					motorImgs[i].style.backgroundImage='url('+imgUrl[s]+')';
				}
				pipe.style.backgroundImage='url('+imgUrl[s]+')';
			}
			if (wheelOnOff) {
				se.style.transform = 'rotate('+ target +'deg)'
				target += 90;
				s++;
				s%=4;
				changeImg();
				wheelOnOff=!wheelOnOff;
				se.addEventListener('transitionend', function () {
					wheelOnOff = true;
				});
			}
			var btnCon = document.querySelectorAll('.home');
			for (var i = 0; i < btnCon.length; i++) {
				if (!btnCon[i].onOff) {
					btnCon[i].onclick();
				}
			}

		}
		for (var i = 0; i < aMain.length; i++) {
			var btnCon = aMain[i].parentNode.querySelectorAll('.btnCon');
			var arr = aMain[i].parentNode.querySelectorAll('.sBtn');
			var cirNav = new circleNav({
				home: aMain[i],
				btnCon: arr,
				iR: -80,
				initeDeg: -30,
				endDeg: -210
			});


			var show = new growOpen({
				obj: btnCon
			});

			show.inite();
			cirNav.inite();
		}



})(window)
