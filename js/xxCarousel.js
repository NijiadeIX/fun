(function($) {
    var XXSliders = { 
        _index : 0,
        _length : 0,
        _pluginName : null,
        _controler : null,
        _sliding : false,

        init : function(pluginName, controler) {
            this._pluginName = pluginName? pluginName : 'sliders';
            this._controler = controler;

            var element = $("." + this._pluginName);

            if (!element) {
                return false;
            }

            var length = element.children().length;
            if ( length == 0) {
                return false;
            }

            this._length = length;

            element.children().eq(0).addClass('active');
            
            //增加回调函数
            //TODO


            return true;
        },

        _getElementByIdx : function(index) {
            return $("." + this._pluginName).children().eq(index);
        },

        _getElementIdx : function(element) {
            if (!element) {
                return null;
            }

            var childrens = $("." + this._pluginName).children();
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i] == element[0]) {
                    return i;
                }
            }
            return null;
        },

        _negativeSwitch : function(active, toActive) {
           if (!active || !toActive || active === toActive || this._sliding) {
                return false;
            }

            if ($.support.transition) {
                toActive.addClass('prev');
                toActive[0].offsetWidth; //force reflow !important
                toActive.addClass('right');
                active.addClass('right');

                //Add eventListener
                active.one('transitionend', function() {
                    console.log('on transitionend');
                    active.removeClass('active right');
                    toActive.removeClass('prev right');
                    toActive.addClass('active')
                });
            } else {
                active.removeClass('active');
                toActive.addClass('active');
            }

            return true;
        },

        _positiveSwitch : function(active, toActive) {
            if (!active || !toActive || active === toActive || this._sliding) {
                return false;
            }
            
            this._sliding = true;
            if ($.support.transition) {
                toActive.addClass('next');
                toActive[0].offsetWidth;
                toActive.addClass('left');
                active.addClass('left');

                //Add eventListener
                var self = this;
                active.one('transitionend', function() {
                    console.log('on transitionend');
                    active.removeClass('active left');
                    toActive.removeClass('next left');
                    toActive.addClass('active');
                    self._sliding = false;
                });
            } else {
                active.removeClass('active');
                toActive.addClass('active');
                this._sliding = false;
            }

            return true;
        },

        prev : function() {
            var prevIdx = (this._index - 1) % this._length;

            var currentSlider = this._getElementByIdx(this._index);
            var previousSlider = this._getElementByIdx(prevIdx);

            if (this._negativeSwitch(currentSlider, previousSlider)) {
                this._index = prevIdx;
            }
        },

        next : function() {
            var nextIdx = (this._index + 1) % this._length;

            var currentSlider = this._getElementByIdx(this._index);
            var nextSlider = this._getElementByIdx(nextIdx);

            if (this._positiveSwitch(currentSlider, nextSlider)) {
                this._index = nextIdx;
            }
        },

        toIndex : function(index) {
            if (index < 0 || index >= this._length || index == this._index) {
                return;
            }

            var currentSlider = this._getElementByIdx(this._index);
            var toSlider = this._getElementByIdx(index);

            index > this._index? 
                this._positiveSwitch(currentSlider, toSlider) :
                this._negativeSwitch(currentSlider, toSlider);
        },

        setControler : function(controler) {
            this._controler = controler;
        }
    };

    var XXIndicators = {
        _index : 0,
        _length : 0,
        _pluginName : null,
        _controler : null,

        init : function(pluginName, controler) {
            this._pluginName = pluginName != null? pluginName : 'indicators';
            this._controler = controler;

            //获取外层元素
            var element = $("." + this._pluginName);

            if (!element) {
                return false;
            }

            //检查子元素长度
            var length = element.children().length;
            if (length == 0) {
                return false;
            }

            this._length = length;

            element.children().eq(0).addClass('active');    

            //增加回调函数
            var self = this;
            for (var i = 0; i < this._length; i++) {
                element.children().eq(i).click({idx:i}, function(event) {
                    self._controler.toIndex(event.data.idx);
                });
            }

            return true;
        },

        _getElementByIdx : function(index) {
            return $("." + this._pluginName).children().eq(index);
        },

        _switchActiveElement : function(active, toActive) {
            if (!active || !toActive || active === toActive) {
                return false;
            }

            if (active.hasClass('active')) {
                active.removeClass('active');
            }

            if (!toActive.hasClass('active')) {
                toActive.addClass('active');
            }  

            return true;
        },

        prev : function() {
            if (this._length == 0) {
                return;
            }

            var nextIndex = (this._index - 1) % this._length;

            var currentIndicator = this._getElementByIdx(this._index);
            var nextIndicator = this._getElementByIdx(nextIndex);

            if (this._switchActiveElement(currentIndicator, nextIndicator)) {
                this._index = nextIndex;
            }
        },

        next : function() {
            if (this._length == 0) {
                return;
            }

            var nextIndex = (this._index + 1) % this._length;

            var currentIndicator = this._getElementByIdx(this._index);
            var nextIndicator = this._getElementByIdx(nextIndex);

            if (this._switchActiveElement(currentIndicator, nextIndicator)) {
                this._index = nextIndex;
            } 
        },

        toIndex : function(index) {
            //检查正确性
            if (xxindex >= this._length || index < 0 || this._length == 0) {
                return;
            }

            var currentIndicator = this._getElementByIdx(this._index);
            var nextIndicator = this._getElementByIdx(index);

            //切换指示器
            if (this._switchActiveElement(currentIndicator, nextIndicator)) {
                this._index = index;
            }
        },

        setControler : function(controler) {
            this._controler = controler;
        }
    };

    var XXCarousel = {
        _index : 0,
        _interval : null,
        _intervalTime : 5000,
        _components : {},
        _state : 'stop',

        init : function(pluginName) {
            //TODO
        },

        _prev : function() {
            for (id in this._components) {
                this._components[id].prev();
            }
        },

        _next : function() {
            for (id in this._components) {
                this._components[id].next();
            }
        },

        _toIndex : function(index) {
            for (id in this._components) {
                this._components[id].toIndex(index);
            }
        },

        toIndex : function(index) {
            if (this._state != 'stop') {
                clearInterval(this._interval);
                this._toIndex(index);
                this._interval = setInterval($.proxy(this._next, this), this._intervalTime);
            }
        },

        start : function() {
            if (this._state == 'running') {
                return;
            }

            this._state = 'running';

            //核心函数，开始轮播
            this._interval = setInterval($.proxy(this._next, this), this._intervalTime);
        },

        stop : function() {
            if (this._state == 'stop') {
                return;
            }

            this._state = 'stop';

            if (this._interval != null) {
                clearInterval(this._interval);
                this._interval = null;
            }
        },

        setIntervalTime : function(intervelTime) {
            if (this._intervalTime == intervelTime) {
                return;
            }

            this._intervalTime = intervalTime;

            this.stop();
            this.start();
        },

        addComponent : function(id, component) {
            this._components[id] = component;
        },

        removeComponoent : function(id) {
            if (this._components[id] != undefined) {
                delete this._components[id];
            }
        }
    };

    //init all
    $(function () {
        if ( XXSliders.init('carousel-sliders', XXCarousel) 
            && XXIndicators.init('carousel-indicators', XXCarousel)) {
                XXCarousel.addComponent('sliders', XXSliders);
                XXCarousel.addComponent('indicators', XXIndicators);
                XXCarousel.start();
            }
        });

})(jQuery);