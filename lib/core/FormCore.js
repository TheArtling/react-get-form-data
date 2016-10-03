"use strict";

exports.__esModule = true;
exports.handleFieldChange = handleFieldChange;
exports.getValuesObject = getValuesObject;
exports.getFormData = getFormData;

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _values = require("lodash/values");

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleFieldChange(original) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var name = arguments[2];
  var value = arguments[3];

  var keyValue = {};
  if (key) {
    var _name, _keyValue;

    keyValue = (_keyValue = {}, _keyValue[name] = (_name = {}, _name[key] = value, _name), _keyValue);
  } else {
    var _keyValue2;

    keyValue = (_keyValue2 = {}, _keyValue2[name] = value, _keyValue2);
  }
  return (0, _merge2.default)({}, original, keyValue);
}

function getValuesObject(formValues) {
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
  var result = {};
  var valuesKeys = (0, _keys2.default)(formValues);
  valuesKeys.forEach(function (item) {
    if (formValues[item] instanceof Array && typeof formValues[item] !== "string") {
      var arrayValues = (0, _values2.default)(formValues[item]);
      if (arrayValues.length === 1) {
        result[item] = arrayValues[0];
      } else {
        result[item] = arrayValues.filter(function (value) {
          return value !== "";
        });
      }
    } else {
      result[item] = formValues[item];
    }
  });
  return result;
}

function getFormData(values) {
  // Takes the values from this.getValues() and appends them to a new
  // FormData object which you can use to make POST requests.
  var formValues = getValuesObject(values);
  var valuesKeys = (0, _keys2.default)(formValues);
  var formData = new FormData();
  valuesKeys.forEach(function (item) {
    if (formValues[item] instanceof Array) {
      formValues[item].forEach(function (value) {
        formData.append(item, value);
      });
    } else {
      formData.append(item, formValues[item]);
    }
  });
  return formData;
}