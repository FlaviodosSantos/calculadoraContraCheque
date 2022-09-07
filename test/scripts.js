const {
  //calculaContraCheque,
  calcula_plano,
  calcula_insalubridade,
  calcula_tempo_seviço,
  calcula_titulacao,
  verif_gratificacao,
  calcula_sal_bruto,
  calcula_inss,
  calcula_irrf,
  calcula_sal_liquido,
} = require("../js/scripts");

QUnit.module("calcula_plano");
/*
QUnit.test("calcula contra cheque", (assert) => {
  var cal = calculaContraCheque(2424, 17, 0, "s", 0);
  assert.equal(cal, 3630.3459844, "calculaContraCheque ok");
});
*/
QUnit.test("calcula plano", (assert) => {
  var cal = calcula_plano(2424, 17);
  assert.equal(cal, 2806.083, "calcula plando ok");
});

QUnit.test("calcula insalubridade", (assert) => {
  var cal = calcula_insalubridade(2806.083);
  assert.equal(cal, 841.8249, "insalubridade ok");
});

QUnit.test("calcula_tempo_seviço", (assert) => {
  var cal = calcula_tempo_seviço(2806.083, 17);
  assert.equal(cal, 420.91245, "tempo de serviço (adts) ok");
});

QUnit.test("calcula_titulacao", (assert) => {
  var cal = calcula_titulacao(2806.083, 0);
  assert.equal(cal, 0, "calcula_titulacao ok");
});

QUnit.test("verifica gratificação", (assert) => {
  var cal = verif_gratificacao("s");
  var cal2 = verif_gratificacao("");
  assert.equal(cal, 103.32, "calcula_titulacao ok");
  assert.equal(cal2, "", "sem gratificação ok");
});

QUnit.test("salario bruto", (assert) => {
  var cal = calcula_sal_bruto(2806.083, 841.8249, 420.91245, 0, 103.32);
  assert.equal(cal, 4172.14035, "salario bruto ok");
});

QUnit.test("calcula inss", (assert) => {
  var cal = calcula_inss(4172.14035, 841.8249);
  assert.equal(cal, 308.635854, "calcula_inss ok");
});

QUnit.test("calcula irrf", (assert) => {
  var cal = calcula_irrf(4172.14035, 308.635854, 0);
  assert.equal(cal, 233.15851159999988, "calcula irrf ok");
});

QUnit.test("calcula_sal_liquido", (assert) => {
  var cal = calcula_sal_liquido(4172.14035, 308.635854, 233.15851159999988);
  assert.equal(cal, 3630.3459844, "calcula_sal_liquido ok");
});
