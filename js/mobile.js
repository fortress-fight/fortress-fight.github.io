function mobileTools (selector) {
	this.obj = selector;
}
mobileTools.prototype = {
	inite: function (json) {

	},
	getSingle: function (fn) {
		var result;
		return function () {
			return result ||(result = fn.apply(this, arguments));
		}
	},
	on: function (json, target) {
		target = target || document;
		for (attr in json) {
			target.addEventListener(attr, json[attr]);
		}
	},
	sildEvent: function (dir, callback, limite) {
		var startX, startY, endX, endY, disX, dixY, angle,
			_this = this, json = {};
		if (typeof dir == 'object') {
			json = dir;
			limite = callback;
		} else {
			json[dir] = callback;
		}
		limite = limite || 50;

		this.on({
			'touchstart': function (ev) {
				ev = ev.touches[0];
				startX = ev.pageX;
				startY = ev.pageY;
			},
			'touchend': function (ev) {
				ev = ev.changedTouches[0];
				endX = ev.pageX;
				endY = ev.pageY;
				disX = endX - startX;
				disY = startY - endY;

				if (Math.abs(disX) < limite && Math.abs(disY) < limite) {
					return false;
				}

				angle = _this.getAngle(disX, disY);
				trigger();
			}
		});

		function trigger () {
			if (angle >= 45 && angle < 135) {
				json.up && json.up();
			};
			if (angle >= -45 && angle < 45) {
				json.right && json.right();
			};
			if (angle >= -135 && angle < -45) {
				json.bottom && json.bottom();
			};
			if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
				json.left && json.left();
			};
		};
	},
	getAngle: function (dx, dy) {
		return Math.atan2(dy, dx) * 180 / Math.PI;
	}
};