function beforeStateEntry(sequenceId){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var REGISTRAR_PGTO = 16; 
	
	
	//recupera atividade
	var ativAtual 		= getValue("WKNumState");	
	var nextAtv  		= getValue("WKNextState");
	var codSolicitacao  = getValue("WKNumProces");
	
	
	
	var autorizado 		 = hAPI.getCardValue("aprovacao");
	
	
    var dtVencimento	 = hAPI.getCardValue("dt_vencimento");
    var valorTotal		 = hAPI.getCardValue("vl_diarias");
 	
	
	if (ativAtual == REGISTRAR_PGTO  ){
			var constraint = new Array();		  			
			constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));     
			  
			
			constraint.push(DatasetFactory.createConstraint("valor", valorTotal, valorTotal, ConstraintType.MUST));  
			constraint.push(DatasetFactory.createConstraint("dataVencimento", dtVencimento, dtVencimento, ConstraintType.MUST));
				
			
			var resultDateset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_DIARIAS", null, constraint, null);
			     
		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		    	throw resultDateset.getValue(0,"RETORNO");
		    } 
	
	}
	
	
	
	
	
	
	
}