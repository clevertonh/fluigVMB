function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var VALIDAR = 5;
	var DADOS_CONTABEIS = 10;
	var CORRIGIR = 16;
	
	//RECUPERA NUMERO DA ATIVIDADE
    var ativAtual         = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao    = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv           = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento 	  = getValue("WKCardId");
    var idFormulario 	  = getValue("WKFormId")
    var empresa 		  = getValue("WKCompany");
	
    //GATEWAY
	var GATEWAYINTEGRACAO = 12;
	
	
	var contacontabil	 = hAPI.getCardValue("codigoCContabil");
    var tes		 = hAPI.getCardValue("tes");
    
	if (ativAtual == DADOS_CONTABEIS && nextAtv == GATEWAYINTEGRACAO){
	  
	    
		var constraint = new Array();		  			
		constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
		constraint.push(DatasetFactory.createConstraint("contacontabil", contacontabil, contacontabil, ConstraintType.MUST));  
		constraint.push(DatasetFactory.createConstraint("tes", tes, tes, ConstraintType.MUST));
			
		
		var resultDateset = DatasetFactory.getDataset("VM_MATA010_SOLICITACAO_CADASTRO_PRODUTO_SERVICO", null, constraint, null);
		     
	    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
	    	throw resultDateset.getValue(0,"RETORNO");
	    } 

}
	
	
	
}