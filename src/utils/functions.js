function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  function calcularDigito(cpfParcial, peso) {
    let soma = 0;
    for (let i = 0; i < cpfParcial.length; i++) {
      soma += parseInt(cpfParcial[i]) * (peso - i);
    }
    let resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  let primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
  let segundoDigito = calcularDigito(cpf.slice(0, 10), 11);

  return cpf.slice(-2) === `${primeiroDigito}${segundoDigito}`;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  function calcularDigitoCNPJ(cnpjParcial, pesos) {
    let soma = 0;
    for (let i = 0; i < cnpjParcial.length; i++) {
      soma += parseInt(cnpjParcial[i]) * pesos[i];
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  const pesosPrimeiro = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesosSegundo = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let primeiroDigito = calcularDigitoCNPJ(cnpj.slice(0, 12), pesosPrimeiro);
  let segundoDigito = calcularDigitoCNPJ(cnpj.slice(0, 13), pesosSegundo);

  return cnpj.slice(-2) === `${primeiroDigito}${segundoDigito}`;
}

function apenasNumeros(texto) {
  return texto.replace(/\D/g, "");
}

module.exports = {
  validarCPF,
  validarCNPJ,
  apenasNumeros
};
