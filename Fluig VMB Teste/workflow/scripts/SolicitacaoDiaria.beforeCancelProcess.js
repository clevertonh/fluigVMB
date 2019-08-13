function beforeCancelProcess(colleagueId,processId){
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
	
	
	
	if (ativAtual == CALCULAR_DIARIAS || ativAtual == REALIZAR_PGTO || ativAtual == AVALIAR_PGTO ){
		//	log.info("Processo beforeCancel - PAGARDIARIAS");
			 throw "Você não pode excluir essa solicitação pois ela já foi integrada com o sistema Financeiro.";
				
		}

	
	
	
}