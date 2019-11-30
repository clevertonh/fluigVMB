function enableFields(form){
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;

	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE enableFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	//form.setEnabled('tipoffx', false);
			
	if (activity == INICIO || activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 
		 form.setEnabled('aprovacao', false);
		 form.setEnabled('justificativaReprovacao', false);
		 form.setValue("aprovacao","");
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != "" && aprovador.values.length > 0){
			 form.setValue("aprovador",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailAprovador",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
				 
		 }
		 else {
			 throw "Seu cadastro está sem aprovador, por favor, procure o setor de Recursos Humanos e solicite a atualização";
		 }
		 
	}
	
	else if (activity == APROVACAO ){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));		 
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("aprovador",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAprovador",dataset.getValue(0, "mail"));		
		  
		 form.setEnabled('responsavel', false);
		 form.setEnabled('tipoffx', false);
		 form.setEnabled('vl_solicitacao', false);
		 form.setEnabled('dtDeposito', false);
		 
	}	

	
	function UsuarioLogado(solicit){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicit, solicit, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		// log.info("---RECUPERA DADOS DO USUARIO LOGADO---");
		 return dataset;
	}


	function usuarioAprovador(emailLogado){
	//	log.info("---GERENTE FUNCIONARIO----"); 
		//log.info(emailSolicitante);
		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailLogado,emailLogado, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		//var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		//var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		// log.info(dataset.getValue(0, "EMAIL_G"));
		 return dataset;
	}


}