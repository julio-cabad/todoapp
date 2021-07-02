import React, { useContext, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import { Layout } from "../../styled-components/StyledComponents";
import { queryUncompleted} from "../../database/Schemas";;
import { StoreContext } from "../../store/Context";
import { observer } from "mobx-react-lite";

function ListAllTask() {

  const { dataStore } = useContext(StoreContext);
  const { unCompletedTask  } = dataStore;

  useEffect(() => {
    const query = async () => {
      const resultQuery = await queryUncompleted([0]);
      dataStore.QueryUnCompletedTask(resultQuery);
    };
    query();
  }, []);


  return (
    <>
      {unCompletedTask?.map((task, i) => {
        return (
          <Layout color={"transparent"} padding={1} key={i}>
            <CheckBox
              title={task.title}
              checked={task.checkTask === 1}
              uncheckedColor={"#E6D68D"}
              containerStyle={{ backgroundColor: "#FFF", borderWidth: 0 }}
            />
          </Layout>
        );
      })}
    </>
  );
}

export default observer(ListAllTask);
