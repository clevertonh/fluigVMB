function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var PAGARDIARIAS = 129;
	
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");
	
	log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	if (ativAtual == OBTERPASSAGEM,PAGARDIARIAS){
		
		 throw "Você não pode cancelar essa solicitação pois ela já foi atendida. Se você é o solicitante acesse a solicitação e marque a opção de cancelamento.";
		
	}
	
	if (ativAtual == COMPRARPASSAGEM){
		 throw "Você não pode cancelar essa solicitação pois ela está em processo de compra. Por favor, entre em contato com o departamento de Hospitalidade.";
			
	}
	
	if (ativAtual == REGISTRARCANCELAMENTO ||  ativAtual == CONFIRMARREEMBOLSO){
		 throw "Você não pode cancelar essa solicitação pois ela já foi atendida.";
			
	}
	


	
	
	
}