function beforeStateEntry(sequenceId){
	    var codSolicitacao = getValue("WKNumProces");

		//RECUPERA NUMERO DA ATIVIDADE
		var ativAtual 		 = getValue("WKNumState");	
	    //VERIFICA QUAL A PROXIMA ATIVIDADE
	    var nextAtv = getValue("WKNextState");
	    //RECUPERA NUMERO DO DOCUMENTO
	    var idDocumento = getValue("WKCardId");
	    var idFormulario = getValue("WKFormId")
	    var empresa = getValue("WKCompany");
	    //RECUPERA USUARIO LOGADO
	       var usuario = getValue('WKUser');
	       
	    var numProcess = getValue("WKNumProces");
	    var limiteAnual 	 = hAPI.getCardValue("limiteanual");
	    
	    
	 //gerente de adm
	if (ativAtual == 5){
		 //hAPI.setTaskComments(usuario, codSolicitacao, 0, "Proxima atividade ID "+nextAtv);
		
		//aprovado
		if (nextAtv == 33){
			hAPI.setCardValue("aprovacaoServico","aprovado");  
		}
		else {
			//reprovado.
			hAPI.setCardValue("aprovacaoServico","reprovado");  
			
		}
		
	}
	//diretor financeiro
	else if (ativAtual == 35){
		//aprovado
		if (nextAtv == 37){
			hAPI.setCardValue("aprovacaoServico","aprovado"); 
		}
		else {
			//reprovado.
			hAPI.setCardValue("aprovacaoServico","reprovado");  
			
		}	
	}
	//comitê
	else if (ativAtual == 11 || ativAtual == 13 || ativAtual == 15 || ativAtual == 18){
		//aprovado
		if (nextAtv == 68){
			hAPI.setCardValue("aprovacaoServico","reprovado");  
		}	
		else {
			hAPI.setCardValue("aprovacaoServico","aprovado");  	
		}
	
	}
	
	
	
	//diretoria nacional
	else if (ativAtual == 27){
		//aprovado
		if (nextAtv == 68){
			hAPI.setCardValue("aprovacaoServico","reprovado");  
		}	
		else {
			hAPI.setCardValue("aprovacaoServico","aprovado");  
			
		}
	}

}