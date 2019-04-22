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

var dtNecessidade = FLUIGC.calendar('#dtNecessidade', {
    pickDate: true,
    pickTime: false,
    useCurrent: true, 
    minDate: new Date().toLocaleString()
    
});

var dtPagamento = FLUIGC.calendar('#dtPgto', {
    pickDate: true,
    pickTime: false,
    useCurrent: true, 
    minDate: new Date().toLocaleString()
    
});


function removedZoomItem(removedItem) {
    var CCUSTO = "centrocusto";
    var PROJETO = "projeto"


    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    if (campoZOOM == CCUSTO) {
        window[PROJETO].clear();
        reloadZoomFilterValues(PROJETO, "centro_custo," + null);
        window[PROJETO].disable(true);
       
   } 

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
  var CCUSTO = "centrocusto";
  var PROJETO = "projeto"
  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;

  //compara para verificar se o zoom é o campo centro de custo
  if (campoZOOM == CCUSTO) {
      //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
      window[PROJETO].clear();
      
	  	if (selectedItem["Codigo"] == '99990'){
	  	    window[PROJETO].disable(false);
	  	    reloadZoomFilterValues(PROJETO, "centro_custo," + selectedItem["Codigo"] );
	  	}
	  	else {
	  	  window[PROJETO].disable(true);
	    	reloadZoomFilterValues(PROJETO, "centro_custo," + null )
	  	}

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



