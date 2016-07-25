import test from 'ava'
import hasRequiredProps from '../index'

const o = {
  a: 1,
  b: 2
}

const nested = {
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
      h: {},
      i: null
    }
  ]
}

test('false if no args passed', t => {
  t.false(hasRequiredProps())
})

test('false if non-empty val passed for props & empty val passed for requiredProps', t => {
  t.false(hasRequiredProps(null, { a: 1 }))
})

test('false if empty val passed for props', t => {
  t.false(hasRequiredProps(['a']))
  t.false(hasRequiredProps(['a'], null))
})

test('false if props are missing required props', t => {
  const requiredProps = ['a', 'c']
  t.false(hasRequiredProps(requiredProps, o))
})

test('false if any prop in props of requiredProps is undefined', t => {
  const requiredProps = ['a']
  const props = { a: undefined }
  t.false(hasRequiredProps(requiredProps, props))
})

test('true if prop in props of requiredProps is null', t => {
  const requiredProps = ['a']
  const props = { a: null }
  t.true(hasRequiredProps(requiredProps, props))
})

test('true if all required props on object', t => {
  const requiredProps = ['a']
  t.true(hasRequiredProps(requiredProps, o))
})

test('test nested prop validation', t => {
  const requiredProps = ['a.b', 'a.c.d', 'e', 'f.0', 'f.1.g', 'f.1.h', 'f.1.i']
  t.true(hasRequiredProps(requiredProps, nested))
})

test('false if missing required props on some object in array', t => {
  const arr = [o, { a: 1 }]
  const requiredProps = ['a', 'b']
  t.false(hasRequiredProps(requiredProps, arr))
})

test('true if all required props on all objects in array', t => {
  const arr = [o, o]
  const requiredProps = ['a', 'b']
  t.true(hasRequiredProps(requiredProps, arr))
})

test('false if empty string as requiredProps', t => {
  t.false(hasRequiredProps('   ', { a: 1 }))
})

test('true if required props (string) in array', t => {
  t.true(hasRequiredProps('a', { a: 1 }))
})

test('only check own props', t => {
  const o = Object.create({ a: 1 })

  t.false(hasRequiredProps('a', o))

  o.a = 3
  t.true(hasRequiredProps('a', o))
})

test('we only care about strings & arrays as requiredProps', t => {
  const o = { a: 1 }
  t.true(hasRequiredProps('a', o))
  t.false(hasRequiredProps(3, o))
  t.false(hasRequiredProps(o, o))
  t.false(hasRequiredProps(() => 3, o))
})
