import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Card = ({ task, deleteTask, updateTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(task.status === "CONCLUIDA");
  const { name, status, dateCreate } = task;

  const formattedDate = format(dateCreate, "EEEE, dd/MM/yyyy", {
    locale: es,
  });
  useEffect(() => {
    setCompleted(task.status === "CONCLUIDA");
  }, [task.status]);
  const toggleCompleted = async () => {
    setCompleted((prevCompleted) => !prevCompleted);
    const newStatus = completed ? "PENDIENTE" : "CONCLUIDA";
    const taskUpdate = { ...task, status: newStatus };
    console.log("que onda", taskUpdate);
    updateTask(task.id, taskUpdate);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View style={styles.containerLitleCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.taskTitle}>{name.toUpperCase()}</Text>
            <View
              style={[
                styles.circleStatus,
                status == "PENDIENTE"
                  ? { backgroundColor: "#d90429" }
                  : { backgroundColor: "#00509D" },
              ]}
            ></View>
          </View>
          <View>
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="black"
            />
          </View>
        </View>
      </Pressable>
      {expanded && (
        <View style={styles.detailContainer}>
          <View>
            <Text
              style={[
                styles.detail,
                status == "PENDIENTE"
                  ? { color: "#d90429" }
                  : { color: "#00509D" },
              ]}
            >
              {status}
            </Text>
          </View>
          <View>
            <Text style={styles.detail}>Creada el {formattedDate}</Text>
          </View>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>{task.description}</Text>
          </View>
          <View style={styles.contentSwitch}>
            <Text>Pendiente</Text>
            <Switch value={completed} onValueChange={toggleCompleted}></Switch>
            <Text>Completada</Text>
          </View>
          <View style={styles.contentButton}>
            <Pressable
              style={styles.button}
              onPress={() => deleteTask(task.id)}
            >
              <Text style={styles.textButton}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 5,
    width: "80%",
    borderRadius: 10,
    shadowColor: "black", // Color de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra (0 - 1)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento horizontal y vertical
    shadowRadius: 6, // Radio de la sombra
    elevation: 5, // Efecto de elevación en dispositivos Android
  },
  containerLitleCard: { alignItems: "center" },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  circleStatus: {
    width: 20, // Cambia este valor según el tamaño deseado del círculo
    height: 20, // Igual que la anchura para hacer un círculo
    borderRadius: 10, // Mitad de la anchura/altura para hacer un círculo
    marginBottom: 3,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  detail: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: "center",
  },
  descriptionContent: {
    borderWidth: 2,
    borderColor: "#b5d6d6",
    minHeight: 40,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 230,
  },
  description: { fontSize: 16, paddingHorizontal: 6, paddingVertical: 7 },
  contentSwitch: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  contentButton: { alignItems: "center" },
  button: {
    backgroundColor: "#ff0011",
    color: "white",
    textAlign: "center",
    maxWidth: "70%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});
