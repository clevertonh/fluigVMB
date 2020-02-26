var infoUser;
var ABERTURA = 0;
var INICIAR = 4;
var APROVACAO =5;
var CORRIGIR = 15;
var GERAR_SC = 42;

var linhas = 0;



var dtSolicitacao;
var codigoEvento;

/*
dataViagem = FLUIGC.calendar('#calendardtViagem',{
	pickDate: true,
    pickTime: false
    }).setDate($('#calendardtViagem :input').attr('value') != null ? $("#calendardtViagem :input").attr('value') : new Date());

*/
$(document).ready(function() {
	
    if (ATIVIDADE == ABERTURA) {        
    	dtSolicitacao = FLUIGC.calendar('#dataSolicitacao', {
            pickDate: true,
            pickTime: false,
            useCurrent: true
        });
        
    	dtSolicitacao.setDate(new Date().toLocaleString());
       	
    }

    else if (ATIVIDADE == GERAR_SC){
		document.getElementById("btn_add_item").style.display = "none";
		document.getElementById("btn_add_itemS").style.display = "none";
		
	}

});


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

function init() {
    $("input[id^='idquantidade___']:last").blur(doFormTotal);
}

function doFormTotal() {
    var total = 0;  
    
     $("input[id^='vrTotUnit___']").each(function() {
        if ($(this).val()) {
            total += parseFloat($(this).val()); 
        }
    });
     
    
    $("#vl_total").val(total);
    
 
   
  
}

function removeItens() {
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIAR || ATIVIDADE == APROVACAO || ATIVIDADE == CORRIGIR){
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);
	    }
	}

}


function fnCustomDeleteRateio(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == CORRIGIR	|| ATIVIDADE == INICIAR || ATIVIDADE == APROVACAO){								
		fnWdkRemoveChild(oElement);	
		

	}
	else {
		FLUIGC.toast({
            title: 'Atenção',
            message: 'Você não pode remover nenhuma linha do rateio.',
            type: 'warning',
            timeout: 3000
        });		
	}		
}

function fnCustomDeleteProduto(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == INICIAR || ATIVIDADE == APROVACAO || ATIVIDADE == CORRIGIR){								
		fnWdkRemoveChild(oElement);
		doFormTotal();
		//reinicia variavel q controla quantidade de linhas permitidas de itens de produtos
		linhas = 0;
		
	}
	else {
		FLUIGC.toast({
            title: 'Atenção',
            message: 'Você não pode remover nenhum produto.',
            type: 'warning',
            timeout: 3000
        });		
	}		
}

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
    var PRODUTO = "txtproduto";
    var EVENTO ="dataset_solicitacaoevento";
    var SOLICITACAO_ANTERIOR = "solicitacaocompraanterior";
      
   

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
       // $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

    } else if (linhaPagamento[0] == ATIVIDADE) {
    	//POR CAUSA DA EDIÇÃO
    	//PRIMEIRO PRECISO RECUPERAR O QUE ESTÁ NO CAMPO DO PROJETO
    	//reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
        
    	//window[AREAESTRATEGICA + "___" + linhaPagamento[1]].setValue(selectedItem["AREA_ESTRATEGICA"]);
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    }


  

    else if (campoZOOM == RATEIO) {    
    		buscaItensRateio(selectedItem["CODIGO"]);
    	
    }


    else if (linhaPagamento[0] == FONTE){
  	  		$('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
  	  
    }
 

    else if (linhaPagamento[0] == PRODUTO) {
	    	
	    	$('#codigoProduto' + "___" + linhaPagamento[1]).val(selectedItem["CODIGO"]);
	    	$('#idum' + "___" + linhaPagamento[1]).val(selectedItem["UNIDADE_MEDIDA"]);
	    	$('#vrUltima' + "___" + linhaPagamento[1]).val(parseFloat(selectedItem["ULTIMO_VALOR"]));
	    	$('#prazoFornecedor' + "___" + linhaPagamento[1]).val(parseFloat(selectedItem["PRAZO_FORNECEDOR"]));
	    	
    	
    }
    
    else if (campoZOOM == EVENTO){    	
	    	if (selectedItem["FINANEVENTO"] == "sim"){
	    		codigoEvento = selectedItem["SOLICITACAO"];    		
	    		document.getElementById("carregaFinan").click();  
	    		//$("#carregaFinan").prop("disabled", true);
	    		//$("#NcarregaFinan").prop("disabled", true);
	    	}
	    	else {
	    		$("#carregaFinan").prop("disabled", false);
	    		$("#NcarregaFinan").prop("disabled", false);
	    	}
    }
    else if (campoZOOM == SOLICITACAO_ANTERIOR) {
    		buscaSolicitacaoAnterior(selectedItem["SOLICITACAO"]);
    		
    		
    }
    
    
}

