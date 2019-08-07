function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var APROVACAO = 5;
       
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
       
       var aprovado = hAPI.getCardValue("aprovacao");
       
       
       if (ativAtual == APROVACAO ){	   
              if (aprovado == "aprovado"){
                    var constraint = new Array();                                 
                    constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));      
                  	  
                          
					  var c1 = DatasetFactory.createConstraint("metadata#id", idDocumento, idDocumento, ConstraintType.MUST);    
					  var datasetProdutos = DatasetFactory.getDataset("VM_SolicitacaoEventosProdutos", null, new Array(c1), null);
						  
					  
					  if (datasetProdutos.rowsCount > 0){
						  
						  var codigoComprador = getValue("WKUser");
		 		  			
		 		  			 var constraintsUsuario   = new Array();
		 		  			 	constraintsUsuario.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codigoComprador, codigoComprador, ConstraintType.MUST));
		 		  			 	var datasetComprador = DatasetFactory.getDataset("colleague", null, constraintsUsuario, null);
		 				
		 		  			 
		 		  			 
		 		  			if (datasetComprador!= null && datasetComprador.rowsCount > 0){
			  					var emailComprador = datasetComprador.getValue(0, "mail");	  
			  					constraint.push(DatasetFactory.createConstraint("comprador", emailComprador, emailComprador, ConstraintType.MUST));	
			  				}
		                     
						  
						    var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_EVENTO", null, constraint, null);                                                                    
		                     if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		                            throw resultDataset.getValue(0,"RETORNO");
		                         }  
					  }
					  
                     
                     
                    
                         
              }
              
       }
                 

       
}