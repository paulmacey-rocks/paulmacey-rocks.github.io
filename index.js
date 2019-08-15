(function ($, window, undefined) {
	$.fn.marqueeify = function (options) {
		var settings = $.extend({
			horizontal: true,
			vertical: true,
			speed: 100, // In pixels per second
			container: $(this).parent(),
			bumpEdge: function () {}
		}, options);
		
		return this.each(function () {
			var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
				$el = $(this);

			getSizes = function () {
				containerWidth = settings.container.outerWidth();
				containerHeight = settings.container.outerHeight();
				elWidth = $el.outerWidth();
				elHeight = $el.outerHeight();
			};

			move = {
				right: function () {
					$el.animate({left: (containerWidth - elWidth)}, {duration: ((containerWidth/settings.speed) * 2500), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.left();
					}});
				},
				left: function () {
					$el.animate({left: 0}, {duration: ((containerWidth/settings.speed) * 2500), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.right();
					}});
				},
				down: function () {
					$el.animate({top: (containerHeight - elHeight)}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.up();
					}});
				},
				up: function () {
					$el.animate({top: 0}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.down();
					}});
				}
			};

			getSizes();

			if (settings.horizontal) {
				move.right();
			}
			if (settings.vertical) {
				move.down();
			}

      // Make that shit responsive!
      $(window).resize( function() {
        getSizes();
      });
		});
	};
})(jQuery, window);

$(document).ready( function() {

	$('.marquee').marqueeify({
		speed: 300,
		bumpEdge: function () {
			var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.marquee .logo').css('fill', newColor);
		}
	});
});


window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded () {
  canvasApp(); //包含整个Canvas应用程序
}
function canvasSupport (e) {
  
	  return !!e.getContext;

}
function canvasApp () {
  var canvas = document.getElementById('myCanvas');

  if (!canvasSupport(myCanvas)) {
	  return; 
	}
  
  var ctx = canvas.getContext('2d');
  var w = canvas.width = window.innerWidth;
	var h = canvas.height = window.innerHeight;
	var yPositions = Array(300).join(0).split('');
  
  function runMatrix() {
	  if (typeof Game_Interval != 'undefined') clearInterval(Game_interval);
		Game_Interval = setInterval(drawScreen, 33);
	}

  function drawScreen () {
    ctx.fillStyle = 'rgba(0,0,0,.05)';
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = '#0f0';
		ctx.font = '10px Georgia';
		yPositions.map(function(y, index){
		  text = String.fromCharCode(1e2 + Math.random() * 33);
			x = (index * 10) + 10;
			ctx.fillText(text, x, y);
			if (y > 100 + Math.random() * 1e4) {
			  yPositions[index] = 0;
			} else {
			  yPositions[index] = y + 10;
			}
		})
  }
  
  runMatrix();
 
}
