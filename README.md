# keywalk

Keywalk let you to walk through HTML elements via up/down arrow keys.

## Demo

[Codepen](https://codepen.io/dgknca/pen/mdRNeMw)

## Install

```bash
npm i keywalk

# or using yarn

yarn add keywalk
```

```js
import Keywalk from 'keywalk'
```

Or include from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/keywalk@0.2.3">
```

## Parameters

| Parameter     | Type   | Description                                                                                                      | Default  |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------- | :------: |
| `trigger`     | string | The element to listen the key event. (with CSS selector)                                                         | document |
| `container`   | string | Root container of items. Keywalk will walk on nodes that are direct children of the `container`. <b>Required</b> |    -     |
| `activeClass` | string | CSS class name of currently active item.                                                                         | 'active' |
| `selectKey`   | string | The key that trigger the `onSelect()` event. Can be specified by a key name.                                     | 'Enter'  |

## Events

| Event                      | Description                                                   |
| :------------------------- | :------------------------------------------------------------ |
| `onWalk(element, index)`   | Will return the HTML node and index of currently active item. |
| `onSelect(element, index)` | Will return the HTML node and index of selected item.         |

## Functions

| Function  | Description                             |
| :-------- | :-------------------------------------- |
| `reset()` | Will reset the focus state on the list. |

## How to use

```html
<input id="input" />
<ul class="list">
  <li>Orange</li>
  <li>Cherry</li>
  <li>Banana</li>
  <li>Apple</li>
  <li>Pineapple</li>
</ul>

<script>
  new Keywalk({
    trigger: '#input',
    container: '.list',
    onWalk: (element, index) => {
      console.log('active item: ', element, ' index: ', index)
    },
    onSelect: (element, index) => {
      console.log('selected item: ', element, ' index: ', index)
    }
  })
</script>
```

Reset the focus state:

```js
const keywalk = new Keywalk({
  ...
})

btn.addEventListener('click', () => {
  keywalk.reset()
})
```
