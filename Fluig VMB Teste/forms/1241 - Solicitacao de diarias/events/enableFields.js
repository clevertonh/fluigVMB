function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
		 
		 var aprovador = usuarioAprovador();
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("gestor",aprovador.getValue(0, "GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 	 
		 }
		 
		 
		 form.setEnabled('vl_diarias', false);
		 //form.setEnabled('dtRetorno', false);
		 //form.setEnabled('dtSaida', false);
		 
		 
		 
	}
	else if (activity == APROVACAO){
		 form.setEnabled('vl_diarias', false);
	}
	

	
}

function UsuarioLogado(solicitante){
	 var constraints   = new Array();
	 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
	 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
	 
	 return dataset;
}

function usuarioAprovador(){	
	 var dataset = DatasetFactory.getDataset("VM_Aprovador", null, null, null);
	 
	 return dataset;
}