import React, {useContext, useEffect } from "react";
import { Text} from "react-native";
import { Container, Content } from "../../styled-components/StyledComponents";
import { Divider } from "react-native-elements";
import { StoreContext } from "../../store/Context";
import { observer } from "mobx-react-lite";
import { queryUncompleted } from "../../database/Schemas";
import UnCompletedList from "./UnCompletedList";

function UnComplete() {

  const { dataStore } = useContext(StoreContext);
  const { unCompletedTask } = dataStore;

  useEffect(() => {
    const query = async () => {
      const resultQuery = await queryUncompleted([0]);
      dataStore.QueryCompletedTask(resultQuery);
    };
    query();
  }, []);

  return (
    <Container color={"#FFF"}>
      <Divider orientation="horizontal" />
      <Content color={"#FFF"} padding={10}>
        {unCompletedTask?.length === 0 && <Text>No dispone de tareas</Text>}
        {unCompletedTask?.length > 0 && <UnCompletedList/>}
      </Content>
    </Container>
  );
}

export default observer(UnComplete);
