function enableFields(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ENVIAR_ASSINATURA = 18;
	var REGISTRAR = 32;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	 
	 if (activity == ABERTURA || activity  == SOLICITAR){
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
	}
	 
	 
		function UsuarioLogado(solicitante){
			 var constraints   = new Array();
			 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
			 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			 
			 return dataset;
		}
	 
}