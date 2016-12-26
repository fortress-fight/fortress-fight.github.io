(function () {


	var arrImg = [
		'img/bgWhite.jpg',
		'img/bg.jpg',
		'img/aa_woman.jpg',
		'img/glasses_guy.jpg',
		'img/aa_woman.jpg',
		'img/young_girl.jpg',
		'img/indian_guy2.jpg'
	]

	var imgNum = 0;
	for (var i = 0; i < arrImg.length; i++) {
		var img = new Image();
		img.src = arrImg[i];
		img.onload = function () {
			imgNum ++;
			if (imgNum === arrImg.length) {
				$('#loadingPage').fadeOut();
			}
		}
		img.onerror = function () {
			imgNum ++;
			if (imgNum === arrImg.length) {
				$('#loadingPage').fadeOut();
			}
		}
	}
/*
	window.onload = function () {
		$('#loadingPage').fadeOut();
	}*/

	var isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	　　isMobile = true;
	}


	// 隐藏地址栏  & 处理事件的时候 ，防止滚动条出现
	// window.addEventListener('load', function(){
	//         setTimeout(function(){ window.scrollTo(0,1); }, 100);
	// });


	// 阻止移动端默认事件
	document.addEventListener('touchmove', function (ev) {
		ev.preventDefault();
	})

	$(window).on('touchstart', function (ev) {
		console.log(ev.target)
	})
	if (isMobile) {
		var target, old;
		$('a').on('touchstart', function (ev) {
			target = ev.target;
			$('a').on('touchmove', function (ev) {
				target = null;
			});
			$('a').on('touchend', function (ev) {
				old = ev.target;
				if (target == old) {
					window.location = this.href;
				}
			})
		})
	}
	var myScroll = new IScroll('#execBox', {
	    mouseWheel: true,
	    scrollbars: true,
	    hScroll: false,
	    probeType: 3
	});

	/*var mainScroll = new IScroll('#mainScroll', {
	    mouseWheel: true,
	    hScroll: false,
	});*/

	var centerBoxScroll = new IScroll('#centerBoxScroll', {
	    mouseWheel: true,
	    hScroll: false,
	});

	myScroll.on('scrollStart', function () {
		$(this.indicators[0].indicator).stop().animate({
			opacity: 1
		}, 500)
		 if (this.y < -10) {
			$('#header').fadeOut()
		 }
	})
	myScroll.on('scrollEnd', function () {
		$(this.indicators[0].indicator).stop().animate({
			opacity: 0
		}, 500)
	})



	myScroll.on('scroll', function () {
		var _this = this;
		if (isMobile) {
			this.targetBottom = this.maxScrollY - 50;
			this.targetTop = 50;
		} else {
			this.targetBottom = this.maxScrollY;
			this.targetTop = 0;
		}
		if (this.y >= -20) {
			$('#header').fadeIn()
		}
		if(this.y <= (this.targetBottom)+50){
			$('#refrash').fadeIn()
		} else {
			$('#refrash').fadeOut()
		}

		$(document).off('touchend.bar').on('touchend.bar', function () {
			if (_this.y <= (_this.targetBottom)) {
				if (canTab == false) {return false}

				canTab = false;

				var downEl  = $('#sideBar a').filter('.active').next()

				if (!(downEl.length)) {
					downEl = $('#sideBar a').eq(0)
				}
				downEl.trigger('click.bar')
			}
			if (_this.y >= _this.targetTop) {
				if (canTab == false) {return false}
				canTab = false;
				var downEl  = $('#sideBar a').filter('.active').next()
				if (!(downEl.length)) {
					downEl = $('#sideBar a').eq(0)
				}
				downEl.trigger('click.bar')
			}
		});
	})





	// 检测：是否是移动端

	/*var isMobile = false;//默认PC端
	function mobile() {
	    try{
	        document.createEvent("TouchEvent");
	        return true;
	    }
	    catch(e){
	        return false;
	    }
	}
	isMobile=mobile();*/




	// 主屏背景图 相关事件
	function setMainImage (id) {
		this.obj = $(id);
		this.bg = $('.bg');
		this.face = $('.face');
		this.nowIndex = 0;
		this.setting = {
			data: [
				'img/glasses_guy.jpg',
				'img/aa_woman.jpg',
				'img/young_girl.jpg',
				'img/indian_guy2.jpg'
				],
			bgData: [
				'img/bg.jpg',
				'img/bgWhite.jpg'
			],
			len: 12,
			bgSize: [1920, 1200],
			bgRota: 1920 / 1200,
			hideFn: function () {
				return false;
			},
			showFn: function () {
				return false;
			},
			isReady: false,
			title: [
				'HTML',
				'css',
				'JavaScript',
				'Canvas'
			],
			infor: [
				'At Adison Partners, we know what uncommon talent looks like',
				'We are the ONLY retained firm that truly bets on our performance',
				'Dramatically improves business performance outcomes by effectively leveraging people, processes, and technology',
				'‘Disruptive Talent’ describes the brilliant individuals who think and act differently'
			],
			hash: [
				'#page=executive',
				'#page=ad',
				'#page=suc',
				'#page=contact'
			]
		};
		this.init();
	}
	setMainImage.prototype = {
		constructor: setMainImage,
		init: function (json) {
			for (attr in json) {
				this.setting[attr] = json[attr];
			}
			this.currentBg = this.setting.data;
		},
		tabBg: function (type) {
			if (type) {
				this.currentBg = this.setting.bgData;
			} else {
				this.currentBg = this.setting.data;
			}
			this.nowIndex = -1;
		},
		setPos: function (fn) {
			// console.log(fn);
			this.setLayOut(this.bg);
			this.setLayOut(this.face);
			fn && fn(this.setting.title[0],this.setting.infor[0])
		},
		rePos: function () {
			this.setStyle(this.bg);
			this.setStyle(this.face);
		},
		setLayOut: function (imgArea) {
			var str = '';
			for (var i = 0; i < 12; i++) {
				str += '<div></div>'
			}
			imgArea.html(str);
			this.setStyle(imgArea);
			this.hideImage();
		},
		setStyle: function (imgArea) {
			var _width = imgArea.find('div').width();
			var _parWidth = imgArea.width();
			var _parHeight = imgArea.height();

			if (_parHeight*this.setting.bgRota > _parWidth) {
				imgArea.css({
					'min-width':_parHeight*this.setting.bgRota
				});
			};

			_width = imgArea.find('div').width();

			_parWidth = imgArea.width();

			imgArea.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			}).each(function (i, e) {
				$(e).css ({
					'left': i * _width,
					'background-position': -i * _width,
					'background-size': _parWidth
				})
			})
		},
		autoPlay: function () {
			var _this = this;
			clearInterval(this.timer);
			this.timer = setInterval(function () {
				_this.next();
			}, 5000)
		},
		isAutoPlay: function () {
			return this.timer;
		},
		stopAutoPlay: function () {
			clearInterval(this.timer);
			this.timer = null;
		},
		now: function (callback) {

			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage(callback);
		},
		next: function (index, callback) {
			this.nowIndex ++;
			if (typeof index == 'function') {
				callback = index;
			} else if (typeof index == 'number') {
				this.nowIndex = index;
			}
			// this.setting.isReady = false;
			this.nowIndex %= this.currentBg.length;
			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage(callback);
		},
		prev: function () {
			this.nowIndex --;
			if (this.nowIndex < 0) {
				this.nowIndex = this.currentBg.length-1;
			}
			// console.log(this.nowIndex)
			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage();
		},
		hideImage: function () {
			this.face.find('div').each(function(i, e){
				dir = i%2 == 0 ? 1 : -1;
				$(e).css ({
					top:( dir * (tools.winSize().h * 0.4) * i/12 + dir * (tools.winSize().h * 0.2))
				})
			});
			this.setting.showFn && this.setting.showFn();
		},
		isReady: function () {
			return this.setting.isReady;
		},
		showImage: function (callback) {
			this.setting.isReady = true;
			var _this = this;
			this.face.find('div').each(function (i, e) {
				setTimeout(function (i) {
					mTween(e, {top: 0, opacity: 100}, 500, 'easeOut', function () {
						if (i == 11) {
							_this.hideImage();
							$('.face div').css ({opacity: 0});
							$('.bg').css ({
								'opacity': 1,
							});
							$('.bg div').css({
								//

								'background-image': $('.face div').eq(0).css('background-image')
							});

							_this.setting.isReady = false;
							callback && callback();
						}
						if (i == 0) {
							$('.bg').animate ({
								opacity: 0
							});
						}
					});
				}, i*70, i);
			});
			// console.log(_this.setting.title[_this.nowIndex]);
			_this.setting.hideFn && _this.setting.hideFn(_this.setting.title[_this.nowIndex],
				_this.setting.infor[_this.nowIndex],
				_this.setting.hash[_this.nowIndex]);
		}
	};

	// 主屏文字信息相关
	function IntroBox (selector) {
		this.obj = $(selector);
		this.spanBox = this.obj.find('span');
	}

	IntroBox.prototype = {
		constructor: IntroBox,
		inite: function () {
		},
		showBox: function () {
			this.obj.fadeIn(300);
			this.spanBox.each(function (i, e) {
				$(e).attr({
					style: ''
				})
			})
		},
		hideBox: function (fn) {
			this.obj.fadeOut(800, function () {
				fn && fn();
			});
			this.spanBox.each(function (i, e) {
				$(e).width(0);
				$(e).height(0);
			})
		}
	}


	var setImage = new setMainImage('#mainImagArea');
	var mainIntroBox = new IntroBox('#centerBox .spanBox');


	// 初始化：添加 进入 移出 的回调函数，将内容区 和 背景关联起来
	setImage.init ({
		showFn: function (title) {
			menuCanTab = true;
			mainIntroBox.showBox();
			$('#title').fadeIn(800);
			$('#intro').fadeIn(800);
		},
		hideFn: function (title, infor, hash) {
			menuCanTab = false;
			mainIntroBox.hideBox();
			$('#title').fadeOut(800, function () {
				$('#title').html(title);
				$('#intro .joinIco').attr({
					href: hash
				})

			});
			$('#intro').fadeOut(800, function () {
				$('#intro p').html(infor)
			});
		}
	});

	// 初始化结构，顺便将将内容区 和 背景 一起创建结构，这里可以将setPos和init合并起来，将这里作为配置参数；
	setImage.setPos(function (title, infor) {
		$('#title').html(title);
		$('#intro p').html(infor)
	});

	// 调用自动播放
	setImage.autoPlay();



	$('.rightBtn').on('click touchstart',function () {
		if(setImage.isReady()){
			return false;
		};
		setImage.stopAutoPlay();
		setImage.next();
		setImage.autoPlay();
	});


	$('.leftBtn').on('click touchstart', function () {
		if(setImage.isReady()){
			return false;
		};
		setImage.stopAutoPlay();
		setImage.prev();
		setImage.autoPlay();
	});

	centerBox.onclick = function (ev) {

		ev.cancelBubble = true;
	};

	if (isMobile) {
		var slideEv = new mobileTools();
		slideEv.sildEvent({
				'right':function () {
					if (nowHash == 'main') {
						$('.leftBtn').trigger('click');
					}
				},
				'left': function () {
					if (nowHash == 'main') {
						$('.rightBtn').trigger('click');
					}
				}
			});
	}

	// menu 点击事件

	// 目前的状态， 用于点击menu时跳转指向的目标
	var targetHash = 'menu';
	// 当前页的标示
	var nowHash = 'main';
	// 用于存放，要渲染页的文字内容
	var data;

	var menuPage =  new setMainImage('#mainImagArea');
	var execPage =  new setMainImage('#mainImagArea');
	var contactPage = new setMainImage('#contactPage');
	var menuBox = new IntroBox('#menuBox .spanBox');
	var execBox = new IntroBox('#execBox .spanBox');
	var contactBox = new IntroBox('#contactPage .spanBox');

	var canTab = false;
	// 为真可以进行menu 点击
	var menuCanTab = true;

	// 导航页

	menuPage.init({
		data: [
			'img/bg.jpg'
		],
		showFn: function () {
			centerBoxScroll.scrollTo(0, 0);
			$('#menuBox').fadeIn(400, function () {
				menuBox.showBox();
				menuCanTab = true;
				centerBoxScroll.refresh();
			});
		},
		hideFn: function (title, infor) {
				menuCanTab = false;

			menuBox.hideBox();
			$('#centerBox').fadeOut(400)

		}
	});


	// page1
	execPage.init({
		data: [
			'img/bgWhite.jpg',
			'img/bg.jpg'
		],
		showFn: function () {
			menuCanTab = true;
			$('#execBox').fadeIn(function () {
				$('#sideBar').fadeIn(function () {
					canTab = true;
				});
				execBox.showBox();
				setTimeout(function () {
			        myScroll.refresh();
			    }, 0);
			})
		},
		hideFn: function (title, infor) {
			menuCanTab = false;
			$('#execBox').fadeOut(800);
			execBox.hideBox();
			$('#menuBox').fadeOut(600);
		}
	});

	// contact page

	contactPage.init({
		data: [
			'img/bgWhite.jpg'
		],
		showFn: function () {
			menuCanTab = true;
			$('#contactPage').fadeIn(function () {
				contactBox.showBox();
				centerBoxScroll.scrollTo(0, 0);
				centerBoxScroll.refresh()
			})
		},
		hideFn: function (title, infor) {
			menuCanTab = false;
			$('#contactPage').fadeOut(800);
			contactBox.hideBox();
			$('#menuBox').fadeOut(600);
		}
	});



	// 头部的点击事件
	$('#header').on('click.menu touchstart', '.menu', function () {
		if(!menuCanTab){
			return false;
		};
		menuCanTab = false;
		$('.menu').toggleClass('active');
		window.location.hash = targetHash;
		return false;
	})

	$('#intro .joinIco').on('click touchstart', function () {
		setImage.stopAutoPlay();
		menuPage.now();
		targetHash = 'main';
	})


	// menu 下导航相关
	/*$('#mainScroll').click(function () {
		alert(1);

	})*/
	$('#menuBox nav a').click(function () {
		var _this = this;
		$('#menuBox nav a').removeClass('active');
		$(this).addClass('active');
		$('.menu').toggleClass('active');
		$('#menuBox .spanBox').animate({
			top: $(_this).position().top
		})
	})

	// 由于 menu 功能指向具有多样性，所以单独使用一个方法，进行区分

	function backMenu () {
		switch (nowHash) {
			case 'main':
				setImage.stopAutoPlay();
				menuPage.now();
				targetHash = 'main';
				break;
			case 'executive':
				mainAreaChange.out('executive');
				break;
			case 'suc':
				mainAreaChange.out('suc');
				break;
			case 'ad':
				mainAreaChange.out('ad');
				break;
			case 'contact': {
				menuPage.now();
				contactBox.hideBox();
				$('#contactPage').fadeOut(800);
				$('#sideImg').fadeOut();
				targetHash = 'contact';
				break;
			}
			default:
				// statements_def
				break;
		}
	}





	// 子主题切换

	window.onhashchange = function () {

		var hash = ff.getHash();

		switch (hash) {
			case 'menu':
				$('#mainImagArea').addClass('bgBlue');
				$('.menu').addClass('sonStyle');
				backMenu();
				nowHash = 'menu';
				window.location.hash = '';
				break;
			case 'main':
				$('#mainImagArea').removeClass('bgBlue');
				$('.menu').removeClass('sonStyle');
				menuBox.hideBox();
				nowHash = 'main';
				$('#menuBox').fadeOut(600,function () {
					setImage.now(function () {
						$('#centerBox').fadeIn();
						centerBoxScroll.scrollTo(0, 0);
						centerBoxScroll.refresh()
					});
					setImage.autoPlay();
				});
				targetHash = 'menu';
				window.location.hash = '';
				break;
			case 'executive' :
				mainAreaChange.in(pageData, 'executive')
				break;
			case 'ad' :
				mainAreaChange.in(pageData1, 'ad')
				break;
			case 'suc' :
				mainAreaChange.in(pageData2, 'suc')
				break;
			case 'contact' :
				$('.menu').removeClass('sonStyle');
				nowHash = 'contact';
				contactPage.now();
				$('#sideImg').fadeIn(1000);
				window.location.hash = '';
				targetHash = 'menu';
			default:
				break;
		}


	}

	var mainAreaChange = {
		in: function (mainData, newHash) {
			// console.log(newHash)
			data = new dealData(mainData);
			$('#execBox .title').html(data.getTitle()[0]);
			$('#sideBar').html(data.setTitle())
			$('#execBox .artical').html(data.setLayOut(0));
			$('.menu').addClass('sonStyle');
			nowHash = newHash;
			execPage.now();
			window.location.hash = '';
			targetHash = 'menu';
		},
		out: function (nextHash) {
			menuPage.now();
			execBox.hideBox();
			$('#execBox').fadeOut(800);
			$('#sideBar').fadeOut();
			targetHash = nextHash;
		}
	}

	// 当窗口大小调整的时候，调整背景相关设置

	$(window).on('resize', function () {

		switch (nowHash) {
			case 'menu':
				menuPage.rePos();
				break;
			case 'main':
				setImage.rePos();
				break;
			case 'executive':
			case 'suc':
			case 'ad':
				execPage.rePos();
				break;
			case 'contact':
				contactPage.rePos();
				break;
			default:
				break;
		}
	})


	window.addEventListener("orientationchange", function() {
		window.location.href = window.location.href;
		switch (nowHash) {
			case 'menu':

				menuPage.rePos();
				break;
			case 'main':
				setImage.rePos();
				break;
			case 'executive':
			case 'suc':
			case 'ad':
				execPage.rePos();
				break;
			case 'contact':
				contactPage.rePos();
				break;
			default:
				break;
		}
	}, false);




	// sideBar 的功能实现

	$('#sideBar').on('click.bar', 'a', function (ev) {
		var _this = this;
		var index = $(_this).index();
		if ($(this).hasClass('active')) {
			return false;
		}
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		execPage.next(index ,function () {

			tabStyle(index);
			$('#execBox .title').html($(_this).html());
			$('#execBox .artical').html(data.setLayOut(index));
			myScroll.scrollTo(0, 0);
			$('#refrash').fadeOut()


		});
	})

	function tabStyle (index) {
		index%=2;
		if(!index) {
			$('.menu').removeClass('sonStyle');
			$('#execBox').removeClass('conStyle1').addClass('conStyle2');
			$('#sideBar').removeClass('whiteStyle').addClass('blueStyle');;
		} else {
			$('.menu').addClass('sonStyle');
			$('#execBox').removeClass('conStyle2').addClass('conStyle1');
			$('#sideBar').removeClass('blueStyle').addClass('whiteStyle');
		}
	}



















 // $("body").height( $(window).height() );

/*document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
*/
/*function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度
        console.log("st = "+st);
        if (y >= lastY && st <= 0) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;

        //方法三
        // var abc=$(document.body).scrollTop();
        // console.log("abc = "+abc);
        // if (abc>0) {
        //   $(document.body).scrollTop(0);
        // }
    });
}
stopDrop();
*/


})()