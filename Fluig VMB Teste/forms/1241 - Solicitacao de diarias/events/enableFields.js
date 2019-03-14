function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var REGISTRAR_PGTO = 16; 
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	var nomeSolicitante;
	var emailSolicitante;
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 nomeSolicitante = dataset.getValue(0, "colleagueName");
		 emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		 var aprovador = usuarioAprovador();
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
			 	 
		 }
		 
		 
		 form.setEnabled('vl_diarias', false);
		 //form.setEnabled('dtRetorno', false);
		 //form.setEnabled('dtSaida', false);
		 
		 
	}
	else if (activity == APROVACAO){
		 form.setEnabled('vl_diarias', false);
		 
	       
	}
	

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	function usuarioAprovador(){
		log.info("---GERENTE FUNCIONARIO----"); 
		log.info(emailSolicitante);
		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		  
		 log.info(dataset.getValue(0, "EMAIL_G"));
		 return dataset;
	}



}

