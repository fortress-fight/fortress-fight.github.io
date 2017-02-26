{
    const IMG_DATA = imgData.bg;
    const IMG_SIZE = imgData.size;
    let main_box = document.getElementById('main_box');
    // 移出默认事件，解除点透等一系列的浏览器自带问题
    $(document).on("touchmove", function(ev) {
        ev.preventDefault();
    });

    /**
     * getTransfrom -- 用于获得 transform 属性
     * el -- 元素
     * attr -- transfrom 属性
     */

    let getTransfrom = (el, attr) => {
        let str = el.style.transform;
        let pattern = new RegExp(attr + "\\((-?[0-9]+\\.?[0-9]{0,2}).*\\)");
        str.match(pattern);

        return RegExp.$1;
    }

    /**
     * move -- 一个集合 touch 3个事件的函数，在touchmove的ev中添加了，disX,以及disY,实时监控移动距离；
     */

    let move = (el, obj) => {
        let startX, startY, endX, endY, disX, disY;
        $(el).on('touchstart', function(ev) {
            var ev = ev.touches[0];
            startX = ev.pageX;
            startY = ev.pageY;
            obj.start && obj.start(ev);
        }).on('touchmove', function(ev) {
            var ev = ev.changedTouches[0];
            endX = ev.pageX;
            endY = ev.pageY;
            ev.disX = startX - endX;
            ev.disY = startY - endY;
            obj.move && obj.move(ev)
        }).on('touchend', function(ev) {
            var ev = ev.changedTouches[0];
            obj.end && obj.end()
        });
        return function getDis() {
            return {
                disX: startX - endX,
                disY: startY - endY
            }
        }
    }

    /**
     * throttle -- 分流函数
     */

    var throttle = function(fn, interval) {
        var _this = fn,
            timer,
            firstTimer;
        return function() {
            var _me = this,
                args = arguments;
            if (firstTimer) {
                _this.apply(_me, args)
                return firstTimer = false;
            };

            if (timer) {
                return false;
            };

            timer = setTimeout(function() {
                clearTimeout(timer);
                _this.apply(_me, args);
                timer = null;
            }, interval || 100)
        }
    };

    /**
     * 实现动画的主要功能；
     * 
     * @class animate
     */

    class animate {
        constructor({ el, data, size, parEl }) {
            this.setting = {
                el,
                parEl,
                data,
                size
            };
            let init = {
                el: $(this.setting.el)[0],
                parEl: $(this.setting.parEl)[0],
                len: this.setting.data.length,
                disDeg: 360 / this.setting.data.length,
                w: this.setting.size.width,
                h: this.setting.size.height,
                radius: 0
            };
            Object.assign(this, init);
            this.init();
        }

        init() {
            var _this = this;
            this.createBg(); // 创建圆形背景
            this.setPst(); // 设置视点
            this.el.style.transform = "rotateY(150deg) rotateX(0)";
            $(window).on('resize orientationchange', function() {
                _this.setPst();
            });
            this.rotate(); // 添加旋转功能
            this.startMove(); // 添加拖拽功能
        }

        setPst() {
            // 0.9 是指正视的时候显示整个画面的0.9
            let deg = Math.atan((this.h * 0.9 / 2) / this.radius);
            let R = Math.round(Math.tan(deg) * $(window).height() / 2);
            this.parEl.style.WebkitPerspective = this.parEl.style.perspective = R + "px";
            $("#main_area").css({
                transform: `translate3d(0, 0, ${R}px)`,
                WebkitTransform: `translate3d(0, 0, ${R}px)`
            });
        }

        createBg() {
            // 这里的减一是为了消除图片间的缝隙，是通过减小每一个图片的旋转半径实现
            this.radius = Math.round(Math.tan((180 - this.disDeg) / 2 * Math.PI / 180) * this.w / 2) - 1; // 406
            this.setting.data.forEach((item, index) => {
                $('<span></span>').appendTo(this.el)
                    .css({
                        width: this.w,
                        height: this.h,
                        marginLeft: `${-this.w/2}px`,
                        marginTop: `${-this.h/2}px`,
                        background: "url(" + item + ") center center",
                        transform: `rotateY(${180-index*this.disDeg}deg) translate3d(0, 0, ${-this.radius}px)`,
                        WebkitTransform: `rotateY(${180-index*this.disDeg}deg) translate3d(0, 0, ${-this.radius}px)`
                    })
            })
        }

        startMove() {
            let _this = this;
            let initDeg = { x: 0, y: 0 },
                deg = { x: 0, y: 0 };
            // move 通过获取手指按下时，元素的旋转位置，然后将手指移动的距离转换成角度，累加
            move(_this.el, {
                start() {
                    _this.isTouch = true; // 表明是在拖拽，通过开关关闭陀螺仪引发的旋转
                    initDeg.x = +(getTransfrom(_this.el, "rotateX"));
                    initDeg.y = +(getTransfrom(_this.el, "rotateY"));
                    _this.isStart = true; // 通过isStart告诉rotate函数，角度已经充值，如果使用需要重新计算
                    _this.stop && _this.stop.stop(); // _this.stop 接受的是MTween中返回的一个对象，这个对象的stop是停止动画运动的定时器函数
                },
                move(ev) {
                    let { disX, disY } = ev;
                    deg.x = +(disY) / $(window).height() * 90 + initDeg.x;
                    deg.y = -(disX) / $(window).width() * 90 + initDeg.y;
                    if (deg.x > 40) {
                        deg.x = 40;
                    } else if (deg.x < -40) {
                        deg.x = -40;
                    }
                    _this.el.style.transform = `rotateX(${deg.x}deg) rotateY(${deg.y}deg)`;
                },
                end(ev) {
                    _this.isTouch = false;
                }
            })
        }
        rotate() {
            // rotate 实现陀螺仪的主要逻辑
            this.isStart = true;
            let _this = this,
                startDeg = { x: 0, y: 0 }, // 存放元素的已经旋转的角度
                startDevice = { x: 0, y: 0 }, // 存放设备陀螺仪的初始角度

                dir = window.orientation, // 设备方向
                lastTime = Date.now();

            window.addEventListener('orientationchange', function() {
                dir = window.orientation;
                _this.el.style.transform = "rotateY(150deg) rotateX(0)";

            });
            window.addEventListener('deviceorientation', function(ev) {
                // 间隔小于30ms的不进行运动
                var nowTime = Date.now();
                if (nowTime - lastTime < 30) {
                    return;
                }

                lastTime = nowTime;
                throttle(run, 100).call(_this, ev);
            });

            function run(ev) {

                if (this.isTouch) {
                    return
                };
                let nowDevice = { x: 0, y: 0 };
                let disDevice = { x: 0, y: 0 };
                let deg = { x: 0, y: 0 };
                let beta = Math.round(ev.beta);
                let gamma = Math.round(ev.gamma);
                let alpha = Math.round(ev.alpha);
                let x, y;
                // 这里的乘法是为了将小的角度扩展成360+，这样在一周内就会避免发生跳转
                switch (dir) {
                    case 0:
                        x = beta;
                        y = 2 * gamma;
                        break;
                    case 90:
                        x = -2 * gamma;
                        y = 4 * beta;
                        break;
                    case -90:
                        x = 2 * gamma;
                        y = -(4 * beta);
                        break;
                    case 180:
                        return;
                        x = -beta;
                        y = -(2 * gamma);
                        break;
                    default:
                        break;
                }
                // 如果是第一次，就就计算初始角度
                if (this.isStart) {
                    this.isStart = false;
                    startDevice.x = x;
                    startDevice.y = y;
                    startDeg.x = +(getTransfrom(this.el, "rotateX"));
                    startDeg.y = +(getTransfrom(this.el, "rotateY"));
                }

                nowDevice.x = x;
                nowDevice.y = y;

                disDevice.x = nowDevice.x - startDevice.x;
                disDevice.y = nowDevice.y - startDevice.y;

                deg.x = startDeg.x + disDevice.x;
                deg.y = startDeg.y + disDevice.y;

                if (deg.x > 40) {
                    deg.x = 40;
                } else if (deg.x < -40) {
                    deg.x = -40;
                }

                _this.stop = MTween({
                    el: this.el,
                    target: { rotateX: Math.round(deg.x), rotateY: Math.round(deg.y) },
                    time: 200,
                    type: "easeOut"
                });
            }
        }
    }
    var a = new animate({
        el: '#main_box',
        parEl: '#main_view',
        data: IMG_DATA,
        size: IMG_SIZE
    });
}