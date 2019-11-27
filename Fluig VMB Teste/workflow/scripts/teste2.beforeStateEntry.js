function beforeStateEntry(sequenceId){
	var ATIVIDADE_INICIAL = 4;
	var ATIVIDADE_5 = 5;
	var ATIVIDADE_13 = 13;
	var ATIVIDADE_15 = 15;
	
	
	
	
    //RECUPERA NUMERO DA ATIVIDADE
    var ativAtual               = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao    = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv           = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento = getValue("WKCardId");
    var idFormulario = getValue("WKFormId")
    var empresa = getValue("WKCompany");
    //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
    
    var campo1  = hAPI.getCardValue("campo1");
    
    log.info("ID ATIVIDADE FLUIG TESTE 7");
    log.info("WKNumState");
    log.info(ativAtual);
    log.info("sequenceId");
    log.info(sequenceId);
    
  

    
    if (ativAtual == ATIVIDADE_5){
        log.info(campo1);
        
    	if (campo1 =="aprovado"){
    		
    	}
    	
 	   log.info("TESTE 27112019");
	   log.info(ativAtual);

	
}
    
    
    
}