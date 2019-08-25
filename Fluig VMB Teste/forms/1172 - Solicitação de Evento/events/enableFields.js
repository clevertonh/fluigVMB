function enableFields(form){ 
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CORRIGIR = 45;
	var GERENCIAR = 55;
	var AVALIACAO = 57;
	
	var activityEnable = getValue('WKNumState');
	
	var solicitante = getValue("WKUser");  
	 
	 if (activityEnable == INICIO ){
		 form.setValue("matriculasolicitante",solicitante); 	
		 
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
	 
		 var aprovador = usuarioAprovador(emailSolicitante);
			
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
			 //form.setValue("solicitanteFuncionario",aprovador.getValue(0, "FUNCIONARIO_VMB"));
			 
			
		 }
	 
		 form.setEnabled('aprovacao', false);
		 form.setEnabled('justificativaReprovacao', false);		 
	 
	 }
	 else if (activityEnable == APROVACAO){
		 	//set numero da solicitação
		 	form.setValue("solicitacao",getValue('WKNumProces'));
		 		 
		 	var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		 
		    
		    //habilita campos de aprovação
		    form.setEnabled('aprovacao', true);
			form.setEnabled('justificativaReprovacao', true);		 

			
	 }
	 else if (activityEnable == GERENCIAR){
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
	 }
	 
	 else if (activityEnable == AVALIACAO){
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		
		    for (var row =1; row <=32; row++){
		    	  form.setEnabled('campo'+row, true);
		    }
		  
		
		    
		    
	 }
	 
	
		function usuarioAprovador(emailSolicitante){		
			var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
			var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
			 		 
			 return dataset;
		}
	 
}