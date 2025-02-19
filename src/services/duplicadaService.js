const Duplicata = require("../models/duplicataModel.js");
const DuplicatasParcelas = require("../models/duplicataParcelaModel.js");

const Big = require("big.js");

module.exports = {
  async criar({
    centro_custo_id,
    entidade_id,
    conta_id,
    moeda_id,
    pessoa_id,
    usuario_id,
    numero_parcelas,
    numero_parcelas_abertas,
    valor_cobrado,
    valor_pago,
    valor_multa,
    valor_juros,
    valor_desconto,
    valor_aberto,
    status,
    sinal,
    data_lancamento,
    data_ultimo_pagamento,
  }) {
    const duplicata = await Duplicata.create({
      centro_custo_id,
      entidade_id,
      conta_id,
      moeda_id,
      pessoa_id,
      usuario_id,
      numero_parcelas,
      numero_parcelas_abertas,
      valor_cobrado,
      valor_pago,
      valor_multa,
      valor_juros,
      valor_desconto,
      valor_aberto,
      status,
      sinal,
      data_lancamento,
      data_ultimo_pagamento,
    });
    return duplicata;
  },

  async pegar(id) {
    const duplicata = await Duplicata.findByPk(id);
    return duplicata;
  },

  async atualizar({
    id,
    centro_custo_id,
    entidade_id,
    conta_id,
    moeda_id,
    pessoa_id,
    usuario_id,
    numero_parcelas,
    numero_parcelas_abertas,
    valor_cobrado,
    valor_pago,
    valor_multa,
    valor_juros,
    valor_desconto,
    valor_aberto,
    status,
    sinal,
    data_lancamento,
    data_ultimo_pagamento,
  }) {
    const antigo = await Duplicata.findByPk(id);
    if (!antigo) throw new Error("Duplicata não encontrada");

    antigo.centro_custo_id = centro_custo_id;
    antigo.entidade_id = entidade_id;
    antigo.conta_id = conta_id;
    antigo.moeda_id = moeda_id;
    antigo.pessoa_id = pessoa_id;
    antigo.usuario_id = usuario_id;
    antigo.numero_parcelas = numero_parcelas;
    antigo.numero_parcelas_abertas = numero_parcelas_abertas;
    antigo.valor_cobrado = valor_cobrado;
    antigo.valor_pago = valor_pago;
    antigo.valor_multa = valor_multa;
    antigo.valor_juros = valor_juros;
    antigo.valor_desconto = valor_desconto;
    antigo.valor_aberto = valor_aberto;
    antigo.status = status;
    antigo.sinal = sinal;
    antigo.data_lancamento = data_lancamento;
    antigo.data_ultimo_pagamento = data_ultimo_pagamento;
    
    await antigo.update()
    return antigo;
  },

  async deletar(id) {
    const duplicata = await Duplicata.findByPk(id);
    if (!duplicata) throw new Error("Duplicata não encontrada");
    await duplicata.destroy();
  },

  async contas_com_lancamento(conta_id) {
    const duplicatas = await Duplicata.findAll({
      where: { conta_id },
    });
    return duplicatas;
  },

  async listar() {
    const duplicatas = await Duplicata.findAll();
    return duplicatas;
  },

  async listar_da_entidade(entidade_id) {
    const query = {
      where: { entidade_id },
    };
    const duplicadas = await Duplicata.findAll(query);
    return duplicadas;
  },

  async atualizar_valores_e_status(id) {
    const queryDuplicatasParcelas = {
      where: { duplicata_id: id },
    };
    var parcelas = await DuplicatasParcelas.findAll(queryDuplicatasParcelas);

    const numero_parcelas = 0;
    const numero_parcelas_abertas = 0;

    var valor_cobrado = new Big(0);
    var valor_pago = new Big(0);
    var valor_multa = new Big(0);
    var valor_juros = new Big(0);
    var valor_desconto = new Big(0);
    var valor_aberto = new Big(0);
    var data_ultimo_pagamento = null;
    var pagamento_total = true;
    var estorno_total = true;

    parcelas.forEach((parcela) => {
      if (parcela.status != "B") {
        pagamento_total = false;
        if (parcela.status != "E") {
          numero_parcelas_abertas += 1;
        }
      }
      if (parcela.status != "E") {
        estorno_total = false;
        numero_parcelas += 1;
      }

      if (parcela.status === "F") {
        const data_pag = data_ultimo_pagamento;
        const parc_data_pag = parcela.data_ultimo_pagamento;
        if (data_pag !== null && data_pag !== undefined) {
          if (parc_data_pag !== null && parc_data_pag !== undefined)
            if (data_pag < parc_data_pag) data_pag = parc_data_pag;
        } else data_pag = parc_data_pag;
      }

      valor_cobrado += parcela.valor_cobrado;
      valor_pago += parcela.valor_pago;
      valor_multa += parcela.valor_multa;
      valor_juros += parcela.valor_juros;
      valor_desconto += parcela.valor_desconto;
      valor_aberto += parcela.valor_aberto;
    });

    var status = "A";

    if (pagamento_total) {
      status = "B";
    } else if (estorno_total) {
      status = "E";
    }

    const duplicata = await this.pegar(id);

    duplicata.numero_parcelas = numero_parcelas;
    duplicata.numero_parcelas_abertas = numero_parcelas_abertas;
    duplicata.valor_cobrado = valor_cobrado;
    duplicata.valor_pago = valor_pago;
    duplicata.valor_multa = valor_multa;
    duplicata.valor_juros = valor_juros;
    duplicata.valor_desconto = valor_desconto;
    duplicata.valor_aberto = valor_aberto;
    duplicata.status = status;
    duplicata.data_ultimo_pagamento = data_ultimo_pagamento;
  },
};
