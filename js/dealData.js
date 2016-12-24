function dealData (data) {
	this.data = data;
}

dealData.prototype = {
	constructor: dealData,
	getTitle: function () {
		var title = [];
		for (var i = 0; i < this.data.length; i++) {
			title.push(this.data[i].title)
		}
		return title;
	},
	setTitle: function () {
		var titles = this.getTitle();
		var str = '';
		var clName = '';
		for (var i = 0; i < titles.length; i++) {
			if (i == 0) {clName = 'active'} else {clName = ''}
			str += '<a href="javascript:;" class="'+ clName +'">\
						<span>'+ titles[i] +'</span>\
					</a>'
		}
		return str;
	},
	findData: function (index) {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i].index == index) {
				return this.data[i]
			}
		}
		return false;
	},
	setLayOut: function (index) {
		var target = this.findData(index);
		var str = '';
		for (var i = 0; i < 3; i++) {
			str += '<div>'
			if (target.con[i].h) {
				str += '<h2>'+ target.con[i].h +'</h2>'
			}
			for (var j = 0; j < target.con[i].p.length; j++) {
				str += '<p>'+ target.con[i].p[j] +'</p>'
			}
			str += '</div>'
		}
		return str;
	}
}
