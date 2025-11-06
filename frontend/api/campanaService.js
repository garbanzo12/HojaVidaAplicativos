import axios from "axios";

export const obtenerCampanas = async () => {
  const response = await axios.get("http://localhost:4000/campana");
  return response.data.campanas;
};
