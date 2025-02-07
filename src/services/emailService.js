const Email = require("../models/emailModel.js");

module.exports = {
  async criar({ pessoa_id, email, principal }) {
    const emai = await Email.create({ pessoa_id, email, principal });
    return emai;
  },

  async atualizar({ pessoa_id, email, principal }) {
    const antiga = await this.pegar(email.id);
    if (!antiga) {
      throw new Error("E-mail não encontrado!");
    }
    antiga.pessoa_id = pessoa_id;
    antiga.email = email;
    antiga.principal = principal;
    await antiga.save();

    return antiga;
  },

  async pegar(id) {
    return await Email.findByPk(id);
  },

  async deletar(id) {
    const email = await this.pegar(id);
    if (!email) {
      throw new Error("E-mail não encontrado!");
    }

    await Email.destroy();
  },

  async listar() {
    const emails = await Email.findAll();
    return emails;
  },
};
