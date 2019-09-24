function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var APROVACAO_DIRETOR = 5;
	var GERAR_ADTO = 10;
	var SOLICITANTE = 24;
	var INTEGRAR = 79;

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
	
	
     
    if ((ativAtual == GERAR_ADTO && nextAtv == INTEGRAR) || ativAtual == SOLICITANTE){    
        var dtPgto		 	 = hAPI.getCardValue("dtEmissao");
    	
    	var constraintAdto = new Array();	
        var resultDataset;
                
    	    constraintAdto.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			  
    	    constraintAdto.push(DatasetFactory.createConstraint("dtPgto", dtPgto, dtPgto, ConstraintType.MUST)); 	
    
    	    if (ativAtual == GERAR_ADTO){
    	    	 var banco		 	 = hAPI.getCardValue("banco");
    	    	 var agencia		 = hAPI.getCardValue("agencia");
    	    	 var contabanco		 = hAPI.getCardValue("contabanco");
    	    	 
    	    	 constraintAdto.push(DatasetFactory.createConstraint("banco", banco, banco, ConstraintType.MUST)); 	
    	    	 constraintAdto.push(DatasetFactory.createConstraint("agencia", agencia, agencia, ConstraintType.MUST)); 	
    	    	 constraintAdto.push(DatasetFactory.createConstraint("contabanco", contabanco, contabanco, ConstraintType.MUST)); 	
    	    	 
    	    	 
    			 resultDataset = DatasetFactory.getDataset("VM_SOLICITACAO_ADIANTAMENTO_FORNECEDOR", null, constraintAdto, null);
    			 
    			 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
    			    	throw resultDataset.getValue(0,"RETORNO");
    			    } 
    			  else {
					  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
				  }
    			 
    			         		       
    	    }
	    	else if (ativAtual == SOLICITANTE){
	    	  	var cartaocredito	 = hAPI.getCardValue("cartaocredito");
	    	  	
	    	  	constraintAdto.push(DatasetFactory.createConstraint("cartaocredito", cartaocredito, cartaocredito, ConstraintType.MUST));			    		
	    		resultDataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_ADIANTAMENTO_FORNECEDOR", null, constraintAdto, null);
	    			    	
	
	    		 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	 		    	throw resultDataset.getValue(0,"RETORNO");
	 		    } 
	    		  else {
					  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
				  }
	    		 
	    	}
    	    
    	    
    	   
    	    
    
    }       	
}