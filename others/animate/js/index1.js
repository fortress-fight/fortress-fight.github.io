{
  const IMG_DATA = imgData.bg;
  const IMG_SIZE = imgData.size;
  // 移出默认事件，解除点透等一系列的浏览器自带问题
  $(document).on("touchmove", function (ev) {
    ev.preventDefault();
  });

  class animate {
    constructor ({el,data,size}) {
      this.setting = {
        el,
        data,
        size,
        len: this.data.length
      };
      this.r = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1; // 406
    }

    createBg () {
      let len = data.length;
      let str = '';
      let disDeg = 360/len;
      // 这里的减一是为了消除图片间的缝隙，是通过减小每一个图片的旋转半径实现
    	let R = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1; // 406
      console.log(R);
      data.forEach((item,index) => {
        $('<span></span>').appendTo($(this.setting.el))
                          .css({
                            width: IMG_SIZE.width,
                            height: IMG_SIZE.height,
                            marginLeft: `${-IMG_SIZE.width/2}px`,
                            marginTop: `${-IMG_SIZE.height/2}px`,
                            background: "url("+ item +") center center",
                            transform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`,
                            WebkitTransform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`
                          })
      })
    }
  }
  var a = new animate ({
    el: '#main_box',
    data: IMG_DATA,
    size: IMG_SIZE
  });

  /**
   * 使用IMG_DATA创建环形背景
   * @param  {Array} data [背景图片数据，格式[./bg/1.png]]
   * @return {[type]}      [description]
   */
  let createBg = (data) => {
    let len = data.length;
    let str = '';
    let disDeg = 360/len;
    // 这里的减一是为了消除图片间的缝隙，是通过减小每一个图片的旋转半径实现
  	let R = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1; // 406
    console.log(R);
    data.forEach((item,index) => {
      $('<span></span>').appendTo($('#main_box'))
                        .css({
                          width: IMG_SIZE.width,
                          height: IMG_SIZE.height,
                          marginLeft: `${-IMG_SIZE.width/2}px`,
                          marginTop: `${-IMG_SIZE.height/2}px`,
                          background: "url("+ item +") center center",
                          transform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`,
                          WebkitTransform: `rotateY(${180-index*disDeg}deg) translate3d(0, 0, ${-R}px)`
                        })
    })
  };
  let setPst = () => {
    // let R = Math.round(Math.tan((180 - disDeg)/2*Math.PI/180) * 64.5)-1;
    // var deg = Math.atan((IMG_SIZE.height/2)/R);
    // var R = Math.round(Math.tan(deg)*IMG_SIZE.height/2);
    // // let R = 406;
		main_view.style.WebkitPerspective = main_view.style.perspective = R + "px";
    css(main_area,"translateZ",R);
  };
  (() => {
    createBg(IMG_DATA)
    // 52.5 是设定了上下的视角，然后通过视图关系，利用反三角函数计算出景深

  })();

}
