function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO = 5;
	var COTACAO = 15;
	var CORRIGIR = 12;
	var VALIDAR_RH = 30;
	var SOLICITAR_APROVACAO = 28;
	var APROVACAO_SERVICO = 36;
	var SOLICITAR_CONTRATO = 37;
	var SOLICITACAO_CONTRATO = 43;
	var VERIFICAR_ASSINATURA = 44;
	var FINALIZAR = 48;
	

	
	
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
	
    var cgc = hAPI.getCardValue("cnpjcpf");
    var razaoSocial = hAPI.getCardValue("razaosocial");     
    
    if (ativAtual == APROVACAO ){
    	
      	 var aprovacao = hAPI.getCardValue("aprovacao");
  	   
    	 if (aprovacao =="aprovado"){
    		 
    		    var constraint = new Array();                                 
                constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
                
                 var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
                    
                 if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
                       throw resultDataset.getValue(0,"RETORNO");
                    }
                 else {
              	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema de Cotação do Protheus.");
                 }
                 
                 
                 
    		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação aprovada.");
    	 }
    	 
    	 else if (aprovacao =="reprovado"){
    		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada.");
    	 }
    	
                       
          
           
    }
    else if (ativAtual == COTACAO){	 		
	 		/*
			 * verifica se foi adicionado anexo. 
			 * Pois quando tem anexo é obrigatório marcar algo como comprado
			 * */
			 var anexos   = hAPI.listAttachments();
		     var temAnexo = false;
			
		 	if (anexos.size() <= 0) {
				throw "Você precisa anexar as cotações/propostas de acordo com a política de exigência de cotações.";
		 	} 
		 	
		 	
		 	 //SALVA NO COMENTÁRIO OS DADOS DO FORNECEDOR ATUAL PARA O CASO DE HAVER TROCA DE FORNECEDOR
			 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Fornecedor " + cgc +"-"+razaoSocial + " selecionado como melhor opção do processo de cotação.");
		 	
	 
    }
	 else if (ativAtual == VALIDAR_RH){
		 var valido = hAPI.getCardValue("valido");
		    
		 if (valido == "negado"){
			 hAPI.setTaskComments(usuario, codSolicitacao, 0, "O fornecedor " + cgc +"-"+razaoSocial + " não pode ser contratado pois não atende aos requisitos da legislação trabalhista.");
		 }
	 }
    
    
    
    
}