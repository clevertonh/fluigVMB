function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var APROVACAO =5;
       
       //GATEWAY
       var GATEWAYAPROVADO = 9;
       
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
       
     
       
       if (ativAtual == APROVACAO && nextAtv == GATEWAYAPROVADO){
              if (aprovado == "sim"){
                     var constraint = new Array();                                 
                     //constraint.push(DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));
                     constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                     
                      var resultDateset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);
                        
                         if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
                            throw resultDateset.getValue(0,"RETORNO");
                         }
              }
              
       }
                 
     
       
}