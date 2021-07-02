import React, { useState } from "react";
import { Animated, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Container } from "../../styled-components/StyledComponents";
import { Header, Divider } from "react-native-elements";
import All from "./All";
import { observer } from "mobx-react-lite";
import Complete from "./Complete";
import UnCompleted from "./UnCompleted";
import { Icon } from 'react-native-elements'

const Favorites = () => (
  <View style={{ backgroundColor: "#FFF", flex: 1, padding: 10 }}>
    <Text>Favoritos</Text>
  </View>
);

const Board = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "All" },
    { key: "second", title: "Completed" },
    { key: "third", title: "UnCompleted" },
    { key: "four", title: "Favorites" },
  ]);

  const _renderTabBar = (props) => {

    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{ opacity, fontSize: 9, fontWeight: "700" }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: All,
    second: Complete,
    third: UnCompleted,
    four: Favorites,
  });

  const rightComponent = () => {
    return (
      <View style={styles.rightContainer}>
        <Icon name="search1" type="antdesign" color="#333" size={20} style={{marginRight: 10}}/>
        <Icon name="bell" type="simple-line-icon" color="#333" size={20} style={{ marginRight: 10 }}/>
        <Icon name="menu-outline" type="ionicon" color="#333" size={20}/>
      </View>
    );
  };


  return (
    <Container color={"#FFF"}>
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={{ text: "Board", style: textBoardStyle }}
        rightComponent={rightComponent}
      />
      <Divider orientation="horizontal" />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={_renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </Container>
  );
};

const styles = StyleSheet.create({

  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },

  headerContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 30,
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabTextStyle: {
    fontSize: 8,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  containerTabStyle: {
    backgroundColor: "transparent",
  },
});

const textBoardStyle = {
  fontSize: 18,
  color: "#333",
  fontWeight: "bold",
};

export default observer(Board);

