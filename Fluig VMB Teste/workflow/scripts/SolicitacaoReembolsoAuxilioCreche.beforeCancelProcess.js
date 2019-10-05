function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	var CORRIGIR = 85;
	
	
var ativAtual = getValue("WKNumState");
	
	//log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	if (ativAtual != ABERTURA && ativAtual != APROVACAO_GESTOR && ativAtual != VALIDACAO && ativAtual != CORRIGIR) {
		
		 throw "Você não pode excluir essa solicitação pois ela já está em processo de pagamento.";
		
	}
	
	
}