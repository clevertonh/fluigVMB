function beforeStateEntry(sequenceId){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16; 
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;
	var GERAR_TARIFA = 46;
	
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");		
	//RECUPERA CODIGO DA SOLICITAÇÃO
	var codSolicitacao 	 = getValue("WKNumProces");
	//VERIFICA QUAL A PROXIMA ATIVIDADE
	var nextAtv  		 = getValue("WKNextState");
	//RECUPERA NUMERO DO DOCUMENTO
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
	 //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
	  
    var recebeDiarias 	 = hAPI.getCardValue("recebediarias");    
    var temTarifa		 	 = hAPI.getCardValue("tarifa");
   
	
	if (ativAtual == CALCULAR_DIARIAS){
		if (recebeDiarias == "sim"){
		  	var dtVencimento	 = hAPI.getCardValue("dtVencimento");
		    var valorTotal		 = hAPI.getCardValue("vl_diarias");
		    
			var constraint = new Array();		  			
			constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
			constraint.push(DatasetFactory.createConstraint("vl_diarias", valorTotal, valorTotal, ConstraintType.MUST));  
			constraint.push(DatasetFactory.createConstraint("dtVencimento", dtVencimento, dtVencimento, ConstraintType.MUST));
				
			
			var resultDateset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_DIARIAS", null, constraint, null);
			     
		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		    	throw resultDateset.getValue(0,"RETORNO");
		    } 
		}

	
	}
	else if (ativAtual == GERAR_TARIFA){
		if ( temTarifa == "sim"){
				var vl_tarifa		 = hAPI.getCardValue("vl_tarifa");
				var dtTarifa		 = hAPI.getCardValue("dtTarifa");
					
				var constraint = new Array();		  			
				constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
				constraint.push(DatasetFactory.createConstraint("vl_tarifa", vl_tarifa, vl_tarifa, ConstraintType.MUST));  
				constraint.push(DatasetFactory.createConstraint("dtTarifa", dtTarifa, dtTarifa, ConstraintType.MUST));
			
				var resultDateset = DatasetFactory.getDataset("VM_FINA100_SOLICITACAO_DIARIAS", null, constraint, null);
				     
			    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
			    	throw resultDateset.getValue(0,"RETORNO");
			    } 
			    else {
			    	hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
			    }
		}
		

	    
	}
	
	
	
	
	
	
	
}