import React from "react"
import { View } from "react-native"
import keys from "lodash/keys"
import values from "lodash/values"
import merge from "lodash/merge"

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
    let keyValue = {}
    if (key) {
      keyValue = {[name]: {[key]: value} }
    } else {
      keyValue = {[name]: value}
    }
    merge(this.values, keyValue)
    this.props.onChange && this.props.onChange(this.values)
  }

  getValues(){
    // Turns the form values of all children into an object of the form:
    // {
    //   name1: [value1, value2],
    //   name2: "value3",
    //   name3: {
    //     uri: file://...,
    //     type: 'image/jpeg',
    //     name: 'photo.jpeg',
    //   }
    // }
    // which you can use to submit as application/json data, for example
    let result = {}
    let valuesKeys = keys(this.values)
    valuesKeys.forEach((item) => {
      if (this.values[item] instanceof Array &&
          typeof this.values[item] !== "string") {
        let arrayValues = values(this.values[item])
        if (arrayValues.length === 1) {
          result[item] = arrayValues[0]
        } else {
          result[item] = arrayValues.filter((value) => value !== "")
        }
      } else {
        result[item] = this.values[item]
      }
    })
    return result
  }

  getFormData() {
    // Takes the values from this.getValues() and appends them to a new
    // FormData object which you can use to make POST requests.
    let formValues = this.getValues()
    let valuesKeys = keys(formValues)
    let formData = new FormData()
    valuesKeys.forEach((item) => {
      if (formValues[item] instanceof Array) {
        formValues[item].forEach((value) => {
          formData.append(item, value)
        })
      } else {
        formData.append(item, formValues[item])
      }
    })
    return formData
  }

  render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}
