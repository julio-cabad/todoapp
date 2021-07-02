import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Platform, StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Divider, Header, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Content, Layout, LayoutChild } from "../../styled-components/StyledComponents";
import EditText from "../../palette/EditText";
import { initialValues, validationSchema } from "../../utils/ValidationsSchemas";
import { Formik } from "formik";
import format from "date-fns/format";
import DateComponentPicker from "./DateComponentPicker";
import Remind from "./Remind";
import Repeat from "./Repeat";
import { StoreContext } from "../../store/Context";
import { insertTask, queryCompleted, queryTask, queryUncompleted } from "../../database/Schemas";
import { Alerts } from "../../palette/Alerts";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Task() {

  const { dataStore } = useContext(StoreContext);
  const { queryAllTask } = dataStore;

  const navigation = useNavigation();
  const formikRef = useRef();

  useEffect(() => {
    const query = async () => {
      const queryAllTask = await queryTask();
      dataStore.QueryAllTask(queryAllTask);
    };
    query();

  }, []);

  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [remind, setRemind] = useState(false);
  const [picker, setPicker] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [dataEdit, setDataEdit] = useState(
    {
      key: null, mode: "date", deadLine: false, startTime: false,
      endTime: false, remind: null, repeat: null,
    });

  const valuesDates = (key, mode) => {
    setDataEdit({ ...dataEdit, key, mode, [key]: true });
    setModalVisible(true);
    setPicker(true);
    setRemind(false);
    setRepeat(false);
  };

  const valuesRemind = (key) => {
    setDataEdit({ ...dataEdit, key });
    setModalVisible(true);
    setPicker(false);
    setRemind(true);
    setRepeat(false);
  };

  const valuesRepeat = (key) => {
    setDataEdit({ ...dataEdit, key });
    setModalVisible(true);
    setPicker(false);
    setRemind(false);
    setRepeat(true);
  };

  const onSubmit = async (values) => {
    const cod = queryAllTask?.length + 1;
    const data = [cod.toString(), values.title, values.deadLine, values.startTime,
      values.endTime, values.remind, values.repeat, 0];
    await insertTask(data).catch(error => console.log(error));
    const resultQuery = await queryTask();
    const resultQueryCompleted = await queryCompleted([1]);
    const resultQueryUnCompleted = await queryUncompleted([0]);
    dataStore.QueryAllTask(resultQuery);
    dataStore.QueryCompletedTask(resultQueryCompleted);
    dataStore.QueryUnCompletedTask(resultQueryUnCompleted);
    setDataEdit({
      ...dataEdit, key: null, mode: "date", deadLine: false, startTime: false,
      endTime: false, remind: null, repeat: null,
    });
    formikRef.current?.resetForm();
    Alerts("success", "TAREA AGREGADA...", "Tarea agregada exitosamente");
  };

  return (
    <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"} scrollEnabled={true}
                             keyboardShouldPersistTaps="handled"
                             resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.containerStyle}>

      <Header
        containerStyle={styles.headerContainer}
        placement="left"
        leftComponent={<Icon
          name="arrow-back-ios"
          size={20}
          style={{ color: "#333", marginLeft: 10 }}
          onPress={() => navigation.navigate("Board")}
          underlayColor={"gray"}
        />}
        centerComponent={{ text: "Add Task", style: textBoardStyle }}
      />
      <Divider orientation="horizontal" />
      <Content color={"#FDFDFD"} padding={25}>

        <Formik
          innerRef={formikRef}
          validateOnMount={false}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={values => onSubmit(values)}
        >
          {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,

            }) => {

            if (dataEdit.key === "deadLine") {
              values.deadLine = format(date, "yyyy-MM-dd");

            }

            if (dataEdit.key === "startTime") {
              values.startTime = format(date, "HH:mm aa");
            }

            if (dataEdit.key === "endTime") {
              values.endTime = format(date, "HH:mm aa");
            }

            if (dataEdit.key === "remind") {
              values.remind = dataEdit.remind;
            }

            if (dataEdit.key === "repeat") {
              values.repeat = dataEdit.repeat;
            } else {
              values.repeat = "";
            }

            return (
              <View style={styles.formContainer}>
                <View>
                  <EditText label={"Title"} keyBoard={"default"}
                            errorMessage={errors.title}
                            placeholder={"Design team meeting"}
                            field={"title"}
                            handleBlur={handleBlur}
                            value={values.title}
                            onChangeText={handleChange}
                            icon={null}
                  />

                  <EditText label={"Dead line"} keyBoard={"default"}
                            errorMessage={!dataEdit.deadLine && errors.deadLine}
                            field={"title"}
                            placeholder={"2021-06-30"}
                            handleBlur={handleBlur}
                            value={values.deadLine || format(date, "yyyy-MM-dd")}
                            disabled={true}
                            onChangeText={handleChange}
                            icon={<Icon name="keyboard-arrow-down" size={20} color={"#333"}
                                        onPress={() =>
                                          valuesDates("deadLine", "date")} />
                            }
                  />
                  <Layout color={"transparent"} row center space>
                    <LayoutChild color={"transparent"} width="48%">
                      <EditText label={"Start Time"} keyBoard={"default"}
                                errorMessage={!dataEdit.startTime && errors.startTime}
                                field={"startTime"}
                                placeholder={"10:00 AM"}
                                handleBlur={handleBlur}
                                value={values.startTime}
                                disabled={true}
                                onChangeText={handleChange}
                                icon={<Icon name="keyboard-arrow-down" size={20} color={"#333"}
                                            onPress={() =>
                                              valuesDates("startTime", "time")} />
                                }
                      />
                    </LayoutChild>
                    <LayoutChild color={"transparent"} width="48%">
                      <EditText label={"End Time"} keyBoard={"default"}
                                errorMessage={!dataEdit.endTime && errors.endTime}
                                field={"endTime"}
                                placeholder={"11:00 AM"}
                                handleBlur={handleBlur}
                                value={values.endTime}
                                disabled={true}
                                onChangeText={handleChange}
                                icon={<Icon name="keyboard-arrow-down" size={20} color={"#333"}
                                            onPress={() =>
                                              valuesDates("endTime", "time")} />
                                }
                      />
                    </LayoutChild>
                  </Layout>
                  <EditText label={"Remind"} keyBoard={"default"}
                            errorMessage={dataEdit.remind === null && errors.remind}
                            field={"remind"}
                            placeholder={"10 minutes early"}
                            handleBlur={handleBlur}
                            value={values.remind}
                            disabled={true}
                            onChangeText={handleChange}
                            icon={<Icon name="keyboard-arrow-down" size={20} color={"#333"}
                                        onPress={() =>
                                          valuesRemind("remind")} />
                            }
                  />

                  <EditText label={"Repeat"} keyBoard={"default"}
                            errorMessage={dataEdit.repeat === null && errors.repeat}
                            field={"repeat"}
                            placeholder={"Weekly"}
                            handleBlur={handleBlur}
                            value={values.repeat}
                            disabled={true}
                            onChangeText={handleChange}
                            icon={<Icon name="keyboard-arrow-down" size={20} color={"#333"}
                                        onPress={() =>
                                          valuesRepeat("repeat")} />
                            }
                  />

                </View>
                <Button
                  buttonStyle={{
                    backgroundColor: "#5CBC76", borderRadius: 10,
                    width: windowWidth - 80,
                  }}
                  title="Create a task"
                  onPress={handleSubmit}
                />
              </View>
            );
          }}

        </Formik>
        <Overlay isVisible={modalVisible}
                 overlayStyle={{ width: windowWidth - 50 }}
                 onBackdropPress={() => setModalVisible(false)}>
          {picker && <DateComponentPicker date={date} mode={dataEdit.mode} setDate={setDate}
                                          onPress={() => setModalVisible(false)}
          />}
          {remind && <Remind setDataEdit={setDataEdit} dataEdit={dataEdit}
                             setModalVisible={setModalVisible}
          />}

          {repeat && <Repeat setDataEdit={setDataEdit} dataEdit={dataEdit}
                             setModalVisible={setModalVisible}
          />}

        </Overlay>
      </Content>
    </KeyboardAwareScrollView>
  );
}

export default Task;

const styles = StyleSheet.create({

  containerStyle: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFF",
  },

  formContainer: {
    height: windowHeight - 200,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


const textBoardStyle = {
  fontSize: 18,
  color: "#333",
  fontWeight: "bold",
};


