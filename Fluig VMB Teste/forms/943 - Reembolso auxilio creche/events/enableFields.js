function enableFields(form){ 
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		form.setEnabled('apr_gestor', false);

		var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 			 			 			 
		 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
		 
		 //form.setValue("dataSolicitacao",new Date().toLocaleString());
		 
		
	}
	
	else if (activity == APROVACAO_GESTOR){
		
	}
	
	else if (activity == VALIDACAO){
		form.setEnabled('apr_gestor', false);
		form.setEnabled('justificativaReprGest', false);
	}
	
	else if (activity == APROVACAO_RH){
		form.setEnabled('apr_gestor', false);
		form.setEnabled('justificativaReprGest', false);
		
	}
	
	 //form.setEnabled('viagemplanejada', false);
	 
	 
	 
}