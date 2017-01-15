// 用于通过数据生成结构；

function doData (id, data) {
	this.obj = document.getElementById(id);
	console.log(this.obj)
	this.data = new dealData(data);
}

doData.prototype = {
	setFileArea: function(data, index){
		var html = '';
		var allFile = this.data.fondChild(data, index)
		for (var i = 0; i < allFile.length; i++) {
			html += '<a href="javascript:;">'+
						'<i></i>'+
						'<span>'+ allFile[i].title +'</span>'+
					'</a>';
		}
		this.obj.innerHTML = html;
	},
	setFileTree: function (data, index) {
		/*var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			html += '<li class="focus">'+
						'<i class="openFileIco"></i>'+
						'<i class="smallFileIco"></i>'+
						'<span>'+ data[i].title +'</span>'+
					'</li>';
		}
		html += '</ul>'
		this.obj.innerHTML = html;*/
		this.obj.innerHTML = this.setTree(data, index)
	},
	setTree: function (data, index, indent) {
		indent = indent || 1;
		console.log(indent)
		var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			if (data[i].pid === index) {
				html += '<li class="focus">'+
							'<h1 class="title" style="padding-left: '+ (38 + indent*10) +'px"><p>'+
							'<i class="openFileIco"></i>'+
							'<i class="smallFileIco"></i>'+
							'<span>'+ data[i].title +'</span>'+
							'</p></h1>'+
							this.setTree(data, data[i].id, (indent+1)) +
						'</li>';
			}
		}
		html += '</ul>'
		return html;
	}
};