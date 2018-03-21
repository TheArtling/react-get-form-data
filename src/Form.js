import React from 'react'
import PropTypes from 'prop-types'
import * as formCore from './core/FormCore.js'

export default class Form extends React.Component {
  static childContextTypes = {
    formContext: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.values = {}
  }

  getChildContext() {
    return {
      formContext: {
        handleChange: (key, name, value, propagate) =>
          this.handleFieldChange(key, name, value, propagate),
      },
    }
  }

  handleFieldChange(key = '', name, value, propagate) {
    this.values = formCore.handleFieldChange(this.values, key, name, value)
    if (propagate) {
      this.props.onChange && this.props.onChange(this.values)
    }
  }

  getValues() {
    return formCore.getValuesObject(this.values)
  }

  getFormData() {
    return formCore.getFormData(this.values)
  }

  render() {
    return <form onSubmit={e => e.preventDefault()}>{this.props.children}</form>
  }
}
