import React from "react";
import { Text, View } from "react-native";
import { Layout } from "../../styled-components/StyledComponents";
import { CheckBox } from "react-native-elements";
import PropTypes from "prop-types";

const repeat = [
  { label: "Daily", checked: false },
  { label: "Weekly", checked: false },
  { label: "Monthly", checked: false },
];

function Repeat(props) {

  const { setDataEdit, dataEdit, setModalVisible } = props;

  const handleChecks = (label) => {
    setDataEdit({ ...dataEdit, repeat: label });
    setModalVisible(false);
  };

  return (
    <View>
      <Layout color={"#FFF"} padding={10} row center space>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Reminders</Text>
      </Layout>
      <Layout color={"#FFF"} padding={10}>
        {repeat.map((items, i) => {
          return (
            <CheckBox
              key={i}
              title={items.label}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={items.label === dataEdit.repeat}
              onPress={() => handleChecks(items.label)}
            />
          );
        })}
      </Layout>
    </View>
  );
}

export default Repeat;

Repeat.propTypes = {
  setDataEdit: PropTypes.func,
  setModalVisible: PropTypes.func,
  dataEdit:  PropTypes.object,
};
