function enableFields(form){ 
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	 form.setValue("solicitante",nomeSolicitante);
	 form.setValue("emailSolicitante",emailSolicitante);
	
	
	 
	 function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}
	 
}