function validateForm(form){
	var ABERTURA = 4;
	var APROVACAO =5;
	var COTACAO = 15;
	var CORRIGIR = 12;
	var VALIDAR_RH = 30;
	var SOLICITAR_APROVACAO = 28;
	var APROVACAO_SERVICO = 36;
	var SOLICITAR_CONTRATO = 37;
	var SOLICITACAO_CONTRATO = 43;
	var VERIFICAR_ASSINATURA = 44;
	var FINALIZAR = 48;
	
	
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	var solicitante = getValue("WKUser");  
	
	 //variaveis usadas para validação de linhas repetidas no rateio
	 var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();

    
    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    var usuariosubstituto = getValue('WKReplacement');
    
    if (usuariosubstituto != null){
    	usuarioLogado = usuariosubstituto;
    }
	
    //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	if (statusUsuario == true ){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
	}
	
	
    validaLinhasPreenchidas();
    validaLinhasRepetidas();
    validaPercentualRateio();
    validaAtividades();
	
    
    if (activity == ABERTURA || activity == CORRIGIR){
    	if (nextAtv == APROVACAO){

        	if (form.getValue("emailSolicitante") == "" || form.getValue("emailSolicitante") == null  ) {
                throw "Seus dados de solicitante não foram preenchidos, caso não esteja de férias, atualize a página e inicie novamente a solicitação.";
            }
        	
        	if ( form.getValue("dtSolicitacao") == "" || form.getValue("dtSolicitacao") == null){
        		  throw "A data da solicitação não foi preenchida pelo sistema, atualize a página e inicie novamente a solicitação.";
        	}
        	
        	if (form.getValue("localsaida") == "" || form.getValue("localsaida") == null ){
        		 throw "Você precisa informar o endereço completo de saída";
        	}
        	
        	if (form.getValue("localDestino") == "" || form.getValue("localDestino") == null ){
       		 throw "Você precisa informar o endereço completo de destino";
        	}
        	
        	if (form.getValue("localRetorno") == "" || form.getValue("localRetorno") == null ){
       		 throw "Você precisa informar o local de retorno.";
        	}
        	
        	if (form.getValue("dtSaida") == "" || form.getValue("dtSaida") == null ){
          		 throw "Você precisa informar a data e horário de saída.";
           	}
        	
        	if (form.getValue("dtRetorno") == "" || form.getValue("dtRetorno") == null ){
          		 throw "Você precisa informar a data e horário para retorno.";
           	}
        	
        	if (form.getValue("quantidade") == "" || form.getValue("quantidade") == null ){
         		 throw "Você precisa indicar a quantidade de veículos desejado.";
          	}
       	
        	
        	if (form.getValue("capacidade") == "" || form.getValue("capacidade") == null ){
         		 throw "Você precisa indicar a capacidade de passageiros por veículo";
          	}
       	
        	
        	if (form.getValue("contato") == "" || form.getValue("contato") == null ){
         		 throw "Você precisa informar o nome da pessoa de contato no dia da viagem.";
          	}
        	
        	if (form.getValue("telefone") == "" || form.getValue("telefone") == null ){
        		 throw "Você precisa informar o telefone da pessoa de contato no dia da viagem.";
         	}
      	
        	if (form.getValue("finalidade") == "" || form.getValue("finalidade") == null ){
       		 throw "Você precisa informar a finalidade da viagem.";
        	}
        	
        	if (form.getValue("valor") == "" || form.getValue("valor") == 0 ){
          		 throw "Você precisa informar o valor máximo para contratação do serviço.";
           	}
        	
        	if (form.getValue("txtproduto") == "" || form.getValue("txtproduto") == null ){
          		 throw "Você precisa secionar o tipo de veículo";
           	}
        	
        	if (form.getValue("dataset_solicitacaoevento") == "" || form.getValue("dataset_solicitacaoevento") == null ){
         		 throw "Você precisa vincular a solicitação a um evento.";
          	}
    	}
    	
    	
    	
    }
    else if (activity == APROVACAO){
    	 if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
             throw "Você precisa indicar se a solicitação será aprovada, reprovada ou devolvida para correção.";
         }

         if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
             throw "Você precisa informar o motivo para reprovação da solicitação.";
         }
   	        
         if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
       	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
         }     
         
    }
    else if (activity == COTACAO){
    		if (nextAtv == 26){ //verificar tipo de PJ
    			  if (form.getValue("cnpjcpf") == null  || form.getValue("cnpjcpf")  == "" ){
 		          	 throw "Você precisa selecionar o fornecedor vencedor da cotação.";
 		        } 
 			
 				if (form.getValue("condicaoPgto") == null  || form.getValue("condicaoPgto")  == "" ){
 		        	 throw "É preciso informar o campo Forma de pagamento.";
 		       } 
 				
 				if (form.getValue("negociacao") == null  || form.getValue("negociacao")  == "" ){
		         	 throw "O campo de negociação deve ser preenchida.";
		        } 
 				
 			   
 			   if (form.getValue("CotacaovalorMensal") == null || form.getValue("CotacaovalorMensal") == "" || parseFloat(form.getValue("CotacaovalorMensal")) == 0) {
			            throw "Você precisa informar qual o valor mensal do serviço.";
			        }
 			   
    	    	 if (form.getValue("formapgto") == null || form.getValue("formapgto") == "") {
    		            throw "Você precisa informar o campo período de pagamento.";
    		        }
    			   if (form.getValue("definicaoValor") == null || form.getValue("definicaoValor") == "") {
    		            throw "Você precisa informar o campo de definição de valor.";
    		        }
    			   if (form.getValue("competencia") == null || form.getValue("competencia") == "") {
   		            throw "Você precisa informar o campo Mês de competencia.";
   		        }
    			   
    			   if (form.getValue("Anocompetencia") == null || form.getValue("Anocompetencia") == "") {
      		            throw "Você precisa informar o campo Ano de competencia.";
      		        }
    			   
    			 
    				
    				if (form.getValue("melhorProposta") == "nao" ){
    					if (form.getValue("justificativaP") =="" || form.getValue("justificativaP") == null){
    						throw "É preciso informar o motivo por não estar escolhendo o fornecedor de menor valor.";
    					}
    				}
    						
    				if (parseFloat(form.getValue("saldoAtual")) <  parseFloat(form.getValue("CotacaovalorAnual"))){
    					throw "O contrato não possui saldo suficiente para contratar essa prestação de serviço.";
    				}
    				
    				if (form.getValue("Numerocontrato") != "" && form.getValue("Numerocontrato") != null){
    					/*
    					//convert data fim do serviço
    					var dataFinal = convertStringToData(form.getValue("dtFim"));
    					var dtVigencia = convertStringToData(form.getValue("dtFimC"));
    					
    					if (dtVigencia < dataFinal){
    						//throw "A contratação desse serviço não pode ser vinculada a esse contrato pois a data final informada supera a vigência do contrato.";
    					}
    					*/
    				}

    		}

    }
    
    
    
  //VALIDA SE AS LINHAS FORAM PREENCHIDAS CORRETAMENTE
    function validaLinhasPreenchidas(){
   	   var indexes = form.getChildrenIndexes("tableItens");            
   	   
          for (var i = 0; i < indexes.length; i++) {
              var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
              var projeto = form.getValue("txtprojeto___" + indexes[i]);
              var area = form.getValue("txtareaestrategica___" + indexes[i]);
              var categoria = form.getValue("txtcategoria___" + indexes[i]);
              var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
              var atividade = form.getValue("txtatividade___" + indexes[i]);
           
        if (ccusto == "99990") {
                  if (projeto == null || projeto == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo projeto não foi informado";

                  }
             
                  if (area == null || area == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo area estratégica não foi informado";

                  }
                  if (categoria == null || categoria == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo categoria não foi informado";

                  }
                  if (fonte == null || fonte == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo fonte de financiamento não foi informado";

                  }
                  if (atividade == null || atividade == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                  }
              } 
              else {                	
                  if (ccusto == null || ccusto == "") {
                      //    fieldValue = 0;
                      throw "Existem linhas no rateio de pagamento cujo campo centro de custo não foi informado.";

                  }

                  
                  if (atividade == null || atividade == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                  }
             
                 }
          }
    }
    
    
  //VALIDA SE FOI INFORMADO ATIVIDADE ESTRUTURAL OU FOLHA E PROIBE USO
    function validaAtividades(){
   	   var indexes = form.getChildrenIndexes("tableItens");            
   	   
          for (var i = 0; i < indexes.length; i++) {
       	   var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
              var atividade = form.getValue("txtatividade___" + indexes[i]);
           
        if (ccusto == "99990") {             
                  if (atividade == "P952101" || atividade == "P953101" || atividade == "P650101") {
                      throw "Você não pode usar uma atividade do tipo CAM ou de GN.";

                  }
              } 
              else {                	
           	   		if (atividade == "E010101" || atividade == "E020201") {
           	   			throw "Você não pode usar uma atividade de folha ou estutural.";

           	   		}
	           	   	 if (atividade == "A450101"){
	          		   throw "Você não pode usar uma atividade de capacitação.";
	          	   }
             
                 }
          }
    }
    
    function validaLinhasRepetidas(){
        ///VALIDA LINHAS REPETIDAS
            var indexes = form.getChildrenIndexes("tableItens");            
           
            for (var i = 0; i < indexes.length; i++) {
                var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
                var projeto = form.getValue("txtprojeto___" + indexes[i]);
                var area = form.getValue("txtareaestrategica___" + indexes[i]);
                var categoria = form.getValue("txtcategoria___" + indexes[i]);
                var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
                var atividade = form.getValue("txtatividade___" + indexes[i]);
 
				if (aCentroCusto.length > 0){
                    		//log.info("Segunda linha do rateio de projeto");
                    		for (var a=0; a < aCentroCusto.length ; a++){
                    				if (aCentroCusto[a] == ccusto && aProjeto[a] == projeto && aArea[a] == area && aCategoria[a] == categoria && aFonte[a] == fonte && aAtividade[a] == atividade  ) {
                    					 throw "Existem linhas do rateio repetidas.";
                    				}
                				
                    		}
                    		
                    		//log.info("Adiciona os dados do projeto atual no array");
							aCentroCusto.push(ccusto);	
                    		aProjeto.push(projeto);	
                    		aCategoria.push(categoria);
                    		aFonte.push(fonte);
                    		aAtividade.push(atividade);
                    		aArea.push(area);
                    		
                 }
                 else {
                   		//log.info("Adiciona a primeira linha de dados do projeto ao array");
                   		aCentroCusto.push(ccusto);	
						aProjeto.push(projeto);	
                    	aCategoria.push(categoria);
                    	aFonte.push(fonte);
                    	aAtividade.push(atividade);
                    	aArea.push(area);
                 }
               
            }
        
    }
    
     function validaPercentualRateio(){
         //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO
             var indexes = form.getChildrenIndexes("tableItens");
             var total = 0;

             for (var i = 0; i < indexes.length; i++) {
                 //var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
                 var fieldValue = parseFloat(form.getValue("percentual___" + indexes[i]));                   
                 if (isNaN(fieldValue)) {
                     throw "Existem linhas sem percentual informado no rateio de pagamento.";

                 }

                 total = total + fieldValue;	        
             }
             
             //if ((total < 100) || total > 100) {
             if ((total.toFixed(2) < 100) || total.toFixed(2) > 100) {
                 throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
             }
         
     }
     
     function retornaEmailUsuario(userId){
       	 var constraints   = new Array();
    		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST));
    		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
    			
    	        if (dataset != null && dataset.values.length > 0) {
    	        	return dataset.getValue(0, "mail");
    	        }  
    	        else {
    	        	return null;
    	        }	    
       }

    	
        function consultaAfastamento(email){   	    	
       	 	 var constraints   = new Array();
    		 constraints.push(DatasetFactory.createConstraint("EMAIL", email, email, ConstraintType.MUST));
    		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
    		 
    		// log.info("usuario afastado");
    		// log.dir(dataset);
    		 
    		 if (dataset.values.length >0 ) {
    		//	 log.info("Usuario afastado");
    			 return true;
    	        	
    	        }  
    	        else {
    	       // 	log.info("Usuario não afastado");
    	        	return false;
    	        }	 
       }
}