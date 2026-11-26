// Salve como js/orcamento.js (ou cole dentro de um <script> no final da página)

function formatarDolar(valor) {
    return "US$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function gerarOrcamento() {
    // pegando os dados do formulário
    var nome = document.getElementById("txNome").value;
    var email = document.getElementById("txEmail").value;
    var data = document.getElementById("txData").value;
    var diarias = Number(document.getElementById("txDiarias").value);

    var genero = document.querySelector('input[name="genero"]:checked');
    var generoSelecionado = genero ? genero.value : "Não informado";

    var select = document.getElementById("selSuite");
    var valorSuite = Number(select.value);
    var nomeSuite = select.options[select.selectedIndex].text;

    // somando os adicionais marcados
    var adicionais = document.querySelectorAll('input[name="adicional"]:checked');
    var valorAdicionais = 0;
    var listaAdicionais = [];

    adicionais.forEach(function (item) {
        valorAdicionais = valorAdicionais + Number(item.value);
        listaAdicionais.push(item.nextElementSibling.innerText);
    });

    // validação simples
    if (nome == "" || email == "" || data == "") {
        document.getElementById("erro").innerHTML = "Preencha nome, e-mail e data!";
        return;
    }

    if (valorSuite == 0) {
        document.getElementById("erro").innerHTML = "Escolha uma suíte!";
        return;
    }

    if (diarias < 1) {
        document.getElementById("erro").innerHTML = "O número de diárias deve ser pelo menos 1!";
        return;
    }

    document.getElementById("erro").innerHTML = "";

    // cálculo: (suíte + adicionais) x diárias
    var totalSuite = valorSuite * diarias;
    var totalAdicionais = valorAdicionais * diarias;
    var total = totalSuite + totalAdicionais;

    // data no formato dd/mm/aaaa
    var partes = data.split("-");
    var dataBR = partes[2] + "/" + partes[1] + "/" + partes[0];

    // mostrando o orçamento na página
    document.getElementById("pNome").innerHTML = "Nome: " + nome;
    document.getElementById("pEmail").innerHTML = "E-mail: " + email;
    document.getElementById("pData").innerHTML = "Data de hospedagem: " + dataBR;
    document.getElementById("pGenero").innerHTML = "Gênero: " + generoSelecionado;
    document.getElementById("pSuite").innerHTML = "Suíte: " + nomeSuite;
    document.getElementById("pDiarias").innerHTML = "Diárias: " + diarias;

    if (listaAdicionais.length > 0) {
        document.getElementById("pAdicionais").innerHTML = "Adicionais: " + listaAdicionais.join(", ");
    } else {
        document.getElementById("pAdicionais").innerHTML = "Adicionais: nenhum";
    }

    document.getElementById("pValorSuite").innerHTML = "Total das diárias: " + formatarDolar(totalSuite);
    document.getElementById("pValorAdicionais").innerHTML = "Total dos adicionais: " + formatarDolar(totalAdicionais);
    document.getElementById("pTotal").innerHTML = "Total: " + formatarDolar(total);
}