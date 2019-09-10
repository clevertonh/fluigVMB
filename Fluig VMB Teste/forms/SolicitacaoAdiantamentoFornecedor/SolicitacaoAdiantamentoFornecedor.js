var ABERTURA = 0;
var APROVACAO_GESTOR = 5;
var TESOURARIA = 10;
var SOLICITANTE = 24;



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
    var CCUSTO = "centrocusto";
    var PROJETO = "projeto";
    var FONTE = "fontefinanciamento";
    var FUNCIONARIO ="cgcFornecedor";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    if (campoZOOM == CCUSTO) {
        window[PROJETO].clear();
        window[FONTE].clear();
        window[PROJETO].disable(true);
        window[FONTE].disable(true);
       
   } 
    else if (campoZOOM == PROJETO){
    	 window[FONTE].clear();
    	 window[FONTE].disable(true);
    }
    else if (campoZOOM == FUNCIONARIO){
    	 $("#razaosocial").val("");
    	 $("#codigoFornecedor").val("");
    	 
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function setSelectedZoomItem(selectedItem) {
  var CCUSTO = "centrocusto";
  var PROJETO = "projeto";
  var FONTE = "fontefinanciamento";
  var FUNCIONARIO ="cgcFornecedor";

  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;
  
  //compara para verificar se o zoom é o campo centro de custo
  if (campoZOOM == CCUSTO) {
      //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
      window[PROJETO].clear();
      window[FONTE].clear();
      window[FONTE].disable(true);
      
	  	if (selectedItem["CODIGO"] == '99990'){
	  	    window[PROJETO].disable(false);	  
	  	    window[FONTE].disable(true);
	  	     document.getElementById("div_projeto").style.display = "block";
	  		 document.getElementById("div_fonte").style.display = "block";
	  	}
	  	else {
	  		
	  		window[PROJETO].disable(true);
	  		window[FONTE].disable(true);
	    
	  	}

  } 
  else if (campoZOOM == PROJETO){
	  window[FONTE].clear();
	  window[FONTE].disable(false);
	  reloadZoomFilterValues(FONTE, "PROJETO," + selectedItem["CODIGO"]);
  }
  else if (campoZOOM == FUNCIONARIO){
	  $("#razaosocial").val(selectedItem["RAZAO_SOCIAL"]);
	  $("#codigoFornecedor").val(selectedItem["CODIGO"]);
	  
  }


}

function Calculapercentual(){
	 if ($('#vl_total').val() >0 && $('#vl_adiantado').val() > 0){
		 var vl_percentual = ($('#vl_adiantado').val() * 100 ) /  $('#vl_total').val();
		 $('#percentual').val(vl_percentual);	 
	 }
}




