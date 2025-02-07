const UnidadeMassa = {
  GRAMA: "Grama",
  KILOGRAMA: "Kilograma",
  TONELADA: "Tonelada",
};

const UnidadeCapacidade = {
  MILILITRO: "Mililitro",
  LITRO: "Litro",
};

const UnidadeComprimento = {
  CENTIMETRO: "Centímetro",
  METRO: "Metro",
  KILOMETRO: "Quilômetro",
};

const UnidadeMedida = {
  MASSA: "Massa",
  CAPACIDADE: "Capacidade",
  COMPRIMENTO: "Comprimento",
};

function buscarUnidade(unidade) {
  const unidadeMap = {
    G: { tipo: UnidadeMedida.MASSA, unidade: UnidadeMassa.GRAMA },
    KG: { tipo: UnidadeMedida.MASSA, unidade: UnidadeMassa.KILOGRAMA },
    T: { tipo: UnidadeMedida.MASSA, unidade: UnidadeMassa.TONELADA },
    ML: {
      tipo: UnidadeMedida.CAPACIDADE,
      unidade: UnidadeCapacidade.MILILITRO,
    },
    L: { tipo: UnidadeMedida.CAPACIDADE, unidade: UnidadeCapacidade.LITRO },
    CM: {
      tipo: UnidadeMedida.COMPRIMENTO,
      unidade: UnidadeComprimento.CENTIMETRO,
    },
    M: { tipo: UnidadeMedida.COMPRIMENTO, unidade: UnidadeComprimento.METRO },
    KM: {
      tipo: UnidadeMedida.COMPRIMENTO,
      unidade: UnidadeComprimento.KILOMETRO,
    },
  };

  if (unidadeMap[unidade]) {
    return unidadeMap[unidade];
  }

  throw new Error(`A unidade de medida '${unidade}' não pode ser localizada`);
}

function unidadeMedidaVindaApi(unidade) {
  const unidadeMap = {
    COMPRIMENTO: {
      tipo: UnidadeMedida.COMPRIMENTO,
      unidade: UnidadeComprimento.METRO,
    },
    CAPACIDADE: {
      tipo: UnidadeMedida.CAPACIDADE,
      unidade: UnidadeCapacidade.LITRO,
    },
    MASSA: { tipo: UnidadeMedida.MASSA, unidade: UnidadeMassa.KILOGRAMA },
  };

  if (unidadeMap[unidade]) {
    return unidadeMap[unidade];
  }

  throw new Error(`A unidade de medida '${unidade}' não pode ser localizada`);
}

function converterParaMenorPossivel(quantidade, unidadeMedida) {
  if (unidadeMedida.tipo === UnidadeMedida.MASSA) {
    switch (unidadeMedida.unidade) {
      case UnidadeMassa.GRAMA:
        return quantidade;
      case UnidadeMassa.KILOGRAMA:
        return quantidade * 1000;
      case UnidadeMassa.TONELADA:
        return quantidade * 1000000;
    }
  }

  if (unidadeMedida.tipo === UnidadeMedida.CAPACIDADE) {
    switch (unidadeMedida.unidade) {
      case UnidadeCapacidade.MILILITRO:
        return quantidade;
      case UnidadeCapacidade.LITRO:
        return quantidade * 1000;
    }
  }

  if (unidadeMedida.tipo === UnidadeMedida.COMPRIMENTO) {
    switch (unidadeMedida.unidade) {
      case UnidadeComprimento.CENTIMETRO:
        return quantidade;
      case UnidadeComprimento.METRO:
        return quantidade * 100;
      case UnidadeComprimento.KILOMETRO:
        return quantidade * 100000;
    }
  }

  throw new Error("Unidade de medida inválida");
}
