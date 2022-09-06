const calcula_plano = require("../js/scripts");

QUnit.module("calcula_plano");

QUnit.test("calcula plano", (assert) => {
  var cal = calcula_plano(2424, 17);
  assert.equal(cal, 2806.083);
});
