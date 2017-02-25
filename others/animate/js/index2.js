{
  const IMG_DATA = imgData.bg;
  const IMG_SIZE = imgData.size;
  // 移出默认事件，解除点透等一系列的浏览器自带问题
  $(document).on("touchmove", function (ev) {
    ev.preventDefault();
  });

  var throttle =function (fn, interval) {
    var _this = fn,
      timer,
      firstTimer;
    return function () {
      var _me = this,
        args = arguments;
      if (firstTimer) {
        _this.apply(_me, args)
        return firstTimer = false;
      };

      if (timer) {
        return false;
      };

      timer = setTimeout(function () {
        clearTimeout(timer);
        _this.apply(_me, args);
        timer = null;
      }, interval || 100)
    }
  };

  class animate {
    constructor ({el,data,size}) {
      this.setting = {
        el,
        data,
        size
      };
      let init = {
        el: $(this.setting.el),
        len: this.setting.data.length,
        disDeg: 360/this.setting.data.length,
        w: this.setting.size.width,
        h: this.setting.size.height,
        radius: 0
      };
      Object.assign(this, init);
      this.init();
    }

    init () {
        var _this = this;
        this.createBg();
        this.setPst();
        $(window).on('resize orientationchange', function () {
          _this.setPst();
        });
        this.rotate();
    }

    setPst () {
      console.log(this);
      // 这里0.9 是指正视的时候显示整个画面的0.9
      let deg = Math.atan((this.h*0.9/2)/this.radius);
      let R = Math.round(Math.tan(deg)*$(window).height()/2);
  		main_view.style.WebkitPerspective = main_view.style.perspective = R + "px";
      $("#main_area").css({
        transform: `translate3d(0, 0, ${R}px)`,
        WebkitTransform: `translate3d(0, 0, ${R}px)`
      });
    }

    createBg () {
      // let len = data.length;
      // let str = '';
      // let disDeg = ;
      // 这里的减一是为了消除图片间的缝隙，是通过减小每一个图片的旋转半径实现
    	// let R = Math.round(Math.tan((180 - this.disDeg)/2*Math.PI/180) * this.w/2)-1; // 406
      this.radius = Math.round(Math.tan((180 - this.disDeg)/2*Math.PI/180) * this.w/2)-1; // 406
      this.setting.data.forEach((item,index) => {
        $('<span></span>').appendTo(this.el)
                          .css({
                            width: this.w,
                            height: this.h,
                            marginLeft: `${-this.w/2}px`,
                            marginTop: `${-this.h/2}px`,
                            background: "url("+ item +") center center",
                            transform: `rotateY(${180-index*this.disDeg}deg) translate3d(0, 0, ${-this.radius}px)`,
                            WebkitTransform: `rotateY(${180-index*this.disDeg}deg) translate3d(0, 0, ${-this.radius}px)`
                          })
      })
    }

    rotate () {
      let _this = this,
          firstTime = true,
          deg = {x:0,y:0},
          initInfo = {},
          lastTime = new Date(),
          startDeg = {};
      startDeg.x = css($('#main_box')[0], 'rotateX');
      startDeg.y = css($('#main_box')[0], 'rotateY');
      window.addEventListener('orientationchange', function (ev) {
        console.log(ev);
      })

      window.addEventListener('deviceorientation', function (ev) {
        var nowTime = new Date();
    		if(nowTime - lastTime < 30){
    			return;
    		}
    		lastTime = nowTime;
    		// throttle(rotate, 100).call(_this, ev);
        rotate.call(_this,ev)
      })

      let rotate = (ev) => {
        var str = css($('#main_box')[0], 'rotateY');
        let {beta,gamma,alpha} = ev,
            x ,y;

        beta = Math.round(beta);
        gamma = Math.round(gamma);
        alpha = Math.round(alpha);
        x = beta;
        y = -gamma;

        // y = y > 360 ? y = 360: y;
    		// y = y < -90 ? -90-(90-y): y;
        // y += 90;

        if (firstTime) {
          firstTime = false;
          initInfo.x = x;
          initInfo.y = y;
        }
        console.log(initInfo);

        // disY =  = initInfo.y;



        deg.x = x - initInfo.x - startDeg.x;
        deg.y = y - initInfo.y - startDeg.y;
        // // var disY = startDeg.y + Math.abs(y - initInfo.y)
        //
        // // deg.y = y < 0 ? deg.y-disY : deg.y+disY;
        // if (Math.abs(y - initInfo.y)>80) {
        //     deg.y += startDeg.y + 1;
        // } else {
        //   deg.y += startDeg.y + (y - initInfo.y);
        // }
        $('#pos').html(`<p>${main_box.style.transform}</p><p>${y}</p>`);


        // initInfo.y = y;

        if(deg.x > 40){
  				deg.x = 40;
  			} else if(deg.x < -40) {
  				deg.x = -40;
  			}

        $("#main_box").css({
          transform: `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`
        })

        MTween({
  				el: main_box,
  				target: {rotateX:(deg.x),rotateY:(deg.y)},
  				time: 500,
  				type: "easeOut"
  			});
      }
    }
  }
  var a = new animate ({
    el: '#main_box',
    data: IMG_DATA,
    size: IMG_SIZE
  });

  // /**
  //  * 使用IMG_DATA创建环形背景
  //  * @param  {Array} data [背景图片数据，格式[./bg/1.png]]
  //  * @return {[type]}      [description]
  //  */
  // let createBg = (data) => {
  //   let len = data.length;
  //   let str = '';
  //   let disDeg = 360/len;
  //   // 这里的减一是为了消除图片间的缝隙，是通过减小每一个图片的旋转半径实现
  // 	let R = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1; // 406
  //   console.log(R);
  //   data.forEach((item,index) => {
  //     $('<span></span>').appendTo($('#main_box'))
  //                       .css({
  //                         width: IMG_SIZE.width,
  //                         height: IMG_SIZE.height,
  //                         marginLeft: `${-IMG_SIZE.width/2}px`,
  //                         marginTop: `${-IMG_SIZE.height/2}px`,
  //                         background: "url("+ item +") center center",
  //                         transform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`,
  //                         WebkitTransform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`
  //                       })
  //   })
  // };
  // let setPst = () => {
  //   let R = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1;
  //   var deg = Math.atan((IMG_SIZE.height/2)/R);
  //   var R = Math.round(Math.tan(deg)*IMG_SIZE.height/2);
  // //   // // let R = 406;
	// 	main_view.style.WebkitPerspective = main_view.style.perspective = R + "px";
  //   css(main_area,"translateZ",R);
  // };
  // (() => {
  //   // createBg(IMG_DATA)
  //   // 52.5 是设定了上下的视角，然后通过视图关系，利用反三角函数计算出景深
  //
  // })();

}
