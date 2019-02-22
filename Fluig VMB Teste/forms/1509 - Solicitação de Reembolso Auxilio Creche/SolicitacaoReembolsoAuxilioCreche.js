var ABERTURA = 0;
var APROVACAO_GESTOR = 5;
var VALIDACAO = 48;
var APROVACAO_RH = 27;



var dtSolicitacao;



//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA){
		dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
		    pickDate: true,
		    pickTime: false,
		    useCurrent: true,
		    minDate: new Date().toLocaleString(),
		    maxDate: new Date().toLocaleString()
		});
		
		dtSolicitacao.setDate(new Date().toLocaleString());
		
	}

	
});

var dtPagamento = FLUIGC.calendar('#dtPagamento', {
    pickDate: true,
    pickTime: false,
    useCurrent: true, 
    minDate: new Date().toLocaleString()
    
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
    var FUNCIONARIO = "Funcionario";


    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;

    //separa string para campos filho
    var linhaPagamento = campoZOOM.split('___');
    console.log("Retornando resultado removedZoomItem");
    console.log(removedItem);


    if (linhaPagamento[0] == CCUSTO) {
        //limpa todos os campos           
        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[PROJETO + "___" + linhaPagamento[1]].clear();
        window[CATEGORIA + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";

        //limpa filtro
        reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(CATEGORIA + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Centro_Custo," + null);


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } else if (linhaPagamento[0] == PROJETO) {

        window[ATIVIDADE + "___" + linhaPagamento[1]].clear();
        window[FONTE + "___" + linhaPagamento[1]].clear();
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";


    } else if (linhaPagamento[0] == ATIVIDADE) {

        var loc = document.getElementById(LOCALIZACAO + "___" + linhaPagamento[1]).value = "";
        var aloc = document.getElementById(ALOCACAO + "___" + linhaPagamento[1]).value = "";


    }


    //GRAVA CODIGO DO RATEIO EM CAMPO OCULTO 
    if (campoZOOM == RATEIO) {
        removeItens();
        $("#codigorateio").val('');
        	
    }
    
    if (campoZOOM == FUNCIONARIO){
    	 $("#cpfbeneficiario").val("");
    }
        
  
}

function setZoomData(instance, value) {
    window[instance].setValue(value);
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
  var FUNCIONARIO = "Funcionario";



  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;

  //como o campo é retornado: centrocusto___1 onde 1 dependerá da linha	
  //separa string
  var linhaPagamento = campoZOOM.split('___');


  console.log("---IDENTIFICANDO CAMPO ZOOM FILHOS-------");
  console.log(linhaPagamento[0]);
  console.log(linhaPagamento[1]);
  
  console.log("Retornando resultado selectedItem");  
  console.log(selectedItem);

  

  
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

      if (selectedItem["Codigo"] != '99990') {

          console.log(selectedItem["Codigo"]);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
          reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);

      } 
      else {
          //desabilita zoom que não devem ser preenchidos
          console.log(selectedItem["Codigo"]);
          window[PROJETO + "___" + linhaPagamento[1]].disable(false);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

      }

      window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
      window[FONTE + "___" + linhaPagamento[1]].disable(true);
      window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


  } 
  else if (linhaPagamento[0] == PROJETO) {

      console.log("------PROJETO--------");
      console.log(selectedItem["Codigo"]);

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

      //ENVIA VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
      reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + selectedItem["Codigo"]);
      reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);
      reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Projeto," + selectedItem["Codigo"]);
      $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["Conta"]);

  } 
  else if (linhaPagamento[0] == ATIVIDADE) {
      $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["Localizacao"]);
      $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["Alocacao"]);

  }
  
  else if (campoZOOM == FUNCIONARIO ){	 	  
		 console.log(selectedItem["CPF"]);
	  	 $("#cpfbeneficiario").val(selectedItem["CPF"]);
	  	 
	  }


 
  //GRAVA CODIGO DO RATEIO EM CAMPO OCULTO 
  if (campoZOOM == RATEIO) {
      removeItens();
      $("#codigorateio").val(selectedItem["Codigo"]);

  }

  

      
  
}

function justificativaValidacao(){
	if (document.getElementById("validacao").checked == true){
		document.getElementById("justificativaReprovacaoV").style.display = "none";
	}
	else {
		document.getElementById("justificativaReprovacaoV").style.display = "block";	
	}
	
}

function justificativaReprovacao(){
	if (document.getElementById("aprovacao").checked == true || document.getElementById("devolver").checked == true ){
		document.getElementById("justificativaR").style.display = "none";
	}
	else {
		document.getElementById("justificativaR").style.display = "block";	
	}
	
}



