import React, {useContext, useEffect } from "react";
import { Text} from "react-native";
import { Container, Content } from "../../styled-components/StyledComponents";
import { Divider } from "react-native-elements";
import { StoreContext } from "../../store/Context";
import { queryCompleted } from "../../database/Schemas";
import { observer } from "mobx-react-lite";
import CompleteList from "./CompleteList";

function Complete() {

  const { dataStore } = useContext(StoreContext);
  const { completedTask } = dataStore;

  useEffect(() => {
    const query = async () => {
      const resultQuery = await queryCompleted([1]);
      dataStore.QueryCompletedTask(resultQuery);
    };
    query();
  }, []);

  return (
    <Container color={"#FFF"}>
      <Divider orientation="horizontal" />
      <Content color={"#FFF"} padding={10}>
        {completedTask?.length === 0 && <Text>No dispone de tareas completadas</Text>}
        {completedTask?.length > 0 && <CompleteList/>}
      </Content>
    </Container>
  );
}

export default observer(Complete);
