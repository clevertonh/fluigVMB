function validateForm(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO = 22;
	var SOLICITAR_APROVACAO = 206;
	var APROVACAO_SERVICO = 94;
	var SOLICITACAO_CONTRATO = 66;
	var VERIFICAR_APROVACAO = 151;
	var FINALIZAR = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATURA = 270;
	var APROVACAO_DIR = 292;
	var APROVACAO_DN = 301;
	
	
	//recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");	
		
	 //variaveis usadas para validação de linhas repetidas no rateio
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    
    var dataAtual = new Date();	
	var dataAtualString = convertDataToString(dataAtual);	
	var dataAtualConvertida = new Date (convertStringToData(dataAtualString));
	
	
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
	
	
	if (activity == SOLICITAR || activity == CORRIGIR){
	
			if (form.getValue("solicitante") == null || form.getValue("solicitante") == "") {
	            throw "Seus dados de solicitante não foram carregados, por favor, atualize o navegador e tente novamente. Se o erro persistir, entre em contato com o setor de Sistemas.";
	        }
		 
			
			if (form.getValue("carregaCusto") != "pagamento"){
				//funções para validar informações financeiras
				validaLinhasPreenchidas();
				validaLinhasRepetidas();
				validaPercentualRateio();
				validaAtividades();
				
			}
			else {
				 var indexes = form.getChildrenIndexes("tableItens");  
				 
				 if (indexes.length > 0){
					 throw "Você marcou que os dados de centro de custo serão informados apenas no pagamento. Remova os dados financeiros.";
				 }
			}
		 
			if (form.getValue("carregaCusto") == "pagamento"){
					if (form.getValue("definicaoValor") == "fixo"){
						throw "O campo de informar centro de custo apenas no pagamento só pode ser usado em conjunto com pagamentos por demanda.";
					}
				 
			}
			
			
			if(form.getValue("matriculaApr") == "" || form.getValue("matriculaApr") == null){
				throw "Não possível idenficar o seu gerente imediato. Por favor, entre em contato com o setor de Recursos Humanos.";
			}
			
			
			if(form.getValue("matriculaAprDirArea") == "" || form.getValue("matriculaAprDirArea") == null){
				throw "Não possível idenficar o diretor de sua área. Por favor, abra um chamado para o setor de TI.";
			}
			
		validaCamposPreenchidos();
		
		
		//convert data de inicio do serviço
		var dataInicio = new Date (convertStringToData(form.getValue("dtInicio")));
				
		if ( dataAtualConvertida > dataInicio  ){
			throw "A contratação desse serviço não pode mais ser iniciada na data indicada. Por favor, altere a data de inicio para uma data no futuro.";
		}
			
	}
   
	else if (activity == APROVACAO_GESTOR){
			if (nextAtv == 17){
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

				
				if (form.getValue("carregaCusto") != "pagamento"){
					//funções para validar informações financeiras
					validaLinhasPreenchidas();
					validaLinhasRepetidas();
					validaPercentualRateio();
					validaAtividades();
					
				}
				else {
					 var indexes = form.getChildrenIndexes("tableItens");  
					 
					 if (indexes.length > 0){
						 throw "Você marcou que os dados de centro de custo serão informados apenas no pagamento. Remova os dados financeiros.";
					 }
				}
				
				
				//convert data de inicio do serviço
				var dataInicio = new Date (convertStringToData(form.getValue("dtInicio")));
						
				if ( dataAtualConvertida > dataInicio  ){
					throw "A contratação desse serviço não pode mais ser aprovada para iniciar na data informada. Por favor, altere a data de inicio do serviço.";
				}
				
				validaCamposPreenchidos();
				
				
				
				
			}
	}
	else if (activity == APROVACAO_DIR){
		
			if (nextAtv == 295){
				//valida se o aprovador marcou o campo de aprovacao ou reprovação
		        if (form.getValue("aprNivel2") == false || form.getValue("aprNivel2") == "") {
		            throw "Você precisa indicar se a solicitação será aprovada ou reprovada.";
		        }
		        
		        
		    	//convert data de inicio do serviço
				var dataInicio = new Date (convertStringToData(form.getValue("dtInicio")));
						
				if ( dataAtualConvertida > dataInicio  ){
					throw "A contratação desse serviço não pode mais ser aprovada para iniciar na data informada. Por favor, altere a data de inicio do serviço.";
				}
			}

	}
	
	else if (activity == APROVACAO_DN){
			if (nextAtv == 304){
				//valida se o aprovador marcou o campo de aprovacao ou reprovação
		        if (form.getValue("aprNivel3") == false || form.getValue("aprNivel3") == "") {
		            throw "Você precisa indicar se a solicitação será aprovada ou reprovada.";
		        }
			
		    	//convert data de inicio do serviço
				var dataInicio = new Date (convertStringToData(form.getValue("dtInicio")));
						
				if ( dataAtualConvertida > dataInicio  ){
					throw "A contratação desse serviço não pode mais ser aprovada para iniciar na data informada. Por favor, altere a data de inicio do serviço.";
				}
			}

	}
	
	else if ( activity == REALIZAR_COTACAO && nextAtv == 281 ){
		var dataFimContrato = new Date (convertStringToData(form.getValue("dtFimC")));
		var dataFimServico = new Date (convertStringToData(form.getValue("dtFim")));
		var dataInicioServico = new Date (convertStringToData(form.getValue("dtInicio")));
		
		
		
		//valida se aprovador é diferente do solicitante
		if (form.getValue("cnpjcpf") == null  || form.getValue("cnpjcpf")  == "" ){
          	 throw "Você precisa selecionar o fornecedor vencedor da cotação.";
        } 
		if (form.getValue("negociacao") == null  || form.getValue("negociacao")  == "" ){
         	 throw "O campo de negociação deve ser preenchida.";
        } 
		if (form.getValue("condicaoPgto") == null  || form.getValue("condicaoPgto")  == "" ){
        	 throw "É preciso informar o campo Forma de pagamento.";
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
			if ( dataFimServico > dataFimContrato  ){
				throw "A contratação desse serviço não pode ser vinculada a esse contrato pois a data final informada supera a vigência do contrato. Altera data final do serviço ou não vincule o contrato a esse processo.";
			}
			
			
			if ( dataAtualConvertida > dataFimContrato  ){
				throw "A contratação desse serviço não pode ser vinculada a esse contrato pois não está mais sobre a vigência do contrato.";
			}
			
			
				
		}
		
		if ( dataAtualConvertida > dataInicioServico  ){
				throw "A contratação desse serviço não pode mais ser realizada na data informada. Por favor, altere a data de inicio do serviço.";
		}
			
		
		  if ( parseFloat(form.getValue("CotacaovalorAnual"))  < parseFloat(form.getValue("CotacaovalorMensal")) ){
			   throw "A cotação anual não pode ser menor que a cotação mensal.";
		   }
		
		
		if (form.getValue("definicaoValor") =="fixo"){
		      //VALIDA SE FOI INFORMADO PELO MENOS 1 SERVIÇO E SE TODOS OS CAMPOS FORAM PREENCHIDOS
	
		     	   var indexes = form.getChildrenIndexes("tableServico");            
		     	   
		  
		     		  if (indexes.length == 0 ){
		     			 throw "É obrigatório informar pelo menos um item de serviço!";
		     		  }
		     		  else {
		     	         for (var i = 0; i < indexes.length; i++) {
		                     var produto = form.getValue("txtproduto___" + indexes[i]);
		              
		                     if (produto == "" || produto === null){
		                     	throw "O serviço contratado não foi informado";
		                     }
		                     
		                 } 
		     		  }

		     
		
		
		
		}
		
		if (form.getValue("definicaoValor") =="fixo"){
			  //CONTRATAÇÃO DO TIPO FIXO NÃO PODE TER VINCULO COM CONTRATO ANUAL
    		 if (form.getValue("Numerocontrato") != "" && form.getValue("Numerocontrato") != null){		
    			 throw "Contratações de serviços definido com valores fixos não podem ter vinculo com contrato anual.";
    		 }
		}
		
		
	}
	else if (activity ==  VALIDAR_RH){
			if (form.getValue("valido") == "" || form.getValue("valido") == null ){
				throw "Você precisa indicar se esse fornecedor esta apto para prestar serviço segundo a legislação trabalhista.";
			}
			
			if (form.getValue("justificativaRH") == "" || form.getValue("justificativaRH") == null ){
				throw "Você precisa informar o campo de Observação!";
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
    
    
  //recebe data JS e convert para data FLuig
    function convertDataToString(dataToString) {
        var dia;

        //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
        var mes = dataToString.getMonth() + 1;

        if (dataToString.getDate().toString().length == 1) {
            dia = dataToString.getDate();
            dia = "0" + dia.toString();

        } else {
            dia = dataToString.getDate();

        }

        //converte mes
        if (mes.toString().length == 1) {
            mes = "0" + mes.toString();

        }
        //else {mes = dataToString.getMonth() + 1;}


        //novo formato de data: para salvar em campos data do Fluig
        return dia + "/" + mes + "/" + dataToString.getFullYear();


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

    
    function existeGrupo(usuario){
   		var constraint = new Array();
   		constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuario, usuario, ConstraintType.MUST));
   		constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "RH", "RH", ConstraintType.MUST));
   		var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraint, null);
   		return dataset.rowsCount > 0;
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
  
     //VALIDA SE FOI INFORMADO PELO MENOS 1 SERVIÇO E SE TODOS OS CAMPOS FORAM PREENCHIDOS
     function validaProdutos(){
    	   var indexes = form.getChildrenIndexes("tableCompras");            
    	   
           for (var i = 0; i < indexes.length; i++) {
               var produto = form.getValue("txtproduto___" + indexes[i]);
               var valor = form.getValue("vrTotUnit___" + indexes[i]);
               var dataViagem = form.getValue("dtNecessidade___" + indexes[i]);      
               var quantidade = form.getValue("id_quantidade___" + indexes[i]);      
        
               if (produto == "" || produto === null){
               	throw "O produto não foi informado!";
               }
               else if (valor == "" || valor === null || valor == 0){
               	throw "O valor empenhado para o produto não foi informado ou deve ser maior que zero!";
               }
               else if (dataViagem == "" || dataViagem === null){
               	throw "A data de necessidade  não foi informada!";
               }
               else if (quantidade == "" || quantidade === null || quantidade == 0){
                  	throw "A quantidade não foi informado ou deve ser maior que zero!";
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
                   if (atividade == "P952101" || atividade == "P953101" ) {
                       throw "Você não pode usar uma atividade do tipo CAM para custear uma compra.";

                   }
               }           
           }
     }
	
     
     function validaCamposPreenchidos(){
    	 if (form.getValue("resumo") == null || form.getValue("resumo") == "") {
	            throw "Você precisa informar o campo resumo do serviço";
	        }
		   if (form.getValue("objetivos") == null || form.getValue("objetivos") == "") {
	            throw "Você precisa informar o campo objetivo";
	        }
		   if (form.getValue("justificativa") == null || form.getValue("justificativa") == "") {
	            throw "Você precisa informar o campo justificativa";
	        }
		   if (form.getValue("resultados") == null || form.getValue("resultados") == "") {
	            throw "Você precisa informar o campo resutlado";
	        }
		   if (form.getValue("localServico") == null || form.getValue("localServico") == "") {
	            throw "Você precisa informar o o campo local de realização do serviço";
	        }
		   if (form.getValue("perfil") == null || form.getValue("perfil") == "") {
	            throw "Você precisa informar o tipo de perfil.";
	        }
		   if (form.getValue("supervisao") == null || form.getValue("supervisao") == "") {
	            throw "Você precisa informar quem é o supervisor/responsável pelas atividades.";
	        }
		
		   if (form.getValue("dtInicio") == null || form.getValue("dtInicio") == "") {
	            throw "Você precisa informar a data prevista para inicio da execução do serviço.";
	        }
		   if (form.getValue("dtFim") == null || form.getValue("dtFim") == "") {
	            throw "Você precisa informar a data de termino da execução do serviço.";
	        }
		   
		   if (form.getValue("formapgto") == null || form.getValue("formapgto") == "") {
	            throw "Você precisa informar o campo período de pagamento.";
	        }
		   if (form.getValue("definicaoValor") == null || form.getValue("definicaoValor") == "") {
	            throw "Você precisa informar o campo de definição de valor.";
	        }
		   
		   if (form.getValue("definicaoValor") == "fixo"){
			
			   if (form.getValue("valorMensal") == null || form.getValue("valorMensal") == "" || parseFloat(form.getValue("valorMensal")) == 0) {
		            throw "Você precisa informar qual o valor mensal do serviço.";
		        }
		   }
		   
		   if (form.getValue("valorAnual") == null || form.getValue("valorAnual") == "" || parseFloat(form.getValue("valorAnual")) == 0) {
	            throw "Você precisa informar o valor total ou o valor limite total para a vigência do contrato.";
	        }
		   
		   if ( parseFloat(form.getValue("valorAnual"))  < parseFloat(form.getValue("valorMensal")) ){
			   throw "O valor total ou limite total não pode ser menor que o valor mensal.";
		   }
		   
		   if ( form.getValue("carregaCusto") == "" || form.getValue("carregaCusto") == null ){
			   throw "O campo com a informação de Centro de custo/projeto será informado no pagamento ou agora precisa ser preenchido.";
		   }
		   
     }
	
   //recebe data do Fluig e convert para data normal
     function convertStringToData(StringToData) {
         //variavel para armazenar a data limite para aprovação   
         var data = StringToData.split('/');

         return new Date(data[1] + "/" + data[0] + "/" + data[2]);
     }
     
     
}



