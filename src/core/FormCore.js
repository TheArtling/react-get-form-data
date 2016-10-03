import merge from "lodash/merge"
import keys from "lodash/keys"
import values from "lodash/values"

export function handleFieldChange(original, key="", name, value) {
  let keyValue = {}
  if (key) {
    keyValue = {[name]: {[key]: value} }
  } else {
    keyValue = {[name]: value}
  }
  return merge({}, original, keyValue)
}

export function getValuesObject(formValues) {
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
  let valuesKeys = keys(formValues)
  valuesKeys.forEach((item) => {
    if (formValues[item] instanceof Array &&
        typeof formValues[item] !== "string") {
      let arrayValues = values(formValues[item])
      if (arrayValues.length === 1) {
        result[item] = arrayValues[0]
      } else {
        result[item] = arrayValues.filter((value) => value !== "")
      }
    } else {
      result[item] = formValues[item]
    }
  })
  return result
}

export function getFormData(values) {
  // Takes the values from this.getValues() and appends them to a new
  // FormData object which you can use to make POST requests.
  let formValues = getValuesObject(values)
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
