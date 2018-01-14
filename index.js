'use strict';

const _ = {
    $: function (selector) {
        return document.querySelector(selector);
    },
    on: function ($element, events, handler) {
        if (!(events instanceof Array)) {
            events = [events];
        }
        for (let i = 0; i < events.length; i++) {
            $element.addEventListener(events[i], handler);
        }
    },
    off: function ($element, events, handler) {
        if (!(events instanceof Array)) {
            events = [events];
        }
        for (let i = 0; i < events.length; i++) {
            $element.removeEventListener(events[i], handler);
        }
    }
};

function getScrollTopElement($element) {
    let top = 0;

    while ($element.offsetParent !== undefined && $element.offsetParent != null) {
        top += $element.offsetTop + ($element.clientTop != null ? $element.clientTop : 0);
        $element = $element.offsetParent;
    }

    return top;
}

function getScrollTopDocument() {
    return document.documentElement.scrollTop + document.body.scrollTop;
}

const ScrollTo = {
    install(Vue, config) {
        const settings = {
            speed: 500,
            padding: 0,
            movingFrequency: 15
        };

        Object.assign(settings, config);

        function handleClick() {
            let options = this.expression.split(', ');

            options = options.map(function (item) {
                if (typeof item !== 'string') {
                    return item;
                }
                return item.replace(/\'/g, '');
            });

            const selector = options[0];
            const padding = (typeof options[1] === 'string')
                ? options[1].replace(/\D/g, '')
                : settings.padding;

            const $element = _.$(selector);

            if (!$element) {
                throw new Error('$element is not defined, selector="' + selector + '" ');
            }

            const hopCount = Math.ceil(settings.speed / settings.movingFrequency);
            const documentScrollTop = getScrollTopDocument();
            const gap = (getScrollTopElement($element) - documentScrollTop - padding) / hopCount;

            if (gap === 0) {
                // Do not scroll when current position is the same as target offset.
                return;
            }

            for (let i = 1; i <= hopCount; i++) {
                (function (i) {
                    const hopTopPosition = gap * i;

                    setTimeout(function () {
                        window.scrollTo(0, hopTopPosition + documentScrollTop);
                    }, settings.movingFrequency * i);
                })(i);
            }
        }

        Vue.directive('scroll-to', {
            bind: function ($element, context) {
                _.on($element, 'click', handleClick.bind(context));
            },

            unbind: function ($element) {
                _.off($element, 'click', handleClick);
            }
        });
    }
};

export default ScrollTo;
