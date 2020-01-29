function validateForm(form){
	var INICIO =0;
	var ABERTURA = 4;
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
	
	
	//recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");	
    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    var usuariosubstituto = getValue('WKReplacement');
    
    if (usuariosubstituto != null){
    	usuarioLogado = usuariosubstituto;
    }
	
	 //variaveis usadas para validação de linhas repetidas no rateio
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    var dataRetirada;
    var dataAtual = new Date();
    
    //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	  if (statusUsuario == true ){
	      throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
	  }	
	  else {
		  if (activity == INICIO ||  activity == ABERTURA || activity == CORRIGIR ){
				 if (nextAtv == APROVACAO){
					 if (form.getValue("renovacao") == false || form.getValue("renovacao") == "") {
			              throw "Você deve indicar se a solicitação é uma renovação de locação de veículo ou não.";
			          }		 
					  if (form.getValue("renovacao") =="nao"){
						  if (form.getValue("localRetirada") == null || form.getValue("localRetirada") == "") {
				              throw "É obrigatório informar o local para retirada.";
				          }
					  }
					
					  if (form.getValue("localDevolucao") == null || form.getValue("localDevolucao") == "") {
			              throw "É obrigatório informar o local para devolução.";
			          }		  
					  if (form.getValue("dtRetirada") == null || form.getValue("dtRetirada") == "") {
			              throw "É obrigatório informar a data de retirada.";
			          }
					  if (form.getValue("dtDevolucao") == null || form.getValue("dtDevolucao") == "") {
			              throw "É obrigatório informar a data de devolução.";
			          }
					  if (form.getValue("capacidade") == null || form.getValue("capacidade") == "" ) {
			              throw "É obrigatório informar a capacidade para o veículo";
			          }
				
					  if (form.getValue("capacidade") > 7 ) {
			              throw "A locação de veículo só pode ocorrer para capacidade inferior ou igual a 7 lugares. Para veículos como ônibus e similares ou receptivo deve ser usado a solicitação de transfer. ";
			          }
					  
					  if (form.getValue("txtproduto") == ""  || form.getValue("txtproduto")  == null){
				        	 throw "Você precisa informar o tipo de veículo para gerar a solicitaçao de compra.";
				       }
					  
						if (form.getValue("valor") == ""  || form.getValue("valor")  == "0" ){
				         	 throw "Você precisa informar o valor maximo para contratação.";
				        }
						
						
				  	   var indexes = form.getChildrenIndexes("tableCondutor");            
			    	   
			           for (var i = 0; i < indexes.length; i++) {
			        	   var condutor = form.getValue("nomeCondutor___" + indexes[i]);
			               
				            if (condutor == null || condutor == "") {
				            	 throw "É obrigatório informar o nome do condutor. ";
				            }	                     	
			           	}

			          
			           //funções para validar informações financeiras
						validaLinhasPreenchidas();
						validaLinhasRepetidas();
						validaPercentualRateio();
						validaAtividades();		
				 }
				}
		   
			else if (activity == APROVACAO){
				var dataRetirada = new Date (convertStringToData(form.getValue("dtRetirada")));
				var dataDevolucao = new Date (convertStringToData(form.getValue("dtDevolucao")));		
				var dataAtual = new Date();
				
				 		if (nextAtv == 9){ //atividade 9 = verificar aprovação
				 			//valida se o aprovador marcou o campo de aprovacao ou reprovação
				 	        if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
				 	            throw "Você precisa indicar se a solicitação será aprovada, reprovada ou devolvida para correção.";
				 	        }

				 	        if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
				 	            throw "Você precisa informar o motivo para reprovação da solicitação.";
				 	        }
				 	        
				 			//valida se aprovador é diferente do solicitante
				 			if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
				 	          	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
				 	        }    
				 			
				 			
				 			if (form.getValue("aprovacao") == "aprovado"){
				 				//recebe data de retirada e faz conversão
				 				if (dataAtual > dataRetirada){
				 					throw "Essa solicitação não pode mais ser aprovada pois a data de retirada já se passou. Corrija a data de retirada do veículo ou devolva para correção do solicitante.";				
				 				}
				 				
				 				if (dataRetirada > dataDevolucao){
				 					throw "Data de retirada não pode ser maior que a data de devolução.";				
				 				}
				 				
				 			}

				 			
				 			//	form.setValue("justificativaReprovacao","solicitação não aprovada no tempo. Por isso foi rejeitada automaticamente pelo sistema.");
				 			
				 			
				 			//funções para validar informações financeiras
				 			validaLinhasPreenchidas();
				 			validaLinhasRepetidas();
				 			validaPercentualRateio();
				 			validaAtividades();
				 		}
		 		
				
			}
			else if (activity == COTAR){
				
		    	//convert data de inicio do serviço
				var dataInicioContrato = new Date (convertStringToData(form.getValue("dtInicioC")));
				var dataFimContrato = new Date (convertStringToData(form.getValue("dtFimC")));
				
				var dataInicioLocacao = new Date (convertStringToData(form.getValue("dtRetirada")));
				var dataFimLocacao = new Date (convertStringToData(form.getValue("dtDevolucao")));		
				var dataAtual = new Date();
				
				
					if (nextAtv == 53){
						if (form.getValue("cnpjcpf") == ""  || form.getValue("cnpjcpf")  == null ){
				         	 throw "Você precisa informar o CNPJ/CPF do fornecedor escolhido como melhor proposta.";
				        }
						if (form.getValue("condicaoPgto") == ""  || form.getValue("condicaoPgto")  == null ){
				        	 throw "Você precisa informar o campo de condição de pagamento.";
				       }
						if (form.getValue("contatoEmpresa") == ""  || form.getValue("contatoEmpresa")  == null ){
				       	 throw "Você precisa informar o nome e email de contato do fornecedor.";
						}	
						
						if (form.getValue("CotacaovalorMensal") == ""  || form.getValue("CotacaovalorMensal")  == null ){
					       	 throw "Você precisa informar o valor contratado do serviço";
							}	
						
						if (form.getValue("formapgto") == ""  || form.getValue("formapgto")  == null ){
					       	 throw "Você precisa informar o campo de período de pagamento";
							}	
						
						if (form.getValue("definicaoValor") == ""  || form.getValue("definicaoValor")  == null ){
					       	 throw "Você precisa informar o campo dde definição do valor";
							}	
						
						if (form.getValue("Numerocontrato") != null && form.getValue("Numerocontrato") != ""){
							if (parseFloat(form.getValue("saldoAtual")) <  parseFloat(form.getValue("CotacaovalorMensal"))){
								 throw "O contrato não possui saldo suficiente para contratar esse serviço.";
							}
							
									
							if ( dataAtual > dataFimContrato  ){
								throw "A contratação desse serviço não pode ser executada na data informada. Pois o contrato não está mais na vigência.";
							}
							
							
						}
						
						if ( dataAtual > dataInicioLocacao  ){
							throw "A contratação desse serviço não pode ser executada na data informada. Pois a data de hoje já ultrapassou a data de retirada .";
						}
					
					}

				
				
			}
	  }

	
	
    function consultaAfastamento(emailLogado){   	    	
  	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", emailLogado, emailLogado, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
			 
		 if (dataset.values.length >0 ) {		
			 return true;
	        	
	        }  
	        else {
	        	return false;
	        }	 
  }
    
    function bloqueiaAprovacaoForadoPrazo(){
    	
    }
    
    
    function retornaCPFAprovador(emailGestor){     
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("EMAIL_F", emailGestor, emailGestor, ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset("ds_get_Funcionario", null, constraints, null);

        if (dataset != null && dataset.values.length > 0) {
        	return dataset.getValue(0, "CPF");
        }  
        else {
        	return null;
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
  
   
     
     
     //VALIDA SE FOI INFORMADO ATIVIDADE ESTRUTURAL OU FOLHA E PROIBE USO
     function validaAtividades(){
    	   var indexes = form.getChildrenIndexes("tableItens");            
    	   
           for (var i = 0; i < indexes.length; i++) {
        	   var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
               var atividade = form.getValue("txtatividade___" + indexes[i]);
            
         if (ccusto == "99990") {             
                   if (atividade == "P952101" || atividade == "P953101" || atividade == "P650101") {
                       throw "Você não pode usar uma atividade do tipo CAM ou de GN para custear uma locação de veículo.";

                   }
               } 
               else {                	
            	   if (atividade == "E010101" || atividade == "E020201") {
                	   throw "Você não pode usar uma atividade de folha nem estrutural para custear uma locação de veículo.";

                   }
            	   if (atividade == "A450101"){
            		   throw "Você não pode usar uma atividade de capacitação para custear uma viagem.";
            	   }
              
                  }
           }
     }
	
     
   //recebe data do Fluig e convert para data normal
     function convertStringToData(StringToData) {
         //variavel para armazenar a data limite para aprovação   
         var data = StringToData.split('/');

         return new Date(data[1] + "/" + data[0] + "/" + data[2]);
     }  
	
}