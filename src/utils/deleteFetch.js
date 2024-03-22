import { API_URL } from "./constants";
export default async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    console.log("Tarea eliminada exitosamente");
  } catch (error) {
    console.error("Error:", error);
  }
};
