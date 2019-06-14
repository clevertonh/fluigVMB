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
    	   log.info("retorno integração eventos");
    	   log.info(aprovado);
    	   
              if (aprovado == "aprovado"){
                     var constraint = new Array();                                 
                     //constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));
                     constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                     
                      var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_EVENTO", null, constraint, null);                                                                    
                       
                      log.info("retorno solitação de eventos");
                      log.dir(resultDataset);
                      
                      if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                            throw resultDataset.getValue(0,"RETORNO");
                         }
                         
              }
              
       }
                 
       
       
}