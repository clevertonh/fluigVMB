var INICIO =0;
var ABERTURA = 4;
var APROVACAO = 5;
var AVALIAR_ERRO = 18;
var CORRIGIR = 25;

var dtSolicitacao;
var dtAprovacao;
var dtNota;
var codigoEvento;

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
    var PRODUTO ="txtproduto";
    var RESPONSAVEL ="responsavel";
    var EVENTO ="dataset_solicitacaoevento";
  
   

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
  
    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');

    //compara para verificar se o zoom é o campo centro de custo
    if (linhaPagamento[0] == CCUSTO) {
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
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
            reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

        } else {
            window[PROJETO + "___" + linhaPagamento[1]].disable(false);
            window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

        }

        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


    } else if (linhaPagamento[0] == PROJETO) {
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

    } else if (linhaPagamento[0] == ATIVIDADE) {
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    } else if (campoZOOM == RATEIO) {    
    	buscaItensRateio(selectedItem["CODIGO"]);
    	
    } else if (campoZOOM == RESPONSAVEL){
    	
    	 $("#cpfbeneficiario").val(selectedItem["CPF"]);
     	 if (selectedItem["CODIGOTIPO"] == '2'){ 
    		 document.getElementById("ffxOp").checked = false;
    		 document.getElementById("ffxAdm").click();  
     		
     		 
    	 }
    	 else {
    		 document.getElementById("ffxAdm").checked = false;	
    		 document.getElementById("ffxOp").click();  
    		 
    	 }
     	// $("#ffxAdm").prop("disabled", true);
 		// $("#ffxOp").prop("disabled", true);
    
    } 
    else if (linhaPagamento[0] == PRODUTO) {
    	//console.log("---ENTROU AQUI 12 ----"); 
    	//console.log(selectedItem["CODIGO"]);
    	$('#codigoProduto' + "___" + linhaPagamento[1]).val(selectedItem["CODIGO"]);   
    	$('#geraSolicCompra' + "___" + linhaPagamento[1]).val(selectedItem["GERA_SC"]);
    	    	    
    }
    else if (linhaPagamento[0] == FONTE){
  	  $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
    }
    else if (campoZOOM == EVENTO){    	
    	if (selectedItem["FINANEVENTO"] == "sim"){
    		codigoEvento = selectedItem["SOLICITACAO"];    		
    		document.getElementById("carregaFinan").click();  
    		$("#carregaFinan").prop("disabled", true);
    		$("#NcarregaFinan").prop("disabled", true);
    	}
    	else {
    		$("#carregaFinan").prop("disabled", false);
    		$("#NcarregaFinan").prop("disabled", false);
    	}
    }
        
}

function adicionaLinhaProduto() {
	
	var row = wdkAddChild('tableCompras');	
	reloadZoomFilterValues("txtproduto" + "___" + row, "FLUIG," + "");	

	
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
    var PRODUTO = "txtproduto";   
    var RESPONSAVEL ="responsavel";
    var CONTA = "contacontabil";
    var EVENTO ="dataset_solicitacaoevento";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
 
    if (linhaPagamento[0] == CCUSTO) {
        //limpa todos os campos do pagamento          
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
    
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");

        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);

    } 
    else if (linhaPagamento[0] == PROJETO) {
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");


    } 
    else if (linhaPagamento[0] == ATIVIDADE) {
    	  $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
          $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
          $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");         

    } 
    else if (campoZOOM == RESPONSAVEL){
    	$("#cpfbeneficiario").val("");
   	 	document.getElementById("ffxAdm").checked = false;	
   	 	document.getElementById("ffxOp").checked = false;
    }    
    else if (campoZOOM == RATEIO) {
    	//remove linhas de pagamento
        removeItens();
        /*
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);	
	        
	    }
	    */
    }
    else if (campoZOOM == PRODUTO) {	
    	$('#codigoProduto').val("");
    	    	
    }
    else if (linhaPagamento[0] == FONTE) {
 	   $('#' + CONTA + "___" + linhaPagamento[1]).val("");
    }
    
    else if (campoZOOM == EVENTO){
    	$("#carregaFinan").attr('checked', false);
    	$("#NcarregaFinan").attr('checked', false);
    	
    	$("#carregaFinan").prop("disabled", false);
		$("#NcarregaFinan").prop("disabled", false);
		window['rateioconfigurado'].clear();
        window['rateioconfigurado'].disable(false);
		
		//remove linhas de pagamento
        removeItens();

    }
}

function removeItens() {
    var linhas = $("#tbodyItens tr");
    for (var i = 1; i < linhas.length; i++) {
        var td = $(linhas[i]).children()[0];
        var span = $(td).children()[0];
        fnWdkRemoveChild(span);
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

function clickFinanceiroEvento(){	
	if (document.getElementById("carregaFinan").checked == true){
		buscaDadosFinanceiroEvento(codigoEvento);	
	}
	else {
		window['rateioconfigurado'].clear();
		window['rateioconfigurado'].disable(false);
		removeItens();
	
	}
	
	
}

function buscaDadosFinanceiroEvento(evento){
	   var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("solicitacao", evento, evento, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, constraints, null);

	    if (dataset.values[0]["rateioconfigurado"] != null && dataset.values[0]["rateioconfigurado"] != '') {
	    	//set codigo do rateio no campo zoom. Isso preencherá automaticamente as informações financeiras
	    	window["rateioconfigurado"].setValue(dataset.values[0]["rateioconfigurado"]);
	    }
	    
	    constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
	    dataset = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, constraints, null);

	    
	    if (dataset != null && dataset.values.length > 0) {
	        adicionaItem(dataset.values);
	    }
}


function adicionaItem(itens) {
	console.log(itens);
    for (var i in itens) {
        var indice = wdkAddChild("tableItens");

        window["txtcentrocusto___" + indice].setValue(itens[i].txtcentrocusto);

        if (itens[i].txtprojeto == null || itens[i].txtprojeto == "") {
            window["txtprojeto___" + indice].disable(true);
        } else {
            window["txtprojeto___" + indice].setValue(itens[i].txtprojeto);
        }

        window["txtatividade___" + indice].setValue(itens[i].txtatividade);

        if (itens[i].txtcategoria == null || itens[i].txtcategoria == "") {
            window["txtcategoria___" + indice].disable(true);
        } else {
            window["txtcategoria___" + indice].setValue(itens[i].txtcategoria);
        }

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

        $("#alocacao___" + indice).val(itens[i].alocacao);
        $("#localizacao___" + indice).val(itens[i].localizacao);
        $("#contacontabil___" + indice).val(itens[i].contacontabil);
        $("#percentual___" + indice).val(itens[i].percentual);
        $("#rateio___" + indice).val(itens[i].rateio);

        
   	 //bloqueia campos
       window["rateioconfigurado"].disable(true); 
       window["txtcentrocusto___" + indice].disable(true);       
       window["txtprojeto___" + indice].disable(true);
       window["txtatividade___" + indice].disable(true); 
       window["txtcategoria___" + indice].disable(true); 
       window["txtfontefinanciamento___" + indice].disable(true); 
       window["txtareaestrategica___" + indice].disable(true); 
     //$("#percentual___"+ indice).prop("disabled", true);
 
    }
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
        $("#contacontabil___" + indice).val(itens[i].CONTA);
        $("#percentual___" + indice).val(itens[i].PERCENTUAL);        
        $("#rateio___" + indice).val(itens[i].RATEIO);

        
    }

    
}


function justificativaValidacao(){
	
}


