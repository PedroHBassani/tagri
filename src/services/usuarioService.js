const Usuario = require("../models/usuarioModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Entidade = require("../models/entidadeModel.js");
const Pessoa = require("../models/pessoaModel.js");

module.exports = {
  async criar({ nome, login, senha }) {
    const jaExiste = await this.pegarPeloLogin(login);
    if (jaExiste) {
      throw new Error("Nome de usuário em uso.");
    }
    const novaSenha = await bcrypt.hash(senha, 10);
    const pessoa_id = await Pessoa.create({ nome, data_nascimento: new Date() });
    const entidade_id = await Entidade.create({ pessoa_id: pessoa_id.id }).id;
    const ultimo_acesso = new Date();
    return await Usuario.create({
      pessoa_id: entidade_id,
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
    const novaSenha = await bcrypt.hash(usuario.senha, 10);
    await Usuario.update(
      {
        nome: usuario.nome,
        login: usuario.login,
        senha: novaSenha,
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
    usuario.ultimo_acesso = new Date();

    const token = jwt.sign(
      { id: usuario.id, login: usuario.login },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    await usuario.save();

    return { usuario, token };
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
