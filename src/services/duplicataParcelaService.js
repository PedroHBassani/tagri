const DuplicataParcela = require("../models/duplicataParcelaModel.js");
const DuplicataParcelaHist = require("../models/duplicataParcelaHistModel.js");

const Big = require("big.js");

module.exports = {
  async criar({
    duplicata_id,
    data_vencimento,
    numero_parcela,
    valor_cobrado,
    valor_pago,
    valor_multa,
    valor_juros,
    valor_desconto,
    valor_aberto,
    status,
    data_ultimo_pagamento,
  }) {
    const duplicataParcel = await DuplicataParcela.create({
      duplicata_id,
      data_vencimento,
      numero_parcela,
      valor_cobrado,
      valor_pago,
      valor_multa,
      valor_juros,
      valor_desconto,
      valor_aberto,
      status,
      data_ultimo_pagamento,
    });
    return duplicataParcel;
  },

  async pegar(id) {
    const duplicataParcela = await DuplicataParcela.findByPk(id);
    return duplicataParcela;
  },

  async atualizar({
    id,
    duplicata_id,
    data_vencimento,
    numero_parcela,
    valor_cobrado,
    valor_pago,
    valor_multa,
    valor_juros,
    valor_desconto,
    valor_aberto,
    status,
    data_ultimo_pagamento,
  }) {
    const antiga = await DuplicataParcela.findByPk(id);
    if (!antiga) {
      throw new Error("DuplicataParcela não encontrada");
    }
    antiga.duplicata_id = duplicata_id;
    antiga.data_vencimento = data_vencimento;
    antiga.numero_parcela = numero_parcela;
    antiga.valor_cobrado = valor_cobrado;
    antiga.valor_pago = valor_pago;
    antiga.valor_multa = valor_multa;
    antiga.valor_juros = valor_juros;
    antiga.valor_desconto = valor_desconto;
    antiga.valor_aberto = valor_aberto;
    antiga.status = status;
    antiga.data_ultimo_pagamento = data_ultimo_pagamento;
    return antiga;
  },

  async deletar(id) {
    const duplicataParcela = await DuplicataParcela.findByPk(id);
    if (!duplicataParcela) {
      throw new Error("DuplicataParcela não encontrada");
    }
    await duplicataParcela.destroy();
  },

  async atualizar_valores_e_status(id) {
    const hists = await DuplicataParcelaHist.findAll({
      where: {
        duplicata_parcela_id: id,
      },
      order: [["criado_as", "DESC"]],
    });

    var valor_pago = new Big(0);
    var valor_cobrado = new Big(0);
    var valor_multa = new Big(0);
    var valor_juros = new Big(0);
    var valor_desconto = new Big(0);

    var tipo_lancamento_ultimas_mov_nao_estorno = "";
    var data_ultimo_pagamento = null;

    hists.forEach((hist) => {
      let tipo_lancamento = hist.tipo_lancamento;
      let multiplicador = 1;

      if (hist.tipo_lancamento === "E") {
        multiplicador = -1;
        tipo_lancamento = tipo_lancamento_ultimas_mov_nao_estorno.pop();
      } else {
        tipo_lancamento_ultimas_mov_nao_estorno.push(hist.tipo_lancamento);
      }

      if (tipo_lancamento === "L") {
        valor_cobrado += hist.valor * multiplicador;
      } else if (tipo_lancamento === "B") {
        valor_pago += hist.valor * multiplicador;

        if (
          data_ultimo_pagamento !== null &&
          data_ultimo_pagamento !== undefined
        ) {
          if (new Date(data_ultimo_pagamento) < new Date(hist.data_movimento)) {
            data_ultimo_pagamento = hist.data_movimento;
          }
        } else {
          data_ultimo_pagamento = hist.data_movimento;
        }
      }

      valor_multa += hist.valor_multa * multiplicador;
      valor_juros += hist.valor_juros * multiplicador;
      valor_desconto += hist.valor_desconto * multiplicador;
    });

    const valor_aberto =
      valor_cobrado.clone() +
      valor_multa.clone() +
      valor_juros.clone() -
      valor_desconto.clone() -
      valor_pago.clone();
    const status = "A";

    if (valor_cobrado == new Big(0)) {
      status = "E";
      valor_pago = new Big(0);
      valor_multa = new Big(0);
      valor_juros = new Big(0);
      valor_desconto = new Big(0);
      valor_aberto = new Big(0);
    } else if (valor_aberto <= new Big(0)) {
      status = "F";
      valor_aberto = new Big(0);
    }

    const duplicataParcela = await DuplicataParcela.findByPk(id);
    await duplicataParcela.update({
      valor_cobrado,
      valor_pago,
      valor_multa,
      valor_juros,
      valor_desconto,
      valor_aberto,
      status,
      data_ultimo_pagamento,
    });
  },
};
