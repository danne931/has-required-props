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
  e: 3
}

test('false if no args passed', t => {
  t.false(hasRequiredProps())
})

test('true if non-empty val passed for props & empty val passed for requiredProps', t => {
  t.true(hasRequiredProps(null, { a: 1 }))
})

test('false if empty val passed for props', t => {
  t.false(hasRequiredProps(['a']))
  t.false(hasRequiredProps(['a'], null))
})

test('false if props are missing required props', t => {
  const requiredProps = ['a', 'c']
  t.false(hasRequiredProps(requiredProps, o))
})

test('true if all required props on object', t => {
  const requiredProps = ['a']
  t.true(hasRequiredProps(requiredProps, o))
})

test('test nested prop validation', t => {
  const requiredProps = ['a.b', 'a.c.d', 'e']
  t.true(hasRequiredProps(requiredProps, nested))
})

test('true if missing required props on some object in array', t => {
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
