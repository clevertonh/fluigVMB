function beforeStateEntry(sequenceId){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;
	var PRESTAR_CONTAS = 38;
	var VALIDAR_NOTA = 39;
	
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
	
	
	 var anexos   = hAPI.listAttachments();
     var temAnexo = false;
     
     if (ativAtual == VALIDAR_NOTA){
    		if (anexos.size() <= 0) {
   				throw "É necessário que a nota fiscal esteja anexada.";
     	      	}  
     }
	
}