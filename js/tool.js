(function (global, factory) {
	factory(global)
})(typeof window !== 'undefined' ? window : this, function (global, noGlobal) {
	function ffTools (selector) {
		return new ffTools.prototype.inite(selector);
	};

	ffTools.prototype = {
		constructor: ffTools,
		inite: function (selector, context) {
			var arr;
			context = context || document;
			if (selector.indexOf(' ') !== -1 || selector.charAt(0) === '.') {
				arr = (context.querySelectorAll(selector));
			} else if (selector.charAt(0) === '#') {
				arr = (document.getElementById(selector.substring(1)));
			} else {
				arr = (context.getElementsByTagName(selector));
			}
			if (!arr.length || arr.length == 1) {
				this.obj = arr[0] || arr;
			} else {
				this.obj = arr;
			}
			return this.obj;
		},
		getPos: function () {
			var obj = this.obj;
		    var pos = {
		        left: 0,
		        top: 0
		    }
		    while (obj){
		        pos.left += obj.offsetLeft;
		        pos.top += obj.offsetTop;
		        obj = obj.offsetParent;
		    }
		    return pos;
		}
	}



	var tool = {
		setTime:function  (time) {
	        var data = new Date(time);
	        var year = data.getFullYear();
	        var month = data.getMonth() + 1;
	        var week = data.getDate();
	        var day = data.getDay();
	        var h = data.getHours();
	        var m = data.getMinutes();
	        var s = data.getSeconds();
	        return this.dateToString([
	            year,
	            this.turnToo(month),
	            this.turnToo(week),
	            this.turnToo(day),
	            this.turnToo(h),
	            this.turnToo(m),
	            this.turnToo(s)
	            ], 0)
	    },
	    turnToo: function (num) {
	        num = num+'';
	        return num.length == 1 ? "0" + num:num;
	    },
    	dateToString: function (arr,n) {
	        //arr: 时间数组   ; n:时间连接方式
	        var s = '';
	        n = n || 0;
	        var aStr = ['年月日时分秒','-- ::','// ::'];
	        for ( var i=0; i<arr.length; i++ ) {
	            s += arr[i]+aStr[n].charAt(i);
	        };
	        return s;
	    },
	    getHash: function () {
			var lc = window.location.hash.substring(1);
			// var data = {}
			data = lc.split('=');
			// data.name = lc[0];
			// data.value = lc[1];
			/*console.log(data);
			if (data.length) {
				return data[1];
			} else {
				return lc;
			}*/
			return data[1] ? data[1] : data[0];
		},
		getSearch: function () {
			var lc = location.search.length > 0 ? location.search.substring(1) : '',
			    data = {},
			    items = lc.length ? lc.split('&') : [],
			    item = null,
			    name = null,
			    value = null,
			    i=0,
			    len = items.length;
			for (var i = 0; i < len; i++) {
				item = items[i].split('=');
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				for (var i = 0; i < item.length; i++) {
					data[name] = value;
				}
			}
			return data;
		},

		// EventUtil


		addHandler : function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
				if (type == 'mousewheel') {
					element.addEventListener('DOMMouseScroll', handler, false);
				}
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}
		},

		// 这里我会使用ev = ev || window.event
		getEvent : function (event) {
			return event ? event : window.event;
		},

		getTarget: function (event) {
			return event.target || event.srcElement;
		},

		getRelatedTarget: function (event) {
			if (event.relatedTarget) {
				return event.relatedTarget;
			} else if (event.toElement) {
				return event.toElement;
			} else if (event.fromElement) {
				return event.fromElement;
			} else {
				return null;
			}
		},

		// getPageX 和 getPageY 是我自己写的，已检验

		getPageX: function (event) {
			event.pageX = event.pageX ? event.pageX : event.clientY+(document.body.scrollLeft || document.documentElement.scrollLeft);
			return event.pageX;
		},

		getPageY: function (event) {
			event.pageY = event.pageY ? event.pageY : event.clientY+(document.body.scrollTop || document.documentElement.scrollTop);
			return event.pageY;
		},

		/*这里我会使用
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		*/
		preventDefault: function (event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},

		removeHandler : function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent('on' + type, handler);
			} else {
				element['on' + type] = null;
			}
		},

		// 目前cancelBubble在标准浏览器下也支持了，
		// 所以要取消冒泡直接使用event.cancelBubble = true就可以了

		stopPropagation: function (event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},


		// getScrollDetail 是我自己写的，已检验 true -- 向上滚

		getScrollDetail: function (event) {
			if (event.wheelDelta) {
				return event.wheelDelta > 0 ? true : false;
			} else {
				return event.detail < 0 ? true : false;
			}
		},

		getButton: function (event) {
			if (document.implementation.hasFeature('MouseEvents', '2.0')) {
				return event.button;
			} else {
				switch (event.button) {
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return 2;
					case 4:
						return 1;
				}
			}
		}
	}

	for (attr in tool) {
		ffTools[attr] = tool[attr];
	}

	ffTools.prototype.inite.prototype = ffTools.prototype;

	window.ff = ffTools;
})