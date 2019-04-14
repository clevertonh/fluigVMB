function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 4;
	var APROVACAO_GESTOR = 5;
	var CORRIGIR_SOLICITACAO = 15;
	var AVALIAR_ERRO = 22;
	
	
var ativAtual = getValue("WKNumState");
	
	log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	if (ativAtual != ABERTURA && ativAtual != APROVACAO_GESTOR && ativAtual != CORRIGIR_SOLICITACAO && ativAtual != AVALIAR_ERRO){
		
		 throw "Você não pode excluir essa solicitação pois sua solicitação já foi integrada com o sistema financeiro.";
		
	}
	
}