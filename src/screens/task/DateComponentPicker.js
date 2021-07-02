import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { Layout } from "../../styled-components/StyledComponents";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";

function DateComponentPicker(props) {

  const { date, mode, onPress, setDate } = props;

  return (
    <>
      <DatePicker
        date={date}
        mode={mode}
        onDateChange={setDate}
      />
      <Layout color={"transparent"} row positionR>
        <Button
          buttonStyle={{
            marginRight: 10,
            backgroundColor: "#5CBC76", borderRadius: 10,
          }}
          title="Accept"
          onPress={onPress}
        />
      </Layout>
    </>
  );
}

export default DateComponentPicker;

const allowedDateTypes = [
  PropTypes.string,
  PropTypes.instanceOf(Date),
];

DateComponentPicker.propTypes = {
  mode: PropTypes.string,
  date: PropTypes.oneOfType(allowedDateTypes),
  setDate: PropTypes.func,
  onPress: PropTypes.func,
};
