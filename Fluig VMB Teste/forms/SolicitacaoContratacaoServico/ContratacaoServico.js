var ABERTURA = 0;
var SOLICITAR = 4;	
var APROVACAO_GESTOR =5;
var CORRIGIR = 142;
var REALIZAR_COTACAO_COMPRAS = 12;
var REALIZAR_COTACAO_HOSPITALIDADE = 22;
var ENVIAR_APROVACAO_COMPRAS = 209;
var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
var APROVACAO_SERVICO_COMPRAS = 105;
var APROVACAO_SERVICO_HOSPITALIDADE = 94;
var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
var VERIFICAR_APROVACAO_COMPRAS = 145;
var SOLICITACAO_CONTRATO_HOSPITALIDADE = 243;
var SOLICITACAO_CONTRATO_COMPRAS = 151;
var INTEGRAR_PROTHEUS_COMPRAS_COMPRAS = 212;
var INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE = 215;
var VALIDAR_RH = 161;
var VERIFICAR_ASSINATRA_HOSPITALIDADE = 270;
var VERIFICAR_ASSINATRA_COMPRAS = 274;

var linhas = 0;
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

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

var visibilidade = true;

var dtSolicitacao = FLUIGC.calendar('#dataSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA){
		dtSolicitacao.setDate(new Date().toLocaleString());
	
		var dataAtual = new Date();
		var dias = 3;
		// Incrementa a quantidade de dias na data atual:
		dataAtual.setDate(dataAtual.getDate() + dias);
	    //minDate: dataAtual
		
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
		
	
		   $("#dtFim").blur(function(){  
			   var dataInicio =  $("#dtInicio").val(); // 03/11/2019
               var arr = dataInicio.split("/").reverse();
               var dia = new Date(arr[0], arr[1] - 1, arr[2]);
                 
               var AnoFiscal;
                
               //MONTA AF FISCAL
               if (dia.getMonth() > 8){
            	   AnoFiscal = dia.getFullYear() + 1;
               }
               else {
            	   AnoFiscal = dia.getFullYear();
               }
               
               //DATA LIMITE
               var dtLimite = new Date (AnoFiscal,8,'30')
              // console.log(dtLimite);
               
               var data = this.value;
               var arrF = data.split("/").reverse();
               var diaFinal = new Date(arrF[0], arrF[1] - 1, arrF[2]);
             
              // console.log(diaFinal);
               
               if (diaFinal > dtLimite){
            	    FLUIGC.toast({
                        title: 'Informação',
                        message: 'O serviço contratado só podem ter sua vigência programada até o final do AF '+ AnoFiscal,
                        type: 'danger',
                        timeout: 6000
                    });
               }
	          });
		
	}
	else if (ATIVIDADE == CORRIGIR){
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
	else if (ATIVIDADE == REALIZAR_COTACAO_COMPRAS || ATIVIDADE == REALIZAR_COTACAO_HOSPITALIDADE){
		var dtCotacao = FLUIGC.calendar('#dtCotacao', {
		    pickDate: true,
		    pickTime: false
		});
		
		dtCotacao.setDate(new Date().toLocaleString());
	}
	else if (ATIVIDADE == INTEGRAR_PROTHEUS_COMPRAS_COMPRAS || ATIVIDADE == INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE){		
	   	 $("#valor").blur(function(){
	   		 $("#div_produto").show();
			 reloadZoomFilterValues("txtproduto", "FLUIG," + "11");
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
    
    
    else if (linhaPagamento[0] == SERVICO) {
    	$('#codigoProduto' + "___" + linhaPagamento[1]).val(selectedItem["CODIGO"]);
    	
    	
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
    		
    		//$("#juridica").prop("disabled", true);
    		//$("#fisica").prop("disabled", true);
    		
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
	    }
    
}


function adicionaLinhaProduto() {
	linhas = 0;	
	
	if (linhas == 0){
		var row = wdkAddChild('tableServico');
		
		var qtde = document.getElementById("idquantidade" + "___" + row);

		qtde.addEventListener("blur", function( event ) 	{			
			  var vl_unitario = $('#vrUnitario' + "___" + row).val();
			  var qtde = $('#idquantidade' + "___" + row).val()			  
			  $('#vrTotUnit___'+ row).val( vl_unitario * qtde  );			  
			  
			  
			}, true);
	
	}
	
    $("input[id^='idquantidade___']:last").blur(doFormTotal);
}

function doFormTotal() {
    var total = 0;  
    var mensal =0;
    
    

    
     $("input[id^='vrTotUnit___']").each(function() {
        if ($(this).val()) {
            total += parseFloat($(this).val()); 
        }
    });
     
     
     
     $("input[id^='vrUnitario___']").each(function() {
         if ($(this).val()) {
        	 mensal += parseFloat($(this).val()); 
         }
     });
    
    $("#CotacaovalorMensal").val(mensal);
     
    $("#CotacaovalorAnual").val(total);
    
  
  
}


function fnCustomDeleteProduto(oElement) {	  	
	if (ATIVIDADE == REALIZAR_COTACAO_COMPRAS || ATIVIDADE == REALIZAR_COTACAO_HOSPITALIDADE){								
		fnWdkRemoveChild(oElement);
		
		//reinicia variavel q controla quantidade de linhas permitidas de itens de produtos
		linhas = 0;
		fnWdkRemoveChild(oElement);
		doFormTotal();

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


function fnCustomDeleteRateio(oElement) {	  
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR || ATIVIDADE == CORRIGIR  || ATIVIDADE == APROVACAO_GESTOR || ATIVIDADE == REALIZAR_COTACAO_COMPRAS || ATIVIDADE == REALIZAR_COTACAO_HOSPITALIDADE){								
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
    var PRODUTO = "txtproduto";
    var ITEMRATEIO ="rateio";
    var CONTA = "contacontabil";
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
    

    
    else if (linhaPagamento[0] == PRODUTO) {   	
    		$('#codigoProduto' + "___" + linhaPagamento[1]).val("");    
    	
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
    	window[CONTRATO].disable(true);
		
    }
    
    else if (campoZOOM == CONTRATO){
    	$("#revisao").val("");
    	$("#dtInicioC").val("");
    	$("#dtFimC").val("");
    	$("#vlcontrato").val("");
    	$("#saldoAtual").val("");
    	$("#filial").val("");
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

function adicionaItem(itens) {
	//console.log(itens);
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
      // $("#percentual___"+ indice).prop("disabled", true);
 

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


  if (dataToString.getDate().toString().length == 1) {
      dia = dataToString.getDate();
      dia = "0" + dia.toString();

  } else {
      dia = dataToString.getDate();

  }
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

function removeItens() {
	

	    var linhas = $("#tbodyItens tr");
	    for (var i = 1; i < linhas.length; i++) {
	        var td = $(linhas[i]).children()[0];
	        var span = $(td).children()[0];
	        fnWdkRemoveChild(span);
	    }


}

/*

function calculaValores(){
	var dtInicio = convertStringToData($('#dtInicio').val());
	var dtFim = convertStringToData($('#dtFim').val());
	//var diferencaMeses  = moment.range(dtInicio, dtFim);
	
	if (document.getElementById("mensal").checked == true){
		if (document.getElementById("fixo").checked == true){
			
		//	log.info("CALCULO MESES");
	//		log.info(diferencaMeses.diff('months'));
			
			//Calcula quantos meses terá o contrato
			//multiplica a quantidade de meses pelo valor mensal para preencher o valor anual
			//O valor mensal será obrigatório e diferente de zero
			
		}
		else if (document.getElementById("demanda").checked == true){
			//Calcula quantos meses terá o contrato
			//O valor mensal deve ser zero
			//O valor anual será obrigatório e diferente de zero
			$('#valorMensal').val(0);
			
			
		}	
	}
	else if (document.getElementById("unico").checked == true){
	
	}
	
}
*/