function adicionaLinha() {
    var indice = wdkAddChild('tableItens');
    window["txtprojeto___" + indice].disable(true);
    window["txtatividade___" + indice].disable(true);
    window["txtcategoria___" + indice].disable(true);
    window["txtfontefinanciamento___" + indice].disable(true);
    window["txtareaestrategica___" + indice].disable(true);
}

function adicionaLinhaProduto() {
		linhas = 0;	
				
		if (linhas == 0){		
			var row = wdkAddChild('tableCompras');
			
			linhas = linhas + row;	
			FLUIGC.calendar("#dtNecessidade___" + row, {
				pickDate: true,
				pickTime: false,    
			    minDate: new Date().toLocaleString()
				
			});
			
			//reloadZoomFilterValues("txtproduto" + "___" + row, "FLUIG," + "2");	
		
			var qtde = document.getElementById("idquantidade" + "___" + row);

			qtde.addEventListener("blur", function( event ) {			
				  var vl_ultimaCompra = $('#vrUltima' + "___" + row).val();
				  var qtde = $('#idquantidade' + "___" + row).val()	;		  
				  $('#vrTotUnit___'+ row).val( vl_ultimaCompra * qtde  );			  
				  				  
				}, true);
		
		}
		else {
	         FLUIGC.toast({
	  	        title: 'Atenção: ',
	  	        message: 'É recomendado a inclusão de um único item por solicitação, pois em caso de falta de saldo orçamentário a solicitação inteira será recusada.' ,
	  	        type: 'info'
	  	    }); 
		}
		
		
		if ($("#vl_total").val() > 100000){
		       FLUIGC.toast({
                   title: 'Atenção',
                   message: 'Sua solicitação superou o valor projeto de 100 mil reais. Conforme política nacional, sua solicitação de compra além das aprovações padrões, deverá ser aprovada pela Diretora Nacional.',
                   type: 'warning',
                   timeout: 4000
               });
		}
		
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
    var CONTA = "contacontabil";
    var EVENTO ="dataset_solicitacaoevento";
    var SOLICITACAO_ANTERIOR = "solicitacaocompraanterior";

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




    } else if (linhaPagamento[0] == PROJETO) {
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        $('#'+LOCALIZACAO+ "___" + linhaPagamento[1]).val("");
        $('#'+ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#'+ITEMRATEIO + "___" + linhaPagamento[1]).val("");

    } else if (linhaPagamento[0] == ATIVIDADE) {
 
        $('#'+LOCALIZACAO+ "___" + linhaPagamento[1]).val("");
        $('#'+ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#'+ITEMRATEIO + "___" + linhaPagamento[1]).val("");

    }



    else if (campoZOOM == RATEIO) {
      
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);	
	        
	    }
    }



    else if (linhaPagamento[0] == PRODUTO) {   	
     	$('#codigoProduto' + "___" + linhaPagamento[1]).val("");
    	$('#idum' + "___" + linhaPagamento[1]).val("");
    	$('#idquantidade' + "___" + linhaPagamento[1]).val("");
    	$('#vrUltima' + "___" + linhaPagamento[1]).val("");
    	$('#dtNecessidade' + "___" + linhaPagamento[1]).val("");
    	
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
    
    else if (campoZOOM == SOLICITACAO_ANTERIOR) {
		    	window['rateioconfigurado'].clear();
		        window['rateioconfigurado'].disable(false);
		    	var linhas = $("#tbodyItens tr");
		 	    for (var i = 1; i < linhas.length; i++) {
		 	        var td = $(linhas[i]).children()[0];
		 	        var span = $(td).children()[0];
		 	        fnWdkRemoveChild(span);	
		 	        
		 	    }
		
		 		var linhas2 = $("#tbodyCompras tr");
		 	    for (var i = 1; i < linhas2.length; i++) {
		 	        var td = $(linhas2[i]).children()[0];
		 	        var span = $(td).children()[0];
		 	        fnWdkRemoveChild(span);	
		 	        
		 	    }
		 	    
		 	    
    }



}

