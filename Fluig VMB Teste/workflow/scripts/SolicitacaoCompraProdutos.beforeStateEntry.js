function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var APROVACAO =5;
       var CORRIGIR = 15;
       var APROVACAO_DIR = 50;
       var APROVACAO_DN = 51;
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
      
       
       if (ativAtual == APROVACAO ){
    	   var aprovacao  = hAPI.getCardValue("aprovacao");
	 
    	   if (aprovacao == "aprovado"){
	   			opcao = 3;
                var constraint = new Array();                                 
                constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
	  			constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
	  			 
                var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
                 
                	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                      throw resultDataset.getValue(0,"RETORNO");
                   }
                	  else {
  					  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema Protheus para o processo de cotação");
  				  }
                   
	   		}     
       }
       
       
       else if (ativAtual == APROVACAO_DIR ){
	    	   	var aprovacaoDIR  = hAPI.getCardValue("aprNivel2");
		 
	     		if (aprovacaoDIR == "reprovado"){
		   			opcao = 5;
		   			var constraint = new Array();                                 
		   	     	constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
		   	 		constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
		   	 			 
		   	 		var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
		   	       
		   	      	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		   	            throw resultDataset.getValue(0,"RETORNO");
		   	         }
		   		}
    	       
       }
        else if (ativAtual == APROVACAO_DN){
    	   		var aprovacaoDN  = hAPI.getCardValue("aprNivel3");
           
    	   		if (aprovacaoDN == "reprovado"){
    	   			opcao = 5;
    	   			var constraint = new Array();                                 
    	   	     	constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
    	   	 		constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
    	   	 			 
    	   	 		var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
    	   	       
    	   	      	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
    	   	            throw resultDataset.getValue(0,"RETORNO");
    	   	         }
    	   		}
       }

       
}