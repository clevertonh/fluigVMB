function validateForm(form){
	
	var ABERTURA = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	var activity = getValue('WKNumState');
	
	 
	
	
	
	if (activity == ABERTURA){
		
		if (form.getValue("vl_rmb") == "" ){
			throw "Você precisa informar o valor a ser reembolsado.";
		}		
		
		else if (form.getValue("emailSolicitante")==""){
			throw "Seus dados de usuário não foram carregados, por favor tente novamente mais tarde.";
		}
		
		else if (form.getValue("emailSolicitante")==""){
			throw "Seu aprovador não foi carregado automaticamente. Tente novamente mais tarde, se o problema persisti, entre em contato com o setor de TI.";
		}
		
		
	}
	
	else if (activity == APROVACAO_GESTOR){
		if (form.getValue("vl_rmb") == "" ){
			throw "Você precisa informar o valor a ser reembolsado.";
		}	
		
		else if (form.getValue("emailSolicitante") ==  emailSolicitante() ){
			 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
		}
		
		
	}
	
	else if (activity == VALIDACAO){
		if (form.getValue("validacao") == "" ){
			throw "Você precisa escolher entre as opções de validar ou negar documentação.";
		}
		
		if (form.getValue("validacao") == "negado" &&  form.getValue("justificativaReprovacaoV") == "" ){
			throw "Você precisa justificar o motivo de ter negado o documento.";
		}
		
		
		if (form.getValue("validacao") == "validado" && form.getValue("dtPagamento") == "" ){
			throw "Você precisa informar a data de pagamento.";
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
            var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
            if (isNaN(fieldValue)) {
                throw "Existem linhas sem percentual informado no rateio de pagamento.";
            }
            total = total + fieldValue;
        }
        if ((total < 100) || total > 100) {
            throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
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

}

function emailSolicitante(){
	 var user = getValue("WKUser");	
	 var constraintUser   = new Array();
	 constraintUser.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
	 var datasetFuncionario = DatasetFactory.getDataset("colleague", null, constraintUser, null);
	 			 			 			 	 
	 var emailFuncionario = datasetFuncionario.getValue(0, "mail"); 
	 
	 return emailFuncionario;
}