function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	
var ativAtual = getValue("WKNumState");
	
	log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	if (ativAtual == APROVACAO_RH || ativAtual == ALTERACAO_DATA){
		
		 throw "Você não pode excluir essa solicitação pois sua solicitação já está em processo de pagamento.";
		
	}
	
	
}