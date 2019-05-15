var INICIO =0;
var ABERTURA = 4;
var APROVACAO = 5;
var AVALIAR_ERRO = 18;
var CORRIGIR = 25;

var dtSolicitacao;
var dtAprovacao;
var dtNota;


//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

  var $target = $(e.target);

  if ($target.parent().hasClass('disabled')) {
      return false;
  }
});

$(".next-step").click(function(e) {

  var $active = $('.wizard .nav-tabs li.active');
  $active.next().removeClass('disabled');
  nextTab($active);

});
$(".prev-step").click(function(e) {

      var $active = $('.wizard .nav-tabs li.active');
      prevTab($active);

  }

);


//termina aqui o read

function nextTab(elem) {
  $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
  $(elem).prev().find('a[data-toggle="tab"]').click();
}

var visibilidade = true;

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIO){
		dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
	
		dtNota = FLUIGC.calendar('#dtNota', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true
		});
		

		
	}

	if (ATIVIDADE != ABERTURA  && ATIVIDADE != INICIO){
		 document.getElementById("btn_add_item").style.display = "none";
	}

	if (ATIVIDADE == APROVACAO){
		dtAprovacao = FLUIGC.calendar('#dtAprovacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtAprovacao.setDate(new Date().toLocaleString());
	}
	
	
	
});




//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
    var LOCALIZACAO = "localizacao";
    var CONTA = "contacontabil";
    var CCUSTO = "txtcentrocusto";
    var CATEGORIA = "txtcategoria";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";
    var ALOCACAO = "alocacao";
    var RATEIO = "rateioconfigurado";
    var PRODUTO = "produto";   
    var RESPONSAVEL ="responsavel";
    	 
  
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
    console.log("--CAMPO SELECIONADO----");
    console.log(selectedItem.inputId);

    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');


    console.log("---IDENTIFICANDO CAMPO ZOOM FILHOS-------");
    console.log(linhaPagamento[0]);
    console.log(linhaPagamento[1]);

    //compara para verificar se o zoom é o campo centro de custo
    if (linhaPagamento[0] == CCUSTO) {
    	console.log("---ENTROU AQUI 1 ----");
        //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");

        if (selectedItem["CODIGO"] != '99990') {
        	console.log("---ENTROU AQUI 2 ----");
            console.log("---CENTRO DE CUSTO---"+selectedItem["CODIGO"]);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

        } else {
        	console.log("---ENTROU AQUI 3 ----");
            //desabilita zoom que não devem ser preenchidos
        	console.log("---desabilita zoom que não devem ser preenchidos---");
            console.log(selectedItem["CODIGO"]);
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } else if (linhaPagamento[0] == PROJETO) {
    	console.log("---ENTROU AQUI 4 ----");
        console.log("------PROJETO--------");
        console.log(selectedItem["CODIGO"]);

        console.log("------CAMPO ATIVIDADE--------");
        console.log(ATIVIDADE + "___" + linhaPagamento[1]);

        //LIMPA TODOS AS COLUNAS POSTERIORES
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");

        //DESBLOQUEIA TODOS OS CAMPOS
        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
        window[FONTE + "___" + linhaPagamento[1]].disable(false);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(false);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(false);

        //ENVIAR VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
        $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

    } else if (linhaPagamento[0] == ATIVIDADE) {
    	//POR CAUSA DA EDIÇÃO
    	//PRIMEIRO PRECISO RECUPERAR O QUE ESTÁ NO CAMPO DO PROJETO
    	//reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
        
    	//window[AREAESTRATEGICA + "___" + linhaPagamento[1]].setValue(selectedItem["AREA_ESTRATEGICA"]);
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    } else if (campoZOOM == RATEIO) {    
    	console.log("---ENTROU AQUI 9 ----");
    	buscaItensRateio(selectedItem["CODIGO"]);
    	
    } else if (campoZOOM == RESPONSAVEL){
    	 $("#cpfbeneficiario").val(selectedItem["CPF"]);
    
    } else if (campoZOOM == PRODUTO) {	
    	 $('#codigoProduto').val(selectedItem["CODIGO"]);
    	    
    }
    
}


function adicionaLinhaProduto() {	
	var row = wdkAddChild('tableItens');	
	reloadZoomFilterValues("txtcontacontabil" + "___" + row, "TIPO," + "");	
	
}

