function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	
	var ativAtual 		 = getValue("WKNumState");		
	var codSolicitacao 	 = getValue("WKNumProces");
	var nextAtv  		 = getValue("WKNextState");
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
    var usuario = getValue('WKUser');
	
   
    
    if (ativAtual == ASSINAR){
    	if (nextAtv == 37){
    		var definicaoValor = hAPI.getCardValue("definicaoValor");		 	
			var contrato = hAPI.getCardValue("Numerocontrato");
			var statusContrato = hAPI.getCardValue("statusContrato");	
			//O CONTRATO FOI ASSINADO
			if (statusContrato =="assinado"){
				/*
				//CONTRATO É POR DEMANDA
				if (definicaoValor =="demanda"){
					setContrato(idDocumento,3,0);   
				
				}
				else {
					setContrato(idDocumento,3,0);   
				}
				*/
			}
    		
    	}
    }
    
    
    function setContrato(id,opcao,valor){
		 var constraints = new Array();                                 
		 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
		 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
		 constraints.push(DatasetFactory.createConstraint("valor",valor, valor, ConstraintType.MUST));		 
	       var resultDataset = DatasetFactory.getDataset("VM_CNTA300_CONTRATO", null, constraints, null);                                                                    
	          
	       if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	             throw resultDataset.getValue(0,"RETORNO");
	         }

}
	
}