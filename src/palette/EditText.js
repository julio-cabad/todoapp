import React from "react";
import { Input } from "react-native-elements";
import PropTypes from "prop-types";
import DateComponentPicker from "../screens/task/DateComponentPicker";

function EditText(props) {

  const {
    placeholder, keyBoard, errorMessage, handleBlur, value, onChangeText,
    icon, field, label, disabled
  } = props;

  console.log(typeof  errorMessage)

  return (
    <Input
      inputContainerStyle={{
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eeeeee",
        borderRadius: 10,
        backgroundColor: '#eeeeee',
        width: "100%",
        height: 45,
        paddingLeft: 15
      }}
      overflow="hidden"
      placeholder={placeholder}
      disabled={disabled}
      keyboardType={keyBoard}
      errorStyle={{ color: "red", fontSize: 10 }}
      errorMessage={errorMessage}
      label={label}
      labelStyle={{ fontSize: 12, color: "#333", fontWeight: "bold" }}
      placeholderTextColor={ '#C3C3C3'}
      onBlur={handleBlur(field)}
      value={value}
      onChangeText={onChangeText(field)}
      rightIcon={icon}
    />
  );
}

export default EditText;

EditText.propTypes = {
  placeholder: PropTypes.string,
  keyBoard: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  onPress: PropTypes.func,
};
