function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO =5;
	var CORRIGIR = 15;
	var APROVACAO_DIR = 50;
	var APROVACAO_DN = 51;
	var ASSUMIR = 42;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	if (activity == ABERTURA || activity == CORRIGIR){
		 form.setEnabled("aprovacao", false);	
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != "" && aprovador.values.length > 0){
			 form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
			 	 
		 }
		 else {
			 throw "Seu cadastro está sem gerente, por favor, procure o setor de Recursos Humanos e solicite a atualização";
		 }
		 
		 
		 var diretor = usuarioAprovadorDIR(emailSolicitante);
		 if (diretor!= null && diretor != "" && diretor.values.length > 0){
			 form.setValue("nomeNivel2",diretor.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("emailNivel2",diretor.getValue(0, "MATRICULA_APROVADOR"));
			 form.setValue("matriculaAprDirArea",diretor.getValue(0, "DIRETOR"));
			 	 
		 }
		 else {
			 throw "Seu cadastro está sem diretor, por favor, procure o setor de Recursos Humanos e solicite a atualização";
		 }
		 
		 
		 
		 //reseta campo de corrigir marcado pelo aprovador
		 if (activity == CORRIGIR){
			 form.setValue("aprovacao","");			 
		 }

	
			 
	}
	else if (activity == APROVACAO){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 
		 form.setValue("gestor",nomeSolicitante);
		 form.setValue("emailLider",emailSolicitante);
		 
		
		 
	}
	
	else if (activity == APROVACAO_DIR){
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		 
	}
	
	else if (activity == APROVACAO_DN){
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		 
	}
	
	
	else if (activity == ASSUMIR){		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		 
		
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
	
	function bloqueiaDadosProduto(){		
   	    //BLOQUEIA CAMPOS DE SERVIÇO
	    	 var indexes = form.getChildrenIndexes("tableCompras");	    	    	    	   
	    	    for (var i = 0; i < indexes.length; i++) {
	     	        form.setEnabled("txtproduto___"+ indexes[i], false);	
	     	         form.setEnabled("idquantidade___"+ indexes[i], false);	
	     	      	 form.setEnabled("vrTotUnit___"+ indexes[i], false);	
	     	      	 form.setEnabled("dtNecessidade___"+ indexes[i], false);
    	        
	    	    } 
   
	    	    
	}
	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	
	function usuarioAprovador(emailSolicitante){
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		  
		
		 return dataset;
	}

	function usuarioAprovadorDIR(emailLogado){
		var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailLogado,emailLogado, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
		 
		  
		return dataset;
	}

}

