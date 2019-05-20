function enableFields(form){
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE enableFields: " + activity);
	
	var solicitante = getValue("WKUser");  
			
	if (activity == INICIO || activity == ABERTURA || activity == CORRIGIR){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 
		 form.setEnabled('validacao', false);
		 form.setEnabled('justificativaReprovacao', false);
		 form.setValue("validacao","");
		 
	}
	
	else if (activity == APROVACAO ){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));		 
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("aprovador",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAprovador",dataset.getValue(0, "mail"));		
		  
		 
	}	
	else if (activity == AVALIAR_ERRO){
		 form.setEnabled('validacao', false);
		 form.setEnabled('justificativaReprovacao', false);
		 		 
		 
	}
	
	
	function UsuarioLogado(solicit){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicit, solicit, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 log.info("---RECUPERA DADOS DO USUARIO LOGADO---");
		 return dataset;
	}





}