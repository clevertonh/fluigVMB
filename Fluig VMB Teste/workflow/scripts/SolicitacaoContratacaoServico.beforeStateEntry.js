function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO =5;
	var CONTRATAR = 12;
	
	
	
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
	 //RECUPERA USUARIO LOGADO
    var usuario = getValue('WKUser');
	
	
    var aprovacao = hAPI.getCardValue("aprovacao");
    var valor = hAPI.getCardValue("valor");
    var produto = hAPI.getCardValue("codigoProduto");
    
 if (ativAtual == CONTRATAR  ){ 	   
                  var constraint = new Array();                                 
                  constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                  constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));
                  constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
                  
                  
                   var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);                                                                    
                      
                   if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                        // throw resultDataset.getValue(0,"RETORNO");
                      }
                   else {
                	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema de Cotação do Protheus.");
                   }
                      
          
           
    }	
}