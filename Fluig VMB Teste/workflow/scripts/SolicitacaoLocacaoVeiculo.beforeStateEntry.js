function beforeStateEntry(sequenceId){
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
	
    var aprovacao  = hAPI.getCardValue("aprovacao");
    var cgc = hAPI.getCardValue("cnpjcpf");
    var razaoSocial = hAPI.getCardValue("razaosocial");  
    var opcao;
    
    if (ativAtual == ABERTURA || ativAtual == SOLICITAR){
    	 var anexos   = hAPI.listAttachments();
    	 var qtdAnexado = anexos.size();
    	 	 
			var processo = getValue("WKNumProces");
			var campos   = hAPI.getCardData(processo);
			var contador = campos.keySet().iterator();
			var qtdeCNH = 0;
			
			while (contador.hasNext()) {
			    var id = contador.next();
			    if (id.match(/nomeCondutor___/)) { // qualquer campo do Filho
			    	qtdeCNH = qtdeCNH + 1;
			    }
			}
    	 
			if (qtdAnexado < qtdeCNH){
				 throw "Você precisa anexar uma cópia da CNH para cada condutor cadastrado.";
			}
			
			
			//hAPI.setCardValue("dtBaixa",resultDataset.getValue(0,"DATA_PAGAMENTO"));  	
    	 
    	 
    	 
    }
    else if (ativAtual == APROVACAO  ){ 	
    	    if (aprovacao =="reprovado"){
		   		 		hAPI.setTaskComments(usuario, codSolicitacao, 0, hAPI.getCardValue("justificativaReprovacao"));
		   	 }
      }	

    else if (ativAtual == COTAR){	 		
	     	 var anexos   = hAPI.listAttachments();    
	     	 
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
		   	     
			var contrato  = hAPI.getCardValue("Numerocontrato");
    		if (contrato !="" && contrato!= null){
    			//DELETA SOLICITACAO DE COMPRA GERADA ANTECIPADAMENTE 
  				//setSolicitacaoCompra(idDocumento,5,0);  

       			 var constraint = new Array();                                 
	             constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
	             
	              var resultDataset = DatasetFactory.getDataset("VM_CNTA120_SOLICITACAO_LOCACAO_VEICULO", null, constraint, null);                                                                    
	                 
	              if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	                    throw resultDataset.getValue(0,"RETORNO");
	                 }
	              else {
	            	  hAPI.setTaskComments(usuario, codSolicitacao, 0, "Medição de contrato cadastrada. Número: " + resultDataset.getValue(0,"NUMERO"));
	              }


      		}

 } 
    
    function setSolicitacaoCompra(id,opcao,valor){
		 var constraints = new Array();                                 
		 constraints.push(DatasetFactory.createConstraint("documentid", id, id, ConstraintType.MUST));
		 constraints.push(DatasetFactory.createConstraint("acao", opcao, opcao, ConstraintType.MUST));
		 constraints.push(DatasetFactory.createConstraint("valor",valor, valor, ConstraintType.MUST));		 
	        var resultDataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_LOCACAO_VEICULO", null, constraints, null);                                                                    
	           
	        if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
	              throw resultDataset.getValue(0,"RETORNO");
	          }

}
    
    
    
    
}