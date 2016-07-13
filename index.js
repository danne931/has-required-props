import get from 'lodash/get'

const isEmptyObject = props => {
  if (props == null) return true
  return Array.isArray(props)
    ? props.length === 0
    : Object.keys(props).length === 0
}

const _hasRequiredProps = requiredProps => props =>
  typeof requiredProps === 'string'
    ? get(props, requiredProps) !== undefined
    : requiredProps.every(key => get(props, key) !== undefined)

export default function hasRequiredProps (requiredProps, props) {
  if (arguments.length === 0 || isEmptyObject(props)) return false
  if (isEmptyObject(requiredProps)) return true
  if (typeof props === 'string' && props.trim() === '') return false

  const check = _hasRequiredProps(requiredProps)
  return Array.isArray(props) ? props.every(check) : check(props)
}
