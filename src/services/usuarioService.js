import axios from "./connection";

export const usuarioService = {
  async getUsuarios() {
    return await axios.get("/usuarios/listar");
  },

  async getUsuarioByID(id) {
    return await axios.get(`/usuarios/{id}`);
  },
};
