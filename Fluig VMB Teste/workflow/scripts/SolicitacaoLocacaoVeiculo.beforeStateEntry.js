function beforeStateEntry(sequenceId){
	
	var APROVACAO = 5;
	var CONTRATAR = 47;
	
	
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
	
	
    var aprovado = hAPI.getCardValue("aprovacao");
    var valor = hAPI.getCardValue("valor");
    
    
    if (ativAtual == CONTRATAR ){ 	   
                  var constraint = new Array();                                 
                  constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                  constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));
                  
                   var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_LOCACAO_VEICULO", null, constraint, null);                                                                    
                      
                   log.info("INTEGRAÇÃO COMPRAS");
                   log.dir(resultDataset);
                   
                   if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                         throw resultDataset.getValue(0,"RETORNO");
                      }
                      
          
           
    }	
}