console.log("oiii")
function calculaContraCheque() {
    //calculando o salario do plano de cargos
    let capital = document.getElementById("entrada").value
    //var capital = parseInt(num)
    let taxaJuros = 5 / 100
    let tempo = document.getElementById("tempo").value
    let tempoAplicacao = Math.trunc(tempo / 5)
    let montante = Number(capital * Math.pow((1 + taxaJuros), tempoAplicacao));
    document.getElementById("salario").value = montante.toFixed(2);
    //calculando insalubridade
    let insa = Number(montante * 0.3)
    document.getElementById("insalubridade").value = insa.toFixed(2);
    //calculando o adicional de tempo de serviço
    let adts = Number(montante * (tempoAplicacao * 5 / 100))
    document.getElementById("adts").value = adts.toFixed(2);
    //calculando o adicional de titulação
    let tit = document.getElementById("porcentagem").value
    let titulacao = Number(montante * tit / 100)
    document.getElementById("titulacao").value = titulacao.toFixed(2);
    //verificando a gratificação de nivel superior
    let nivSup = document.getElementById("gratificacao").value
    if (nivSup == 's' || nivSup == 'S') {
        document.getElementById("gratNivSup").value = 103.32
    } else {
        document.getElementById("gratNivSup").value = 0
    }
    //calculando o salario bruto
    let gratNivSup = Number(document.getElementById("gratNivSup").value)
    let bruto = (montante + insa + adts + titulacao + gratNivSup);
    document.getElementById("bruto").value = bruto.toFixed(2)
    //calcular inss
    let baseInss = bruto - insa
    let inss = 0;
    if (baseInss <= 1212.00) { //1ªfaixa
        inss = baseInss * 0.075
    } else if (baseInss > 1212.00 && baseInss <= 2427.35) { //2ªfaixa
        inss = 90.90 + ((baseInss - 1212) * 0.09)
    } else if (baseInss > 2427.35 && baseInss <= 3641.03) { //3ªfaixa
        inss = 90.90 + 109.38 + ((baseInss - 2427.35) * 0.12)
    } else if (baseInss > 3641.03 && baseInss <= 7087.22) { //4ªfaixa
        inss = 90.90 + 109.38 + 145.64((baseInss - 3641.03) * 0.14)
    } else {
        inss = 828.39
    }
    console.log(inss)
    document.getElementById("inss").value = inss.toFixed(2)
    //calcular irrf = [(Salário bruto - dependentes - INSS) X alíquota] - dedução
    let irrf = 0
    let numDependentes = Number(document.getElementById("dependentes").value)
    if (numDependentes == '') {
        numDependentes = 0
    }
    console.log(numDependentes)
    let baseIrrf = bruto - inss - (numDependentes * 189.59)
    console.log("baseIrrf : " + baseIrrf)
    if (baseIrrf <= 1903.98) {
        irrf = 0;
    } else if (baseIrrf > 1903.98 && baseIrrf <= 2826.65) {
        irrf = ((baseIrrf * 0.075) - 142.8)
    } else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05) {
        irrf = ((baseIrrf * 0.15) - 354.8)
    } else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68) {
        irrf = ((baseIrrf * 0.225) - 636.13)
    } else {
        irrf = ((baseIrrf * 0.275) - 869.36)
    }
    console.log(irrf)
    document.getElementById("irrf").value = irrf.toFixed(2)
    // Salario Liquido

    let liquido = bruto - inss - irrf
    console.log(liquido)
    document.getElementById("liquido").value = liquido.toFixed(2)

}