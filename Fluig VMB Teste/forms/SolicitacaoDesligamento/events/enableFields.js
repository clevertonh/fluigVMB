function enableFields(form){ 
	var ABERTURA = 0;
	var SOLICITAR = 4;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	if (activity == ABERTURA){
		form.setEnabled("aprovacao", false);	
		form.setEnabled("justificativaReprovacao", false);
		 
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		
	}
	else {
		
		 //verificar se o campo esta vazio ja que as atividades ocorrem de forma paralela
		 //depois que o primeiro preencher não é mais necessário set o campo
		 //set numero da solicitação
		if (form.getValue("solicitacao") =="" || form.getValue("solicitacao") == null){
			 form.setValue("solicitacao",getValue('WKNumProces'));
		}
		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
		
	}


	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

}