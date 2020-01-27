function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	var ANEXAR = 44;
	var ADITIVO = 49;
	
	var ativAtual 		 = getValue("WKNumState");		
	var codSolicitacao 	 = getValue("WKNumProces");
	var nextAtv  		 = getValue("WKNextState");
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
    var usuario = getValue('WKUser');
	var definicaoValor = hAPI.getCardValue("definicaoValor");	
	var contrato = hAPI.getCardValue("Numerocontrato");
	var statusContrato = hAPI.getCardValue("statusContrato");
	var tipoContrato = hAPI.getCardValue("tipoContrato");	   
    
    if (ativAtual == ASSINAR){
    	if (nextAtv == 37){
    		//O CONTRATO FOI ASSINADO E UM NOVO CONTRATO
			if (statusContrato =="assinado" && tipoContrato !=""){				
				setContrato(idDocumento,3); 
				
			}
    		
    	}
    }
    else if (ativAtual == ANEXAR){
    		//VERIFICA SE EXISTE ANEXO NO CONTRATO
    		if (tipoContrato != "") {
    			getAnexosProtheus(idDocumento);
    		}
    }
    
    
    
    
    function setContrato(id,opcao){
			 var constraints = new Array();                                 
			 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
			 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
		     var resultDataset = DatasetFactory.getDataset("VM_CNTA300_SOLICITACAO_CONTRATO", null, constraints, null);                                                                    
		    		     
		         if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		             throw resultDataset.getValue(0,"RETORNO");
		         }
		         else {
		        	 	hAPI.setTaskComments(usuario, codSolicitacao, 0, "Contrato registrado automaticamente. Número: " + resultDataset.getValue(0,"NUMERO"));
		         }
    
    }
    
    function getAnexosProtheus(id){
		 var constraints = new Array();                                 
		 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));	
	     var resultDataset = DatasetFactory.getDataset("VM_FATA340_BASE_CONHECIMENTO_PROTHEUS", null, constraints, null);                                                                    
	    		     
	         if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	             throw resultDataset.getValue(0,"RETORNO");
	         }	        

    }
    
    
	
}