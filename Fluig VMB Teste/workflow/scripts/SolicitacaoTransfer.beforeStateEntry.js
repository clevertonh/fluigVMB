function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO = 5;
	var CORRIGIR = 12;
	var CONTRATAR = 15;
	
	
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
    
    if (ativAtual == APROVACAO  && aprovacao =="aprovado"){ 	   
                  var constraint = new Array();                                 
                  constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                  
                   var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
                      
                   if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                         throw resultDataset.getValue(0,"RETORNO");
                      }
                   else {
                	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema de Cotação do Protheus.");
                   }
                      
          
           
    }	
}