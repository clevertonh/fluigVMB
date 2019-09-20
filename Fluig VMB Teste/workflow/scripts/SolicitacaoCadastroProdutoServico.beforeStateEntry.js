function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var VALIDAR = 5;
	var DADOS_CONTABEIS = 10;
	var CORRIGIR = 16;
	
	//RECUPERA NUMERO DA ATIVIDADE ATUAL
    var ativAtual         = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao    = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv           = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento 	  = getValue("WKCardId");
    //RECUPERA ID DE CADASTRO DO FORMULARIO
    var idFormulario 	  = getValue("WKFormId")
    //RECUPERA EMPRESA
    var empresa 		  = getValue("WKCompany");    
    //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
    //GATEWAY
	var GATEWAYINTEGRACAO = 12;
	
	
	var contacontabil	 = hAPI.getCardValue("codigoCContabil");
    var tes		 = hAPI.getCardValue("tes");
    
	if (ativAtual == DADOS_CONTABEIS && nextAtv == GATEWAYINTEGRACAO){
	  
	    
		var constraint = new Array();		  			
		constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));			
		constraint.push(DatasetFactory.createConstraint("contacontabil", contacontabil, contacontabil, ConstraintType.MUST));  
		constraint.push(DatasetFactory.createConstraint("tes", tes, tes, ConstraintType.MUST));
			
		
		var resultDataset = DatasetFactory.getDataset("VM_MATA010_SOLICITACAO_CADASTRO_PRODUTO_SERVICO", null, constraint, null);
		     
	    if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	    	throw resultDataset.getValue(0,"RETORNO");
	    } 
	    /*
	    else {
        		var retornoMensagem = hAPI.setCardValue("codigoProduto",resultDataset.getValue(0,"PRODUTO"));  	
        		hAPI.setTaskComments(usuario, codSolicitacao, 0, "ID DO PRODUTO: "+retornoMensagem);
	    }
	    */
	    else {
			  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
		  }

}
	
	
	
}