function adicionaLinha() {
    var indice = wdkAddChild('tableItens');
    window["txtprojeto___" + indice].disable(true);
    window["txtatividade___" + indice].disable(true);
    window["txtcategoria___" + indice].disable(true);
    window["txtfontefinanciamento___" + indice].disable(true);
    window["txtareaestrategica___" + indice].disable(true);
}


function removedZoomItem(removedItem) {
    var LOCALIZACAO = "localizacao";
    var CCUSTO = "txtcentrocusto";
    var CATEGORIA = "txtcategoria";
    var FONTE = "txtfontefinanciamento";
    var ATIVIDADE = "txtatividade";
    var AREAESTRATEGICA = "txtareaestrategica";
    var PROJETO = "txtprojeto";
    var ALOCACAO = "alocacao";
    var RATEIO = "rateioconfigurado";
    var ITEMRATEIO ="rateio";
    var PRODUTO = "produto";   
    var RESPONSAVEL ="responsavel";

    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
    console.log("Retornando resultado removedZoomItem");
    console.log(removedItem);


    if (linhaPagamento[0] == CCUSTO) {
    	console.log("---REMOVEU AQUI 1----");
        //limpa todos os campos do pagamento          
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";

        //limpa filtro
        console.log("---LIMPANDO FILTROS ZOOM----");
        //reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(CATEGORIA + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);
        //reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "CENTRO_CUSTO," + null);


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } else if (linhaPagamento[0] == PROJETO) {
    	console.log("---REMOVEU AQUI 2----");
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";


    } else if (linhaPagamento[0] == ATIVIDADE) {
    	console.log("---REMOVEU AQUI 3----");
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";
        var rat =  document.getElementById(ITEMRATEIO + "___" + linhaPagamento[1]).value = "";


    } else if (campoZOOM == RESPONSAVEL){
   	 	$("#cpfbeneficiario").val("");
    }
    
    if (campoZOOM == RATEIO) {
        //removeItensRateio();
    	console.log("---REMOVEU AQUI 6----");
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);	
	        
	    }
    }

    if (campoZOOM == PRODUTO) {	
    	$('#codigoProduto').val("");
    	    	
    }



}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function buscaItensRateio(rateio) {

	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("RATEIO", rateio, rateio, ConstraintType.MUST));	
	var dataset = DatasetFactory.getDataset("ds_get_ItensRateio", null, constraints, null);
	
	adicionaItensRateio(dataset.values) ;

}

function adicionaItensRateio(itens) {
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");
        
        window["txtcentrocusto___" + indice].setValue(itens[i].CENTROCUSTO);   
        
       
        
        if (itens[i].PROJETO == null || itens[i].PROJETO == "") {
            window["txtprojeto___" + indice].disable(true);
        } else {
            window["txtprojeto___" + indice].setValue(itens[i].PROJETO);
            //$("#projeto").val(itens[i].PROJETO);
        }
        
        window["txtatividade___" + indice].setValue(itens[i].ATIVIDADE);
       
        
        if (itens[i].CATEGORIA == null || itens[i].CATEGORIA == "") {
            window["txtcategoria___" + indice].disable(true);
        } else {
            window["txtcategoria___" + indice].setValue(itens[i].CATEGORIA);
        }

        if (itens[i].FONTE == null || itens[i].FONTE == "") {
            window["txtfontefinanciamento___" + indice].disable(true);
        } else {
            window["txtfontefinanciamento___" + indice].setValue(itens[i].FONTE);
        }

        if (itens[i].AREA == null || itens[i].AREA == "") {
            window["txtareaestrategica___" + indice].disable(true);
        } else {
            window["txtareaestrategica___" + indice].setValue(itens[i].AREA);
        }

        $("#alocacao___" + indice).val(itens[i].ALOCACAO);
        $("#localizacao___" + indice).val(itens[i].LOCALIZACAO);
        
        
        if (itens[i].CENTROCUSTO == '99990'){
       	 $("#contacontabil___" + indice).val(itens[i].CONTA);
        }
        
        //precisa trocar o ponto por virgula
        $("#percentual___" + indice).val(itens[i].PERCENTUAL);
        
        $("#rateio___" + indice).val(itens[i].RATEIO);

        
    }
    
    function justificativaValidacao(){
    	
    }
    
}



