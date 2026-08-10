import { getInputValue, setInputValue, setText, setTextColor } from "./dom.js";
import {
  paraNumero,
  verificarInput,
  formatarResultado,
  calcularParcelas,
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

    if (valorParcelas === "") {
      setInputValue(
        "iValorParcela",
        formatarResultado(
          calcularParcelas(
            taxaAjustada,
            paraNumero(parcelas),
            paraNumero(saldo),
          ),
        ),
      );
    } else if (saldo === "") {
      setInputValue(
        "iSaldo",
        formatarResultado(
          calcularSaldo(
            taxaAjustada,
            paraNumero(parcelas),
            paraNumero(valorParcelas),
          ),
        ),
      );
    } else if (parcelas === "") {
      setInputValue(
        "iMeses",
        formatarResultado(
          calcularMeses(
            taxaAjustada,
            paraNumero(valorParcelas),
            paraNumero(saldo),
          ),
        ),
      );
    } else if (taxa === "") {
      setInputValue(
        "iTaxa",
        formatarResultado(
          calcularTaxa(
            paraNumero(parcelas),
            paraNumero(valorParcelas),
            paraNumero(saldo),
          ),
        ),
      );
    }

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
