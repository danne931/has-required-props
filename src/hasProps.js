const _ = require('lodash')

function hasProps ({ props, requiredProps }) {
  if (_.isEmpty(props) || _.isEmpty(requiredProps)) return false

  if (_.isArray(props)) {
    return props.every(_hasProps)
  } else {
    return _hasProps(props, requiredProps)
  }

  function _hasProps (obj) {
    return requiredProps.every(prop => _.get(obj, prop) !== undefined)
  }
}

module.exports = {
  hasProps
}
