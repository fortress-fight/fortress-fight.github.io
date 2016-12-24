	function scrollTool (con) {
		this.obj = $(con);
		this.target = 0;

		this.setting = {
			down: function () {
			},
			up: function () {
			}
		}
	}

	scrollTool.prototype = {

		constructor: scrollTool,

		init: function (bar, json) {
			var _this = this;
			for (attr in json) {
				this.setting[attr] = json[attr];
			}
			this.getInfor(bar);
			this.onScroll();
			this.obj.css({
				transform: 'translateY(0px)'
			})
			this.bar.css({
				transform: 'translateY(0px)'
			})
			this.timer = null;
			$(window).on('resize', function () {
				_this.getInfor(_this.bar);
			})
		},

		clearInite: function () {
			this.obj.css({
				transform: 'translateY(0px)'
			});
			this.bar.css({
				transform: 'translateY(0px)'
			});
			this.target = 0;
		},
		getInfor: function(bar){
			this.infor = {
				t: this.obj.offset().top,
				h: this.obj.height(),
				parH: this.obj.parent().height(),
			}

			this.setBar(bar);
		},

		setBar: function (bar) {
			this.bar = $(bar);
			this.barParH = this.bar.parent().height();
			this.barH = Math.min(this.barParH * this.infor.parH / this.infor.h, this.barParH)
			// this.barH = this.barParH * (1- this.ratio);
			this.bar.height(this.barH);
			if ((this.barH + this.bar.offset().top) >= this.barParH) {
				var a = (this.barParH - this.bar.height())
				this.bar.css({
					transform: 'translateY('+ a +'px)'
				})
				if (a == 0) {
					this.obj.css({
						transform: 'translateY(0px)'
					})
					this.target = 0;
					this.onOff = true;
				}
			}
		},

		onScroll: function () {
			var _this = this;
			// if (this.obj.style.display) {}
			ff.addHandler(_this.obj[0], 'mousewheel', function (ev) {
				// if (_this.barParH - _this.bar.height() <= 0) {
				// 	return false;
				// }
				if (_this.obj.css('display') != 'block' && _this.obj.css(opacity) != '1') {
					return false;
				}
				console.log(1)
				clearInterval(_this.timer)
				_this.bar.parent().css({
					opacity: 1
				});
				// _timer = setTimeout(function () {
				// 	_this.bar.parent().css({
				// 		opacity: 0
				// 	});
				// }, 3000)
				ev = ev || window.event;
				var now = parseInt($('#box1').css('top'));
				if (ff.getScrollDetail(ev)) {
					_this.target += 10;
					if (_this.target >= 0) {
						_this.target = 0;
						_this.setting.up();
						// _this.clearInite();
					}
				} else {
					_this.target -= 10;
					if (_this.target < -(_this.infor.h - _this.infor.parH)) {
						_this.target = -(_this.infor.h - _this.infor.parH);
						_this.setting.down();
						// _this.clearInite();
					}
					_this.target = Math.min(_this.target, 0)
				}
				_this.obj.css({
					transform: 'translateY('+ _this.target +'px)'
				})
				_this.bar.css({
					transform: 'translateY('+ -(_this.target/_this.infor.h)*(_this.barParH) +'px)'
				})
			})
		}
	}


