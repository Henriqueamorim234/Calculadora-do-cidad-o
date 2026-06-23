const button = document.getElementById("button");
const buttonLimpar = document.getElementById("buttonLimpar");

const limpar = () => {
  document.getElementById("iMeses").value = "";
  document.getElementById("iTaxa").value = "";
  document.getElementById("iValorParcela").value = "";
  document.getElementById("iSaldo").value = "";

  const paragrafo = document.getElementById("paragrafoTitulo");
  paragrafo.style.color = "#6e6e6e";
  paragrafo.innerHTML = "Coloque três valores e terá o terceiro como resposta";
};

const calculadora = () => {
  const Parcelas = document.getElementById("iMeses").value;
  const Taxa = document.getElementById("iTaxa").value;
  const ValorParcelas = document.getElementById("iValorParcela").value;
  const Saldo = document.getElementById("iSaldo").value;
  const Inputs = [];

  const paragrafoTitulo = document.getElementById("paragrafoTitulo");

  Inputs.push(Parcelas, Taxa, ValorParcelas, Saldo);

  const result = verificarInput(Inputs);

  if (result > 1) {
    paragrafoTitulo.style.color = "#f44747";
    return;
  } else if (result == 1) {
    const taxaAjustada = Number(Taxa.replace(",", ".") / 100);

    if (ValorParcelas == "") {
      document.getElementById("iValorParcela").value = calcularParcelas(
        taxaAjustada,
        paraNumero(Parcelas),
        paraNumero(Saldo),
      );
    } else if (Saldo == "") {
      document.getElementById("iSaldo").value = calcularSaldo(
        taxaAjustada,
        paraNumero(Parcelas),
        paraNumero(ValorParcelas),
      );
    } else if (Parcelas == "") {
      document.getElementById("iMeses").value = calcularMeses(
        taxaAjustada,
        paraNumero(ValorParcelas),
        paraNumero(Saldo),
      );
    } else if (Taxa == "") {
      document.getElementById("iTaxa").value = calcularTaxa(
        paraNumero(Parcelas),
        paraNumero(ValorParcelas),
        paraNumero(Saldo),
      );
    }

    paragrafoTitulo.textContent = "Tudo certinho";
    paragrafoTitulo.style.color = "#4ec9b0";
  } else if (result == 0) {
    paragrafoTitulo.style.color = "#f44747";
    paragrafoTitulo.textContent = "Coloque somente 3 informações";
  }
};

const verificarInput = (Inputs) => {
  let inputsVazios = 0;
  Inputs.forEach((input) => {
    if (input == "") {
      inputsVazios++;
    }
  });

  console.log(inputsVazios);

  return inputsVazios;
};

const paraNumero = (value) => {
  return value.split(".").join("").replace(",", ".");
};

const calcularParcelas = (taxa, parcelas, saldo) => {
  const valorParcela = (saldo * taxa) / (1 - (1 + taxa) ** -parcelas);

  return valorParcela.toFixed(2);
};

const calcularSaldo = (taxa, parcelas, valorParcela) => {
  const valorSaldo = (valorParcela * (1 - (1 + taxa) ** -parcelas)) / taxa;

  return valorSaldo.toFixed(2);
};

const calcularMeses = (taxa, valorParcela, saldo) => {
  const Meses = -(
    Math.log(1 - saldo * (taxa / valorParcela)) / Math.log(1 + taxa)
  );

  return Meses.toFixed(2);
};

const calcularTaxa = (parcelas, valorParcela, saldo) => {
  let taxMin = 0;
  let taxMax = 0;
  let meio = 0;
  let prestacaoCalculada = 0;

  if (valorParcela * parcelas < saldo) {
    taxMin = -1;
  } else if (valorParcela * parcelas > saldo) {
    taxMax = 1;
  } else if (valorParcela * parcelas == saldo) {
    taxMax = 1;
  }

  while (Math.abs(prestacaoCalculada - valorParcela) > 0.000001) {
    meio = (taxMin + taxMax) / 2;

    prestacaoCalculada = Number(calcularParcelas(meio, parcelas, saldo));

    if (prestacaoCalculada > valorParcela) {
      taxMax = meio;
    } else {
      taxMin = meio;
    }
  }

  return (meio * 100).toFixed(2);
};

button.addEventListener("click", () => {
  calculadora();
});

buttonLimpar.addEventListener("click", () => {
  limpar();
});
