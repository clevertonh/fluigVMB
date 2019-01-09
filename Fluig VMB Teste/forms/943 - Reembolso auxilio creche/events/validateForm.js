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
	


}

function emailSolicitante(){
	 var user = getValue("WKUser");	
	 var constraintUser   = new Array();
	 constraintUser.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
	 var datasetFuncionario = DatasetFactory.getDataset("colleague", null, constraintUser, null);
	 			 			 			 	 
	 var emailFuncionario = datasetFuncionario.getValue(0, "mail"); 
	 
	 return emailFuncionario;
}