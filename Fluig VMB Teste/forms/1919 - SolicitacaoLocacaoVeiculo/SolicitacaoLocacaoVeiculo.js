var infoUser;
var ABERTURA = 0;
var SOLICITAR = 4;
var APROVACAO =5;
var CORRIGIR = 39;
var COTAR = 47;
var VALIDAR_RH = 55;
var SOLICITAR_APROVACAO = 59;
var APROVACAO_SERVICO = 61;
var SOLICITAR_CONTRATO = 65;
var SOLICITACAO_CONTRATO = 77;
var VERIFICAR_ASSINATURA = 79;
var FINALIZAR = 83;

var dtSolicitacao;
var dtRetirada;
var dtDevolucao;
var dtValidade;
var codigoEvento;


$(document).ready(function() {	
	//filtrar apenas produtos marcados para locação de veículo - não esta funcionando
	//var intervalo = setInterval(function(){	clearInterval(intervalo); reloadZoomFilterValues("txtproduto", "FLUIG," + "6"); },1000);
			
    if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR || ATIVIDADE == CORRIGIR) {        
    	dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
            pickDate: true,
            pickTime: false,
            useCurrent: true
        });
        
    	dtSolicitacao.setDate(new Date().toLocaleString());
     
    	dtRetirada = FLUIGC.calendar('#dtRetirada', {
            pickDate: true,
            pickTime: true,
            useCurrent: true
            , minDate: new Date().toLocaleString()
        });
    	
    	dtDevolucao = FLUIGC.calendar('#dtDevolucao', {
            pickDate: true,
            pickTime: true,
            useCurrent: true,
            minDate: new Date().toLocaleString()
        });

    	dtValidade = FLUIGC.calendar('#dtValidade', {
            pickDate: true,
            pickTime: false,
            useCurrent: true,
            minDate: new Date().toLocaleString()
        });
    
    	

    	
    	
    }

    else if (ATIVIDADE == COTAR){
		    	var dtCotacao = FLUIGC.calendar('#dtCotacao', {
				    pickDate: true,
				    pickTime: false
				});
				
				dtCotacao.setDate(new Date().toLocaleString());
				
			   	 $("#CotacaovalorMensal").blur(function(){
			   		 var total = $("#quantidade").val()* $("#CotacaovalorMensal").val();
			   		 $("#cotacaovalorTotal").val(total);
					 
			     }); 
      
    }
    else if (ATIVIDADE == FINALIZAR){
			  	var dtVencimento = FLUIGC.calendar('#dtVencimento', {
		            pickDate: true,
		            pickTime: false,
		            useCurrent: true,
		            minDate: new Date().toLocaleString()
		        });
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

function removeItens() {
	
	if (ATIVIDADE == ABERTURA  ){
	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);
	    }
	}

}

function fnCustomDeleteRateio(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR	|| ATIVIDADE == CORRIGIR || ATIVIDADE == APROVACAO){								
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

function fnCustomDeleteCondutor(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR	|| ATIVIDADE == CORRIGIR || ATIVIDADE == APROVACAO){								
		fnWdkRemoveChild(oElement);	

	}
	else {
		FLUIGC.toast({
            title: 'Atenção',
            message: 'Você não pode remover o condutor.',
            type: 'warning',
            timeout: 3000
        });		
	}		
}

function clickTrocaCondutor(){
	 
	if (document.getElementById("trocaNao").checked == true && document.getElementById("renovacaoN").checked == true){
		 window['dataset_solicitacaolocacao'].clear();
         document.getElementById("div_solicitacaoAnterior").style.display = "none";
         window['rateioconfigurado'].disable(false); 
 		 window['rateioconfigurado'].clear();
 		 
 		 $("#NcarregaFinan").val("");
 		 $("#carregaFinan").val("");
 		document.getElementById("NcarregaFinan").checked = false;
 		document.getElementById("carregaFinan").checked = false;
 		apagaLocacaoAnterior();
	}
	if (document.getElementById("trocaSim").checked == true){
		window['dataset_solicitacaolocacao'].disable(false);			
		document.getElementById("dataset_solicitacaolocacao").style.display = "block";
        document.getElementById("div_solicitacaoAnterior").style.display = "block";
	}
	
	
	
}

function clickRenovacao(){
	 
	if (document.getElementById("renovacaoN").checked == true && document.getElementById("trocaNao").checked == true){
		 window['dataset_solicitacaolocacao'].clear();
         document.getElementById("div_solicitacaoAnterior").style.display = "none";
         window['rateioconfigurado'].disable(false); 
 		 window['rateioconfigurado'].clear();
 		 
 		 $("#NcarregaFinan").val("");
 		 $("#carregaFinan").val("");
 		document.getElementById("NcarregaFinan").checked = false;
 		document.getElementById("carregaFinan").checked = false;
 		apagaLocacaoAnterior();
        
	}
	
	if (document.getElementById("renovacaoS").checked == true) {		
		window['dataset_solicitacaolocacao'].disable(false);			
		document.getElementById("dataset_solicitacaolocacao").style.display = "block";
        document.getElementById("div_solicitacaoAnterior").style.display = "block";
	}
	
}

