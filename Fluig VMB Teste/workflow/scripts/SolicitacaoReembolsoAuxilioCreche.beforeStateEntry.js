function beforeStateEntry(sequenceId){
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;

	
	//RECUPERAR O ID DO PROCESSO
	var PROCESSO_ID = 3;
	
	//recupera atividade
	var ativAtual 		= getValue("WKNumState");	
	var nextAtv  		= getValue("WKNextState");
	var codSolicitacao  = getValue("WKNumProces");
	//RECUPERA NUMERO DO DOCUMENTO
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
	 //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
	
	var autorizado 		 = hAPI.getCardValue("aprovacao");
	var aprovadoNoPrazo  = hAPI.getCardValue("aprPrazo");		
	
    var dtVencimento	 = hAPI.getCardValue("dtPagamento");
    var valorTotal		 = hAPI.getCardValue("vl_rmb");
 	
	
	if (ativAtual == APROVACAO_RH   ){
			if (autorizado == "aprovado" && aprovadoNoPrazo == ""){
				var constraint = new Array();		  						     
				constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
				constraint.push(DatasetFactory.createConstraint("valor", valorTotal, valorTotal, ConstraintType.MUST));  
				constraint.push(DatasetFactory.createConstraint("dataVencimento", dtVencimento, dtVencimento, ConstraintType.MUST));
					
				
				var resultDataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_REEMBOLSO_AUXILIO_CRECHE", null, constraint, null);
				
					  if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
				    	throw resultDataset.getValue(0,"RETORNO");
				      } 
					  else {
						  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
					  }
				
			}
		
		  
	
	}
	else if (ativAtual == ALTERACAO_DATA){
				var constraint = new Array();		  						     
				constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
				constraint.push(DatasetFactory.createConstraint("valor", valorTotal, valorTotal, ConstraintType.MUST));  
				constraint.push(DatasetFactory.createConstraint("dataVencimento", dtVencimento, dtVencimento, ConstraintType.MUST));
					
				
				var resultDataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_REEMBOLSO_AUXILIO_CRECHE", null, constraint, null);
				
					  if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
				    	throw resultDataset.getValue(0,"RETORNO");
				      } 
					  else {
						  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
					  }
		
	}
	
}