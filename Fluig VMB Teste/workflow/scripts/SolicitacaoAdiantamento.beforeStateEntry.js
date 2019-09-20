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
	 //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
	
	var aprovado = hAPI.getCardValue("aprovacao");
	//var dtAprovacao = hAPI.getCardValue("aprovacao");
	
	if (ativAtual == APROVACAO ){
		if(aprovado == "aprovado"){
			 var constraint = new Array();		  			 		  			
			 constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
			 
	     var resultDataset = DatasetFactory.getDataset("VM_SOLICITACAO_ADIANTAMENTO", null, constraint, null);
	  		    if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	  		    	throw resultDataset.getValue(0,"RETORNO");
	  		    }
	  		  else {
				  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
			  }
	  			  	
		}
			    
	
	}
	
}