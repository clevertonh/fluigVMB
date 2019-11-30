var ABERTURA = 0;
var SOLICITAR = 4;
var ELABORAR =10;
var ASSINAR = 18;

/*
var dtSolicitacao = FLUIGC.calendar('#dataSolicitacao', {
    pickDate: true,
    pickTime: false,
    useCurrent: true,
    minDate: new Date().toLocaleString(),
    maxDate: new Date().toLocaleString()
});


*/

//preenche data da solicitação no momento que abre a solicitação
$(document).ready(function() {	
	//console.log(ATIVIDADE);
	
	
	if (ATIVIDADE == ABERTURA || ATIVIDADE == SOLICITAR){
		//dtSolicitacao.setDate(new Date().toLocaleString());
		
		var dtInicio = FLUIGC.calendar('#dtInicio', {
		    pickDate: true,
		    pickTime: false,
		    minDate: new Date().toLocaleString()
		    
		});
				
		var dtFim = FLUIGC.calendar('#dtFim', {
		    pickDate: true,
		    pickTime: false,
		    minDate: new Date().toLocaleString()
		});
		
	 	   $("#dtInicio").blur(function(){            
	 		    FLUIGC.toast({
                    title: 'Informação',
                    message: 'Serviços contratados só podem ter sua vigência programada até o final do ano fiscal.',
                    type: 'warning',
                    timeout: 6000
                });
           });
	 	   
	 	
	 	   
		   $("#dtFim").blur(function(){  
			   var dataInicio =  $("#dtInicio").val(); // 03/11/2019
               var arr = dataInicio.split("/").reverse();
               var dia = new Date(arr[0], arr[1] - 1, arr[2]);
                 
               var AnoFiscal;
                
               //MONTA AF FISCAL
               if (dia.getMonth() > 8){
            	   AnoFiscal = dia.getFullYear() + 1;
               }
               else {
            	   AnoFiscal = dia.getFullYear();
               }
               
               //DATA LIMITE
               var dtLimite = new Date (AnoFiscal,8,'30')
             
               
               var data = this.value;
               var arrF = data.split("/").reverse();
               var diaFinal = new Date(arrF[0], arrF[1] - 1, arrF[2]);
             
             
               
               if (diaFinal > dtLimite){
            	    FLUIGC.toast({
                        title: 'Informação',
                        message: 'O serviço contratado só podem ter sua vigência programada até o final do AF '+ AnoFiscal,
                        type: 'danger',
                        timeout: 6000
                    });
               }
	          });
		
	}

	
});



//preenche campos ZOOM
function setSelectedZoomItem(selectedItem) {
  var SERVICO ="txtproduto";
  var FORNECEDOR ="cnpjcpf";
 

	  //Recebe o nome do campo zoom
	  var campoZOOM = selectedItem.inputId;

	  //compara para verificar se o zoom é o campo centro de custo
	 if (campoZOOM == FORNECEDOR){
		    $("#razaosocial").val(selectedItem["RAZAO_SOCIAL"]);    		
	  		$("#nomefantasia").val(selectedItem["FANTASIA"]);  		
	  		$("#codigoFornecedor").val(selectedItem["CODIGO"]);   
	  		
	   		if (selectedItem["TIPO"] == "JURIDICA"){ 
	       		document.getElementById("juridica").click();  
	      	}
	  		else if (selectedItem["TIPO"] == "FISICA"){
	   			document.getElementById("fisica").click();  
	  		}
	  		else if (selectedItem["TIPO"] == "FUNCIONARIO"){
	   			document.getElementById("fisica").click();  
	  		}
	  		
	  		$("#juridica").prop("disabled", true);
	  		$("#fisica").prop("disabled", true);  		
	  		$("#meioPagamento").val(selectedItem["FORM_PGTO"]);
	  		$("#banco").val(selectedItem["BANCO"]);   
	  		$("#agencia").val(selectedItem["AGENCIA"]);   
	  		$("#contaFornecedor").val(selectedItem["CONTA_F"]);   
	  		$("#tipoConta").val(selectedItem["TIPO_CONTA"]);    
	
	  }
	  
}

function removedZoomItem(removedItem) {
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
    }
}