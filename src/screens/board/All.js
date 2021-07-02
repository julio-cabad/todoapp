import React, { useState, useContext, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { Container, Content, Layout } from "../../styled-components/StyledComponents";
import { Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../../store/Context";
import ListAllTask from "./ListAllTask";
import { queryTask } from "../../database/Schemas";
import {observer} from 'mobx-react-lite'
import { PropTypes } from 'prop-types';
import Repeat from "../task/Repeat";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function All() {

  const { dataStore } = useContext(StoreContext);
  const { queryAllTask } = dataStore;

  useEffect(() => {
    const query = async () => {
      const queryAllTask = await queryTask();
      dataStore.QueryAllTask(queryAllTask);
    };
    query();
  }, []);

  const navigation = useNavigation();

  return (
    <Container color={"#FFF"}>
      <Divider orientation="horizontal" />
      <Content color={"#FFF"} padding={10} space>
        <View>
          {queryAllTask?.length === 0 && <Text>No dispone de tareas</Text>}
          {queryAllTask?.length > 0 && <ListAllTask/>}

        </View>
        <Layout color={'transparent'} padding={10} center >
          <Button
            buttonStyle={{
              backgroundColor: "#5CBC76", borderRadius: 10,
              width: windowWidth - 80,
              marginBottom : 50
            }}
            title="Add a task"
            onPress={() => navigation.navigate("Task")}
          />
        </Layout>
      </Content>
    </Container>
  );
}

export default observer(All);

