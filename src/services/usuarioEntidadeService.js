const UsuarioEntidade = require("../models/usuarioEntidadeModel.js");

module.exports = {
  async criar({ usuario_id, entidade_id }) {
    const usuario = await UsuarioEntidade.create({
      usuario_id,
      entidade_id,
    });
    return usuario;
  },

  async deletar(id) {
    const usuario = await UsuarioEntidade.findByPk(id);
    if (!usuario) throw new Error("UsuarioEntidade não encontrado.");
    await usuario.destroy();
  },

  async listar_entidades_do_usuario(usuario_id) {
    const usuarios = await UsuarioEntidade.findAll({
      where: {
        usuario_id,
      },
    });
    return usuarios;
  },
};
