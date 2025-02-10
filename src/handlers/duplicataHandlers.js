const duplicataService = require("../services/duplicadaService.js");
const moedaService = require("../services/moedaService.js");
const duplicataDetalhesService = require("../services/duplicataDetalhesService.js");
const estoqueProdutoService = require("../services/estoqueProdutoService.js");
const produtoValorService = require("../services/produtoValorService.js");
const duplicataParcelaService = require("../services/duplicataParcelaService.js");
const duplicataParcelaHistService = require("../services/duplicataParcelaHistService.js");

module.exports = {
  async salvar_duplicata_e_parcelas(info) {
    const moeda = await moedaService.pegar_pela_sigla("R$");
    const duplicata = await duplicataService.criar({
      centro_custo_id: info.centro_custo_id,
      entidade_id: info.entidade_id,
      conta_id: info.conta_id,
      moeda_id: moeda.id,
      pessoa_id: info.pessoa_id,
      usuario_id: info.usuario_id,
      numero_parcelas: info.quantidade_parcelas,
      numero_parcelas_abertas: info.quantidade_parcelas,
      valor_cobrado: info.valor_cobrado,
      valor_pago: new Big(0),
      valor_multa: new Big(0),
      valor_juros: new Big(0),
      valor_desconto: new Big(0),
      valor_aberto: info.valor_cobrado,
      status: "A",
      sinal: info.sinal,
      data_lancamento: info.data_lancamento,
      data_ultimo_pagamento: null,
    });

    if (info.produtos) {
      for (const info_produto in info.produtos) {
        const duplicata_detalhe = await duplicataDetalhesService.criar({
          duplicata_id: duplicata.id,
          produto_id: info_produto.produto_id,
        });

        await estoqueProdutoService.criar({
          duplicata_detalhe_id: duplicata_detalhe.id,
          estoque_id: info_produto.estoque_id,
          produto_id: info_produto.produto_id,
          quantidade: info_produto.quantidade,
          data: info.data_lancamento,
          // Contas a pagar (-1) o estoque aumenta (+1)
          // Contas a receber (+1) o estoque diminiu (-1)
          sinal: info.sinal * -1,
          lancamento_manual: false,
        });

        if (sinal == -1) {
          const valor_produto = (
            info_produto.valor_cobrado / info_produto.quantidade
          ).toFixed(2);

          await produtoValorService.criar({
            usuario_id: info.usuario_id,
            produto_id: info_produto.produto_id,
            cliente_fornecedor_id: info.cliente_fornecedor_id,
            valor: valor_produto,
            data: info.data_lancamento,
          });
        }
      }
    }

    const valor_cobrado_por_parcela = new Big(info.valor_cobrado)
      .div(new Big(info.quantidade_parcelas))
      .round(2, 0);

    var data_vencimento = new Date(info.data_vencimento_primeira_parcela);

    for (
      var numero_parcela = 1;
      numero_parcela < info.quantidade_parcelas;
      numero_parcela++
    ) {
      const parcela = await duplicataParcelaService.criar({
        duplicata_id: duplicata.id,
        data_vencimento,
        numero_parcela,
        valor_cobrado: valor_cobrado_por_parcela,
        valor_aberto: valor_cobrado_por_parcela,
        valor_pago: new Big(0),
        valor_multa: new Big(0),
        valor_juros: new Big(0),
        valor_desconto: new Big(0),
        status: "A",
        data_ultimo_pagamento: null,
      });

      const hist = await duplicataParcelaHistService.criar({
        duplicata_parcela_id: parcela.id,
        usuario_id: info.usuario_id,
        valor: valor_cobrado_por_parcela,
        valor_multa: new Big(0),
        valor_juros: new Big(0),
        valor_desconto: new Big(0),
        tipo_lancamento: "L",
        detalhes: null,
        data_movimento: info.data_lancamento,
      });

      data_vencimento = data_vencimento.setMonth(
        data_vencimento.getMonth() + 1
      );
    }

    var valor_ultima_parcela =
      info.valor_cobrado -
      valor_cobrado_por_parcela * (info.quantidade_parcelas - 1);

    var parcela = await duplicataParcelaService.criar({
      duplicata_id: duplicata.id,
      data_vencimento,
      numero_parcela: info.quantidade_parcelas,
      valor_cobrado: valor_ultima_parcela,
      valor_pago: new Big(0),
      valor_multa: new Big(0),
      valor_juros: new Big(0),
      valor_desconto: new Big(0),
      valor_aberto: valor_ultima_parcela,
      status: "A",
      data_ultimo_pagamento: null,
    });

    await duplicataParcelaHistService.criar({
      duplicata_parcela_id: parcela.id,
      usuario_id: info.usuario_id,
      valor: valor_ultima_parcela,
      valor_multa: new Big(0),
      valor_juros: new Big(0),
      valor_desconto: new Big(0),
      tipo_lancamento: "L",
      detalhes: null,
      data_movimento: info.data_lancamento,
    });

    return duplicata;
  },
};
