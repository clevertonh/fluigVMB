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
	
	var autorizado 		 = hAPI.getCardValue("aprovacao");
	var aprovadoNoPrazo  = hAPI.getCardValue("aprPrazo");		
	
    var dtVencimento	 = hAPI.getCardValue("dtPagamento");
    var valorTotal		 = hAPI.getCardValue("vl_rmb");
 	
	
	if ((ativAtual == APROVACAO_RH && autorizado == "aprovado" && aprovadoNoPrazo == "" ) || ativAtual == ALTERACAO_DATA){
			var constraint = new Array();		  			
			constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));     
			  
			
			constraint.push(DatasetFactory.createConstraint("valor", valorTotal, valorTotal, ConstraintType.MUST));  
			constraint.push(DatasetFactory.createConstraint("dataVencimento", dtVencimento, dtVencimento, ConstraintType.MUST));
				
			
			var resultDateset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_REEMBOLSO_AUXILIO_CRECHE", null, constraint, null);
			     
		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		    	throw resultDateset.getValue(0,"RETORNO");
		    } 
	
	}
	
}