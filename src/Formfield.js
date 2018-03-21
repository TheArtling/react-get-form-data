import React from 'react'
import PropTypes from 'prop-types'

export default function Formfield(ComposedComponent) {
  ComposedComponent.contextTypes = {
    formContext: PropTypes.object,
    ...ComposedComponent.contextTypes,
  }
  return ComposedComponent
}
