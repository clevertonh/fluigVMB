function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO_COMPRAS = 12;
	var REALIZAR_COTACAO_HOSPITALIDADE = 22;
	var ENVIAR_APROVACAO_COMPRAS = 209;
	var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
	var APROVACAO_SERVICO_COMPRAS = 105;
	var APROVACAO_SERVICO_HOSPITALIDADE = 94;
	var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
	var VERIFICAR_APROVACAO_COMPRAS = 145;
	var SOLICITACAO_CONTRATO_HOSPITALIDADE = 66;
	var SOLICITACAO_CONTRATO_COMPRAS = 63;
	var INTEGRAR_PROTHEUS_COMPRAS_COMPRAS = 212;
	var INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATRA_HOSPITALIDADE = 270;
	var VERIFICAR_ASSINATRA_COMPRAS = 274;
	var TIPO_PJ_C = 281;
	var TIPO_PJ_H = 278;
	
	
	var ativAtual 		 = getValue("WKNumState");		
	var codSolicitacao 	 = getValue("WKNumProces");
	var nextAtv  		 = getValue("WKNextState");
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
    var usuario = getValue('WKUser');
	
	
    var cgc = hAPI.getCardValue("cnpjcpf");
    var razaoSocial = hAPI.getCardValue("razaosocial");     
    
     
     if (ativAtual == APROVACAO_GESTOR){
    	 var aprovacao = hAPI.getCardValue("aprovacao");
    	   
    	 if (aprovacao =="aprovado"){
    		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação aprovada.");
    	 }
    	 else if (aprovacao =="reprovado"){
    		 hAPI.setTaskComments(usuario, codSolicitacao, 0, "Solicitação reprovada.");
    	 }
     }
    
     else if (ativAtual == REALIZAR_COTACAO_COMPRAS  || ativAtual == REALIZAR_COTACAO_HOSPITALIDADE){ 
		 	if (nextAtv == TIPO_PJ_C || nextAtv == TIPO_PJ_H){
		 		
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
	    }	
	 
	 else if (ativAtual == VALIDAR_RH){
		 var valido = hAPI.getCardValue("valido");
		    
		 if (valido == "negado"){
			 hAPI.setTaskComments(usuario, codSolicitacao, 0, "O fornecedor " + cgc +"-"+razaoSocial + " não pode ser contratado pois não atende aos requisitos da legislação trabalhista.");
		 }
	 }
	 else if (ativAtual == INTEGRAR_PROTHEUS_COMPRAS_COMPRAS || ativAtual == INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE){
			
		 	var definicaoValor = hAPI.getCardValue("definicaoValor");		 	
		 	var contrato = hAPI.getCardValue("Numerocontrato");
		 	
		 	//para esse caso o contrato será registrado com esses dados
		 	//primeiro se integra com a solicitação de compra e depois cria o contrato no Protheus
		 	//se tiver contrato vinculado, a solicitação deverá ser paga pela medição
				if (definicaoValor =="fixo" && contrato ==""){  					 					
		              var constraint = new Array();                                 
	                  constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
	                  
	                 
	                   var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);                                                                    
	                      
	                   if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	                         throw resultDataset.getValue(0,"RETORNO");
	                      }
	                   else {
	                	   hAPI.setTaskComments(usuario, codSolicitacao, 0, "Fornecedor selecionado e processo enviado para aprovação");
	                   }
				}
	
	 }
}