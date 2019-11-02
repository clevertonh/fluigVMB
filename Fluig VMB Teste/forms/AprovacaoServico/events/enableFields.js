function enableFields(form){ 
	var ABERTURA = 0;
	var SOLICITAR = 56;
	var GERENTE_ADM =5;
	var DIRETOR_FIN = 35;
	var DIRETOR_RH = 11;
	var DIRETOR_MINISTERIO = 13;
	var DIRETOR_MKT = 15;
	var DIRETOR_ADVOCACY = 18;
	var DIRETOR_NACIONAL = 27;
	

	
	//recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");	
	
	var solicitante = getValue("WKUser");  
	
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	
	if (activity == ABERTURA || activity == SOLICITAR){
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
	}
	else if (activity == GERENTE_ADM){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel1",nomeSolicitante); 	
	  	form.setValue("emailNivel1",emailSolicitante); 	
	  	form.setEnabled("aprNivel1", true);
	  	
	}
	else if (activity == DIRETOR_FIN){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel2",nomeSolicitante); 	
	  	form.setValue("emailNivel2",emailSolicitante); 	
	  	form.setEnabled("aprNivel2", true);
		
	}
	else if (activity == DIRETOR_RH){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel4",nomeSolicitante); 	
	  	form.setValue("emailNivel4",emailSolicitante); 	
	  	form.setEnabled("aprNivel4", true);
			
	}
	else if (activity == DIRETOR_MINISTERIO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel6",nomeSolicitante); 	
	  	form.setValue("emailNivel6",emailSolicitante); 	
	  	form.setEnabled("aprNivel6", true);
		
	}
	else if (activity == DIRETOR_MKT){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel3",nomeSolicitante); 	
	  	form.setValue("emailNivel3",emailSolicitante); 	
	  	form.setEnabled("aprNivel3", true);
			
		}
	else if (activity == DIRETOR_ADVOCACY){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel5",nomeSolicitante); 	
	  	form.setValue("emailNivel5",emailSolicitante); 	
	  	form.setEnabled("aprNivel5", true);
		
	}
	else if (activity == DIRETOR_NACIONAL){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    form.setValue("nomeNivel4",nomeSolicitante); 	
	  	form.setValue("emailNivel4",emailSolicitante); 	
	  	form.setEnabled("aprNivel4", true);
		
	}
		
	
	 form.setEnabled("justificativaReprovacao", true);
	 
	 
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

}