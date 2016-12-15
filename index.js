'use strict';

window.$ = document.querySelectorAll.bind(document);

exports.install = function(Vue) {
    var _ = Vue.util;

    Vue.directive('scroll-to', {
        bind: function() {
            _.on(this.el, 'click', this.handleClick.bind(this));
        },

        unbind: function() {
            _.off(this.el, 'click', this.handleClick);
        },

        handleClick: function(e) {

            var getScrollTopElement =  function (e)
            {
                var top = 0;

                while (e.offsetParent != undefined && e.offsetParent != null)
                {
                    top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
                    e = e.offsetParent;
                }

                return top;
            };

            var getScrollTopDocument = function()
            {
                return document.documentElement.scrollTop + document.body.scrollTop;
            };

            var smoothScrollTo = function(element, target, duration) {
                target = Math.round(target);
                duration = Math.round(duration);
                if (duration < 0) {
                    return Promise.reject("bad duration");
                }
                if (duration === 0) {
                    element.scrollTop = target;
                    return Promise.resolve();
                }

                var start_time = Date.now();
                var end_time = start_time + duration;

                var start_top = element.scrollTop;
                var distance = target - start_top;

                // based on http://en.wikipedia.org/wiki/Smoothstep
                var smooth_step = function(start, end, point) {
                    if(point <= start) { return 0; }
                    if(point >= end) { return 1; }
                    var x = (point - start) / (end - start); // interpolation
                    return x*x*(3 - 2*x);
                }

                return new Promise(function(resolve, reject) {
                    // This is to keep track of where the element's scrollTop is
                    // supposed to be, based on what we're doing
                    var previous_top = element.scrollTop;

                    // This is like a think function from a game loop
                    var scroll_frame = function() {
                        if(element.scrollTop != previous_top) {
                            reject("interrupted");
                            return;
                        }

                        // set the scrollTop for this frame
                        var now = Date.now();
                        var point = smooth_step(start_time, end_time, now);
                        var frameTop = Math.round(start_top + (distance * point));
                        element.scrollTop = frameTop;

                        // check if we're done!
                        if(now >= end_time) {
                            resolve();
                            return;
                        }

                        if(element.scrollTop === previous_top
                            && element.scrollTop !== frameTop) {
                            resolve();
                            return;
                        }
                        previous_top = element.scrollTop;

                        setTimeout(scroll_frame, 0);
                    }

                    setTimeout(scroll_frame, 0);
                });
            }

            var splitclass = this.expression.split(', ');
            var padding = splitclass[1].replace(/\D/g,'');
            var speed = 500;
            var moving_frequency = 15;
            var element;

            if(element = document.querySelector(splitclass[0]))
            {
                var hop_count = speed/moving_frequency
                var getScrollTopDocumentAtBegin = getScrollTopDocument();
                var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin - padding) / hop_count;

                for(var i = 1; i <= hop_count; i++)
                {
                    (function()
                    {
                        var hop_top_position = gap*i;
                        setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                    })();
                }
            }
        }
    })
};
