function beforeStateEntry(sequenceId){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;	
	var APROVACAO_DIR = 292;
	var APROVACAO_DN = 301;
	var REALIZAR_COTACAO = 22;
	var SOLICITAR_APROVACAO = 206;
	var APROVACAO_SERVICO = 94;
	var SOLICITACAO_CONTRATO = 66;
	var VERIFICAR_APROVACAO = 151;
	var FINALIZAR = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATURA = 270;	
	
	var TIPO_PJ = 281;
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
    
    
    if (ativAtual == REALIZAR_COTACAO){ 
		 	if (nextAtv == TIPO_PJ){
		 		
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
	 /*
	 else if (ativAtual == FINALIZAR){
	 		var definicaoValor = hAPI.getCardValue("definicaoValor");		 	
			var contrato = hAPI.getCardValue("Numerocontrato");
			var statusContrato = hAPI.getCardValue("statusContrato");
			
			//O CONTRATO FOI ASSINADO
			if (statusContrato =="assinado"){
				//CONTRATO É POR DEMANDA
				if (definicaoValor =="demanda"){
					//DELETA SOLICITAÇÃO DE COMPRA POIS SERVIÇO DEVERÁ SER PAGO POR MEDIÇÃO DE CONTRATO E AINDA NÃO EXISTE O CONTRATO
					 setSolicitacaoCompra(idDocumento,3,0);   
				
				}
			}	
			
	 }
   
    */
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