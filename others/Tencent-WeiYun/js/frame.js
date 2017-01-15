/**
 * 要在样式表中添加frameBox（选框）的样式；使用的时候直接 frame(id); 这里的id是选框出现的范围;
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */

function frame (id) {
			this.obj = document.getElementById(id);
		};

		;(function(global, factory){
			factory(global)
		})(typeof window !== 'undefined' ? window : this, function (global, noGlobal){
		function frame (id) {
			return new frame.init(id);
		};
		frame.prototype = {
		constructor: frame,
		init: function(){
			var _this = this;
			this.obj.addEventListener('mousedown', down);
			function down (ev) {
				var ev = ev || window.event;
				_this.fnDown(ev, this);
			};
		},
		fnDown: function(ev, sponser){
			if (ev.target !== this.obj) {
				return false;
			}
			this.num = 0;
			var _this = this;
			this.initX = ev.clientX;
			this.initY = ev.clientY;
			// console.log(ev.target, this.obj)

			this.frame = document.createElement('div');
			this.frame.id = 'frameBox';
			this.frame.style.top = ev.clientY - this.pos(this.obj).Y + 'px';
			this.frame.style.left = ev.clientX - this.pos(this.obj).X + 'px';
			this.obj.appendChild(this.frame);
			console.log(ev.target)

			document.addEventListener('mousemove', move, false);
			document.addEventListener('mouseup', up, false);
			function move (ev) {
				_this.fnMove(ev)
			}
			function up () {
				_this.fnUp(move, up);
			}
		},
		fnMove: function(ev){
			ev.preventDefault();
			disX = ev.clientX - this.initX;
			disY = ev.clientY - this.initY;
			this.frame.style.width = Math.abs(disX) + 'px';
			this.frame.style.height = Math.abs(disY) + 'px';

			if (disX < 0) {
				this.frame.style.left = ev.clientX - this.pos(this.obj).X + 'px';
			};
			if (disY < 0) {
				this.frame.style.top = ev.clientY - this.pos(this.obj).Y + 'px';
			};
			this.checkContact();
		},
		fnUp: function(fn1, fn2){
			document.removeEventListener('mousemove', fn1);
			document.removeEventListener('mouseup', fn2);
			if (document.getElementById('frameBox')) {
				this.obj.removeChild(this.frame);
			}
		},
		pos: function (obj) {
			var setPos = {};
			setPos.X = obj.getBoundingClientRect().left;
			setPos.Y = obj.getBoundingClientRect().top;

			return setPos;
		},
		checkContact: function () {
			for (var i = 0; i < this.target.length; i++) {
				tool.removeClass(this.target[i], 'focus');
				tool.removeClass(this.checkAll, 'active');

				if (this.contact(this.frame, this.target[i])) {
					this.target[i].className = 'focus';
				}
			};
			for (var i = 0; i < this.target.length; i++) {
				if (!tool.haveClass(this.target[i], 'focus')) {
					return;
				}
			}
			tool.addClass(this.checkAll, 'active');
		},
		contact: function (obj1, obj2) {
			var o1L = this.pos(obj1).X;
			var o1T = this.pos(obj1).Y;
			var o1W = this.getSize(obj1).width;
			var o1H = this.getSize(obj1).height;

			var o2L = this.pos(obj2).X;
			var o2T = this.pos(obj2).Y;
			var o2W = this.getSize(obj2).width;
			var o2H = this.getSize(obj2).height;

			// console.log(o1L,o1T,o1W,o1H)
			if ((o1L+o1W) > o2L && o1L < (o2L+o2W) && (o1T + o1H) > o2T && o1T < (o2T+o2H)  ) {
				return true;
			} else {
				return false;
			}
		},
		getSize: function (obj) {
			return {
				width: obj.offsetWidth,
				height: obj.offsetHeight
			}
		}
	};

	frame.init = function(id){
		this.obj = document.getElementById(id);
		this.target = this.obj.getElementsByTagName('a');
		this.checkAll = document.getElementById('checkAll');
		this.num = 0;
			// console.log(this.target)
		this.init();
	};

	frame.init.prototype = frame.prototype;
	window.frame = frame;
});



