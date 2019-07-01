function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO =5;
	var CORRIGIR = 39;

	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE enableFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	
	if (activity == ABERTURA || activity == CORRIGIR){
		 form.setEnabled("aprovacao", false);	
		 
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
			 	 
		 }
		 
		 //reseta campo de corrigir marcado pelo aprovador
		 if (activity == CORRIGIR){
			 form.setValue("aprovacao","");			 
		 }

			 
	}
	else if (activity == APROVACAO){
		 //set numero da solicitação
		// form.setValue("solicitacao",getValue('WKNumProces'));
		// form.setEnabled("rateioconfigurado", false);		 
		// form.setEnabled("dataset_solicitacaoevento", false);
		// form.setEnabled("FinanEvento", false);
		// bloqueiaDadosFinanceiro();
		 
		 
		 
		 	var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("aprovacao", true);		 
			form.setEnabled("justificativaReprovacao", true);
		
		    
		 
		 
		 
	}



	
	function bloqueiaDadosFinanceiro(){
		//BLOQUEIA CAMPOS DE RATEIO DE PAGAMENTO POIS JA FOI ENVIADO PARA O PROTHEUS
   	 var indexes = form.getChildrenIndexes("tableItens");	    	    	    	   
   	    for (var i = 0; i < indexes.length; i++) {
    	        form.setEnabled("txtcentrocusto___"+ indexes[i], false);	
    	       	form.setEnabled("txtprojeto___"+ indexes[i], false);	
    	      	form.setEnabled("txtareaestrategica___"+ indexes[i], false);	
    	     	form.setEnabled("txtcategoria___"+ indexes[i], false);	
    	    	form.setEnabled("txtfontefinanciamento___"+ indexes[i], false);	
    	   		form.setEnabled("txtatividade___"+ indexes[i], false);	
    	   		form.setEnabled("percentual___"+ indexes[i], false);	
    	   		form.setEnabled("rateio___"+ indexes[i], false);
	        
   	    }    
   
 
}
	

	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	
	function usuarioAprovador(emailSolicitante){
		//log.info("---GERENTE FUNCIONARIO----"); 
	//	log.info(emailSolicitante);
		
		var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
		 
		  
		// log.info(dataset.getValue(0, "EMAIL_G"));
		 return dataset;
	}



}

