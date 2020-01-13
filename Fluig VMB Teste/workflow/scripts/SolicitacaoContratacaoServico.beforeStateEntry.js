function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var APROVACAO_DIRETOR_AREA = 292;
	var APROVACAO_DIRETOR_NACIONAL = 301;
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
	var FINALIZAR = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATURA = 270;
	var TIPO_PJ_C = 281;
	var TIPO_PJ_H = 278;
	var CONTRATO_ASSINADO = 181; //verifica se contrato foi assinado
	
	
	var ativAtual 		 = getValue("WKNumState");		
	var codSolicitacao 	 = getValue("WKNumProces");
	var nextAtv  		 = getValue("WKNextState");
	var idDocumento = getValue("WKCardId");
	var idFormulario = getValue("WKFormId")
	var empresa = getValue("WKCompany");
    var usuario = getValue('WKUser');
	
	
    var cgc = hAPI.getCardValue("cnpjcpf");
    var razaoSocial = hAPI.getCardValue("razaosocial");     
    var aprovacaoGerencia = hAPI.getCardValue("aprovacao");  
    var aprovacaoDiretoriaArea = hAPI.getCardValue("aprNivel2");
    var aprovacaoDN = hAPI.getCardValue("aprNivel3");
    
    
    
   if (ativAtual == APROVACAO_GESTOR){
	   if (aprovacaoGerencia == "aprovado"){
		   setSolicitacaoCompra(idDocumento,3,0);   
	   }
	   
   }  
   
   else if (ativAtual == APROVACAO_DIRETOR_AREA){
		   if (aprovacaoGerencia == "reprovado"){
			   setSolicitacaoCompra(idDocumento,5,0);   
		   }
	   
   }
   
   
   else if (ativAtual == APROVACAO_DIRETOR_NACIONAL){
		   if (aprovacaoDN == "reprovado"){
			   setSolicitacaoCompra(idDocumento,5,0);   
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
		 	hAPI.setTaskComments(usuario, codSolicitacao, 0, "O fornecedor " + cgc +"-"+razaoSocial +  hAPI.getCardValue("justificativaRH"));

	 }
	 else if (ativAtual == FINALIZAR){
	 		var definicaoValor = hAPI.getCardValue("definicaoValor");		 	
			var contrato = hAPI.getCardValue("Numerocontrato");
			var statusContrato = hAPI.getCardValue("statusContrato");
			
			//O CONTRATO FOI ASSINADO
			if (statusContrato =="assinado"){
				//CONTRATO É POR DEMANDA
				if (definicaoValor =="demanda"){
					//DELETA SOLICITAÇÃO DE COMPRA POIS SERVIÇO DEVERÁ SER PAGO POR MEDIÇÃO DE CONTRATO E AINDA NÃO EXISTE O CONTRATO
					 setSolicitacaoCompra(idDocumento,5,0);   
				
				}
			}	
			
	 }
   
   function setSolicitacaoCompra(id,opcao,valor){
			 var constraints = new Array();                                 
			 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
			 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
			 constraints.push(DatasetFactory.createConstraint("valor",valor, valor, ConstraintType.MUST));		 
		       var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraints, null);                                                                    
		          
		       if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
		             throw resultDataset.getValue(0,"RETORNO");
		         }

}
   
   
   
}