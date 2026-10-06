import { getInputValue, setInputValue, setText, setTextColor } from "./dom.js";
import {
  paraNumero,
  verificarInput,
  formatarResultado,
  calcularValorParcelas,
  calcularSaldo,
  calcularMeses,
  calcularTaxa,
} from "./calculadora.js";

const limpar = () => {
  setInputValue("iMeses", "");
  setInputValue("iTaxa", "");
  setInputValue("iValorParcela", "");
  setInputValue("iSaldo", "");

  setTextColor("paragrafoTitulo", "#6e6e6e");
  setText(
    "paragrafoTitulo",
    "Coloque três valores e terá o terceiro como resposta",
  );
};

const calculadora = () => {
  const parcelas = getInputValue("iMeses");
  const taxa = getInputValue("iTaxa");
  const valorParcelas = getInputValue("iValorParcela");
  const saldo = getInputValue("iSaldo");
  const inputs = [parcelas, taxa, valorParcelas, saldo];

  const camposVazios = verificarInput(inputs);

  if (camposVazios > 1) {
    setTextColor("paragrafoTitulo", "#f44747");
    return;
  }

  if (camposVazios === 1) {
    const taxaAjustada = Number(paraNumero(taxa) / 100);

    const listaInputs = [
      {
        nome: valorParcelas,
        id: "iValorParcela",
        funcao: calcularValorParcelas,
        paraNumero: [parcelas, saldo],
      },
      {
        nome: saldo,
        id: "iSaldo",
        funcao: calcularSaldo,
        paraNumero: [parcelas, valorParcelas],
      },
        {
          nome: parcelas,
          id: "iMeses",
          funcao: calcularMeses,
          paraNumero: [parcelas, saldo],
        },
      {
        nome: taxa,
        id: "iTaxa",
        funcao: calcularTaxa,
        paraNumero: [parcelas, valorParcelas, saldo],
      }
    ]

    listaInputs.forEach(input => {
      if (input.nome === "") {
        const numeros = input.paraNumero.map(numero => { return paraNumero(numero); });
        setInputValue(input.id, formatarResultado(input.funcao(taxaAjustada, ...numeros)));
        }
    });

    setText("paragrafoTitulo", "Tudo certinho");
    setTextColor("paragrafoTitulo", "#4ec9b0");
    return;
  }

  setTextColor("paragrafoTitulo", "#f44747");
  setText("paragrafoTitulo", "Coloque somente 3 informações");
};

const init = () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculadora();
  });

  form.addEventListener("reset", limpar);
};

window.addEventListener("DOMContentLoaded", init);
