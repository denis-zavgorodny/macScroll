/**
 * Denis Zavgorodny
 * 
 * denis.zavgorodny@gmail.com
 */
(function($){
	$.fn.macScroll = function(options) {
		var options = $.extend({
			preventBubble: false,
			timeout: 100,
			timeoutShift: 50
		}, options);

		return this.each(function(){
			var __preTimestamp = 0;
		    var scrolling = false;
		    var pre_wheelDelta = 0;
		    var pre_pre_wheelDelta = 0;
		    var wheeling, wheelingTimer;
		    var direction = -1; // 1 - вверх, -1 - вниз
		    var $this = $(this);
            $this.on('mousewheel', function (e, wheel) {
		    	var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;
		    	if(delta > pre_wheelDelta) {
		    		var k = delta / pre_wheelDelta;
		    	} else {
		    		var k = pre_wheelDelta / delta;
		    	}
		    	if(pre_pre_wheelDelta > pre_wheelDelta) {
		    		var pre_k = pre_pre_wheelDelta / pre_wheelDelta;
		    	} else {
		    		var pre_k = pre_wheelDelta / pre_pre_wheelDelta;
		    	}
		    	if(pre_pre_wheelDelta != 0 && pre_wheelDelta != 0) {
		    		// console.log(delta, pre_wheelDelta, pre_pre_wheelDelta, k, pre_k);	
		    	}
		    	
		        var _wheel = 0;
		        if(wheel > 0)
		            _wheel = 1;
		        if(wheel < 0)
		            _wheel = -1;
		        if (_wheel != 0) {
		            $(this).trigger('wheeling', [_wheel, e, wheel, delta]);
		        }
		        if(e.timeStamp - __preTimestamp > options.timeout) {
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
						pre_pre_wheelDelta = 0;
			        }, options.timeoutShift);
		        }
		        pre_pre_wheelDelta = pre_wheelDelta;
		        pre_wheelDelta = Math.abs(delta);
		        return !options.preventBubble;
		    });  
        });
	};
})(jQuery);