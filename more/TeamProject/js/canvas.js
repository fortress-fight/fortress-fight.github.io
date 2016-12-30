(function (window) {
	window.onload = function () {
		var Img = new Draw('myCanvas', 'myAudio');
		Img.inite();
	}

	function Draw (id, music) {
		this.c = document.getElementById(id);
		this.ctx = this.c.getContext('2d');
		this.aBtn = document.getElementById('LRBtn')
		this.up = document.querySelector('.up')
		this.down = document.querySelector('.down')
		if (music) {
			this.music = document.getElementById(music);
			this.musicCtx = new AudioContext();
		};
		this.flag = false;
		this.playMusic = false;
		this.stop = false;
		this.changeColorIndex = 0;
	}

	Draw.prototype.picData = {
		type: ['inite', 'circle', 'ovals', 'drop', 'ribbon'],
		cruType: 0,
		nowData: [],
		nextData: [],
		len: 120
	}

	Draw.prototype.textData = {
		type: ['----MIAOV----', '----HTML----', '----CSS----' , '---JavaScript---'],
		cruType: 0,
		nowData: [],
		nextData: [],
		len: 200,
		size: 100
	}

	Draw.prototype.colorData = {
		inite: [ '#e67e22', '#2c3e50' ],
		circle: [ '#e67e22', '#2c3e50' ],
		ovals: [ '#702744', '#f98d00' ],
		drop: [ '#1d75cf', '#3a5945' ],
		ribbon: [ '#702744', '#f98d00' ],
		heart: ['red', 'green'],
		text: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
			  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
			  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
			  '#FF5722'],
		changeColor: [[ '#e67e22', '#2c3e50' ], ['#58a', '#fb3']]
	}

	Draw.prototype.inite = function(){
		var _this = this;
		this.onOff = false;
		this.c.width = winWidth();
		this.c.height = winHeight()-3;
		this.clearC();

		se.addEventListener('transitionend', function (ev) {
			ev.cancelable = true;
			// console.log(_this.changeColorIndex)
			_this.colorData.circle = _this.colorData.changeColor[_this.changeColorIndex]
			_this.changeColorIndex ++;
			if (_this.changeColorIndex > _this.colorData.changeColor.length-1) {
				_this.changeColorIndex = 0;
			}
		});


		// music

		if (this.music) {
			this.analyser = this.musicCtx.createAnalyser();
		    this.audioSrc = this.musicCtx.createMediaElementSource(_this.music);
		    this.audioSrc.connect(_this.analyser);
		    this.analyser.connect(_this.musicCtx.destination);
		    this.frequencyData = new Uint8Array(_this.analyser.frequencyBinCount);
			// console.log(this.frequencyData)
		}

		window.onhashchange = function () {
			var a = locData.getHash().value;
			clearInterval(_this.timer)
			// _this.colorData.circle = ['red', 'blue'];
			clearInterval(_this.timer);
			_this.hide = true;

			setTimeout(function () {
				switch (a) {
					case 'cRun':
						_this.textData.size = 150;
						_this.textData.type= ['付飞', '刘洋', '王芳' , '苏鼎立','刘鑫','吴晓倩','倪文广','赵娜娜'];
						_this.hide = false;
						_this.clearC();
						_this.changePos();
						_this.setTextData();
						_this.initTextData();
						_this.aBtn.style.opacity = 1;
						break;
					case 'main':
						_this.textData.size = 100;
						_this.textData.type=['-------MIAOV-------', '-------HTML-------', '-------CSS-------' , '----JavaScript----'];
						_this.hide = false;
						_this.playMusic = false;
						_this.stop= false;
						_this.clearC();
						_this.changePos();
						_this.setTextData();
						_this.initTextData();
						_this.mainC();
						_this.aBtn.style.opacity = 0;
						_this.c.style.display = 'block';
						break;
					case 'music':
						_this.changePos();
						_this.hide = false;
						_this.clearC();
						_this.playMusic = true;
						_this.setTextData();
						_this.initTextData();
						break;
					case 'pto':
						_this.c.style.display = 'none';
						break;
					default:

						break;
				}
			},1000)
		}
		_this.down.onclick = function () {
			_this.picData.cruType++;
				if (_this.picData.cruType >= _this.picData.type.length) {
					_this.picData.cruType = 0;
				}
				_this.textData.cruType++;
				if (_this.textData.cruType >= _this.textData.type.length) {
					_this.textData.cruType = 0;
				}
			_this.clearC();
			_this.changePos();
			_this.setTextData();
			_this.initTextData();
			// _this.picData.cruType++;
			_this.flag = true;
		}
		_this.up.onclick = function () {
			_this.picData.cruType--;
			if (_this.picData.cruType < 0) {
				_this.picData.cruType = _this.picData.type.length-1;
			}
			_this.textData.cruType--;
			if (_this.textData.cruType < 0) {
				_this.textData.cruType = _this.textData.type.length-1;
			}
			_this.clearC();
			_this.changePos();
			_this.setTextData();
			_this.initTextData();
			// _this.picData.cruType--;
			_this.flag = true;
		}

		setTimeout(function () {

			_this.setBallData(_this.picData, _this.colorData);

			// text

			_this.initTextData();
			_this.mainC();
		}, 500)
			_this.startMove();
	};


	Draw.prototype.mainC = function(){
			var _this = this;
			_this.picData.cruType = 0;
			next();
			_this.timer = setInterval(next, 2000);
			function next (ev) {
				_this.clearC();
				_this.changePos();
				_this.setTextData();
				_this.initTextData();
				_this.picData.cruType++;
				// if (_this.picData.cruType >= 1) {
					_this.picData.cruType = 1;
				// }
				_this.textData.cruType++;
				if (_this.textData.cruType >= _this.textData.type.length) {
					_this.textData.cruType = 0;
				}
				_this.flag = true;
			}

	};
	Draw.prototype.setBallData = function(data, color){
		for (var i = 0; i < data.len; i++) {
			var step = Math.PI * 2 * i/data.len;
			var radius = randomBetween(0, 12);
			var statusX = randomBetween(500, 1200);
			var statusY = randomBetween(500, 1200);
			var hasBorn = radius > 0 || radius < 12 ? false : true;
			data.nowData.push({
				// x: -20,
				// y: this.c.height*0.25,
				x: this.c.width*0.5  + 140 * Math.cos(step),
				y: this.c.height*0.35 + 140 * Math.sin(step),
				radius: radius,
				maxRadius: 12,
				hasBorn: hasBorn,

				alpha: 1,
				maxAlpha: 0.6 + Math.random() * 0.3,
				color: randomColor(color.circle),

				step: step,
				angle: 0,
				interactive: false,

				ease: 0.04 + Math.random() * 0.06,
				bornSpeed: 0.07 + Math.random() * 0.07
			})
		}
		// console.log(data.nowData[2])
		for (var i = 0; i < data.nowData.length; i++) {
			this.drawImg(data.nowData[i]);
		}
	};

	Draw.prototype.initTextData = function (){
		this.textData.nowData = [];
		for (var i = 0; i < this.textData.nextData.length; i++) {
			var radius = randomBetween(0, 12);
			var hasBorn = radius > 0 || radius < 12 ? false : true;
			this.textData.nowData.push({

				// x: randomBetween(0, this.c.width),
				// y: randomBetween(this.c.height-100, this.c.height),

				x: randomBetween(0, this.c.width),
				y: this.c.height+10,
				hasBorn: hasBorn,

				ease: 0.04 + Math.random() * 0.06,
				bornSpeed: 0.07 + Math.random() * 0.07,

				alpha: 1,
				maxAlpha: 0.7 + Math.random() * 0.4,

				radius: radius,
				maxRadius: 6,

				angle: 0,

				color: randomColor(this.colorData.text),
				interactive: false

			});
		}
		for (var i = 0; i < this.textData.nowData.length; i++) {
			this.drawImg(this.textData.nowData[i]);
		}
	}


	Draw.prototype.setTextData = function () {
		this.ctx.font = this.textData.size + 'px Lato, Arial, sans-serif';
		this.ctx.fillStyle = 'rgb(255, 255, 255)';
		this.ctx.textAlign = 'center';
		var strip = this.textData.type[this.textData.cruType].split('').join(' ');
		this.ctx.fillText(strip, this.c.width * 0.5, this.c.height - 50);
		this.getTextData();
	}

	Draw.prototype.getTextData = function () {
		this.textData.nextData = [];
		if (this.playMusic) {
			for (var i = 0; i < 80; i++) {
				this.textData.nextData.push({
					x: i * 60,
					y: 700,
					orbit: randomBetween(1, 3),
					angle: 0
				});
			}
		} else {
			var surface = this.ctx.getImageData(0, 0, this.c.width, this.c.height);
			for(var width = 0; width < surface.width; width += 6) {
				for(var height = 0; height < surface.height; height += 6) {
					var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];
					if(color === 255) {
						this.textData.nextData.push({
							x: width,
							y: height,
							orbit: randomBetween(1, 3),
							angle: 0
						});
					}
				}
			}
		}
	}


	Draw.prototype.drawImg = function (data) {

		// console.log(data)

		this.ctx.save();
		this.ctx.globalAlpha = data.alpha;
		this.ctx.fillStyle = data.color;
		this.ctx.beginPath();
		if(!this.playMusic){
			this.ctx.arc(data.x, data.y, data.radius, 0, 2*Math.PI);
		}
		else{
			this.ctx.fillRect(data.x-3, data.y,12,50);
		}
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();

	}

	Draw.prototype.changeRadius = function(data, color){
		data.alpha += (data.maxAlpha - data.alpha) * 0.05;
		if (this.playMusic) {
			var _this = this;
	        var array = new Uint8Array(_this.analyser.frequencyBinCount);
	        this.analyser.getByteFrequencyData(array);
	        this.textData.nextData = [];
	        for (var i = 0; i < 50; i++) {
	        	var target = 0;
	        	if (array[i*6] > 200 ) {
					target = 200;
				} else {
					target = array[i*6]
				}
				this.textData.nextData.push({
					x: i * 30 + 70,
					y: 700 - target*2.5,
					orbit: randomBetween(1, 3),
					angle: 0
				});
			}
			if (this.textData.nowData.length > this.textData.nextData.length) {
				this.textData.nowData.length = this.textData.nextData.length;
			}
			// console.log(array)
			// this.playMusic = false;
		} else {
			if (data.hasBorn) {
				data.radius -= data.radius * data.bornSpeed;
				if (Math.round(data.radius) === 0) {
					data.hasBorn = false;
					data.color = randomColor(color);
				}
			} else {
				data.radius += (data.maxRadius - data.radius) * data.bornSpeed;
				if (Math.round(data.radius) === data.maxRadius) {
					data.hasBorn = true;
				}
			}
		}
	};


	Draw.prototype.changePos = function () {
		var data = this.picData.nowData;
		var nextData = this.picData.nextData;
		for (var i = 0; i < data.length; i++) {
			nextData[i] = {};
			switch (this.picData.type[this.picData.cruType]) {
				case 'inite':
					nextData[i].x = this.c.width*0.5 + randomBetween(0, 800) * Math.cos(data[i].step);
					nextData[i].y = this.c.height*0.2 + randomBetween(0, 100) * Math.sin(data[i].step);
					break;
				case 'circle':
					nextData[i].x = this.c.width*0.5 + 140 * Math.sin(data[i].step);
					nextData[i].y = this.c.height*0.4 + 140 * Math.cos(data[i].step);
					break;
				case 'drop':
					nextData[i].x = this.c.width * 0.5 + 90 * (1 - Math.sin(i)) * Math.cos(i);
					nextData[i].y = 400 + 140 * (- Math.sin(i) - 1);
					break;
				case 'ovals':
					var limit, step;
					limit = (data.length * 0.5) - 1;
					step = Math.PI * 2 * i / limit;
					// First oval
					if(i < [].slice.call(data, 0, limit).length) {
						nextData[i].x = this.c.width * 0.5 + 80 * Math.cos(step);
						nextData[i].y = 320 + 140 * Math.sin(step);
					}
					// Second oval
					else {
						limit = (data.length * 0.5);
						nextData[i].x = this.c.width * 0.5 + 140 * Math.cos(step);
						nextData[i].y = 320 + 80 * Math.sin(step);
					}
					break;
				case 'heart':
					nextData[i].x = this.c.width * 0.5 + 1 * (i);
					nextData[i].y = this.c.height*0.5  + 120 * (1 + Math.sin(i)) * Math.sin(i);
					break;
				case 'ribbon':
					nextData[i].x = this.c.width * 0.5 + 90 * (Math.sin(i)) * Math.cos(i);
					nextData[i].y = 430 + 140 * (- Math.sin(i) - 1);
					break;

				default:
					// statements_def
					break;
			};
		};
	}


	Draw.prototype.moveTo = function (now, target) {
		if (this.hide) {
			now.x += ((-400 + Math.cos(now.angle) * 5) - now.x) * 0.04;
			now.y += ((target.y + Math.sin(now.angle) * 5) - now.y) * 0.08;
		} else {
			if (!now.interactive) {
				now.x += ((target.x + Math.cos(now.angle) * 5) - now.x) * 0.08;
				now.y += ((target.y + Math.sin(now.angle) * 5) - now.y) * 0.08;
			}
			now.angle += 0.08;
		}
	}

	Draw.prototype.startMove = function () {
		var _this = this;
		var pic = _this.picData;
		var text = _this.textData;
		(function fn() {
			_this.clearC();
			if (!_this.playMusic) {
				for (var i = 0; i < pic.nowData.length; i++) {
					if (_this.flag) {
						_this.moveTo(pic.nowData[i], pic.nextData[i]);
					}
					_this.drawImg(pic.nowData[i]);
					_this.changeRadius(pic.nowData[i], _this.colorData[pic.type[pic.cruType]]);
				}
			}

			for (var i = 0; i < text.nowData.length; i++) {
				if (_this.flag) {
					_this.moveTo(text.nowData[i], text.nextData[i]);
				}
				_this.drawImg(text.nowData[i]);
				_this.changeRadius(text.nowData[i], _this.colorData.text);
			}
			requestAnimationFrame(fn);
		})();
	}


	Draw.prototype.clearC = function () {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}


	function randomColor (aColor) {
		var color = aColor[Math.floor(Math.random()*aColor.length)];
		return color;
	}

	function randomBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function winWidth () {
		return document.documentElement.clientWidth;
	}
	function winHeight () {
		return document.documentElement.clientHeight;
	}

	function between (num, length) {
		console.log(length)
		if (num <= 0) {
			return length-1;
		}
		if (num >= length) {
			return num;
		}
	}

	function Mscroll (ev) {
		if (ev.wheelDelta) {
			return ev.wheelDelta > 0 ? true : false;
		} else {
			return ev.detail < 0 ? true : false;
		}
	}
})(window)
