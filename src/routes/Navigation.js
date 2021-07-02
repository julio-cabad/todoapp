import React from "react";
import { Easing} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Board from "../screens/board/Board";
import Task from "../screens/task/Task";

const Stack = createStackNavigator();

const config = {
  animation: "timing",
  config: {
    duration: 800,
    easing: Easing.linear,
    mass: 100,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 700,
    easing: Easing.linear,
    mass: 10,
  },
};

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Board"}
                       transitionerStyle={{ backgroundColor: "black" }}
                       screenOptions={{
                         gestureEnabled: true,
                         gestureDirection: "horizontal",
                         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                         transitionSpec: {
                           open: config,
                           close: closeConfig,
                         },
                       }}
                       headerMode={"float"}
                       animation={"fade"}
      >
        <Stack.Screen name="Board" component={Board} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Task" component={Task} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
