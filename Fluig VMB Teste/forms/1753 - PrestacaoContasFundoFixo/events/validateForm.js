function validateForm(form){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;
	var PRESTAR_CONTAS = 38;
	var VALIDAR_NOTA = 39;
		
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    
    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
	
	 //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	if (statusUsuario == true ){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação/tarefa em nossos sistemas!";
	}
	

	if (activity == ABERTURA){
		if (form.getValue("emailSolicitante")==""){
			throw "Seus dados de usuário não foram carregados, por favor tente novamente mais tarde.";
		}
	}
   

	else if (activity == PRESTAR_CONTAS){
		if (form.getValue("vl_nota") == "" ){
			throw "Você precisa informar o valor da nota fiscal.";
		}				
		
		//validações tabela de pagamento
	    validaLinhasPreenchidas();
	    validaLinhasRepetidas();
	    validaPercentualRateio();
	    validaAtividades();
	    
	}
	else if (activity == VALIDAR_NOTA) {	
		if (form.getValue("vl_nota") == "" ){
			throw "Você precisa informar o valor da nota fiscal.";
		}				
		
		else if (form.getValue("responsavel")==""){
			throw "O responsável pelo fundo fixo não foi informado.";
		}	
		else if (form.getValue("cpfbeneficiario")==""){
			throw "O CPF do beneficiário não foi preenchido. Selecione novamente o responsável pelo fundo fixo.";
		}
		else if (form.getValue("dtNota")==""){
			throw "A data da nota fiscal não foi informada.";
		}
		else if (form.getValue("tipoffx")==""){
			throw "O tipo de fundo fixo não foi selecionado.";
		}
	
		 //validações tabela de pagamento
	    validaLinhasPreenchidas();
	    validaLinhasRepetidas();
	    validaPercentualRateio();
	    validaAtividades();
	    
	    //valida campos do produto
		validaProdutos();
	    

		
	}
	
	else if (activity == APROVACAO){
		if (form.getValue("vl_nota") == "" ){
			throw "Você precisa informar o valor da nota fiscal.";
		}		
		else if (form.getValue("responsavel")==""){
			throw "O responsável pelo fundo fixo não foi informado.";
		}	
		else if (form.getValue("cpfbeneficiario")==""){
			throw "O CPF do beneficiário não foi preenchido. Selecione novamente o responsável pelo fundo fixo.";
		}
		else if (form.getValue("dtNota")==""){
			throw "A data da nota fiscal não foi informada.";
		}
		else if (form.getValue("tipoffx")==""){
			throw "O tipo de fundo fixo não foi selecionado.";
		}		
		else if (form.getValue("validacao") == "" || form.getValue("validacao") == null){
			throw "Você precisa escolher entre as opções de validado ou negado.";
		}
		
		else if (form.getValue("validacao") == "negado" &&  form.getValue("justificativaReprovacao") == ""){
			throw "Você precisa justificar o motivo de ter reprovado o pagamento.";
		}
		else if (form.getValue("emailAprovador") == "" ){
			throw "Seu email não foi carregado, tente novamente mais tarde!";
		}	
		
		else if (form.getValue("emailSolicitante") ==  email ){
		//	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
		}
		else if (form.getValue("cpfbeneficiario") == retornaCPFAprovador(email)){
       	 //throw "Você não pode aprovar uma solicitação onde você é o beneficiário.";
        }
		
		 //validações tabela de pagamento
	    validaLinhasPreenchidas();
	    validaLinhasRepetidas();
	    validaPercentualRateio();
	    validaAtividades();
	    
	  //valida campos do produto
		validaProdutos();
	    
	}
	
	
    function consultaAfastamento(emailLogado){   	    	
 	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", emailLogado, emailLogado, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
		 
		 
		 if (dataset.values.length >0 ) {
			 return true;
	        	
	        }  
	        else {
	        	//log.info("Usuario não afastado");
	        	return false;
	        }	 
 }
   
        
            
            
            function retornaCPFAprovador(email){

                if (email != null && email.length>0){
                	  var constraints = new Array();
                      constraints.push(DatasetFactory.createConstraint("EMAIL_F", email, email, ConstraintType.MUST));
                      var dataset = DatasetFactory.getDataset("ds_get_Funcionario", null, constraints, null);

                      if (dataset != null && dataset.values.length > 0) {
                      	return dataset.getValue(0, "CPF");
                      }  
                      else {
                      	return null;
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
                              throw "Você não pode usar uma atividade do tipo CAM.";

                          }
                      }                    
                  }
            }


            ///VALIDA LINHAS REPETIDAS
            function validaLinhasRepetidas(){
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
            
            
            //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO
             function validaPercentualRateio(){
                     var indexes = form.getChildrenIndexes("tableItens");
                     var total = 0;
                     
                     for (var i = 0; i < indexes.length; i++) {                    
                    	 var fieldValue = parseFloat(form.getValue("percentual___" + indexes[i]));                    	 
                    	 if (isNaN(fieldValue)) {
                             throw "Existem linhas sem percentual informado no rateio de pagamento.";

                         }

                    	 total = total + fieldValue;	        
                     }
                     
//                     log.info('TOTAL RATEIO 3');
//                     log.info(total.toFixed(2));
                     
                     if ((total.toFixed(2) < 100) || total.toFixed(2) > 100) {
                         throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
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
             
             
             //VALIDA SE FOI INFORMADO PELO MENOS 1 SERVIÇO E SE TODOS OS CAMPOS FORAM PREENCHIDOS
             function validaProdutos(){
            	   var indexes = form.getChildrenIndexes("tableCompras");            
            	   
            	   if (indexes.length == 0 ){
           			 throw "É obrigatório informar pelo menos um item da nota fiscal";
           		  	}
            	   	else {
           	 	   
                      for (var i = 0; i < indexes.length; i++) {
                          var produto = form.getValue("txtproduto___" + indexes[i]);
                          var valor = form.getValue("vrTotUnit___" + indexes[i]);                    
                          var historico = form.getValue("historico___" + indexes[i]);       
                   
                          if (produto == "" || produto === null){
                          	throw "O produto não foi informado!";
                          }
                          else if (valor == "" || valor === null || valor == 0){
                          	throw "O valor não foi informado ou deve ser maior que zero!";
                          }
                          else if (historico == "" || historico === null ){
                             	throw "O historico não foi informado";
                             }
                          
                          
                      }   
           		  }
                 
             }
         	
             
}

