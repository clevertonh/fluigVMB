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
    var FORNECEDOR ="cgcFornecedor";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    if (campoZOOM == FORNECEDOR){
    	 $("#razaosocial").val("");
    	 $("#codigoFornecedor").val("");
    	 
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function setSelectedZoomItem(selectedItem) {
   var FORNECEDOR ="cgcFornecedor";

  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;
  
 if (campoZOOM == FORNECEDOR){
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




