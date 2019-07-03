function beforeStateEntry(sequenceId){
	
	var ABERTURA = 0;
	var APROVACAO = 5;
	
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
	
	var aprovado = hAPI.getCardValue("aprovacao");
	
	
	if (APROVACAO == 5 && aprovado == "aprovado"){
		 var constraint = new Array();		  			 		  			
			 constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
	
	     var resultDateset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_ADIANTAMENTO", null, constraint, null);
	  		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
	  		    	throw resultDateset.getValue(0,"RETORNO");
	  		    }
	  		    
	
	}
	
}