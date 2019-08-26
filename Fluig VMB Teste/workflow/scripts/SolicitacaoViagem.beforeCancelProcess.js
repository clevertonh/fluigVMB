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
	var REALIZAR_PAGAMENTO = 165;
	var AVALIAR_ATRASO = 159;
	var GERAR_TARIFA = 196;


	var split1;
	var atv1;
	var atv2;
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");
	
	if (ativAtual != ABERTURA && ativAtual != SOLICITARVIAGEM 
			&& ativAtual != APROVACAO
			&& ativAtual != CANCELARSOLICITACAO){
		
		split1 = ativAtual.split(',');
		atv1 = split1[0];
		atv2 = split1[1];
	}
	
	
	if (ativAtual == OBTERPASSAGEM || atv1 == OBTERPASSAGEM || atv2 == OBTERPASSAGEM ){		
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida. Se você é o solicitante acesse a solicitação e marque a opção de cancelamento de viagem.";
		
	}
	
	if (ativAtual == PAGARDIARIAS || atv1 == PAGARDIARIAS || atv2 == PAGARDIARIAS){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}

	
	if (ativAtual == COMPRARPASSAGEM || atv1 == COMPRARPASSAGEM || atv2 == COMPRARPASSAGEM){
		 throw "Você não pode excluir essa solicitação pois ela está em processo de compra. Por favor, entre em contato com o departamento de Hospitalidade.";
			
	}
	
	
	if (ativAtual == REGISTRARCANCELAMENTO ||  atv1 == REGISTRARCANCELAMENTO ||  atv2 == REGISTRARCANCELAMENTO){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	

	if (ativAtual == CONFIRMARREEMBOLSO || atv1 == CONFIRMARREEMBOLSO ||  atv2 == CONFIRMARREEMBOLSO){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	
	if (ativAtual == REALIZAR_PAGAMENTO || atv1 == REALIZAR_PAGAMENTO ||  atv2 == REALIZAR_PAGAMENTO){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	
	if (ativAtual == AVALIAR_ATRASO || atv1 == AVALIAR_ATRASO ||  atv2 == AVALIAR_ATRASO){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}
	
	if (ativAtual == GERAR_TARIFA || atv1 == GERAR_TARIFA ||  atv2 == GERAR_TARIFA){
		 throw "Você não pode excluir essa solicitação pois ela já foi atendida.";
			
	}

	
	
	
	
}