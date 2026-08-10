export const paraNumero = (value) =>
  value.split(".").join("").replace(",", ".");

export const verificarInput = (inputs) =>
  inputs.reduce((count, input) => count + (input === "" ? 1 : 0), 0);

export const formatarResultado = (valor) =>
  Number(valor).toFixed(2).replace(".", ",");

export const calcularParcelas = (taxa, parcelas, saldo) => {
  const valorParcela = (saldo * taxa) / (1 - (1 + taxa) ** -parcelas);
  return Number(valorParcela.toFixed(2));
};

export const calcularSaldo = (taxa, parcelas, valorParcela) => {
  const valorSaldo = (valorParcela * (1 - (1 + taxa) ** -parcelas)) / taxa;
  return Number(valorSaldo.toFixed(2));
};

export const calcularMeses = (taxa, valorParcela, saldo) => {
  const meses = -(
    Math.log(1 - saldo * (taxa / valorParcela)) / Math.log(1 + taxa)
  );
  return Number(meses.toFixed(2));
};

export const calcularTaxa = (parcelas, valorParcela, saldo) => {
  let taxMin = 0;
  let taxMax = 1;
  let meio = 0;
  let prestacaoCalculada = 0;

  while (Math.abs(prestacaoCalculada - valorParcela) > 0.000001) {
    meio = (taxMin + taxMax) / 2;
    prestacaoCalculada = calcularParcelas(meio, parcelas, saldo);

    if (prestacaoCalculada > valorParcela) {
      taxMax = meio;
    } else {
      taxMin = meio;
    }
  }

  return Number((meio * 100).toFixed(2));
};
