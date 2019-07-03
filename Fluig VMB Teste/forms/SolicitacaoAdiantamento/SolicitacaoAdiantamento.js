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
    var PROJETO = "projeto";
    var FONTE = "fontefinanciamento";
    var FUNCIONARIO ="Funcionario";
    
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
    	 $("#cpfbeneficiario").val("");
    	 
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
  var CCUSTO = "centrocusto";
  var PROJETO = "projeto";
  var FONTE = "fontefinanciamento";
  var FUNCIONARIO ="Funcionario";
  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;
  console.log("campo zomm "+campoZOOM);
  
  //compara para verificar se o zoom é o campo centro de custo
  if (campoZOOM == CCUSTO) {
	  console.log("campo zoom " + CCUSTO);
      //LIMPA COLUNAS DE INFORMAÇÃO DE PAGAMENTO
      window[PROJETO].clear();
      window[FONTE].clear();
      window[FONTE].disable(true);
      
	  	if (selectedItem["CODIGO"] == '99990'){
	  	    window[PROJETO].disable(false);	  
	  	    window[FONTE].disable(true);
	  	    //reloadZoomFilterValues(PROJETO, "CENTRO_CUSTO," + selectedItem["CODIGO"] );
	  	     document.getElementById("div_projeto").style.display = "block";
	  		 document.getElementById("div_fonte").style.display = "block";
	  	}
	  	else {
	  		
	  		window[PROJETO].disable(true);
	  		window[FONTE].disable(true);
	    	//reloadZoomFilterValues(PROJETO, "CENTRO_CUSTO," + null )
	  	}

  } 
  else if (campoZOOM == PROJETO){
	  window[FONTE].clear();
	  window[FONTE].disable(false);
	  reloadZoomFilterValues(FONTE, "PROJETO," + selectedItem["CODIGO"]);
  }
  else if (campoZOOM == FUNCIONARIO){
	  $("#cpfbeneficiario").val(selectedItem["CPF"]);
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



