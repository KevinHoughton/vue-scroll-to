# vue-scroll-to

[Vue.js](https://github.com/vuejs/vue) directive.  
Adds a directive that listens for click events and scrolls to elements.

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install vue-scroll-to --save
```

## Usage

```js
var Vue = require('vue');
var vueScrollTo = require('vue-scroll-to');
Vue.use(vueScrollTo);
```

```html
<a href="#" v-scroll-to=".element, 50px">Scroll to .element</a>

<div class="element">
    Hi. I'm element.
</div>
```

## Variables in directive
```html
v-scroll-to="<element>, <padding-in-px>"
```

## Info

Currently depends on jQuery.

## License

MIT