function setZoomData(instance, value) {
    window[instance].setValue(value);
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


function buscaSolicitacaoAnterior(solicitacao){
	   var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("solicitacao", solicitacao, solicitacao, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_SolicitacoesCompra", null, constraints, null);

	    
	    if (dataset.values[0]["dataset_solicitacaoevento"] != null && dataset.values[0]["dataset_solicitacaoevento"] != '') {
	    	//set codigo do rateio no campo zoom. Isso preencherá automaticamente as informações financeiras
	    	window["dataset_solicitacaoevento"].setValue(dataset.values[0]["dataset_solicitacaoevento"]);
	    }
	    
	    if (dataset.values[0]["rateioconfigurado"] != null && dataset.values[0]["rateioconfigurado"] != '') {
	    	//set codigo do rateio no campo zoom. Isso preencherá automaticamente as informações financeiras
	    	window["rateioconfigurado"].setValue(dataset.values[0]["rateioconfigurado"]);
	    }
	    
	    constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
	    dataset = DatasetFactory.getDataset("VM_SolicitacoesCompra", null, constraints, null);

	    
	    if (dataset != null && dataset.values.length > 0) {
	        adicionaItem(dataset.values);
	        
	        constraints = new Array();
	        constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
		    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
		    constraints.push(DatasetFactory.createConstraint("tablename", "tableCompras", "tableCompras", ConstraintType.MUST));
		    dataset = DatasetFactory.getDataset("VM_SolicitacoesCompra", null, constraints, null);
	        
		    if (dataset != null && dataset.values.length > 0) {
		    	  adicionaItemProduto(dataset.values);
		    }
	        
	    }
	        
}


function adicionaItem(itens) {

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

function adicionaItemProduto(itens) {

    for (var i in itens) {
        var indice = wdkAddChild("tableCompras");

        window["txtproduto___" + indice].setValue(itens[i].txtproduto);       
        $("#marca___" + indice).val(itens[i].marca);
        $("#idum___" + indice).val(itens[i].idum);
        $("#codigoProduto___" + indice).val(itens[i].codigoProduto);
        
        var dataset;
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("CODIGO", itens[i].codigoProduto, itens[i].codigoProduto, ConstraintType.MUST));
	    dataset = DatasetFactory.getDataset("VM_Produtos", null, constraints, null);	    
        
	        
	    
	    var qtde = document.getElementById("idquantidade" + "___" + indice);

		qtde.addEventListener("blur", function( event ) {			
			  var vl_ultimaCompra = $('#vrUltima' + "___" + indice).val();
			  var qtde = $('#idquantidade' + "___" + indice).val()			  
			  $('#vrTotUnit___'+ indice).val( vl_ultimaCompra * qtde  );			  
			  
			  
			}, true);

		
		FLUIGC.calendar("#dtNecessidade___" + indice, {
			pickDate: true,
			pickTime: false,    
		    minDate: new Date().toLocaleString()
			
		});
		
	    
	    $("#vrUltima___" + indice).val(parseFloat(dataset.values[0]["ULTIMO_VALOR"]));
	    $("#prazoFornecedor___" + indice).val(parseFloat(dataset.values[0]["PRAZO_FORNECEDOR"]));
        
        
        

    }
}

//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}

//recebe data JS e convert para data FLuig
function convertDataToString(dataToString) {
    var dia;

    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
    var mes = dataToString.getMonth() + 1;

    console.log("MES: " + mes);

    if (dataToString.getDate().toString().length == 1) {
        dia = dataToString.getDate();
        dia = "0" + dia.toString();

    } else {
        dia = dataToString.getDate();

    }

    console.log("TAMANHO MES: " + mes.toString().length);
    //converte mes
    if (mes.toString().length == 1) {
        mes = "0" + mes.toString();

    }
    //else {mes = dataToString.getMonth() + 1;}


    //novo formato de data: para salvar em campos data do Fluig
    return dia + "/" + mes + "/" + dataToString.getFullYear();


}

function addDias(data, dias) {
    return new Date(data.setDate(data.getDate() + dias));;

}

function addMeses(data, meses) {
    return new Date(data.setMonth(data.getMonth() + meses));

}

function addAnos(data, anos) {
    return new Date(data.setYear(data.getFullYear() + anos));

}

//carrega itens do rateio para informações de pagamento
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
        $("#contacontabil___" + indice).val(itens[i].CONTA);
        $("#percentual___" + indice).val(itens[i].PERCENTUAL);      
        $("#rateio___" + indice).val(itens[i].RATEIO);

        
    }
    
    
}

function getAprovadorGerenteDiretorArea(){
	var gerente = $("#emailLider").val(); 
	var diretorArea = $("#emailNivel2").val();
	
	if ( gerente == diretorArea) {
		if (document.getElementById("aprovacao").checked == true){
		    document.getElementById("aprNivel2S").click();		   
		}
	}
	
	
}

function getAprovadorDiretorAreaDiretorDN(){
	var diretorArea = $("#emailNivel2").val();
	var diretorDN = $("#emailNivel3").val();
	
	if ( diretorArea == diretorDN) {
		if (document.getElementById("aprNivel2S").checked == true){
		    document.getElementById("aprNivel3S").click();		   
		}
	}
	
}




