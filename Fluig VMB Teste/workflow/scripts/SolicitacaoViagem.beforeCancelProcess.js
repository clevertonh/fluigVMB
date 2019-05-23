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
	var CANCELARSOLICITACAO = 93;

	var split1;
	var atv1;
	var atv2;
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");
	log.info("Processo beforeCancel - atividade: " + ativAtual);
	
	//Processo beforeCancel - atividade: 33,129
//----LOG CANCELAMENTO---33
//----LOG CANCELAMENTO---129	
	
	log.info("----LOG CANCELAMENTO---");
	
	if (ativAtual != ABERTURA && ativAtual != SOLICITARVIAGEM 
			&& ativAtual != APROVACAO
			&& ativAtual != CANCELARSOLICITACAO){
		
		split1 = ativAtual.split(',');
		atv1 = split1[0];
		atv2 = split1[1];
	}
	
	
	
	//log.info("----LOG CANCELAMENTO---"+atvObterPassagem);
	//log.info("----LOG CANCELAMENTO---"+atvPagarDiarias);

	
	if (ativAtual == OBTERPASSAGEM || atv1 == OBTERPASSAGEM || atv2 == OBTERPASSAGEM ){		
		log.info("Processo beforeCancel - OBTERPASSAGEM");
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida. Se você é o solicitante acesse a solicitação e marque a opção de cancelamento de viagem.";
		
	}
	
	if (ativAtual == PAGARDIARIAS || atv1 == PAGARDIARIAS || atv2 == PAGARDIARIAS){
		log.info("Processo beforeCancel - PAGARDIARIAS");
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}

	
	if (ativAtual == COMPRARPASSAGEM || atv1 == COMPRARPASSAGEM || atv2 == COMPRARPASSAGEM){
		log.info("Processo beforeCancel - COMPRAR PASSAGEM");
		 throw "Você não pode excluir essa solicitação pois ela está em processo de compra. Por favor, entre em contato com o departamento de Hospitalidade.";
			
	}
	
	
	if (ativAtual == REGISTRARCANCELAMENTO ||  atv1 == REGISTRARCANCELAMENTO ||  atv2 == REGISTRARCANCELAMENTO){
		log.info("Processo beforeCancel - REGISTRAR CANCELAMENTO");
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	

	if (ativAtual == CONFIRMARREEMBOLSO || atv1 == CONFIRMARREEMBOLSO ||  atv2 == CONFIRMARREEMBOLSO){
		log.info("Processo beforeCancel - CONFIRMAR REEMBOLSO");
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	


	
	
	
}