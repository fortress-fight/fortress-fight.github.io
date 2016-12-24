var tools = (function () {
	var tool = {
		winSize: function () {
			var size = {};
			size.w = document.documentElement.clientWidth;
			size.h = document.documentElement.clientHeight;
			return size;
		},
		allAdd: function (num, inter, size) {
			var sum = num;
			for (var i = 0; i < size; i++) {
				sum += inter;
			}
			return sum;
		}
	}
	return tool;
})()