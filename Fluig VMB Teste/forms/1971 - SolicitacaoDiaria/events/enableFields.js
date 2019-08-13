function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16;
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;

	
	var activity = getValue('WKNumState');

	
	var solicitante = getValue("WKUser");  
	var nomeSolicitante;
	var emailSolicitante;
	
	 //form.setEnabled('vl_diarias', false);
	
	if (activity == ABERTURA || activity ==  CORRIGIR){
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
		 
		 form.setEnabled("aprovacao", false);		
		 form.setEnabled('recebediarias', false);
		 form.setEnabled('dtVencimento', false);
		 
	}
	else if (activity == APROVACAO){
		 form.setEnabled('recebediarias', false);
		 form.setEnabled('dtVencimento', false);
		 form.setEnabled('beneficiario', false);
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
	}

	else if (activity == CALCULAR_DIARIAS){		 
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("recebediarias", true);	
		    form.setEnabled("dtVencimento", true);	
		 
	}
	else if (activity == REALIZAR_PGTO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	}
	else if (activity == AVALIAR_PGTO){
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

	function usuarioAprovador(){
		
		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		  
		
		 return dataset;
	}



}

