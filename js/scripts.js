function calculaContraCheque(entrada, tempo, tit, nivSup, numDependentes) {
  //pegando os inputs
  var entrada = document.getElementById("entrada").value;
  var tempo = document.getElementById("tempo").value;
  var tit = document.getElementById("porcentagem").value;
  var nivSup = document.getElementById("gratificacao").value;
  var numDependentes = Number(document.getElementById("dependentes").value);

  //calculando o salario do plano de cargos
  console.log("entrada " + entrada);
  var plano_de_cargos = calcula_plano(entrada, tempo);
  document.getElementById("salario").value = plano_de_cargos.toFixed(2);

  //calculando insalubridade
  var insa = calcula_insalubridade(plano_de_cargos);
  document.getElementById("insalubridade").value = insa.toFixed(2);

  //calculando o adicional de tempo de serviço
  var adts = calcula_tempo_seviço(plano_de_cargos, tempo);
  document.getElementById("adts").value = adts.toFixed(2);

  //calculando o adicional de titulação
  var titulacao = calcula_titulacao(plano_de_cargos, tit);
  document.getElementById("titulacao").value = titulacao.toFixed(2);

  //verificando a gratificação de nivel superior
  var gratNivSup = verif_gratificacao(nivSup);
  document.getElementById("gratNivSup").value = gratNivSup;

  //calculando o salario bruto
  var bruto = calcula_sal_bruto(
    plano_de_cargos,
    insa,
    adts,
    titulacao,
    gratNivSup
  );
  document.getElementById("bruto").value = bruto.toFixed(2);

  //calcular inss
  var inss = calcula_inss(bruto, insa);
  document.getElementById("inss").value = inss.toFixed(2);

  //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução
  var irrf = calcula_irrf(bruto, inss, numDependentes);
  document.getElementById("irrf").value = irrf.toFixed(2);
  // Salario Liquido

  var liquido = calcula_sal_liquido(bruto, inss, irrf);
  document.getElementById("liquido").value = liquido.toFixed(2);

  return liquido;
}

function calcula_plano(entrada, tempo) {
  //calculando o salario do plano de cargos
  var capital = entrada;
  var taxaJuros = 5 / 100;
  var tempoAplicacao = Math.trunc(tempo / 5);
  var montante = Number(capital * Math.pow(1 + taxaJuros, tempoAplicacao));
  //document.getElementById("salario").value = montante.toFixed(2);

  console.log("montante : " + montante);
  return montante;
}
//teste ==============================================
QUnit.test("calcula plano", (assert) => {
  var cal = calcula_plano(2424, 17);
  assert.equal(cal, 2806.083);
});

function calcula_insalubridade(plano_de_cargos) {
  var insalubridade = Number(plano_de_cargos * (30 / 100));
  console.log("insalubridade :" + insalubridade);
  return insalubridade;
}
//teste==============================================
QUnit.test("calcula insalubridade", (assert) => {
  var cal = calcula_plano(2424, 17);
  assert.equal(cal, 2806.083, "insalubridade ok");
});

function calcula_tempo_seviço(plano_de_cargos, tempo) {
  var tempoAplicacao = Math.trunc(tempo / 5);
  var adts = Number(plano_de_cargos * ((tempoAplicacao * 5) / 100));
  console.log("adts : " + adts);
  return adts;
}

function calcula_titulacao(plano_de_cargos, tit) {
  var titulacao = Number((plano_de_cargos * tit) / 100);
  console.log("titulacao : " + titulacao);
  return titulacao;
}

function verif_gratificacao(nivSup) {
  if (nivSup == "s" || nivSup == "S") {
    var value = 103.32;
  } else {
    value = 0;
  }
  console.log("nivSup : " + value);
  return value;
}

function calcula_sal_bruto(plano_de_cargos, insa, adts, titulacao, gratNivSup) {
  var bruto = plano_de_cargos + insa + adts + titulacao + gratNivSup;
  console.log("bruto : " + bruto);
  return bruto;
}

function calcula_inss(bruto, insa) {
  var baseInss = bruto - insa;
  var inss = 0;
  if (baseInss <= 1212.0) {
    //1ªfaixa
    inss = baseInss * 0.075;
  } else if (baseInss > 1212.0 && baseInss <= 2427.35) {
    //2ªfaixa
    inss = 90.9 + (baseInss - 1212) * 0.09;
  } else if (baseInss > 2427.35 && baseInss <= 3641.03) {
    //3ªfaixa
    inss = 90.9 + 109.38 + (baseInss - 2427.35) * 0.12;
  } else if (baseInss > 3641.03 && baseInss <= 7087.22) {
    //4ªfaixa
    inss = 90.9 + 109.38 + 145.64 + (baseInss - 3641.03) * 0.14;
  } else {
    inss = 828.39;
  }
  console.log("inss: " + inss);

  return inss;
}

function calcula_irrf(bruto, inss, numDependentes) {
  //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução

  //verificando os dependentes
  if (numDependentes == "") {
    numDependentes = 0;
  }
  console.log("numDependentes :" + numDependentes);

  var irrf = 0;
  var baseIrrf = bruto - inss - numDependentes * 189.59;
  console.log("baseIrrf : " + baseIrrf);

  if (baseIrrf <= 1903.98) {
    irrf = 0;
  } else if (baseIrrf > 1903.98 && baseIrrf <= 2826.65) {
    irrf = baseIrrf * 0.075 - 142.8;
  } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
    irrf = baseIrrf * 0.15 - 354.8;
  } else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) {
    irrf = baseIrrf * 0.225 - 636.13;
  } else {
    irrf = baseIrrf * 0.275 - 869.36;
  }
  console.log(" irrf :" + irrf);

  return irrf;
}

function calcula_sal_liquido(bruto, inss, irrf) {
  var liquido = bruto - inss - irrf;
  console.log("liquido : " + liquido);
  return liquido;
}

//module.exports = calculaContraCheque;
module.exports = calcula_plano;
