// src/api/aplicativos.js
import axiosInstance from "../services/axiosInstance.js";

export const crearCampana = async (data) => {
  try {
    const response = await axiosInstance.post("/campana", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al crear el aplicativo" };
  }
};
