# has-required-props

Assert that your object props have non-undefined values for each required prop

[![Build Status](https://travis-ci.org/danne931/has-required-props.svg?branch=master)](https://travis-ci.org/danne931/has-required-props)
[![Coverage Status](https://coveralls.io/repos/github/danne931/has-required-props/badge.svg)](https://coveralls.io/github/danne931/has-required-props)
[![npm version](https://img.shields.io/npm/v/has-required-props.svg?style=flat-square)](https://www.npmjs.com/package/has-required-props)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![](https://img.shields.io/badge/license-MIT-blue.svg)

## Install

```
$ npm install --save has-required-props
```

Not using Node or a module bundler? Use a UMD build via the `<script>` tag.
- [https://unpkg.com/has-required-props/dist/has-required-props.js](https://unpkg.com/has-required-props/dist/has-required-props.js)  
- [https://unpkg.com/has-required-props/dist/has-required-props.min.js](https://unpkg.com/has-required-props/dist/has-required-props.min.js)

## Usage

```javascript
import hasRequiredProps from 'has-required-props'

let props = { prop1: 'a', prop2: 'b' }
let requiredProps = ['prop1', 'prop2']
hasRequiredProps(requiredProps, props)  // true
hasRequiredProps(requiredProps, [props, props])  // true

requiredProps = ['prop1', 'prop2', 'prop3']
hasRequiredProps(requiredProps, props)  // false

// go crazy
props = {
  a: {
    b: 1,
    c: {
      d: 2
    }
  },
  e: 3,
  f: [
    3,
    {
      g: 1,
      h: {}
    }
  ]
}
requiredProps = ['a.b', 'a.c.d', 'e', 'f.0', 'f.1.g', 'f.1.h']
hasRequiredProps(requiredProps, props)  // true

// keep it simple
props = { a: 1, b: 2 }
requiredProps = 'a'
hasRequiredProps(requiredProps, props)  // true
props.a = undefined
hasRequiredProps(requiredProps, props)  // false
props.a = null
hasRequiredProps(requiredProps, props)  // true

// curry on
const curry = require('lodash/curry')
const duckCharacteristics = ['bill', 'plumage', 'webbedFeet']
const quacksLikeADuck = curry(hasRequiredProps(duckCharacteristics))
quacksLikeADuck({ bill: {}, plumage: {}, webbedFeet: {} }) // true
quacksLikeADuck({ bill: {}, plumage: {} }) // false

```
