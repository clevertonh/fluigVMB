function beforeStateEntry(sequenceId){
	
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	
	
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
	
	
	var aprovado = hAPI.getCardValue("aprovacao");
	
	var dtAprovacao = hAPI.getCardValue("dtAprovacao");
	
	if (ativAtual == APROVACAO && aprovado == "aprovado" ){
		var constraint = new Array();		  			
		constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
					  
		
		constraint.push(DatasetFactory.createConstraint("dtAprovacao", dtAprovacao, dtAprovacao, ConstraintType.MUST));  
//		constraint.push(DatasetFactory.createConstraint("valor", dtVencimento, dtVencimento, ConstraintType.MUST));
//		constraint.push(DatasetFactory.createConstraint("tipoffx", dtVencimento, dtVencimento, ConstraintType.MUST));	
		
		var resultDataset = DatasetFactory.getDataset("VM_SOLICITACAO_FUNDO_FIXO", null, constraint, null);
		
//		log.info("DATASET VM_REPOSICAO_FUNDO_FIXO");
//		log.dir(resultDataset);
		
		  if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		    	throw resultDataset.getValue(0,"RETORNO");
		    } 
		  else {
			  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus");
		  }
		
	  

}
	
}