function beforeCancelProcess(colleagueId,processId){   
	 //VARIAVEIS DEFAULT
    var ABERTURA = 0;
    var INICIO = 4;
    var APROVACAO = 5;
    var ASSUMIR = 42;
    var CORRIGIR = 15;
    
    
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
    
    
    //Opção desejada: 3-Inclusão; 4-Alteração ; 5-Exclusão ; 7-Aprovação (Somente versão Protheus 10)  
    var opcao = 5;

    if (ativAtual == CORRIGIR && ativAtual == ASSUMIR){
    	var constraint = new Array();                                 
     	constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
 		constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
 			 
 		var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraint, null);                                                                    
       
      	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
            throw resultDataset.getValue(0,"RETORNO");
         }
      	  
    }
   
    
    
}