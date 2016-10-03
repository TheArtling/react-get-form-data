import React from "react"
import * as formCore from "./core/FormCore.js"

export default class Form extends React.Component {

  static childContextTypes = {
    formContext: React.PropTypes.object,
  }

  getChildContext() {
    return {
      formContext: {
        handleChange: (key, name, value) => this.handleFieldChange(key, name, value)
      }
    }
  }

  constructor(props){
    super(props)
    this.values = {}
  }

  handleFieldChange(key="", name, value){
    this.values = formCore.handleFieldChange(this.values, key, name, value)
    this.props.onChange && this.props.onChange(this.values)
  }

  getValues(){
    return formCore.getValuesObject(this.values)
  }

  getFormData() {
    return formCore.getFormData(this.values)
  }

  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        {this.props.children}
     </form>
    )
  }
}
