function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var INCLUIR_MEDICAO = 87;
       var ANEXAR_RELATORIO = 74;
       
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
       
       var validacao  = hAPI.getCardValue("validacao");
      

       if (ativAtual == INCLUIR_MEDICAO ){   
    	   if (validacao == "aprovado"){
        	   
               var constraint = new Array();                                 
               constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
               
                var resultDataset = DatasetFactory.getDataset("VM_CNTA120_SOLICITACAO_PAGAMENTO_SERVICO", null, constraint, null);                                                                    
                 
                	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                      throw resultDataset.getValue(0,"RETORNO");
                   }
                	  else {
  					  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Medição de contrato integrado com sistema Protheus");
  				  } 
    	   }
    	     
       }
  
}