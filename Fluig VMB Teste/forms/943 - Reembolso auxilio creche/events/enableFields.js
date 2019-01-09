function enableFields(form){ 
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
		
	}
	
	else if (activity == APROVACAO_GESTOR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		
	}
	
	else if (activity == VALIDACAO){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("assistente",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAssistente",dataset.getValue(0, "mail"));		 
		 form.setValue("aprovacao","");
		 
		 
		
	}
	
	else if (activity == APROVACAO_RH){
		form.setEnabled('validacao', false);
		form.setEnabled('justificativaReprovacaoV', false);
	}
	
	else if (activity == ALTERACAO_DATA){
		form.setEnabled('aprovacao', false);
		form.setEnabled('justificativaR', false);
		form.setEnabled('validacao', false);
		form.setEnabled('vl_rmb', false);
		form.setEnabled('justificativaReprovacaoV', false);
	}
	
		 
	 
}

function UsuarioLogado(solicitante){
	 var constraints   = new Array();
	 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
	 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
	 
	 return dataset;
}
