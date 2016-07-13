import get from 'lodash/get'

const isEmpty = props => {
  if (props == null) return true
  return Array.isArray(props)
    ? props.length === 0
    : Object.keys(props).length === 0
}

const _hasRequiredProps = requiredProps => props =>
  requiredProps.every(prop => get(props, prop) !== undefined)

export default function hasRequiredProps ({ props, requiredProps } = {}) {
  if (isEmpty(props) || isEmpty(requiredProps)) return false
  const check = _hasRequiredProps(requiredProps)

  return Array.isArray(props) ? props.every(check) : check(props)
}
