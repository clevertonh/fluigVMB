function beforeStateEntry(sequenceId){
	var INICIAR = 0;
	var SOLICITAR = 56;
	var GERENTE_ADM =5;
	var DIRETOR_FIN = 35;
	var DIRETOR_RH = 11;
	var DIRETOR_MINISTERIO = 13;
	var DIRETOR_MKT = 15;
	var DIRETOR_ADVOCACY = 18;
	var DIRETOR_NACIONAL = 27;
	
	
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
//	    var limiteAnual 	 = hAPI.getCardValue("CotacaovalorAnual");
	    
   if (ativAtual == GERENTE_ADM){				
			var aprovacao 	 = hAPI.getCardValue("aprNivel1");
			
			//aprovado
			if (aprovacao == "aprovado"){
				hAPI.setCardValue("aprovacaoServico","aprovado");  
			}
			else if (aprovacao == "reprovado"){
				//reprovado.
				hAPI.setCardValue("aprovacaoServico","reprovado");
				hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo: " + hAPI.getCardValue("justificativaReprovacao"));	
				hAPI.setCardValue("justificativaReprovacao","");
			}
		
	}
	//diretor financeiro
	else if (ativAtual == DIRETOR_FIN){
		var aprovacao 	 = hAPI.getCardValue("aprNivel2");
		
		//aprovado
		if (aprovacao == "aprovado"){
			hAPI.setCardValue("aprovacaoServico","aprovado");  
		}
		else if (aprovacao == "reprovado") {
			//reprovado.
			hAPI.setCardValue("aprovacaoServico","reprovado");  
			hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo: " + hAPI.getCardValue("justificativaReprovacao"));	
			hAPI.setCardValue("justificativaReprovacao","");
		}
	}
	else if (ativAtual == DIRETOR_RH || ativAtual == DIRETOR_MINISTERIO  || ativAtual == DIRETOR_MKT  || ativAtual == DIRETOR_ADVOCACY){
		var aprovacaoRH 	 = hAPI.getCardValue("aprNivel4");
		var aprovacaoMINISTERIO 	 = hAPI.getCardValue("aprNivel6");
		var aprovacaoMKT 	 = hAPI.getCardValue("aprNivel3");
		var aprovacaoADVOCACY 	 = hAPI.getCardValue("aprNivel5");
		
		if (aprovacaoRH == "reprovado" || aprovacaoMINISTERIO == "reprovado" || aprovacaoMKT == "reprovado" || aprovacaoADVOCACY == "reprovado" ){
			hAPI.setCardValue("aprovacaoServico","reprovado");  
			
			
			if (ativAtual == DIRETOR_RH){
				hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo:" + hAPI.getCardValue("justificativaReprovacao"));	
			}
			else if (ativAtual == DIRETOR_MINISTERIO){
				hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo:" + hAPI.getCardValue("justificativaReprovacao"));	
			}
			else if (ativAtual == DIRETOR_MKT){
				hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo:" + hAPI.getCardValue("justificativaReprovacao"));	
			}
			else if (ativAtual == DIRETOR_ADVOCACY){
				hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo:" + hAPI.getCardValue("justificativaReprovacao"));	
			}
			
			hAPI.setCardValue("justificativaReprovacao","");
			
		}
		else if (aprovacaoRH == "aprovado" || aprovacaoMINISTERIO == "aprovado" || aprovacaoMKT == "aprovado" || aprovacaoADVOCACY == "aprovado" ) {
					hAPI.setCardValue("aprovacaoServico","aprovado");  
			
		}
	
	}	
	//diretoria nacional
	else if (ativAtual == DIRETOR_NACIONAL){
		var aprovacao 	 = hAPI.getCardValue("aprNivel7");
		
		//aprovado
		if (aprovacao == "aprovado"){
			hAPI.setCardValue("aprovacaoServico","aprovado");  
		}
		else if (aprovacao == "reprovado") {
			//reprovado.
			hAPI.setCardValue("aprovacaoServico","reprovado");  
			hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada. Motivo:" + hAPI.getCardValue("justificativaReprovacao"));	
			hAPI.setCardValue("justificativaReprovacao","");
		}
	}
	
	
	
	function convertDataToString(dataToString) {
	    var dia;

	    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
	    var mes = dataToString.getMonth() + 1;
	    if (dataToString.getDate().toString().length == 1) {
	        dia = dataToString.getDate();
	        dia = "0" + dia.toString();

	    } else {
	        dia = dataToString.getDate();

	    }

	   
	    //converte mes
	    if (mes.toString().length == 1) {
	        mes = "0" + mes.toString();

	    }

	    //novo formato de data: para salvar em campos data do Fluig
	    return dia + "/" + mes + "/" + dataToString.getFullYear();


	}
}