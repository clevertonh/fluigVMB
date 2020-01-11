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
    var opcao;
    
    if (ativAtual == APROVACAO ){
    	var aprovacao = hAPI.getCardValue("aprovacao");

    			//GERA SOLICITAÇÃO DE COMPRA PARA GARANTIR QUE DADOS FINANCEIROS ESTAO CORRETOS
		    	 if (aprovacao =="aprovado"){
	    			 opcao = 3;
			       		 var constraint = new Array();                                 
			             constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
			             constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));			             
			              var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
			                 
			              if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
			                    throw resultDataset.getValue(0,"RETORNO");
			                 }   	    		 		 		   
		       	 }
    }
    else if (ativAtual == COTACAO){	 		
			 var anexos   = hAPI.listAttachments();
		     var temAnexo = false;
			
		 	if (anexos.size() <= 0) {
				throw "Você precisa anexar as cotações/propostas de acordo com a política de exigência de cotações.";
		 	} 
		 	
		 	
		 	 //SALVA NO COMENTÁRIO OS DADOS DO FORNECEDOR ATUAL PARA O CASO DE HAVER TROCA DE FORNECEDOR
			 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Fornecedor " + cgc +"-"+razaoSocial + " selecionado como melhor opção do processo de cotação.");
		 	
	 
    }
	 else if (ativAtual == VALIDAR_RH){
		 		hAPI.setTaskComments(usuario, codSolicitacao, 0, "O fornecedor " + cgc +"-"+razaoSocial +  hAPI.getCardValue("justificativaRH"));
	 }
    
	 else if (ativAtual == FINALIZAR){
		 	 //DELETA SOLICITACAO DE COMPRA GERADA ANTECIPADAMENTE 
		 	 opcao = 5;
			 var constraintDelete = new Array();                                 
			 constraintDelete.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
			 constraintDelete.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
	         var resultDatasetDelete = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraintDelete, null);                                                                    
	             
	          if (resultDatasetDelete.getValue(0,"RETORNO") != "SUCESSO"){
	                throw resultDatasetDelete.getValue(0,"RETORNO");
	            }
	          
	          
				var contrato  = hAPI.getCardValue("Numerocontrato");
	    		if (contrato ==""){
	    			 opcao = 3;
	    			 var valorUnitario = hAPI.getCardValue("CotacaovalorMensal");	    			 
		       		 var constraint = new Array();                                 
		             constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
		             constraint.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
			         constraint.push(DatasetFactory.createConstraint("valor", valorUnitario, valorUnitario, ConstraintType.MUST));		             
		              var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
		                 
		              if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		                    throw resultDataset.getValue(0,"RETORNO");
		                 }
		              else {
		           	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com o sistema de Cotação do Protheus.");
		              }

	      		}
	      		//GERAR INTEGRACAO COM MEDIÇÃO DE CONTRATO
	      		else {	      		
	           			 var constraint = new Array();                                 
			             constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
			             
			              var resultDataset = DatasetFactory.getDataset("VM_CNTA120_SOLICITACAO_TRANSFER", null, constraint, null);                                                                    
			                 
			              if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
			                    throw resultDataset.getValue(0,"RETORNO");
			                 }
			              else {
			           	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação integrada com a rotina de medição de contratos.");
			              }
	      		}
	 }      
}