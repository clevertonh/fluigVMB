var ABERTURA = 0;
var APROVACAO_GESTOR = 5;


var dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});

/*
var dtVencimento = FLUIGC.calendar('#dtVencimento', {
    pickDate: true,
    pickTime: true,
    minDate: new Date().toLocaleString(),
});

*/

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {
	
	if (ATIVIDADE == ABERTURA){
		dtSolicitacao.setDate(new Date().toLocaleString());
		
	}

	
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
        $("#rateio___" + indice).val(itens[i].rateio);

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
    var ITEMRATEIO ="rateio";
    var CONTA = "contacontabil";


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
        $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
        $('#' + ITEMRATEIO + "___" + linhaPagamento[1]).val("");
        $('#' + CONTA + "___" + linhaPagamento[1]).val("");
        
        //limpa filtro
        //reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        //reloadZoomFilterValues(PROJETO + "___" + linhaPagamento[1], "Centro_Custo," + null);
        //reloadZoomFilterValues(CATEGORIA + "___" + linhaPagamento[1], "Centro_Custo," + null);
        //reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "Centro_Custo," + null);
        //reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "Centro_Custo," + null);


        window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);
        window[PROJETO + "___" + linhaPagamento[1]].disable(true);
        window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
        window[FONTE + "___" + linhaPagamento[1]].disable(true);
        window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);




    } else if (linhaPagamento[0] == PROJETO) {

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
      window[CATEGORIA + "___" + linhaPagamento[1]].clear();
      window[FONTE + "___" + linhaPagamento[1]].clear();
      window[AREAESTRATEGICA + "___" + linhaPagamento[1]].clear();
      $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val("");
      $('#' + ALOCACAO + "___" + linhaPagamento[1]).val("");
      $('#' + CONTA + "___" + linhaPagamento[1]).val("");

      if (selectedItem["CODIGO"] != '99990') {

          console.log(selectedItem["Codigo"]);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(false);
          reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);

      } 
      else {
          //desabilita zoom que não devem ser preenchidos
          console.log(selectedItem["CODIGO"]);
          window[PROJETO + "___" + linhaPagamento[1]].disable(false);
          window[ATIVIDADE + "___" + linhaPagamento[1]].disable(true);

      }

      window[CATEGORIA + "___" + linhaPagamento[1]].disable(true);
      window[FONTE + "___" + linhaPagamento[1]].disable(true);
      window[AREAESTRATEGICA + "___" + linhaPagamento[1]].disable(true);


  } 
  else if (linhaPagamento[0] == PROJETO) {

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

      //ENVIA VALOR DE PROJETO COMO FILTRO PARA OS CAMPOS
      reloadZoomFilterValues(ATIVIDADE + "___" + linhaPagamento[1], "CENTRO_CUSTO," + selectedItem["CODIGO"]);
      reloadZoomFilterValues(FONTE + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
      reloadZoomFilterValues(AREAESTRATEGICA + "___" + linhaPagamento[1], "PROJETO," + selectedItem["CODIGO"]);
     // $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);

  } 
  else if (linhaPagamento[0] == ATIVIDADE) {
      $('#' + LOCALIZACAO + "___" + linhaPagamento[1]).val(selectedItem["LOCALIZACAO"]);
      $('#' + ALOCACAO + "___" + linhaPagamento[1]).val(selectedItem["ALOCACAO"]);

  }


 
  
  else if (campoZOOM == RATEIO) {    
  	console.log("---ENTROU AQUI 9 ----");
  	buscaItensRateio(selectedItem["CODIGO"]);
  	
  }
  
  else if (linhaPagamento[0] == FONTE){
	  $('#' + CONTA + "___" + linhaPagamento[1]).val(selectedItem["CONTA"]);
  }

 

  
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
        
        //precisa trocar o ponto por virgula
        //$("#percentual___" + indice).val(itens[i].Percentual);
        
        $("#rateio___" + indice).val(itens[i].RATEIO);

    }
}