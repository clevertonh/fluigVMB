function servicetask88(attempt, message) {
	   //RECUPERA NUMERO DA ATIVIDADE
    var ativAtual = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento = getValue("WKCardId");
    var idFormulario = getValue("WKFormId")
    var empresa = getValue("WKCompany");
    
    
    var constraint = new Array();                                 
    //constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));
    constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
    
     var resultDataset = DatasetFactory.getDataset("ds_get_Pagamentos", null, constraint, null);
       
     log.info("SCRIPT DE INTEGRAÇÃO 14:02");
     log.dir(resultDataset);
     
     
     	if (resultDataset !== null && resultDataset.rowsCount >0 && resultDataset.getValue(0,"DATA_PAGAMENTO") != ''){
     		//preenche data de pagamento
        	hAPI.setCardValue("dtBaixa",resultDataset.getValue(0,"DATA_PAGAMENTO"));  
     		
     	}
     	else {
     		 throw 'Pagamento ainda não efetuado!';
     	}

}