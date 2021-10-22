import axios from "./connection";

export const lancheService = {
  async getLanches() {
    return await axios.get("/lanches/listar");
  },
};
