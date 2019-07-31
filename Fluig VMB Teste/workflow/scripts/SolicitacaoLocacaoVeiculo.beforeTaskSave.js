function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var INICIO = 0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CORRIGIR = 39;
	var CONTRATAR = 47;
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual = getValue("WKNumState");		
	
	if (ativAtual == ABERTURA || ativAtual == INICIO){
		var indexes = hAPI.getChildrenIndexes("tableCondutor");		
		
		hAPI.setCardValue("qtcnh",indexes.length);  	
		
	}
	
}