/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import type { Node } from "react";
import { Container } from "./src/styled-components/StyledComponents";
import Navigation from "./src/routes/Navigation";
import { CreateTable } from "./src/database/Schemas";
import { StoreProvider } from "./src/store/Provider";
import Toast from 'react-native-toast-message';

const App: () => Node = () => {

  useEffect(() => {
    let isMounted = true;

    const createTables = async () => {
      await CreateTable();
    };

    createTables().catch(() => {
    });

    return () => {
      isMounted = false;
    };

  }, []);

  return (
    <StoreProvider>
      <Container color={"#EDEDED"}>
        <Navigation />
        <Toast ref={(ref) => Toast.setRef(ref)}/>
      </Container>
    </StoreProvider>
  );
};


export default App;

