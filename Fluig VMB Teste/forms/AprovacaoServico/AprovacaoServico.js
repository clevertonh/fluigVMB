var ABERTURA = 0;
var SOLICITAR = 56;
var GERENTE_ADM =5;
var DIRETOR_FIN = 35;
var DIRETOR_RH = 11;
var DIRETOR_MINISTERIO = 13;
var DIRETOR_MKT = 15;
var DIRETOR_ADVOCACY = 18;
var DIRETOR_NACIONAL = 27;
	
var dtSolicitacao = FLUIGC.calendar('#dataSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});


//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR){
		dtSolicitacao.setDate(new Date().toLocaleString());
		
		var dtInicio = FLUIGC.calendar('#dtInicio', {
		    pickDate: true,
		    pickTime: false,
		    minDate: new Date().toLocaleString()
		    
		});
				
		var dtFim = FLUIGC.calendar('#dtFim', {
		    pickDate: true,
		    pickTime: false,
		    minDate: new Date().toLocaleString()
		});
		
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
  var EVENTO ="dataset_solicitacaoevento";
  var SERVICO ="txtproduto";
  var FORNECEDOR ="cnpjcpf";
 

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
  		evento = selectedItem["SOLICITACAO"];    		
  		document.getElementById("carregaFinan").click();  
  	}
  	else {
  		$("#carregaFinan").prop("disabled", false);
  		$("#NcarregaFinan").prop("disabled", false);
  	}
  }   
  else if (campoZOOM == SERVICO) {
    	$("#codigoProduto").val(selectedItem["CODIGO"]);
     	
  	
  }
  else if (campoZOOM == FORNECEDOR){
	    	$("#razaosocial").val(selectedItem["RAZAO_SOCIAL"]);    		
  		$("#nomefantasia").val(selectedItem["FANTASIA"]);  		
  		$("#codigoFornecedor").val(selectedItem["CODIGO"]);   
  		
  		
  	//	console.log(selectedItem["TIPO"]);
  		
  		if (selectedItem["TIPO"] == "JURIDICA"){ 
  		//	console.log(selectedItem["TIPO"]);
  			//$("#fisica").attr('checked', false);   	    	
      		document.getElementById("juridica").click();  
      	}
  		else if (selectedItem["TIPO"] == "FISICA"){
  			//$("#juridica").attr('checked', false);
  			document.getElementById("fisica").click();  
  		}
  		else if (selectedItem["TIPO"] == "FUNCIONARIO"){
  			//$("#juridica").attr('checked', false);
  			document.getElementById("fisica").click();  
  		}
  		
  		$("#juridica").prop("disabled", true);
  		$("#fisica").prop("disabled", true);
  		
  		$("#meioPagamento").val(selectedItem["FORM_PGTO"]);
  		$("#banco").val(selectedItem["BANCO"]);   
  		$("#agencia").val(selectedItem["AGENCIA"]);   
  		$("#contaFornecedor").val(selectedItem["CONTA_F"]);   
  		$("#tipoConta").val(selectedItem["TIPO_CONTA"]);   
  
  
  
  
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
    var CONTA = "contacontabil";
    var EVENTO ="dataset_solicitacaoevento";
    var FORNECEDOR ="cnpjcpf";
    
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
//      var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";

        $('#'+LOCALIZACAO+ "___" + linhaPagamento[1]).val("");
        $('#'+ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#'+ITEMRATEIO + "___" + linhaPagamento[1]).val("");

    }



    else if (campoZOOM == RATEIO) {
        //removeItensRateio();
    	console.log("---REMOVEU AQUI 6----");
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
    	$("#fisica").attr('checked', false);
    	$("#juridica").attr('checked', false);
    	$("#razaosocial").val("");  
		$("#nomefantasia").val("");  		
		$("#codigoFornecedor").val("");   	
		$("#meioPagamento").val("");
		$("#banco").val("");   
		$("#agencia").val("");   
		$("#contaFornecedor").val("");   
		$("#tipoConta").val("");   
    }
}