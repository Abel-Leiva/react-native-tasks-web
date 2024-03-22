import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "../components/Card";
import { useFocusEffect } from "@react-navigation/native";
import fetchApi from "../utils/fetch";
import deleteFetch from "../utils/deleteFetch";
import { useIsFocused } from "@react-navigation/native";
import updateFetch from "../utils/updateFetch";
const Tasks = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);
  const getAllTasks = async () => {
    try {
      const response = await fetchApi("/list");
      console.log("todo piola en tasks", response);
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllTasks();
    }, [isFocused])
  );

  const deleteTask = async (taskId) => {
    try {
      // Elimina la tarea
      await deleteFetch(taskId);
      // Una vez que se elimine la tarea con éxito, obtén la lista actualizada de tareas
      await getAllTasks();
    } catch (error) {
      console.error(error);
    }
  };
  const updateTask = async (taskId, updateData) => {
    console.log(taskId, updateData);
    await updateFetch(taskId, updateData);
    await getAllTasks();
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de tareas</Text>
      </View>
      <View style={styles.cardContainer}>
        {tasks.map((task, i) => (
          <Card
            key={i}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  titleContainer: { flex: 1, alignItems: "center", padding: 20 },
  cardContainer: { alignItems: "center", gap: 15 },
  title: {
    fontSize: 20,
    color: "#797CA5",
    fontWeight: "bold",
    textAlign: "center",
  },
});
