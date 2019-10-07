function enableFields(form){ 
	var ABERTURA = 0;
	var INICIAR = 4;
	var VALIDAR = 5;
	var DADOS_CONTABEIS = 10;
	var CORRIGIR = 16;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		
	}
	else if (activity == INICIAR){
		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
		form.setEnabled("desc_res", true);	
		
	}
	else if (activity == VALIDAR || activity == CORRIGIR){
			//set numero da VALIDAR
		 	form.setValue("solicitacao",getValue('WKNumProces'));
		 	form.setEnabled("desc_res", false);		
		 	form.setEnabled("desc_detalhada", false);		
		 	form.setEnabled("tipo", false);
		 	form.setEnabled("tipoPessoa", false);
	}
	else if (activity == DADOS_CONTABEIS){
			  form.setEnabled("desc_res", false);		
			  form.setEnabled("desc_detalhada", false);
			  form.setEnabled("descricao", false);
			  form.setEnabled("descricao_det", false);
			  form.setEnabled("grupo", false);
			  form.setEnabled("tipoG", false);
			  form.setEnabled("produtoExiste", false);
			  form.setEnabled("produto", false);
			  form.setEnabled("tipo", false);
			  form.setEnabled("unidade", false);
			  form.setEnabled("mostrafluig", false);
		      form.setEnabled("tipoPessoa", false);
		      form.setEnabled("vl_base", false);
		      
	}
	
	
	

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}
	
	
	
}