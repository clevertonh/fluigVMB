var ABERTURA = 0;
var APROVACAO_GESTOR = 5;
var TESOURARIA = 10;
var SOLICITANTE = 24;
var GERENTE_ADM = 31;
var DIRETOR_FINANCEIRO = 5;
var DIRETOR_RH = 48;
var DIRETOR_MINISTERIO = 50;
var DIRETOR_MKT = 52;
var DIRETOR_ADVOCACY = 54;
var DIRETOR_NACIONAL = 46;



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
    var FORNECEDOR ="cnpjcpf";
    
    //Recebe o nome do campo zoom
    var campoZOOM = removedItem.inputId;
    if (campoZOOM == FORNECEDOR){
    	$("#fisica").attr('checked', false);
    	$("#juridica").attr('checked', false);
    	$("#razaosocial").val("");  
		$("#nomefantasia").val("");  		
		$("#codigoFornecedor").val("");   	
		$("#meioPagamento").val("");
		$("#banco").val("");   
		$("#agencia").val("");   
		$("#contaFornecedor").val("");   
		$("#tipoConta").val("");   
		$("#tipoPJ").val("");  
    	 
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function setSelectedZoomItem(selectedItem) {
   var FORNECEDOR ="cnpjcpf";

  
  //Recebe o nome do campo zoom
  var campoZOOM = selectedItem.inputId;
  
  if (campoZOOM == FORNECEDOR){
	 	$("#razaosocial").val(selectedItem["RAZAO_SOCIAL"]);    		
	 	$("#nomefantasia").val(selectedItem["FANTASIA"]);  		
	 	$("#codigoFornecedor").val(selectedItem["CODIGO"]);   
		
	
	
	 	console.log(selectedItem["TIPO"].trim());
	
		if (selectedItem["TIPO"].trim() == "JURIDICA"){ 	    	
   		document.getElementById("juridica").click();  
		}
		else if (selectedItem["TIPO"].trim() == "FISICA"){
			document.getElementById("fisica").click();  
		}
		else if (selectedItem["TIPO"].trim() == "FUNCIONARIO"){
			document.getElementById("fisica").click();  
		}

		$("#meioPagamento").val(selectedItem["FORM_PGTO"]);
		$("#bancoF").val(selectedItem["BANCO"]);   
		$("#agenciaF").val(selectedItem["AGENCIA"]);   
		$("#contaFornecedor").val(selectedItem["CONTA_F"]);   
		$("#tipoConta").val(selectedItem["TIPO_CONTA"].trim());   
		$("#tipoPJ").val(selectedItem["TIPO_PJ"].trim());  



}


}

function Calculapercentual(){
	 if ($('#vl_total').val() >0 && $('#vl_adiantado').val() > 0){
		 var vl_percentual = ($('#vl_adiantado').val() * 100 ) /  $('#vl_total').val();
		 $('#percentual').val(vl_percentual);	 
	 }
}




