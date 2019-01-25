function beforeCancelProcess(colleagueId,processId){
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");
	
	log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	if (ativAtual == 33 ||  ativAtual == 64 ||  ativAtual == 79 || ativAtual == 129){
		
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida. Para cancelar a viagem, acesse a solicitação e marque a opção de cancelamento.";
		
	}
	
	if (ativAtual == 13){
		 throw "Você não pode excluir essa solicitação pois ela está em processo de compra. Por favor, entre em contato com o departamento de Hospitalidade.";
			
	}
	
	
	
}