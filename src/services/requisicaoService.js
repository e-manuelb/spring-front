import axios from "./connection";

export const requisicaoService = {
  async getRequisicoes() {
    return await axios.get("/requisicoes/listar");
  },

  async addRequisicao(data) {
    return await axios.post("/requisicoes/adicionar", data);
  },

  async deleteRequisicao(id) {
    return await axios.delete(`/requisicoes/${id}`);
  },
};
