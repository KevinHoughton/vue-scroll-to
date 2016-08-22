'use strict';

var $ = require('jquery')

exports.install = function(Vue) {
  var _ = Vue.util

  Vue.directive('scroll-to', {
    bind: function() {
      _.on(this.el, 'click', this.handleClick.bind(this))
    },
    unbind: function() {
      _.off(this.el, 'click', this.handleClick)
    },
    handleClick: function(e) {
      e.preventDefault()
      var page = $('html, body')
      var events = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove'
      page.on(events, function() {
        page.stop()
      });

      page.animate({
        scrollTop: $(this.el).offset().top + 'px'
      }, 1000, function() {
        page.off(events)
      })
    }
  })
}
