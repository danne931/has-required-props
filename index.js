import get from 'get-value'

const isEmpty = props => {
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
  if (typeof props !== 'object' ||
    isEmpty(props) ||
    (typeof requiredProps !== 'string' && !Array.isArray(requiredProps)) ||
    (typeof requiredProps === 'string' && requiredProps.trim() === '') ||
    isEmpty(requiredProps)
  ) return false

  const check = _hasRequiredProps(requiredProps)
  return Array.isArray(props) ? props.every(check) : check(props)
}
