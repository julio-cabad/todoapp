import React from "react";
import { Text, View } from "react-native";
import { Layout } from "../../styled-components/StyledComponents";
import { CheckBox } from "react-native-elements";
import PropTypes from 'prop-types';

const remind = [
  { label: "10 minutes early", checked: false },
  { label: "20 minutes early", checked: false },
  { label: "30 minutes early", checked: false },
];


function Remind(props) {

  const { setDataEdit, dataEdit, setModalVisible} = props;

  const handleChecks = (label) => {
    setDataEdit({...dataEdit, remind: label });
    setModalVisible(false);
  };

  return (
    <View>
      <Layout color={"#FFF"} padding={10} row center space>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Reminders</Text>
        {/*<IconButton
          icon={<IButton name="close" size={20} color={'#546E7A'}/>}
          left={0} colorBg={'white'}  onPress={() => setShowList(false)}/>*/}
      </Layout>
      <Layout color={"#FFF"} padding={10}>
        {remind.map((items, i) => {
          return (
            <CheckBox
              key={i}
              title={items.label}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={items.label === dataEdit.remind}
              onPress={() => handleChecks(items.label)}
            />
          );
        })}
      </Layout>
    </View>
  );
}

export default Remind;

Remind.propTypes = {
  setDataEdit: PropTypes.func,
  setModalVisible: PropTypes.func,
  dataEdit:  PropTypes.object,
};
