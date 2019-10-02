function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var APROVACAO = 5;
       var ASSUMIR = 42;
       
       //GATEWAY
       var GATEWAYAPROVADO = 14;
       
       //RECUPERA NUMERO DA ATIVIDADE
       var ativAtual               = getValue("WKNumState");        
       //RECUPERA CODIGO DA SOLICITAÇÃO
       var codSolicitacao    = getValue("WKNumProces");
       //VERIFICA QUAL A PROXIMA ATIVIDADE
       var nextAtv           = getValue("WKNextState");
       //RECUPERA NUMERO DO DOCUMENTO
       var idDocumento = getValue("WKCardId");
       var idFormulario = getValue("WKFormId")
       var empresa = getValue("WKCompany");
       //RECUPERA USUARIO LOGADO
       var usuario = getValue('WKUser');
       
       var aprovacao  = hAPI.getCardValue("aprovacao");
       
       //Opção desejada: 3-Inclusão; 4-Alteração ; 5-Exclusão ; 7-Aprovação (Somente versão Protheus 10)  
       var opcao;

       if (ativAtual == APROVACAO &&  aprovacao == "aprovado"){    	
     //  if (ativAtual == ASSUMIR &&  nextAtv == 44){ 
                     var constraint = new Array();                                 
                     //constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));
                     constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
              
                  
                	 	var codigoComprador = getValue("WKUser");
	 		  			
                	 	var constraintsUsuario   = new Array();
 		  			 	constraintsUsuario.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codigoComprador, codigoComprador, ConstraintType.MUST));
 		  			 	var datasetComprador = DatasetFactory.getDataset("colleague", null, constraintsUsuario, null);
 				
 		  			 
 		  			 
 		  			if (datasetComprador!= null && datasetComprador.rowsCount > 0){
	  					var emailComprador = datasetComprador.getValue(0, "mail");	  
	  					constraint.push(DatasetFactory.createConstraint("comprador", emailComprador, emailComprador, ConstraintType.MUST));	
	  				}
                    
 		  			 constraint.push(DatasetFactory.createConstraint("acao", 3, 3, ConstraintType.MUST));
                      var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
                       
                      	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                            throw resultDataset.getValue(0,"RETORNO");
                         }
                      	  else {
        					  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus para o processo de cotação");
        				  }
                         
           
              
       }
       else if (ativAtual == ASSUMIR){

    	   /*
    	   var constraint = new Array();                                 
           constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
    
        
      	 	var codigoComprador = getValue("WKUser");
	  			
      	 	var constraintsUsuario   = new Array();
 			 	constraintsUsuario.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codigoComprador, codigoComprador, ConstraintType.MUST));
 			 	var datasetComprador = DatasetFactory.getDataset("colleague", null, constraintsUsuario, null);
		
 			 
 			 
 			if (datasetComprador!= null && datasetComprador.rowsCount > 0){
				var emailComprador = datasetComprador.getValue(0, "mail");	  
				constraint.push(DatasetFactory.createConstraint("comprador", emailComprador, emailComprador, ConstraintType.MUST));	
			}

 			constraint.push(DatasetFactory.createConstraint("acao", 4, 4, ConstraintType.MUST));	
 			
            var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
             
            	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                  throw resultDataset.getValue(0,"RETORNO");
            	 }

*/ 	 
               
       }

                 
       
       
}