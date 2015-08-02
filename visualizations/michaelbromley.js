/*
	Visualization adapted from Michael Bromley's Soundcloud visualizer.
	https://github.com/michaelbromley/soundcloud-visualizer
*/
var MichaelBromleyVisualization = (function() {
	/*
		Amplitude Visualzation Template
	*/
	var amplitude_visualization_id = 'michaelbromley_visualization';
	var amplitude_visualization_name = 'Michael Bromley Visualization';
	var amplitude_container = '';

	var amplitude_visualization_preferences = {
		"width": 500,
		"height": 500,
		"fullscreen": false
	};

	var analyser = '';

	var tileSize;
	var tiles = [];
	var stars = [];

	/*
		Variables that are specific to
		the canvas and how it will display
		the visualizations.
	*/
	var fgCanvas;
	var fgCtx;
	var fgRotation = 0.001;
	var bgCanvas;
	var bgCtx;
	var sfCanvas;
	var sfCtx;

	var volume = 0;
	var streamData = new Uint8Array(128);

	var drawBgInterval;
	var rotateForegroundInterval;
	var sampleAudioStreamInterval;

	var animationFrame;

	/*
		REQUIRED
		Start visualization method. Initialize your visualization here.
	*/
	function startVisualization(  ){
		if( document.getElementById('amplitude-visualization') ){
			analyser = Amplitude.analyser();

			amplitude_container = document.getElementById('amplitude-visualization');

			/*
				Foreground Hexagons Layer
			*/
			fgCanvas = document.createElement('canvas');
			fgCanvas.setAttribute('style', 'position: absolute; z-index: 10');
			fgCtx = fgCanvas.getContext("2d");
			amplitude_container.appendChild(fgCanvas);

			/*
				Middle Starfield Layer
			*/
			sfCanvas = document.createElement('canvas');
			sfCtx = sfCanvas.getContext("2d");
			sfCanvas.setAttribute('style', 'position: absolute; z-index: 5');
			amplitude_container.appendChild(sfCanvas);

			/*
				Background Image Layer
			*/
			bgCanvas = document.createElement('canvas');
			bgCtx = bgCanvas.getContext("2d");
			amplitude_container.appendChild(bgCanvas);

			makePolygonArray();
			makeStarArray();

			resizeCanvas();
			draw();

			sampleAudioStreamInterval = setInterval(sampleAudioStream, 20);

			drawBgInterval = setInterval(drawBg, 100);
			rotateForegroundInterval = setInterval(rotateForeground, 20);
			/*
				Resize the canvas to fill browser window dynamically
			*/
			window.addEventListener('resize', this.resizeCanvas, false);
		}
	}

	/*
		REQUIRED
		Stop visualization method. Unbind ANY recurring visualization methods so
		other visaulzations can fire on the audio tag.
	*/
	function stopVisualization(){
		clearInterval(sampleAudioStreamInterval);
		clearInterval(drawBgInterval);
		clearInterval(rotateForegroundInterval);

		window.cancelAnimationFrame(animationFrame);

		amplitude_container.innerHTML = '';
	}

	/*
		REQUIRED
		If you don't have any preferences, you don't have to implement any
		of this, just leave the stub and nothing will happen.
	*/
	function setPreferences( preferences ){
		for(var key in amplitude_visualization_preferences){
			if( preferences[key] != undefined) {
				amplitude_visualization_preferences[key] = preferences[key];
			}
		}
	}

	function sampleAudioStream(){
		
		analyser.getByteFrequencyData(streamData);
        /*	
        	Calculate an overall volume value
        */
        var total = 0;
        /*
    		Get the volume from the first 80 bins, else it gets too loud with treble
    	*/
        for (var i = 0; i < 80; i++) { 

            total += streamData[i];
        }
        volume = total;
	}
	function Polygon(sides, x, y, tileSize, ctx, num) {
		this.sides = sides;
		this.tileSize = tileSize;
		this.ctx = ctx;
		/*
			The number of the tile, starting at 0
		*/
		this.num = num; 
		/*
			The highest colour value, which then fades out
		*/
		this.high = 0; 
		/*
			Increase this value to fade out faster.
		*/
		this.decay = this.num > 42 ? 1.5 : 2; 
		/* For highlighted stroke effect
			figure out the x and y coordinates of the center of the polygon based on the
			60 degree XY axis coordinates passed in
		*/
		this.highlight = 0; 

		var step = Math.round(Math.cos(Math.PI/6)*tileSize*2);
		this.y = Math.round(step * Math.sin(Math.PI/3) * -y  );
		this.x = Math.round(x * step + y * step/2 );

		/*
			Calculate the vertices of the polygon
		*/
		this.vertices = [];
		for (var i = 1; i <= this.sides;i += 1) {
			x = this.x + this.tileSize * Math.cos(i * 2 * Math.PI / this.sides + Math.PI/6);
			y = this.y + this.tileSize * Math.sin(i * 2 * Math.PI / this.sides + Math.PI/6);
			this.vertices.push([x, y]);
		}
	}

	Polygon.prototype.rotateVertices = function() {
		/*
			Rotate all the vertices to achieve the overall rotational effect
		*/
		var rotation = fgRotation;

		rotation -= analyser.volume > 10000 ? Math.sin(analyser.volume/800000) : 0;
		for (var i = 0; i <= this.sides-1;i += 1) {
			this.vertices[i][0] = this.vertices[i][0] -  this.vertices[i][1] * Math.sin(rotation);
			this.vertices[i][1] = this.vertices[i][1] +  this.vertices[i][0] * Math.sin(rotation);
		}
	};

	Polygon.prototype.calculateOffset = function(coords) {
		var angle = Math.atan(coords[1]/coords[0]);
		/*
			A bit of pythagoras
		*/
		var distance = Math.sqrt(Math.pow(coords[0], 2) + Math.pow(coords[1], 2));
		/*
			This factor makes the visualization go crazy wild
		*/
		var mentalFactor = Math.min(Math.max((Math.tan(volume/6000) * 0.5), -20), 2); 

		var offsetFactor = Math.pow(distance/3, 2) * (volume/2000000) * (Math.pow(this.high, 1.3)/300) * mentalFactor;
		var offsetX = Math.cos(angle) * offsetFactor;
		var offsetY = Math.sin(angle) * offsetFactor;
		offsetX *= (coords[0] < 0) ? -1 : 1;
		offsetY *= (coords[0] < 0) ? -1 : 1;
		return [offsetX, offsetY];
	};

	Polygon.prototype.drawPolygon = function() {
		var bucket = Math.ceil(streamData.length/tiles.length*this.num);
		var val = Math.pow((streamData[bucket]/255),2)*255;
		val *= this.num > 42 ? 1.1 : 1;
		/*
			Establish the value for this tile
		*/
		if (val > this.high) {
			this.high = val;
		} else {
			this.high -= this.decay;
			val = this.high;
		}

		/*
			Figure out what colour to fill it and then draw the polygon
		*/
		var r, g, b, a;
		if (val > 0) {
			this.ctx.beginPath();
			var offset = this.calculateOffset(this.vertices[0]);
			this.ctx.moveTo(this.vertices[0][0] + offset[0], this.vertices[0][1] + offset[1]);
			
			/*
				Draw the polygon
			*/
			for (var i = 1; i <= this.sides-1;i += 1) {
				offset = this.calculateOffset(this.vertices[i]);
				this.ctx.lineTo (this.vertices[i][0] + offset[0], this.vertices[i][1] + offset[1]);
			}
			this.ctx.closePath();

			if (val > 128) {
				r = (val-128)*2;
				g = ((Math.cos((2*val/128*Math.PI/2)- 4*Math.PI/3)+1)*128);
				b = (val-105)*3;
			}else if (val > 175) {
				r = (val-128)*2;
				g = 255;
				b = (val-105)*3;
			}else {
				r = ((Math.cos((2*val/128*Math.PI/2))+1)*128);
				g = ((Math.cos((2*val/128*Math.PI/2)- 4*Math.PI/3)+1)*128);
				b = ((Math.cos((2.4*val/128*Math.PI/2)- 2*Math.PI/3)+1)*128);
			}

			if (val > 210) {
				/*
					Add the cube effect if it's really loud
				*/
				this.cubed = val; 
			}

			if (val > 120) {
				/*
					Add the highlight effect if it's pretty loud
				*/
				this.highlight = 100; 
			}

			/*
				Set the alpha
			*/
			var e = 2.7182;
			a = (0.5/(1 + 40 * Math.pow(e, -val/8))) + (0.5/(1 + 40 * Math.pow(e, -val/20)));

			this.ctx.fillStyle = "rgba(" +
				Math.round(r) + ", " +
				Math.round(g) + ", " +
				Math.round(b) + ", " +
			a + ")";
			this.ctx.fill();

			/* 
				Stroke
			*/
			if (val > 20) {
				var strokeVal = 20;
				this.ctx.strokeStyle =  "rgba(" + strokeVal + ", " + strokeVal + ", " + strokeVal + ", 0.5)";
				this.ctx.lineWidth = 1;
				this.ctx.stroke();
			}
		}
	};

	Polygon.prototype.drawHighlight = function() {
		this.ctx.beginPath();
		/* 
			Draw the highlight
		*/
		var offset = this.calculateOffset(this.vertices[0]);
		this.ctx.moveTo(this.vertices[0][0] + offset[0], this.vertices[0][1] + offset[1]);
		
		/*
			Draw the polygon
		*/
		for (var i = 0; i <= this.sides-1;i += 1) {
			offset = this.calculateOffset(this.vertices[i]);
			this.ctx.lineTo (this.vertices[i][0] + offset[0], this.vertices[i][1] + offset[1]);
		}
		this.ctx.closePath();
		var a = this.highlight/100;
		this.ctx.strokeStyle =  "rgba(255, 255, 255, " + a + ")";
		this.ctx.lineWidth = 1;
		this.ctx.stroke();
		this.highlight -= 0.5;
    };

    var makePolygonArray = function() {
		tiles = [];
		/**
		* Arrange into a grid x, y, with the y axis at 60 degrees to the x, rather than
		* the usual 90.
		* @type {number}
		*/
		var i = 0; 
		/*
			Unique number for each tile
		*/
		tiles.push(new Polygon(6, 0, 0, tileSize, fgCtx, i)); 

		/*
			The centre tile
		*/
		i++;
		
		for (var layer = 1; layer < 7; layer++) {
			tiles.push(new Polygon(6, 0, layer, tileSize, fgCtx, i)); i++;
			tiles.push(new Polygon(6, 0, -layer, tileSize, fgCtx, i)); i++;
			
			for(var x = 1; x < layer; x++) {
				tiles.push(new Polygon(6, x, -layer, tileSize, fgCtx, i)); i++;
				tiles.push(new Polygon(6, -x, layer, tileSize, fgCtx, i)); i++;
				tiles.push(new Polygon(6, x, layer-x, tileSize, fgCtx, i)); i++;
				tiles.push(new Polygon(6, -x, -layer+x, tileSize, fgCtx, i)); i++;
			}
			for(var y = -layer; y <= 0; y++) {
				tiles.push(new Polygon(6, layer, y, tileSize, fgCtx, i)); i++;
				tiles.push(new Polygon(6, -layer, -y, tileSize, fgCtx, i)); i++;
			}
		}
    };

	function Star(x, y, starSize, ctx) {
		this.x = x;
		this.y = y;
		this.angle = Math.atan(Math.abs(y)/Math.abs(x));
		this.starSize = starSize;
		this.ctx = ctx;
		this.high = 0;
	}

	Star.prototype.drawStar = function() {
		var distanceFromCentre = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

		/*
			Stars as lines
		*/
		var brightness = 200 + Math.min(Math.round(this.high * 5), 55);
		this.ctx.lineWidth= 0.5 + distanceFromCentre/2000 * Math.max(this.starSize/2, 1);
		this.ctx.strokeStyle='rgba(' + brightness + ', ' + brightness + ', ' + brightness + ', 1)';
		this.ctx.beginPath();
		this.ctx.moveTo(this.x,this.y);
		var lengthFactor = 1 + Math.min(Math.pow(distanceFromCentre,2)/30000 * Math.pow(volume, 2)/6000000, distanceFromCentre);
		var toX = Math.cos(this.angle) * -lengthFactor;
		var toY = Math.sin(this.angle) * -lengthFactor;
		toX *= this.x > 0 ? 1 : -1;
		toY *= this.y > 0 ? 1 : -1;
		this.ctx.lineTo(this.x + toX, this.y + toY);
		this.ctx.stroke();
		this.ctx.closePath();

		/*
			Starfield movement coming towards the camera
		*/
		var speed = lengthFactor/20 * this.starSize;
		this.high -= Math.max(this.high - 0.0001, 0);
		if (speed > this.high) {
			this.high = speed;
		}

		var dX = Math.cos(this.angle) * this.high;
		var dY = Math.sin(this.angle) * this.high;
		this.x += this.x > 0 ? dX : -dX;
		this.y += this.y > 0 ? dY : -dY;

		var limitY = fgCanvas.height/2 + 500;
		var limitX = fgCanvas.width/2 + 500;
		if ((this.y > limitY || this.y < -limitY) || (this.x > limitX || this.x < -limitX)) {
			/*
				It has gone off the edge so respawn it somewhere near the middle.
			*/
			this.x = (Math.random() - 0.5) * fgCanvas.width/3;
			this.y = (Math.random() - 0.5) * fgCanvas.height/3;
			this.angle = Math.atan(Math.abs(this.y)/Math.abs(this.x));
		}
	};

	var makeStarArray = function() {
		var x, y, starSize;
		stars = [];
		var limit = fgCanvas.width / 15; 
		/*
			How many stars?
		*/
		for (var i = 0; i < limit; i ++) {
			x = (Math.random() - 0.5) * fgCanvas.width;
			y = (Math.random() - 0.5) * fgCanvas.height;
			starSize = (Math.random()+0.1)*3;
			stars.push(new Star(x, y, starSize, sfCtx));
		}
	};


	var drawBg = function() {
		bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
		var r, g, b, a;
		var val = volume/1000;

		r = 200 + (Math.sin(val) + 1) * 28;
		g = val * 2;
		b = val * 8;
		a = Math.sin(val+3*Math.PI/2) + 1;
		bgCtx.beginPath();
		bgCtx.rect(0, 0, bgCanvas.width, bgCanvas.height);
		/*
			Create radial gradient
		*/
		var grd = bgCtx.createRadialGradient(bgCanvas.width/2, bgCanvas.height/2, val, bgCanvas.width/2, bgCanvas.height/2, bgCanvas.width-Math.min(Math.pow(val, 2.7), bgCanvas.width - 20));
		/*
			Centre is transparent black
		*/
		grd.addColorStop(0, 'rgba(0,0,0,0)');
		grd.addColorStop(0.8, "rgba(" +
		Math.round(r) + ", " +
		Math.round(g) + ", " +
		Math.round(b) + ", 0.4)"); 

		bgCtx.fillStyle = grd;
		bgCtx.fill();
	};

	resizeCanvas = function() {
		if (fgCanvas) {
			if( amplitude_visualization_preferences.fullscreen ){
				/*
					Resize the foreground canvas
				*/
				fgCanvas.width = window.innerWidth;
				fgCanvas.height = window.innerHeight;
				fgCtx.translate(fgCanvas.width/2,fgCanvas.height/2);

				/*
					Resize the bg canvas
				*/
				bgCanvas.width = window.innerWidth;
				bgCanvas.height = window.innerHeight;

				/*
					Resize the starfield canvas
				*/
				sfCanvas.width = window.innerWidth;
				bgCanvas.height = window.innerHeight;
				sfCtx.translate(fgCanvas.width/2,fgCanvas.height/2);
			}else{
				/* 
					Resize the foreground canvas
				*/
				fgCanvas.width = amplitude_visualization_preferences.width;
				fgCanvas.height = amplitude_visualization_preferences.height;
				fgCtx.translate(fgCanvas.width/2,fgCanvas.height/2);

				/*
					Resize the bg canvas
				*/
				bgCanvas.width = amplitude_visualization_preferences.width;
				bgCanvas.height = amplitude_visualization_preferences.height;

				/*
					Resize the starfield canvas
				*/
				sfCanvas.width = amplitude_visualization_preferences.width;
				bgCanvas.height = amplitude_visualization_preferences.height;
				sfCtx.translate(fgCanvas.width/2,fgCanvas.height/2);
			}

			tileSize = fgCanvas.width > fgCanvas.height ? fgCanvas.width / 25 : fgCanvas.height / 25;

			drawBg();
			makePolygonArray();
			makeStarArray();
		}
	};

	var rotateForeground = function() {
		tiles.forEach(function(tile) {
			tile.rotateVertices();
		});
	};

	var draw = function() {
		fgCtx.clearRect(-fgCanvas.width, -fgCanvas.height, fgCanvas.width*2, fgCanvas.height *2);
		sfCtx.clearRect(-fgCanvas.width/2, -fgCanvas.height/2, fgCanvas.width, fgCanvas.height);

		stars.forEach(function(star) {
			star.drawStar();
		});
		tiles.forEach(function(tile) {
			tile.drawPolygon();
		});
		tiles.forEach(function(tile) {
			if (tile.highlight > 0) {
				tile.drawHighlight();
			}
		});

		animationFrame = window.requestAnimationFrame(draw);
	};

	/*
		REQUIRED
		Accessors for communicating with the visualization.
	*/
	return {
		startVisualization: startVisualization,
		stopVisualization: stopVisualization,
		setPreferences: setPreferences,
		getName: amplitude_visualization_name,
		getID: amplitude_visualization_id
	}
})();