function servicetask100(attempt, message) {
	   //RECUPERA NUMERO DA ATIVIDADE
    var ativAtual = getValue("WKNumState");        
    //RECUPERA CODIGO DA SOLICITAÇÃO
    var codSolicitacao = getValue("WKNumProces");
    //VERIFICA QUAL A PROXIMA ATIVIDADE
    var nextAtv = getValue("WKNextState");
    //RECUPERA NUMERO DO DOCUMENTO
    var idDocumento = getValue("WKCardId");
    var idFormulario = getValue("WKFormId")
    var empresa = getValue("WKCompany");
    
    var numProcess = getValue("WKNumProces");
	  
    // Busca a Lista com o número da solicitação dos filhos
    var childrenProcess = hAPI.getChildrenInstances(numProcess);
  
    for (var i = 0; i < childrenProcess.size(); i++) {
        // Busca os dados do formulário da solicitação filha
        var childCardData = hAPI.getCardData(childrenProcess.get(i));
  
        // Replica um dado do formulário da solicitação filha para o formulário da solicitação pai
        var statusAprovacao = childCardData.get("aprovacaoServico");
        
        if (i == childrenProcess.size()){
        	hAPI.setCardValue("aprovacaoServico", statusAprovacao );
        	if (statusAprovacao =="aprovado"){
        		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação de Contratação de serviço aprovada");
        	}
        	else {
        		 throw 'Solicitação de Contratação de serviço reprovada. Refaça a tarefa de Realizar cotação';
        	}
        }      
    }  	
}