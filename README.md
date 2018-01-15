[![NPM](https://nodei.co/npm/vue-scroll-to.png?downloads=true)](https://www.npmjs.com/package/vue-scroll-to)

# vue-scroll-to

[Vue.js](https://github.com/vuejs/vue) directive that listens for click 
events and scrolls to elements.

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install vue-scroll-to --save
```
or
```bash
$ yarn add vue-scroll-to
```

## Usage

Please note that it's necessary to use single quotes within the double quotes
of the directive when defining the class and padding.

```js
import Vue from 'vue';
import vueScrollTo from 'vue-scroll-to';

Vue.use(vueScrollTo, options);
```

```html
<a href="#" v-scroll-to="'.element, 50px'">Scroll to .element</a>

<div class="element">
    Hi. I'm element.
</div>
```

## Variables in directive

```html
v-scroll-to="'<element>, <padding-in-px>'"
```

Default:

* `padding-in-px`: 0

## Settings

Default `options`:

* `speed` = 500 - Animation speed.
* `padding` = 0 - You can set default global padding, which will override 
    when put `padding-in-px` value inline with `v-scroll-to`.
* `movingFrequency` = 15 = Number of steps of animation.

## License

MIT
