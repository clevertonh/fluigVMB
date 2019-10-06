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

var dtRetorno = FLUIGC.calendar('#dtRetorno', {
    pickDate: true,
    pickTime: false,
    useCurrent: true, 
    minDate: new Date().toLocaleString()
    
});

var dtViagem = FLUIGC.calendar('#dtViagem', {
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
    var VIAGEM = "dataset_solicitacaoviagem";
    
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
    
    else if (campoZOOM == VIAGEM){
		      $('#dtViagem').attr('readonly', false);
		   	  $('#dtRetorno').attr('readonly', false);
		   	  $('#itinerario').attr('readonly', false);
		      window[FUNCIONARIO].clear();		 
		   	  window[FUNCIONARIO].disable(false);
		   	  window[CCUSTO].clear();
		   	  window[PROJETO].clear();
		      window[FONTE].clear();      
		      $("#cpfbeneficiario").val("");
		      $("#dtViagem").val(null);
		      $("#dtRetorno").val(null);
		      $("#itinerario").val("");
		      $("textarea[name='finalidade']").val("");
		      
   	 
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
  var VIAGEM = "dataset_solicitacaoviagem";
  
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
  else if (campoZOOM == VIAGEM){
	  $("#cpfbeneficiario").val(selectedItem["CPF_BENEFICIARIO"]);
	  $("#itinerario").val(selectedItem["ITINERARIO"]);
	  $("#dtViagem").val(selectedItem["DT_VIAGEM"]);
	  $("#dtRetorno").val(selectedItem["DT_RETORNO"]);
	  $("textarea[name='finalidade']").val(selectedItem["FINALIDADE"]);
	  window[FUNCIONARIO].setValue(selectedItem["BENEFICIARIO"]);
	  
	  if (selectedItem["CENTRO_CUSTO"] != ''){
		  window[CCUSTO].setValue(selectedItem["CENTRO_CUSTO"]);  
	  }
	
	  
	  
	  
	  if (selectedItem["CENTRO_CUSTO"] == '99990'){
		  window[PROJETO].disable(false);	
		  window[FONTE].disable(false);
		  document.getElementById("div_projeto").style.display = "block";
	  	  document.getElementById("div_fonte").style.display = "block";
		  
		  window[PROJETO].setValue(selectedItem["PROJETO"]);
		  window[FONTE].setValue(selectedItem["FONTE_FINANCIAMENTO"]);
	  }
	  
	
	  $('#dtViagem').attr('readonly', true);
	  $('#dtRetorno').attr('readonly', true);
	  $('#itinerario').attr('readonly', true);
	  window[FUNCIONARIO].disable(true);
	  
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



