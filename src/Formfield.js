import React from "react"

export default function Formfield(ComposedComponent) {
  ComposedComponent.contextTypes = {
    formContext: React.PropTypes.object,
    ...ComposedComponent.contextTypes,
  }
  return ComposedComponent
}