function clickAprovacao(){
	//falta codigo para ocultar e exibir campo de justificativa por reprovação
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
    var TIPO_VEICULO = "txtproduto";
    var EVENTO = "dataset_solicitacaoevento";
    var LOCACAO_ANTERIOR ="dataset_solicitacaolocacao"; 
    var FORNECEDOR ="cnpjcpf";
    var CONTRATO = "Numerocontrato";

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;

    //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
    //separa string
    var linhaPagamento = campoZOOM.split('___');

    console.log(campoZOOM);
    console.log(selectedItem["CODIGO"]);

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
	
	        } 
	        else {
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
       // $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

    } 
    else if (linhaPagamento[0] == ATIVIDADE) {
    	//POR CAUSA DA EDIÇÃO
    	//PRIMEIRO PRECISO RECUPERAR O QUE ESTÁ NO CAMPO DO PROJETO
    	//reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
        
    	//window[AREAESTRATEGICA + "___" + linhaPagamento[1]].setValue(selectedItem["AREA_ESTRATEGICA"]);
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

    }
    else if (campoZOOM == RATEIO) {
    	removeItens();
    	console.log("---ENTROU AQUI 9 ----");
    	buscaItensRateio(selectedItem["CODIGO"]);
    	
    }
    else if (linhaPagamento[0] == FONTE){
    			$('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
  	  
    }
     else if (campoZOOM == TIPO_VEICULO) {
		    	$('#codigoProduto').val(selectedItem["CODIGO"]);
		    	    		
    }   
    else if (campoZOOM == EVENTO){    
    	removeItens();
    	
    	if (selectedItem["FINANEVENTO"] == "sim"){    		
	    	codigoEvento = selectedItem["SOLICITACAO"];    		    		    		
	    	document.getElementById("carregaFinan").click();  	    		
	    	$("#carregaFinan").attr('checked', 'checked');	 

	    }
	    else {
	    	$("#NcarregaFinan").attr('checked', 'checked');	
	    	$("#carregaFinan").prop("disabled", false);
	    	$("#NcarregaFinan").prop("disabled", false);
	    }
    }
    else if (campoZOOM == LOCACAO_ANTERIOR){	
    		removeItens();
    		//$("#localRetirada").prop("disabled", true);
    		
    		if (selectedItem["FINANEVENTO"] == "sim"){    		 	    
    	    	codigoEvento = selectedItem["SOLICITACAO"];    		    		    		
    	    	$("#carregaFinan").attr('checked', 'checked');	 
    	    	//document.getElementById("carregaFinan").click(); 
    	    	
    	    

    	    }
    	    else {
    	    	$("#NcarregaFinan").attr('checked', 'checked');	
    	    	$("#carregaFinan").prop("disabled", false);
    	    	$("#NcarregaFinan").prop("disabled", false);
    
    	    }
    		
    		//preenche informações de pagamento
    		buscaDadosLocacaoAnterior(selectedItem);
	    	
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
		$("#tipoConta").val(selectedItem["TIPO_CONTA"]);  
		$("#tipoPJ").val(selectedItem["TIPO_PJ"]);   
		
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
    	//retornaSolicitacaoContratacaoServico(selectedItem["ID_FLUIG"]);
      	
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

function buscaDadosLocacaoAnterior(item){
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("solicitacao", item.SOLICITACAO, item.SOLICITACAO, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculo", null, constraints, null);
   
    
    if (dataset.values[0]["dataset_solicitacaoevento"] != null && dataset.values[0]["dataset_solicitacaoevento"] != '') {
    	//set codigo do evento no campo zoom. Isso preencherá automaticamente as informações
    	window["dataset_solicitacaoevento"].setValue(dataset.values[0]["dataset_solicitacaoevento"]);
    	
    }
    
    
    if (dataset.values[0]["rateioconfigurado"] != null && dataset.values[0]["rateioconfigurado"] != '') {
    	//set codigo do rateio no campo zoom. Isso preencherá automaticamente as informações financeiras
    	window["rateioconfigurado"].setValue(dataset.values[0]["rateioconfigurado"]);
    }
    
    
   // $("#localRetirada").val(dataset.values[0]["localRetirada"]);
    $("#dtRetirada").val(dataset.values[0]["dtDevolucao"]);
   // $("#localDevolucao").val(dataset.values[0]["localDevolucao"]);
  //  $("#dtDevolucao").val(dataset.values[0]["dtDevolucao"]);   
    $("#marca").val(dataset.values[0]["marca"]);
    $("#modelo").val(dataset.values[0]["modelo"]);
    $("#capacidade").val(dataset.values[0]["capacidade"]);
    $("#nomeCondutor").val(dataset.values[0]["nomeCondutor"]);
    
    //NAO ESTA SALVANDO ESSE CAMPO NAO SEI PORQUE. ELE MOSTRA NO BROWSE COMO SE FOSSE CARTAO DE CREDITO
    $("#cnh").val(dataset.values[0]["cnh"]);
    
    $("#dtValidade").val(dataset.values[0]["dtValidade"]);
      
    constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#version", dataset.values[0]["metadata#version"], dataset.values[0]["metadata#version"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("metadata#id", dataset.values[0]["metadata#id"], dataset.values[0]["metadata#id"], ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("tablename", "tableItens", "tableItens", ConstraintType.MUST));
    dataset = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculo", null, constraints, null);

    
    if (dataset != null && dataset.values.length > 0) {
        adicionaItem(dataset.values);
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

function adicionaCondutor() {
    var indice = wdkAddChild('tableCondutor');
        
    FLUIGC.toast({
        title: 'Atenção',
        message: 'Condutores com habilitação vencida, habilitação provisória e sem habilitação não podem conduzir veículos.',
        type: 'warning',
        timeout: 6000
    });
    
    
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
    var TIPO_VEICULO = "txtproduto";
    var PRODUTO ="codigoProduto";
    var CONTA = "contacontabil";
    var EVENTO ="dataset_solicitacaoevento";
    var LOCACAO_ANTERIOR ="dataset_solicitacaolocacao"
   	var FORNECEDOR ="cnpjcpf";
    var CONTRATO = "Numerocontrato";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
 
    if (linhaPagamento[0] == CCUSTO) {
    	console.log("---REMOVEU AQUI 1----");
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
    	console.log("---REMOVEU AQUI 2----");
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
        removeItens();
    
    }


    
    else if (linhaPagamento[0] == FONTE) {
  	   $('#' + CONTA + "___" + linhaPagamento[1]).val("");
     }
    
    else if (campoZOOM == EVENTO){
    		$("[name='finanEvento']").attr('checked', false);
	    //	$("#carregaFinan").prop("disabled", false);
		//	$("#NcarregaFinan").prop("disabled", false);
			window['rateioconfigurado'].clear();
	        window['rateioconfigurado'].disable(false);
			
			//remove linhas de pagamento
	        removeItens();

    }
    
    else if (campoZOOM == TIPO_VEICULO) {
    	$('#codigoProduto').val("");
    	 reloadZoomFilterValues("txtproduto", "FLUIG," + "6");
    	    		
    } 
    
    
    else if (campoZOOM == LOCACAO_ANTERIOR){
    			apagaLocacaoAnterior();
       

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
		$("[name='formapgto']").attr('checked', false);
		$("[name='definicaoValor']").attr('checked', false);
		$("[name='origem']").attr('checked', false);
		$("[name='melhorProposta']").attr('checked', false);
		$("#justificativaP").val(""); 
		$("#competencia").val(""); 
		$("#Anocompetencia").val(""); 
		
		
		window[CONTRATO].clear();
		$("#revisao").val("");
    	$("#dtInicioC").val("");
    	$("#dtFimC").val("");
    	$("#vlcontrato").val("");
    	$("#saldoAtual").val("");
    	$("#filial").val("");
    	$("#codigoFluig").val("");  	
    	window[CONTRATO].disable(true);

		
    }
    else if (campoZOOM == CONTRATO){
    	$("#revisao").val("");
    	$("#dtInicioC").val("");
    	$("#dtFimC").val("");
    	$("#vlcontrato").val("");
    	$("#saldoAtual").val("");
    	$("#filial").val("");
    	$("#codigoFluig").val("");
      	
     }

}

function apagaLocacaoAnterior(){
	//remove linhas de pagamento
    removeItens();
    
    $("#localRetirada").prop('disable',false);
   
    dtRetirada.setDate(null);
    $("#localDevolucao").val("");
    dtDevolucao.setDate(null);  
    $("#marca").val("")
    $("#modelo").val("")
    $("#capacidade").val("")
    $("#nomeCondutor").val("");
    $("#cnh").val("");
    
    dtValidade.setDate(null); 
 
}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function clickFinanceiroEvento(){	
	removeItens();
	if (document.getElementById("carregaFinan").checked == true){
		buscaDadosFinanceiroEvento(codigoEvento);	
	}
	else {
		window['rateioconfigurado'].clear();
		window['rateioconfigurado'].disable(false);
		
	}
	
	
}

function buscaDadosFinanceiroEvento(evento){
	   var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("solicitacao", evento, evento, ConstraintType.MUST));
	    var dataset = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, constraints, null);

	    console.dir(dataset);
	    
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
	//nsole.log(itens);
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





