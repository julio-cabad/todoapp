import React, { useContext, useEffect, useState } from "react";
import { CheckBox } from "react-native-elements";
import { Layout } from "../../styled-components/StyledComponents";
import { queryCompleted, queryTask, queryUncompleted, updateTask } from "../../database/Schemas";
import { Alerts } from "../../palette/Alerts";
import { StoreContext } from "../../store/Context";
import { observer } from "mobx-react-lite";

function ListAllTask() {

  const { dataStore } = useContext(StoreContext);
  const { queryAllTask } = dataStore;

  useEffect(() => {
    const query = async () => {
      const queryAllTask = await queryTask();
      dataStore.QueryAllTask(queryAllTask);
    };
    query();
  }, []);

  const onCheckTask = async (cod, checked) => {
    const update = [checked ? 0 : 1, cod];
    await updateTask(update);
    const queryAllTask = await queryTask();
    const resultQueryCompleted = await queryCompleted([1]);
    const resultQueryUnCompleted = await queryUncompleted([0]);
    dataStore.QueryAllTask(queryAllTask);
    dataStore.QueryCompletedTask(resultQueryCompleted);
    dataStore.QueryUnCompletedTask(resultQueryUnCompleted);
    !checked && Alerts("success", "TAREA ACTUALIZADA", "La tarea ha sido completada");
  };

  return (
    <>
      {queryAllTask?.map((task, i) => {
        return (
          <Layout color={"transparent"} padding={1} key={i}>
            <CheckBox
              title={task.title}
              checked={task.checkTask === 1}
              uncheckedColor={"#E6D68D"}
              containerStyle={{ backgroundColor: "#FFF", borderWidth: 0 }}
              onPress={() => onCheckTask(task.cod, task.checkTask === 1)}
            />
          </Layout>
        );
      })}
    </>
  );
}

export default observer(ListAllTask);
