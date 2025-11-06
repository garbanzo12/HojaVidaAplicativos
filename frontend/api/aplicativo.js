import axios from "axios";

export const crearAplicativo = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/aplicativo", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en la API:", error.response?.data || error.message);
    throw error;
  }
};
