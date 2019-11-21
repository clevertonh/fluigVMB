function beforeCancelProcess(colleagueId,processId){
	var ABERTURA = 4;
	var APROVACAO = 5;
	
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
	
	
	
	if (ativAtual != ABERTURA &&  ativAtual != APROVACAO){
			// throw "Você não pode excluir essa solicitação pois ela já foi integrada com o sistema de Compras.";
				
		}
	
	
}