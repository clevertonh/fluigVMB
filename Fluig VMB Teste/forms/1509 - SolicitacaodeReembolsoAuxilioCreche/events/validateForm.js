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
	
	
	
	if (activity == ABERTURA && nextAtv == APROVACAO_GESTOR){
		
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
		
	}
	
	else if (activity == APROVACAO_GESTOR){
		if (form.getValue("vl_rmb") == "" ){
			throw "Você precisa informar o valor a ser reembolsado.";
		}	
		
		else if (form.getValue("emailSolicitante") ==  emailSolicitante() ){
			 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
		}
		else if (form.getValue("cpfpassageiro") == retornaCPFAprovador()){
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
	

    //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO

        var indexes = form.getChildrenIndexes("tableItens");
        var total = 0;

        for (var i = 0; i < indexes.length; i++) {
            var fieldValue = parseFloat(form.getValue("percentual___" + indexes[i]));
           
           // log.info("---RETORNO BASE RATEIO 2---");
            //log.info(fieldValue);
            
            if (isNaN(fieldValue)) {
                throw "Existem linhas sem percentual informado no rateio de pagamento.";
            }
            //log.info("--ANTES--");
            //log.info(total);
            
            total = total + fieldValue;
            log.info("--VALOR--");
            log.info(fieldValue);
            log.info("--DEPOIS--");
            log.info(total);
        }
        log.info("----RATEIO TOTAL 2----");
        log.info(total);
        if ((total < 100) || total > 100) {
            throw "Percentual Total do rateio não pode ser inferior ou superior a 100%. Percentual informado foi de  "+ total +"%";
        }

       
 
       //VALIDA SE AS LINHAS FORAM PREENCHIDAS CORRETAMENTE
            var indexes = form.getChildrenIndexes("tableItens");
            var linhasRateio = [];

            for (var i = 0; i < indexes.length; i++) {
                var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
                var projeto = form.getValue("txtprojeto___" + indexes[i]);
                var area = form.getValue("txtareaestrategica___" + indexes[i]);
                var categoria = form.getValue("txtcategoria___" + indexes[i]);
                var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
                var atividade = form.getValue("txtatividade___" + indexes[i]);

                //linhas em caso de projeto
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
}

