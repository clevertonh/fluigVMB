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
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");		
	//RECUPERA CODIGO DA SOLICITAÇÃO
	var codSolicitacao 	 = getValue("WKNumProces");
	//VERIFICA QUAL A PROXIMA ATIVIDADE
	var nextAtv  		 = getValue("WKNextState");
	
	var vooComprado		 = hAPI.getCardValue("vooComprado");
	var hotelComprado	 = hAPI.getCardValue("hotelComprado");					
	var valorDiarias 	 = hAPI.getCardValue("vl_diarias");
	var recebeDiarias 	 = hAPI.getCardValue("recebediarias");
	var dataVencimento 	 = hAPI.getCardValue("dtPgto");
	
	//VARIAVEIS SIMPLES
	var aItemServico = new Array();
	
	/*
	 * verifica se foi adicionado anexo. 
	 * Pois quando tem anexo é obrigatório marcar algo como comprado
	 * */
	 var anexos   = hAPI.listAttachments();
     var temAnexo = false;
	
	
     	if (ativAtual == COMPRARPASSAGEM && ( vooComprado == '' && hotelComprado == '') || ( vooComprado == null && hotelComprado == null) ){
     	     if (anexos.size() > 0) {
     	          temAnexo = true;
     	      }

     	      if (temAnexo) {
     	          throw "Você anexou um bilhete e/ou voucher então é necessário indicar qual serviço foi comprado!";
     	      }

     	}
     
     	if (ativAtual == COMPRARPASSAGEM && ( vooComprado == 'sim' || hotelComprado == 'sim' ) ) {
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
 		  			constraint.push(DatasetFactory.createConstraint("SOLICITACAO", codSolicitacao, codSolicitacao, ConstraintType.MUST));     
 		  			  
 		  			//Cria constraints para enviar produtos e valores
 		  			for (var a=0; a<aItemServico.length; a++){
 		  				constraint.push(DatasetFactory.createConstraint("produto", aItemServico[a].produto, aItemServico[a].produto, ConstraintType.MUST));  
 		  				constraint.push(DatasetFactory.createConstraint("quantidade", aItemServico[a].quantidade, aItemServico[a].quantidade, ConstraintType.MUST));
 		  				constraint.push(DatasetFactory.createConstraint("valor", aItemServico[a].valor, aItemServico[a].valor, ConstraintType.MUST)); 
 		  			}
 		  			
 		  		    var resultDateset = DatasetFactory.getDataset("VM_MATA110", null, constraint, null);
 		  		    
 		  		    if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
 		  		    	throw resultDateset.getValue(0,"RETORNO");
 		  		    } 
 		  		}	
     	}
	   	//INTEGRAÇÃO COM ROTINA DO CONTAS A PAGAR FINA050
		   else if ( ativAtual == PAGARDIARIAS && recebeDiarias == "sim") {		   
			   var constraint = new Array();		  			
	  			constraint.push(DatasetFactory.createConstraint("SOLICITACAO", codSolicitacao, codSolicitacao, ConstraintType.MUST));     
	  			constraint.push(DatasetFactory.createConstraint("valorDiarias", valorDiarias, valorDiarias, ConstraintType.MUST));  
	  			constraint.push(DatasetFactory.createConstraint("dataVencimento", dataVencimento, dataVencimento, ConstraintType.MUST));
	  			
	  			
	  			 var resultDateset = DatasetFactory.getDataset("VM_FINA050", null, constraint, null);
		  		    
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
			        
			        var itemServico = { 
							produto: ''+codproduto +'', 
							quantidade: 1, 				
							valor: '' + valor + ''
								};	
					
				   aItemServico.push(itemServico);
        
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

			   */
		   }	   
	}
