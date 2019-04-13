function validateForm(form){
	
	var ABERTURA = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	var GATEWAYVALIDARDOCUMENTO = 21;
	
	
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
	
	//consulta situação atual do solicitante
	var statusUsuario = consultaAfastamento();
	
	if (statusUsuario != false){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
	}
	

	
  //validações tabela de pagamento
    validaLinhasPreenchidas();
    validaLinhasRepetidas();
    validaPercentualRateio();
    validaAtividades();
    
    
	if (activity == ABERTURA && nextAtv == APROVACAO_GESTOR) {
		
		
		if (form.getValue("vl_rmb") == "" ){
			throw "Você precisa informar o valor a ser reembolsado.";
		}		
		
		else if (form.getValue("emailSolicitante")==""){
			throw "Seus dados de usuário não foram carregados, por favor tente novamente mais tarde.";
		}
		
		else if (form.getValue("emailSolicitante")==""){
			throw "Seu aprovador não foi carregado automaticamente. Tente novamente mais tarde, se o problema persisti, entre em contato com o setor de TI.";
		}
		else if (form.getValue("Funcionario")==""){
			throw "Você precisa selecionar o funcionário que receberá o reembolso.";
		}
		else if (form.getValue("cpfbeneficiario")==""){
			throw "O CPF do beneficiário não foi preenchido. Entre em contato com o setor de TI.";
		}
		else if (form.getValue("dependente")==""){
			throw "Você precisa selecionar um dependente.";
		}
		else if (form.getValue("dtNascimento")==""){
			throw "A data de nascimento do dependente não foi preenchida. Entre em contato com o setor de TI.";
		}
		else if (form.getValue("idade")==""){
			throw "A idade atual do dependente não foi calculada pelo sistema. Entre em contato com o setor de TI.";
		}
		else if (form.getValue("foraIdade")=="fora"){
			throw "Você não pode solicitar um reembolso auxilio creche para uma criança que já ultrapassou a idade!";
		}
		else if (form.getValue("matriculaApr")==""){
			throw "Não foi possível identificar seu aprovador. Caso seja um funcionário ou estagiário, entre em contato com o setor de Pessoas e Cultura.";
		}
		
	
		
	}
	
	else if (activity == APROVACAO_GESTOR){
		if (form.getValue("vl_rmb") == "" ){
			throw "Você precisa informar o valor a ser reembolsado.";
		}	
		
		else if (form.getValue("emailSolicitante") ==  emailSolicitante() ){
			 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
		}
		else if (form.getValue("cpfbeneficiario") == retornaCPFAprovador()){
        	 throw "Você não pode aprovar uma solicitação onde você é o beneficiário.";
        }
		
		
		
	}
	
	else if (activity == VALIDACAO && nextAtv == GATEWAYVALIDARDOCUMENTO){
		if (form.getValue("validacao") == "" ){
			throw "Você precisa escolher entre as opções de validar ou negar documentação.";
		}
		
		if (form.getValue("validacao") == "negado" &&  form.getValue("justificativaReprovacaoV") == "" ){
			throw "Você precisa justificar o motivo de ter negado o documento.";
		}
		
		
		if (form.getValue("validacao") == "validado" && form.getValue("dtPagamento") == "" ){
			throw "Você precisa informar a data de pagamento.";
		}
		
		
		if (form.getValue("validacao") == "validado" && (form.getValue("dtPagamento") != "" || form.getValue("dtPagamento") != null) ){
		
			var dtHoje = new Date ();	
			var dtHojeString = convertDataToString(dtHoje);
			//recupera data de pagamento do Fluig
			var dtPagamento = form.getValue("dtPagamento");
			
			//verifica se data de hoje é maior que data de pagamento
			if (dtHojeString > dtPagamento ){
				throw "A data para pagamento deve ser igual ou superior a data de hoje.";
			}
			
			
		}
		
		
		
	}
	
	
	else if (activity == APROVACAO_RH){
		if (form.getValue("aprovacao") == "" ){
			throw "Você precisa escolher entre as opções de aprovador ou reprovar.";
		}
		
		else if (form.getValue("aprovacao") == "reprovado" &&  form.getValue("justificativaR") == ""){
			throw "Você precisa justificar o motivo de ter reprovado o pagamento.";
		}
		
		
		
	}
	
	
    function consultaAfastamento(){
   	 var email = emailSolicitante();
   	
   	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", email, email, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_Afastado", null, constraints, null);
		 
		 if (dataset != null && dataset.values.length > 0) {
	        	return true;
	        }  
	        else {
	        	return false;
	        }	 
   }
        

            function emailSolicitante(){
	           	 var user = getValue("WKUser");	
	           	 var constraintUser   = new Array();
	           	 constraintUser.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
	           	 var datasetFuncionario = DatasetFactory.getDataset("colleague", null, constraintUser, null);
	           	 			 			 			 	 
	           	 var emailFuncionario = datasetFuncionario.getValue(0, "mail"); 
	           	 
	           	 return emailFuncionario;
            }
            
            
            function retornaCPFAprovador(){
                var email = emailSolicitante();

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
                          if (atividade == "P952101" || atividade == "P953101" || atividade == "P650101") {
                              throw "Você não pode usar uma atividade do tipo CAM ou de GN para custear uma viagem.";

                          }
                      } 
                      else {                	
                   	   if (atividade != "E010101" ) {
                       	   throw "Você só pode usar a atividade de folha para solicitar pagamento de auxilio creche.";

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
                         var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
                         if (isNaN(fieldValue)) {
                             throw "Existem linhas sem percentual informado no rateio de pagamento.";

                         }

                         total = total + fieldValue;	        
                     }
                     if ((total < 100) || total > 100) {
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
             
}

