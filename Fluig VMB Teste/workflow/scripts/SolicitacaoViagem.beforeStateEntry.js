function beforeStateEntry(sequenceId){	
	//REST PADRÃO TOTVS USUÁRIO
	//http://pessoasecultura.intranetvm.org.br:8082/REST/USERS
	
	//VARIAVEIS DEFAULT
	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var PAGARDIARIAS = 129;
	
	
	//GATEWAY
	var GATEWAYPASSAGEMCOMPRADA = 143;
	var GATEWAYREMARCACAO = 133;
	var GATEWAYVERIFICARAPROVACAO = 9;
	var GATEWAYFINALIZARSOLICITACAO = 116;
	
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
	
	
	var vooComprado		 = hAPI.getCardValue("vooComprado");
	var hotelComprado	 = hAPI.getCardValue("hotelComprado");					
	var valorDiarias 	 = hAPI.getCardValue("vl_diarias");
	var recebeDiarias 	 = hAPI.getCardValue("recebediarias");
	var dataVencimento 	 = hAPI.getCardValue("dtPgto");
	var geraTarifa 	 	 = hAPI.getCardValue("tarifa");
	var valorTarifa 	 = hAPI.getCardValue("vl_tarifa");
	var dtTarifa 	 	 = hAPI.getCardValue("dtTarifa");
	var fornecedorT	 	 = hAPI.getCardValue("fornecedorTarifa");
	var adiantamento	 = hAPI.getCardValue("adiantamento");
	var vlAdiantamento	 = hAPI.getCardValue("vl_aprovado");

	
	
	//VARIAVEIS SIMPLES
	var aItemServico = new Array();
	
	/*
	 * verifica se foi adicionado anexo. 
	 * Pois quando tem anexo é obrigatório marcar algo como comprado
	 * */
	 var anexos   = hAPI.listAttachments();
     var temAnexo = false;
	
	
     	if (ativAtual == COMPRARPASSAGEM && nextAtv == GATEWAYPASSAGEMCOMPRADA){
     		if ((vooComprado == '' && hotelComprado == '' ) || ( vooComprado == null && hotelComprado == null) ){
     			if (anexos.size() > 0) {
       	          //temAnexo = true;
     				throw "Você anexou um bilhete e/ou voucher então é necessário indicar qual serviço foi comprado!";
       	      	}     			
     		}     		
     		else if (vooComprado == 'sim' || hotelComprado == 'sim' ){
     			if (anexos.size() <= 0) {
     				throw "Você indicou que uma passagem ou hospedagem foi comprada mas não anexou o bilhete e/ou voucher!";
         	    }     			
     		}
     		
     		
     	}
     

     
     	if (ativAtual == COMPRARPASSAGEM && nextAtv == GATEWAYPASSAGEMCOMPRADA && ( vooComprado == 'sim' || hotelComprado == 'sim' ) ) {
 	 		  	//EXECUTA FUNÇÃO QUE RETORNA PRODUTOS A SEREM GERADOS PARA SOLICITAÇÃO DE COMPRA 		  	
 		  		try{
 		  			itensServico();
 		  		}
 		  		catch (err){
 		  			throw "FALHA AO RECUPERAR ITENS COMPRADOS NA SOLICITAÇÃO DE VIAGEM.";
 		  		}
     			
 		  		
 		  		//VERIFICA SE EXISTEM PRODUTOS PARA SER GERADOS
 		  		if (aItemServico.length >0){ 		    					     	    		     	   
 		  			
 		  			 var constraint = new Array();		  			 		  			
 		  			 constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
 		
 		  			 var codigoComprador = getValue("WKUser");
	 		  			
 		  			 var constraintsUsuario   = new Array();
 		  			 constraintsUsuario.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codigoComprador, codigoComprador, ConstraintType.MUST));
 					 var datasetComprador = DatasetFactory.getDataset("colleague", null, constraintsUsuario, null);
 				
 		  			 
 		  			 
 		  			if (datasetComprador!= null && datasetComprador.rowsCount > 0){
	  					var emailComprador = datasetComprador.getValue(0, "mail");	  
	  					constraint.push(DatasetFactory.createConstraint("comprador", emailComprador, emailComprador, ConstraintType.MUST));	
	  				}
 		  			
 		  			 
 		  			 
 		  			//Cria constraints para enviar produtos e valores
 		  			for (var a=0; a<aItemServico.length; a++){
 		  				constraint.push(DatasetFactory.createConstraint("produto", aItemServico[a].produto, aItemServico[a].produto, ConstraintType.MUST));  
 		  				constraint.push(DatasetFactory.createConstraint("quantidade", aItemServico[a].quantidade, aItemServico[a].quantidade, ConstraintType.MUST));
 		  				constraint.push(DatasetFactory.createConstraint("valor", aItemServico[a].valor, aItemServico[a].valor, ConstraintType.MUST));
 		  				constraint.push(DatasetFactory.createConstraint("dataViagem", aItemServico[a].dtviagem, aItemServico[a].dtviagem, ConstraintType.MUST));
 		  			
 		  			
 		  			}
 		
 	  				
 		  		    var resultDateset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_VIAGEM", null, constraint, null);
 		  		    
 		  		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
 		  		    	throw resultDateset.getValue(0,"RETORNO");
 		  		    } 
 		  		    else {
 		  		 		if (adiantamento == "sim" && vlAdiantamento > 0){
	 		   		  		 var constraint2 = new Array();		  			 		  			
	 		   		  		 constraint2.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
	 		   				 
	 		   				 var DatasetAdto = DatasetFactory.getDataset("VM_SOLICITACAO_VIAGEM_ADIANTAMENTO", null, constraint2, null);
	 		   		  		    if (DatasetAdto.getValue(0,"RETORNO") != "SUCESSO"){
	 		   		  		    	throw DatasetAdto.getValue(0,"RETORNO");
	 		   		  		    }
 		   		  		}
 		  		    }
 		  		}
 		  		
     	
 		 
     	
     	
     	}
	   	//INTEGRAÇÃO COM ROTINA DO CONTAS A PAGAR FINA050
     	else if ( ativAtual == PAGARDIARIAS  && recebeDiarias == "sim") {	
			   var constraint = new Array();		  			
	  			constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST)); 		  		
	  			constraint.push(DatasetFactory.createConstraint("valorDiarias", valorDiarias, valorDiarias, ConstraintType.MUST));  
	  			constraint.push(DatasetFactory.createConstraint("dataVencimento", dataVencimento, dataVencimento, ConstraintType.MUST));
	  			
	  			if (geraTarifa == "sim"){
	  				constraint.push(DatasetFactory.createConstraint("vl_tarifa", valorTarifa, valorTarifa, ConstraintType.MUST));
		  			constraint.push(DatasetFactory.createConstraint("fornecedorTarifa", fornecedorT, fornecedorT, ConstraintType.MUST));
		  			constraint.push(DatasetFactory.createConstraint("dtTarifa", dtTarifa, dtTarifa, ConstraintType.MUST));
		  				
	  			}
	  			
	  			
	  			
	  			 var resultDateset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_VIAGEM", null, constraint, null);
		  		    
		  		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		  		    	throw resultDateset.getValue(0,"RETORNO");
		  		    } 
			  								
		   	    
     	}
    
	   
		function itensServico(){
			var processo = getValue("WKNumProces");
			var campos   = hAPI.getCardData(processo);
			var contador = campos.keySet().iterator();

			while (contador.hasNext()) {
			    var id = contador.next();
			    if (id.match(/codigoProduto___/)) { // qualquer campo do Filho
			        var campo = campos.get(id);
			        var seq   = id.split("___");
			        var codproduto = campos.get("codigoProduto___" + seq[1]);
			        var valor = campos.get("valores___" + seq[1]);
			        var dataviagem = campos.get("dtViagem___" + seq[1]);
			        var geraSC = campos.get("geraSolicCompra___" + seq[1]);
			        if (geraSC == "SIM"){
			            var itemServico = { 
								produto: ''+codproduto +'', 
								quantidade: 1, 				
								valor: '' + valor + '',
								dtviagem: ''+ dataviagem +''
									};	
						
					   aItemServico.push(itemServico);	
			        }
			        
			  
        
			    }
			}
			/*
			   var indexes = hAPI.getChildrenIndexes("tableViagem");						   
			   for (var i = 0; i < indexes.length; i++) {
				    var codproduto = getValue("codigoProduto___" + indexes[i]);
				    var valor = getValue("valores___" + indexes[i]);
				    var dtviagem = getValue("dtViagem___" + indexes[i]);
				     
				    addItemViagem(codproduto,codSolicitacao,tipoViagem,idFormulario,valor);
				     
			   }

    // Busca a Lista com o número da solicitação dos filhos
    var childrenProcess = hAPI.getChildrenInstances(numProcess);
  
    for (var i = 0; i < childrenProcess.size(); i++) {
        // Busca os dados do formulário da solicitação filha
        var childCardData = hAPI.getCardData(childrenProcess.get(i));
  
        // Replica um dado do formulário da solicitação filha para o formulário da solicitação pai
        var obs = childCardData.get("obs");
        hAPI.setCardValue("obs", obs );
        }


			   */
		   }	   
	}
