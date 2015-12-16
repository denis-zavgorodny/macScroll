/**
 * Denis Zavgorodny
 * 
 * denis.zavgorodny@gmail.com
 */
(function($){
	$.fn.macScroll = function(options) {
		var options = $.extend({
			preventBubble: false
		}, options);

		return this.each(function(){
			var __preTimestamp = 0;
		    var scrolling = false;
		    var pre_wheelDelta = 0;
		    var wheeling, wheelingTimer;
		    var direction = -1; // 1 - вверх, -1 - вниз
		    var $this = $(this);
            $this.on('mousewheel', function (e, wheel) {
		    	var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;
		        var _wheel = 0;
		        if(wheel > 0)
		            _wheel = 1;
		        if(wheel < 0)
		            _wheel = -1;
		        if (_wheel != 0) {
		            $(this).trigger('wheeling', [_wheel, e, wheel, delta]);
		        }
		        if(e.timeStamp - __preTimestamp > 100) {
		            if(pre_wheelDelta > Math.abs(delta) && direction > 0) {
						$this.trigger('fingerUp.macScroll', [_wheel]);
						direction = -1;
			        }
			        if(pre_wheelDelta < Math.abs(delta) && direction < 0) {
						$this.trigger('scrollStart.macScroll', [_wheel]);
						direction = 1;
			        }
			        __preTimestamp = e.timeStamp;
			        clearTimeout(wheelingTimer);
			        wheelingTimer = setTimeout(function(){
						$this.trigger('scrollStop.macScroll');
						direction = -1;
						pre_wheelDelta = 0;
			        }, 150);
		        }
		        pre_wheelDelta = Math.abs(delta);
		        return !options.preventBubble;
		    });  
        });
	};
})(jQuery);