import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

const _hasRequiredProps = requiredProps => props =>
  requiredProps.every(prop => get(props, prop) !== undefined)

export default function hasRequiredProps ({ props, requiredProps }) {
  if (isEmpty(props) || isEmpty(requiredProps)) return false
  const check = _hasRequiredProps(requiredProps)

  return isArray(props) ? props.every(check) : check(props)
}
