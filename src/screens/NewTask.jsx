import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import postFetch from "../utils/postFetch";
import fakeApi from "../utils/fakeapi.json";
const NewTask = ({ navigation }) => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "",
    dateCreate: "",
  });
  const handleChangueText = (name, value) => {
    setNewTask({ ...newTask, [name]: value });
  };
  const saveTask = async () => {
    const trimmedName = newTask.name.trim();
    const trimmedDescription = newTask.description.trim();

    if (trimmedName !== "" && trimmedDescription !== "") {
      const updatedTask = {
        ...newTask,
        name: trimmedName,
        description: trimmedDescription,
        status: "PENDIENTE",
        dateCreate: new Date(),
      };
      await postFetch(updatedTask);
      setNewTask({ name: "", description: "", status: "", dateCreate: "" });
      navigation.navigate("Tareas");
    } else {
      console.log("Por favor, completa los campos correctamente");
    }
  };
  const validateFields = () => {
    return newTask.name.trim() !== "" && newTask.description.trim() !== "";
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.containerTitleTask}>
            <TextInput
              placeholder="Titulo de la tarea"
              value={newTask.name}
              onChangeText={(value) => handleChangueText("name", value)}
              style={styles.inputTask}
              placeholderTextColor="#7d8597"
            />
          </View>
          <View style={styles.containerDescription}>
            <TextInput
              placeholder="Descripción"
              multiline={true}
              numberOfLines={8}
              value={newTask.description}
              onChangeText={(value) => handleChangueText("description", value)}
              style={styles.inputTask}
              placeholderTextColor="#7d8597"
            />
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={saveTask}
              disabled={!validateFields()}
              style={[
                styles.button,
                validateFields()
                  ? { backgroundColor: "#051923" }
                  : { backgroundColor: "#979dac" },
              ]}
            >
              <Text
                style={[
                  styles.textButton,
                  validateFields() ? { color: "#fff" } : { color: "#7d8597" },
                ]}
              >
                Crear Tarea
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingTop: 20,
  },
  containerTitle: { marginVertical: 10 },
  title: { fontSize: 20, color: "#000", fontWeight: "600" },
  form: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#003554",
    width: "90%",
    shadowColor: "black", // Color de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra (0 - 1)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento horizontal y

    shadowRadius: 6, // Radio de la sombra
    elevation: 5, // Efecto de elevación en dispositivos Android
  },
  containerTitleTask: { marginVertical: 20 },
  inputTask: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    paddingHorizontal: 10,
    paddingTop: 7,
    borderWidth: 2,
    borderColor: "#adb5bd",
    textAlignVertical: "top",
  },

  containerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderColor: "transparent",
    borderRadius: 7,

    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  textButton: { color: "#fff", fontSize: 20 },
});
