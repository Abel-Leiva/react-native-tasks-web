import { API_URL } from "./constants";

export default async (data) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.text(); // Obtener la respuesta como un string
    console.log("Respuesta del servidor:", responseData);

    // Aquí puedes trabajar con la respuesta como un string según sea necesario
    // Por ejemplo, mostrarla al usuario o realizar otras acciones

    return responseData; // Opcional: puedes devolver la respuesta si lo necesitas en otra parte del código
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    throw error;
  }
};
