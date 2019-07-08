var onlyDate = FLUIGC.calendar('#dataSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

//onlyDate.setDate(new Date().toLocaleString());

var dataAprovacao = FLUIGC.calendar('#dataAprovacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

function adicionaItem(itens) {
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");

        window["txtcentrocusto___" + indice].setValue(itens[i].txtcentrocusto);

        if (itens[i].txtprojeto == null || itens[i].txtprojeto == "") {
            window["txtprojeto___" + indice].disable(true);
            //$('#'+"txtprojeto___" + indice).attr('readonly', 'readonly');
        } else {
            window["txtprojeto___" + indice].setValue(itens[i].txtprojeto);
        }

        window["txtatividade___" + indice].setValue(itens[i].txtatividade);

    
        if (itens[i].txtfontefinanciamento == null || itens[i].txtfontefinanciamento == "") {
            window["txtfontefinanciamento___" + indice].disable(true);
        } else {
            window["txtfontefinanciamento___" + indice].setValue(itens[i].txtfontefinanciamento);
        }

        if (itens[i].txtareaestrategica == null || itens[i].txtareaestrategica == "") {
            window["txtareaestrategica___" + indice].disable(true);
        } else {
            window["txtareaestrategica___" + indice].setValue(itens[i].txtareaestrategica);
        }

         $("#funcionario___" + indice).val(itens[i].funcionario);


    }
}

function adicionaLinha() {
    var indice = wdkAddChild('tableItens');
    window["txtprojeto___" + indice].disable(true);
    window["txtatividade___" + indice].disable(true);
    window["txtfontefinanciamento___" + indice].disable(true);
    window["txtareaestrategica___" + indice].disable(true);
}

function removedZoomItem(removedItem) {
    var CCUSTO = "txtcentrocusto";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";



    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
    console.log("Retornando resultado removedZoomItem");
    console.log(removedItem);


    if (linhaPagamento[0] == CCUSTO) {
        //limpa todos os campos do pagamento          
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();


        //limpa filtro
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Centro_Custo," + null);


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } else if (linhaPagamento[0] == PROJETO) {

        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();


    } 
}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

//passa centro de custo para filtrar atividades
function setSelectedZoomItem(selectedItem) {
    var CCUSTO = "txtcentrocusto";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";


    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;

    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');


    console.log("---IDENTIFICANDO CAMPO ZOOM FILHOS-------");
    console.log(linhaPagamento[0]);
    console.log(linhaPagamento[1]);

    //compara para verificar se o zoom é o campo centro de custo
    if (linhaPagamento[0] == CCUSTO) {

        //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();


        if (selectedItem["Codigo"] != '99990') {

            console.log(selectedItem["Codigo"]);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);

        } else {
            //desabilita zoom que não devem ser preenchidos
        	  console.log(selectedItem["Codigo"]);
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } else if (linhaPagamento[0] == PROJETO) {

        console.log("------PROJETO--------");
        console.log(selectedItem["Codigo"]);

        console.log("------CAMPO ATIVIDADE--------");
        console.log(ATIVIDADE + "___" + linhaPagamento[1]);

        //LIMPA TODOS AS COLUNAS POSTERIORES
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();

        //DESBLOQUEIA TODOS OS CAMPOS
        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
        window[FONTE + "___" + linhaPagamento[1]].disable(false);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(false);

        //ENVIA VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);

    } 


}

