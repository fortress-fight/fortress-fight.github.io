{
  const IMG_DATA = imgData.bg;
  const IMG_SIZE = imgData.size;
  // 移出默认事件，解除点透等一系列的浏览器自带问题
  $(document).on("touchmove", function (ev) {
    ev.preventDefault();
  });

  let move = (el, fn) => {
    // console.log($(el));
    let startX, startY, endX, endY, disX, disY;
    $(el).on('touchstart', function (ev) {
      var ev = ev.touches[0];
      startX = ev.pageX;
      startY = ev.pageY;
    }).on('touchmove', function (ev) {
      var ev = ev.changedTouches[0];
      endX = ev.pageX;
      endY = ev.pageY;
      ev.disX = startX - endX;
      ev.disY = startY - endY;
      fn && fn(ev)
    });
    return function getDis () {
      return {
        disX: startX - endX,
        disY: startY - endY
      }
    }
  }

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
          touch = false,
          dir = window.orientation,
          startDeg = {};
      startDeg.x = css(main_box, 'rotateX');
      startDeg.y = css(main_box, 'rotateY');
      window.addEventListener('orientationchange', function (ev) {
        dir = window.orientation;
    		// window.isStart = false;
    		MTween({
    			el: main_box,
    			target: {rotateX:0},
    			time: 500,
    			type: "easeOut"
    		});
      })

      // move('#main_box', function (ev) {
      //   touch = true;
      //   // let deg = {}, startDeg = {};
      //   // deg.x = x - initInfo.x - startDeg.x;
      //   // // deg.y = y - initInfo.y - startDeg.y;
      //   // startDeg.x = css($('#main_box')[0], 'rotateX');
      //   // startDeg.y = css($('#main_box')[0], 'rotateY');
      //   var str = main_box.style.transform;
      //   var reg = /(\d\.?)+/g;
      //   var dega = str.match(reg);
      //   startDeg.x = dega ? Math.round(dega[0]) : 0;
      //   startDeg.y = dega ? Math.round(dega[1]) : 0;
      //   console.log(startDeg);
      //   deg.y = ev.disX/$(window).width() * 180 + startDeg.x;
      //   deg.x = -ev.disY/$(window).height() * 180 + startDeg.y;
      //   // $('#pos').html(`<p>${main_box.style.transform}</p><p>${y}</p>`);
      //   console.log(startDeg);
      //
      //   if(deg.x > 40){
      //     deg.x = 40;
      //   } else if(deg.x < -40) {
      //     deg.x = -40;
      //   }
      //   //
      //   $("#main_box").css({
      //     transform: `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`
      //   })
      // });
      window.addEventListener('deviceorientation', function (ev) {
        if (touch) {
          return
        }
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
        switch(dir){
    			case 0:
    				x = beta;
    				y = gamma;
    				break;
    			case 90:
    				x = -gamma;
    				y = beta;
    				break;
    			case -90:
    				x = -gamma;
    				y = -beta;
    				break;
    			case 180:
    				x = -beta;
    				y = -gamma;
    				break;
    		}
        // x = 2*beta;
        // y = -4*gamma;

        if (firstTime) {
          firstTime = false;
          initInfo.x = x;
          initInfo.y = y;
        }

        deg.x = x - initInfo.x - startDeg.x;
        deg.y = y - initInfo.y - startDeg.y;

        $('#pos').html(`<p>${main_box.style.transform}</p><p>${y}</p>`);

        if(deg.x > 30){
  				deg.x = 30;
  			} else if(deg.x < -30) {
  				deg.x = -30;
  			}
        //
        $("#main_box").css({
          transform: `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`
        })
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
