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
			
		}
		else if (document.getElementById("produtoExisteN").checked == true){
			document.getElementById("div_compras2").style.display = "block";
			
			document.getElementById("div_produto").style.display = "none";
			document.getElementById("div_produto2").style.display = "none";			
			
			
		}
}


function tipoCadastro(){
	if (document.getElementById("tipoproduto").checked == true){
		  document.getElementById("div_descDetalhada").style.display = "none";
	
	}
	else if (document.getElementById("tiposervico").checked == true){			
		document.getElementById("div_descDetalhada").style.display = "block";
		

		
		
	}
}





