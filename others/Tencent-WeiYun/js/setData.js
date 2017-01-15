// 用于通过数据生成结构；

function doData (id, data) {
	this.obj = document.getElementById(id);
	this.data = new dealData(data);
}

doData.prototype = {
	setFileArea: function(data, index, callback){
		var html = '';
		var allFile = this.data.fondChild(data, index)
		for (var i = 0; i < allFile.length; i++) {
			html += '<a href="javascript:;" dataid = "'+ allFile[i].id +'" datapid = "'+ allFile[i].pid +'">'+
						'<i></i>'+
						'<span title="'+allFile[i].title+'">'+ allFile[i].title +'</span>'+
						'<em></em>'+
						'<input type="text">'+
					'</a>';
		}
		this.obj.innerHTML = html;
		// console.log(callback)
		callback && callback();
	},
	setFileTree: function (data, index) {
		this.obj.innerHTML = this.setTree(data, index)
	},
	setTree: function (data, index, indent) {
		// indent -- 每级缩进
		indent = indent || 1;

		var html = '<ul>';

		for (var i = 0; i < data.length; i++) {
			if (data[i].pid == index) {
				var onOff1 = this.data.fondChild(data, data[i].id).length > 0 ? true : false;
				var className = onOff1 ? 'fileIco' : '';
				var add = onOff1 ? this.setTree(data, data[i].id, (indent+1)) : '';
				onOff = true;
				html += '<li>'+
							'<h1 class="title" style="padding-left: '+ (38 + indent*10) +'px" data="'+ data[i].id +'" datapid="'+ data[i].pid +'"><p>'+
							'<i class="'+ className +'"></i>'+
							'<i class="smallFileIco"></i>'+
							'<span>'+ data[i].title +'</span>'+
							'</p></h1>'+
							add +
						'</li>';
			}
		}

		html += '</ul>'
		return html;
	},
	setMainAreaNav: function (data, index) {
		// console.log(index);
		var html = '';
		var allNav = this.data.findAllParent(data, index);
		// console.log(allNav.length)
		for (var i = allNav.length - 1; i >= 0; i--) {
			html += '<a href="javascript:;"dataid="'+ allNav[i].id +'" style = "z-index: '+i+'">'+ allNav[i].title +'</a>';
		}
		this.obj.innerHTML = html;
		this.obj.children[this.obj.children.length-1].className = 'lastPath';
	}
};