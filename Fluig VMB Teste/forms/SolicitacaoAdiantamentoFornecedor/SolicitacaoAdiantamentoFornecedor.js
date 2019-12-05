var ABERTURA = 0;
var APROVACAO_GESTOR = 5;
var TESOURARIA = 10;
var SOLICITANTE = 24;
var GERENTE_ADM = 31;
var DIRETOR_FINANCEIRO = 5;
var DIRETOR_RH = 48;
var DIRETOR_MINISTERIO = 50;
var DIRETOR_MKT = 52;
var DIRETOR_ADVOCACY = 54;
var DIRETOR_NACIONAL = 46;



//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA){
		var dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
		
		var dtNecessidade = FLUIGC.calendar('#dtNecessidade', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true, 
		    minDate: new Date().toLocaleString()
		    
		});
		
		
		//reloadZoomFilterValues("ds_get_Fornecedor", "TIPO," + "FUNCIONARIO");	
		
	}
	else if (ATIVIDADE == TESOURARIA || ATIVIDADE == SOLICITANTE){
		var dtEmissao = FLUIGC.calendar('#dtEmissao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true	,
		    minDate: new Date().toLocaleString(),
		});
	}

	
});


function removedZoomItem(removedItem) {
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
	    var EVENTO ="dataset_solicitacaoevento";
	    var FORNECEDOR ="cnpjcpf";
	    var CONTRATO = "Numerocontrato";
    
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
//	      var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";

	        $('#'+LOCALIZACAO+ "___" + linhaPagamento[1]).val("");
	        $('#'+ALOCACAO + "___" + linhaPagamento[1]).val("");
	        $('#'+ITEMRATEIO + "___" + linhaPagamento[1]).val("");

	    }



	    else if (campoZOOM == RATEIO) {
	        //removeItensRateio();
		    var linhas = $("#tbodyItens tr");
		    for (var i = 1; i < linhas.length; i++) {
		        var td = $(linhas[i]).children()[0];
		        var span = $(td).children()[0];
		        fnWdkRemoveChild(span);	
		        
		    }
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
	    else if (campoZOOM == FORNECEDOR){
	    	$("[name='tipoPessoa']").attr('checked', false);
	    	$("#razaosocial").val("");  
			$("#nomefantasia").val("");  		
			$("#codigoFornecedor").val("");   	
			$("#meioPagamento").val("");
			$("#banco").val("");   
			$("#agencia").val("");   
			$("#contaFornecedor").val("");   
			$("#tipoConta").val("");  
			$("#tipoPJ").val("");   
			$("#contatoEmpresa").val("");   
			window['condicaoPgto'].clear();
			$("#negociacao").val(""); 
			$("#valorAdiantado").val(0); 
			$("#CotacaovalorMensal").val(0); 
			$("#CotacaovalorAnual").val(0); 
			
			$("[name='formapgto']").attr('checked', false);
			$("[name='definicaoValor']").attr('checked', false);
			$("[name='origem']").attr('checked', false);
			$("[name='melhorProposta']").attr('checked', false);
			$("#justificativaP").val(""); 
		
			
			
			window[CONTRATO].clear();
			$("#revisao").val("");
	    	$("#dtInicioC").val("");
	    	$("#dtFimC").val("");
	    	$("#vlcontrato").val("");
	    	$("#saldoAtual").val("");
	    	$("#filial").val("");	
	    	$("#codigoFluig").val("");
	    	window[CONTRATO].disable(true);
	    	
	    	removeItens();
	    	
	    	window['rateioconfigurado'].clear();
	         window['rateioconfigurado'].disable(false);
			
	    }
	    
	    else if (campoZOOM == CONTRATO){
	    	$("#revisao").val("");
	    	$("#dtInicioC").val("");
	    	$("#dtFimC").val("");
	    	$("#vlcontrato").val("");
	    	$("#saldoAtual").val("");
	    	$("#filial").val("");
	    	$("#codigoFluig").val("");
	    	removeItens();
	    	
	    	window['rateioconfigurado'].clear();
	         window['rateioconfigurado'].disable(false);
	    	
	    	
	    }


}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

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
	    var EVENTO ="dataset_solicitacaoevento";
	    var FORNECEDOR ="cnpjcpf";
	    var CONTRATO = "Numerocontrato";
  
	    //Recebe o nome do campo zoom
	    var campoZOOM = selectedItem.inputId;

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
	    } 
	    else if (linhaPagamento[0] == PROJETO) {
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
	   
	    } 
	    else if (linhaPagamento[0] == ATIVIDADE) {
		        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
		        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

	    }
	    else if (linhaPagamento[0] == FONTE){
	    		$('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);	  
	    }
	    else if (campoZOOM == RATEIO) {    
				buscaItensRateio(selectedItem["CODIGO"]);
		
	    }    
	    else if (campoZOOM == EVENTO){    	
	    	if (selectedItem["FINANEVENTO"] == "sim"){
	    		codigoEvento = selectedItem["SOLICITACAO"];    		
	    		document.getElementById("carregaFinan").click();  

	    	}
	    	else {
	    		$("#carregaFinan").prop("disabled", false);
	    		$("#NcarregaFinan").prop("disabled", false);
	    	}
	    }
	    else if (campoZOOM == FORNECEDOR){
		    	$("#razaosocial").val(selectedItem["RAZAO_SOCIAL"]);    		
	    		$("#nomefantasia").val(selectedItem["FANTASIA"]);  		
	    		$("#codigoFornecedor").val(selectedItem["CODIGO"]);   
	    		
	    		if (selectedItem["TIPO"] == "JURIDICA"){ 
	   	
	        		document.getElementById("juridica").click();  
	        	}
	    		else if (selectedItem["TIPO"] == "FISICA"){
	    			document.getElementById("fisica").click();  
	    		}
	    		else if (selectedItem["TIPO"] == "FUNCIONARIO"){
	    			document.getElementById("fisica").click();  
	    		}
	    		
	    		$("#meioPagamento").val(selectedItem["FORM_PGTO"]);
	    		$("#banco").val(selectedItem["BANCO"]);   
	    		$("#agencia").val(selectedItem["AGENCIA"]);   
	    		$("#contaFornecedor").val(selectedItem["CONTA_F"]);   
	    		$("#tipoConta").val(selectedItem["TIPO_CONTA"].trim());  
	    		$("#tipoPJ").val(selectedItem["TIPO_PJ"].trim());   
	    
	    		reloadZoomFilterValues(CONTRATO, "CGC," + selectedItem["CNPJ"]);
	    		
	    		window[CONTRATO].disable(false);
	    
	    
	    }
	    
	    else if (campoZOOM == CONTRATO){
	    	$("#revisao").val(selectedItem["REVISAO"]);
	    	$("#dtInicioC").val(selectedItem["DT_INICIO"]);
	    	$("#dtFimC").val(selectedItem["DT_FIM"]);
	    	$("#vlcontrato").val(selectedItem["VALOR_TOTAL"]);
	    	$("#saldoAtual").val(selectedItem["SALDO"]);
	    	$("#filial").val(selectedItem["FILIAL"]);
	    	$("#codigoFluig").val(selectedItem["ID_FLUIG"]);
	    	
	    	//PEGA ID DO FLUIG E BUSCAR FORMULARIO
	    	 retornaSolicitacaoContratacaoServico(selectedItem["ID_FLUIG"]);
	    	 
	    	 
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



function retornaSolicitacaoContratacaoServico(codigoFluig){
	   var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("solicitacao", codigoFluig, codigoFluig, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_SolicitacaoContratacoesServico", null, constraints, null);


	    //VERIFICA SE FOI VINCULADO A UMA SOLICITAÇÃO DE EVENTO
	    if (dataset.values[0]["dataset_solicitacaoevento"] != null && dataset.values[0]["dataset_solicitacaoevento"] != ''){
	    	window["dataset_solicitacaoevento"].setValue(dataset.values[0]["dataset_solicitacaoevento"]);
	    	
	    	//VERIFICA SE O CAMPO DE DADOS FINANCEIRO DO EVENTO ESTA MARCADO COMO SIM
	    	if (dataset.values[0]["FinanEvento"]  == "sim"){	
	    		document.getElementById("carregaFinan").click();  
		    	//CHAMA FUNCAO DE EVENTO QUE PREENCHE OS ITENS FINANCEIRO
		    	buscaDadosFinanceiroEvento(dataset.values[0]["dataset_solicitacaoevento"]);

	    	}
	    	else {
	    		$("#carregaFinan").prop("disabled", false);
	    		$("#NcarregaFinan").prop("disabled", false);
	    	}
	    
	    	
	    }
	    else {
	    		if (dataset.values[0]["carregaCusto"] =="solicitacao"){
	    			 if (dataset.values[0]["rateioconfigurado"] != null && dataset.values[0]["rateioconfigurado"] != '') {
	    			    	//set codigo do rateio no campo zoom. Isso preencherá automaticamente as informações financeiras
	    			    	window["rateioconfigurado"].setValue(dataset.values[0]["rateioconfigurado"]);
	    			  }
	    			 
	    			 
	    			constraints = new Array();
	    		    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
	    		    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
	    		    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
	    		    dataset = DatasetFactory.getDataset("VM_SolicitacaoContratacoesServico", null, constraints, null);
	    		    
	    		    if (dataset != null && dataset.values.length > 0) {
	    		        adicionaItem(dataset.values);
	    		    }
	    		}
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
          //  $("#percentual___"+ indice).prop("disabled", true);
      
       
        
        
        

    }
}


function Calculapercentual(){
	 if ($('#vl_total').val() >0 && $('#vl_adiantado').val() > 0){
		 var vl_percentual = ($('#vl_adiantado').val() * 100 ) /  $('#vl_total').val();
		 $('#percentualAdto').val(vl_percentual);	 
	 }
}




