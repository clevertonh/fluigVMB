var ABERTURA = 0;
var APROVACAO_GESTOR = 5;



var dtSolicitacao = FLUIGC.calendar('#dtSolicitacao', {
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
		
		
	}

	
});

var dtDesligamento = FLUIGC.calendar('#dtDesligamento', {
    pickDate: true,
    pickTime: false,
    useCurrent: true
    
});




function removedZoomItem(removedItem) {
    var TIPORESCISAO = "tiporescisao";
    var FUNCIONARIO ="Funcionario";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    if (campoZOOM == FUNCIONARIO){
    	 $("#cpffuncionario").val("");
    	 $("#filial").val("");
    	 $("#matricula").val("");
    	 
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
	var TIPORESCISAO = "tiporescisao";
    var FUNCIONARIO ="Funcionario";
  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;      
  if (campoZOOM == FUNCIONARIO){
	  $("#cpffuncionario").val(selectedItem["CPF"]);
	 // $("#filial").val(selectedItem["FILIAL"]);
	 // $("#matricula").val(selectedItem["MATRICULA"]);
  }

}




