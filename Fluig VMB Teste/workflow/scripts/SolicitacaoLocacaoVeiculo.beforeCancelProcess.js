function beforeCancelProcess(colleagueId,processId){   
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO =5;
	var CORRIGIR = 39;
	var COTAR = 47;
	var VALIDAR_RH = 55;
	var SOLICITAR_APROVACAO = 59;
	var APROVACAO_SERVICO = 61;
	var SOLICITAR_CONTRATO = 65;
	var SOLICITACAO_CONTRATO = 77;
	var VERIFICAR_ASSINATURA = 79;
	var FINALIZAR = 83;

    
    
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

     if (ativAtual == COTAR || ativAtual == VALIDAR_RH
    		 || ativAtual == SOLICITAR_APROVACAO
    		 || ativAtual == SOLICITAR_CONTRATO
    		 || ativAtual == VERIFICAR_ASSINATURA
     ){
    	 var valor = hAPI.getCardValue("valor");
     	 var produto = hAPI.getCardValue("codigoProduto");
     	     
    	 var constraint = new Array();                                 
     	 constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));                    
         constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));
         constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));	
     	 constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
 			 
 		var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_LOCACAO_VEICULO", null, constraint, null);                                                                    
       
      	 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
            throw resultDataset.getValue(0,"RETORNO");
         }
      	  
    }
     else if (ativAtual == FINALIZAR){
    	 		throw "Você não pode excluir essa solicitação pois ela já foi atendida."; 
     }
   
    
    
}