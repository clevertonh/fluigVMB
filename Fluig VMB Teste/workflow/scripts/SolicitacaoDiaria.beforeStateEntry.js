function beforeStateEntry(sequenceId){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16; 
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;
	
	
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
	
	
	var autorizado 		 = hAPI.getCardValue("aprovacao");
	
	
    var dtVencimento	 = hAPI.getCardValue("dtVencimento");
    var valorTotal		 = hAPI.getCardValue("vl_diarias");
    var recebeDiarias 	 = hAPI.getCardValue("recebediarias");
 	
	
	if (ativAtual == CALCULAR_DIARIAS  && recebeDiarias == "sim"){
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