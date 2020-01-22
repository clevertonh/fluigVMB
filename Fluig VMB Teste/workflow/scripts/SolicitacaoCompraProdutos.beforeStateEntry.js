function beforeStateEntry(sequenceId){
       //VARIAVEIS DEFAULT
       var ABERTURA = 0;
       var APROVACAO =5;
       var CORRIGIR = 15;
       var APROVACAO_DIR = 50;
       var APROVACAO_DN = 51;
       var ASSUMIR = 42;
       var CADASTRAR_CONTRATO = 44;
       
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
       
   
       
       
       
       //Opção desejada: 3-Inclusão; 4-Alteração ; 5-Exclusão ; 7-Aprovação (Somente versão Protheus 10)  
       var opcao;
      
       
      if (ativAtual == APROVACAO_DIR ){
	    	   	var aprovacao  = hAPI.getCardValue("aprNivel2");
		 
	    	    if (aprovacao == "aprovado"){
		   			opcao = 3;
		   			setSolicitacaoCompra(idDocumento,opcao);
	                   
		   		}    
    	       
       }
        else if (ativAtual == APROVACAO_DN){
    	   		var aprovacao  = hAPI.getCardValue("aprNivel3");
           
    	   		if (aprovacao == "reprovado"){
    	   			opcao = 5;
    	   			setSolicitacaoCompra(idDocumento,opcao);

    	   		}
       }

       
      
      function setSolicitacaoCompra(id,opcao){
			 var constraints = new Array();                                 
			 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
			 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));	 
		       var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRA", null, constraints, null);                                                                    
		          
		       if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		             throw resultDataset.getValue(0,"RETORNO");
		         }

}
      
}