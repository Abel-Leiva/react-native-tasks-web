import { API_URL } from "./constants";
export default async (taskId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/update/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      console.log("Tarea actualizada exitosamente");
    } else {
      console.error("Error al actualizar la tarea:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};
