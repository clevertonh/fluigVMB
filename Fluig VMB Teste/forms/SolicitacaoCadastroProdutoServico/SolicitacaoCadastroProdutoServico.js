var ABERTURA = 0;
var VALIDAR = 5;
var DADOS_CONTABEIS = 10;
var CORRIGIR = 16;


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
		
		
	}	
});


function produtoExistente(){
		if (document.getElementById("produtoExisteS").checked == true){
			  document.getElementById("div_compras2").style.display = "none";
			  document.getElementById("div_produto").style.display = "block";
				document.getElementById("div_produto2").style.display = "block";
				
				if(document.getElementById("tipoproduto").checked == true){
					reloadZoomFilterValues("txtproduto", "FLUIG," + "2");	
				}
				else if (document.getElementById("tiposervico").checked == true){
					reloadZoomFilterValues("txtproduto", "FLUIG," + "11");	
				}
				
				
		}
		else if (document.getElementById("produtoExisteN").checked == true){
			document.getElementById("div_compras2").style.display = "block";
			
			document.getElementById("div_produto").style.display = "none";
			document.getElementById("div_produto2").style.display = "none";			
			document.getElementById("div_tipoPrd").style.display = "block";		
			
			if(document.getElementById("fisica").checked == true){
				reloadZoomFilterValues("txtproduto", "FLUIG," + "2");	
			}
			else if (document.getElementById("tiposervico").checked == true){
				reloadZoomFilterValues("txtproduto", "FLUIG," + "11");	
			}	
			
		}
}


function tipoCadastro(){
	if (document.getElementById("tipoproduto").checked == true){
		  document.getElementById("div_descDetalhada").style.display = "none";
		  document.getElementById("div_tipoPessoa").style.display = "none";
		  
	
	}
	else if (document.getElementById("tiposervico").checked == true){			
		document.getElementById("div_descDetalhada").style.display = "block";
		  document.getElementById("div_tipoPessoa").style.display = "block";

		
		
	}
}


//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
    var PRODUTO ="produto";   
    var CONTA = "contacontabil";

    //Recebe o nome do campo zoom
    var campoZOOM = selectedItem.inputId;
 
    //compara para verificar se o zoom é o campo centro de custo
	 if (campoZOOM == PRODUTO) {        	
		 	$('#codigoProduto').val(selectedItem["CODIGO"]);
	    	
	    }
	 
	 if (campoZOOM == CONTA) {        	
		 	$('#codigoCContabil').val(selectedItem["CODIGO"]);
	 	
	 }
 
    
}

function removedZoomItem(removedItem) {
	 var PRODUTO ="produto";
	 var CONTA = "contacontabil";
   
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
 
    if (campoZOOM == PRODUTO) {
    	$('#codigoProduto').val("");
    }
    if (campoZOOM == CONTA) {
    	$('#codigoCContabil').val("");
    }



    


}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}



