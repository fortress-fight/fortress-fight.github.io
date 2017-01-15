var tool = (function(){
	var allTools = {
		$: function (selector, context) {
			context = context || document;
			if (selector.indexOf(' ') !== -1) {
				return context.querySelectorAll(selector);
			} else if (selector.charAt(0) === '#') {
				return document.getElementById(selector.substring(1));
			} else if (selector.charAt(0) === '.') {
				return context.getElementsByClassName(selector);
			} else {
				return context.getElementsByTagName(selector);
			}
		},
		arrIndexOf: function (arr, v, index) {
			var num = -1;
			index = index ? index : 0;
			for (var i = index; i < arr.length; i++) {
				if (arr[i] === v) {
					num = i;
				}
			}
			return num;
		},
		getClass: function (tagName, className, context) {
			context = context || document;
			var aEl = context.getElementsByTagName(tagName);
			var arr = [];
			for (var i = 0; i < aEl.length; i++) {
				var aName = aEl[i].className.split(' ');
				for (var i = 0; i < aName.length; i++) {
					if (aEl[i].className === className) {
						arr.push(aEl[i]);
						break;
					}
				}
			}
			return arr;
		},
		addClass: function (obj, cName) {
			if (obj.className === '') {
				obj.className = cName;
			} else {
				var aName = obj.className.split(' ');
				var _index = this.arrIndexOf(aName, cName);
				if (_index === -1) {
					obj.className += ' ' + cName;
				}
			}
		},
		removeClass: function (obj, className) {
			var aName = obj.className.split(' ');
			var _index = this.arrIndexOf(aName, className);
			while (_index !== -1) {
				aName.splice(_index, 1);
				_index = this.arrIndexOf(aName, className);
			}
			obj.className = aName.join(' ');
		},
		haveClass: function (el, className) {
			var aName = el.className.split(' ');
			var _index = this.arrIndexOf(aName, className);
			return _index === -1 ? false : true;
		},
		turnClass: function (el, className) {
			if (this.haveClass(el, className)) {
				this.removeClass(el, className);
				return false;
			} else {
				this.addClass(el, className);
				return true;
			}
		},
		findParent: function (el, selector) {
			var self = el;
			if (selector.charAt(0) === '#') {
				while (el && el.nodeType !== 9 && el.id !== selector.substring(1)) {
					el = el.parentNode;
				}
			} else if (selector.charAt(0) === '.') {
				while (el && !this.haveClass(el, selector.substring(1)) && el.nodeType !== 9) {
					el = el.parentNode;
				}
			} else {
				while(el && el.nodeType !== 9 && el.nodeName.toLowerCase() !== selector){
					el = el.parentNode;
				}
			}
			return el && el.nodeType === 9  ? null : el;
		},
		addEvent: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
				if (type === 'mousewheel') {
					element.addEventListener('DOMMouseScroll', handler, false);
				}
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, handler)
			} else {
				element['on'+type] = handler;
			}
		},
		removeEvent: function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
				if (type === 'mousewheel') {
					element.removeEventListener('DOMMouseScroll', handler, false);
				}
			} else if (element.detachEvent) {
				element.detachEvent(type, handler);
			} else {
				element['on'+type] = null;
			}
		},
		each: function (arr, callback) {
			for (var i = 0; i < arr.length; i++) {
				callback(arr[i], i);
			}
		},
		deepClone: function (obj) {
			var newObj = (obj instanceof Array) ? [] : {};
			for (attr in obj) {
				if (typeof obj[attr] === 'Object') {
					newObj[attr] = this.deepClone(obj[attr]);
				} else {
					newObj[attr] = obj[attr];
				}
			}
			return newObj;
		},
		hide: function (el) {
			el.style.display = 'none';
			return false;
		},
		show: function (el) {
			el.style.display = 'block';
			return true;
		},
		turnShow: function (el) {
			if (el.style.display === 'none') {
				this.show(el);
				return true;
			} else if (el.style.display === 'block') {
				this.hide(el);
				return false;
			}
		},
		getOffset:function (el){
			return {
				width:el.offsetWidth,
				height:el.offsetHeight
			}
		},
		contact: function (obj1, obj2) {
			var o1L = this.getBound(obj1).left;
			var o1T = this.getBound(obj1).top;
			var o1W = this.getSize(obj1).width;
			var o1H = this.getSize(obj1).height;

			var o2L = this.getBound(obj2).left;
			var o2T = this.getBound(obj2).top;
			var o2W = this.getSize(obj2).width;
			var o2H = this.getSize(obj2).height;

			if ((o1L+o1W) > o2L && o1L < (o2L+o2W) && (o1T + o1H) > o2T && o1T < (o2T+o2H)  ) {
				alert('pengshangle');
			}
		},
		getBound: function (obj) {
			return obj.getBoundingClientRect();
		},
		getSize: function (obj) {
			return {
				width: obj.offsetWidth,
				height: obj.offsetHeight
			}
		}
	}
	return allTools;
})();