import test from 'ava'
import hasRequiredProps from '..'

const o = {
  a: 1,
  b: 2
}

test('should fail if props are missing required props', t => {
  const requiredProps = ['a', 'c']
  t.false(hasRequiredProps(o, requiredProps))
})

test('should pass if all required props on object', t => {
  const requiredProps = ['a']
  t.true(hasRequiredProps({ props: o, requiredProps }))
})

test('should pass if missing required props on some object in array', t => {
  const arr = [o, { a: 1 }]
  const requiredProps = ['a', 'b']
  t.false(hasRequiredProps({ props: arr, requiredProps }))
})

test('should pass if all required props on all objects in array', t => {
  const arr = [o, o]
  const requiredProps = ['a', 'b']
  t.true(hasRequiredProps({ props: arr, requiredProps }))
})
