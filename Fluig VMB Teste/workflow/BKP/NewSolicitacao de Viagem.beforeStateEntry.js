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
	
	//VARIAVEIS SIMPLES
	var aItemServico = new Array();
		
    
	   if (ativAtual == COMPRARPASSAGEM && ( vooComprado == 'sim' || hotelComprado == 'sim' ) ) {
		   //log.info('ATIVIDADE ATUAL DE COMPRA PASSAGEM : '+ ativAtual);
	
		  		//EXECUTA FUNÇÃO QUE RETORNA PRODUTOS A SEREM GERADOS PARA SOLICITAÇÃO DE VIAGEM
		  		itensServico();
				
		  		if (aItemServico.length >0){
		    			
		  			var constraint = new Array();		  			
		  			constraint.push(DatasetFactory.createConstraint("metadata#id", "1579", "1579", ConstraintType.MUST));     
		  			  
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
	 	//Função que recupera os itens de compra da solicitação de viagem   
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
			        
			        aItemServico.push(addItemViagem(codproduto,valor));
			        			        
			    }
			}
			
		 }	  
		
	}

