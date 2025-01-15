const Usuario = require("../models/usuarioModel.js");
const bcrypt = require("bcrypt");

module.exports = {
  async criar({ nome, login, senha }) {
    const jaExiste = await this.pegarPeloLogin(login);
    if (jaExiste) {
      throw new Error("Nome de usuário em uso.");
    }
    const novaSenha = await bcrypt.hash(senha, 10);
    const pessoa_id = 1;
    const ultimo_acesso = new Date();
    return await Usuario.create({
      pessoa_id,
      nome,
      login,
      senha: novaSenha,
      ultimo_acesso,
      ultima_mudanca_senha: ultimo_acesso,
      criado_em: ultimo_acesso,
    });
  },

  async atualizar(usuario) {
    const antigo = await this.pegar(usuario.id);
    if (!antigo) {
      throw new Error("Usuário não encontrado.");
    }
    const jaExiste = await this.pegarPeloLogin(usuario.login);
    if (jaExiste && jaExiste.id !== usuario.id) {
      throw new Error("Nome de usuário em uso.");
    }
    await Usuario.update(
      {
        nome: usuario.nome,
        login: usuario.login,
        senha: usuario.senha,
      },
      { where: { id: usuario.id }, returning: true }
    );
    return usuario;
  },

  async autenticar({ login, senha }) {
    const usuario = await this.pegarPeloLogin(login);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    if (!(await bcrypt.compare(senha, usuario.senha))) {
      throw new Error("Senha inválida.");
    }
    return usuario;
  },

  async pegarPeloLogin(login) {
    return await Usuario.findOne({ login });
  },

  async pegar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  },

  async inativar(id) {
    const usuario = await this.pegar(id);
    usuario.deletado_em = new Date();
    return await usuario.save();
  },
};
