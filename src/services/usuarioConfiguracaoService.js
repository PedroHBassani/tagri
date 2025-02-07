const UsuarioConfiguracao = require("../models/usuarioConfiguracaoModel.js");

module.exports = {
  async criar({ usuario_id, chave, valor }) {
    const usuarioConfiguracao = await UsuarioConfiguracao.create({
      usuario_id,
      chave,
      valor,
    });
    return usuarioConfiguracao;
  },

  async pegar(id) {
    const usuario = await UsuarioConfiguracao.findByPk(id);
    return usuario;
  },

  async listar(usuario_id) {
    const configuracoes = await UsuarioConfiguracao.findAll({
      where: {
        usuario_id,
      },
    });
    return configuracoes;
  },
};
