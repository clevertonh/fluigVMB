function enableFields(form){ 
	var ABERTURA = 0;
	var COMPRAS = 5;
	var CONTABILIDADE = 10;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		
	}
	else if (activity == COMPRAS){
			//set numero da solicitação
		 	form.setValue("solicitacao",getValue('WKNumProces'));
		 	form.setEnabled("desc_res", false);		
		 	form.setEnabled("desc_detalhada", false);		
		 	form.setEnabled("tipo", false);
	}
	else if (activity == CONTABILIDADE){
			  form.setEnabled("desc_res", false);		
			  form.setEnabled("desc_detalhada", false);
			  form.setEnabled("descricao", false);
			  form.setEnabled("descricao_det", false);
			  form.setEnabled("grupo", false);
			  form.setEnabled("subgrupo", false);
			  form.setEnabled("produtoExiste", false);
			  form.setEnabled("produto", false);
			  form.setEnabled("tipo", false);
	}
	
	
	

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}
	
	
	
}