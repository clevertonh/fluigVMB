function enableFields(form){
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE enableFields: " + activity);
	
	var solicitante = getValue("WKUser");  
			
	if (activity == INICIO || activity == ABERTURA || activity == CORRIGIR){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 
		 form.setEnabled('validacao', false);
		 form.setEnabled('justificativaReprovacao', false);
		 form.setValue("validacao","");
		 
	}
	
	else if (activity == APROVACAO ){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));		 
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("assistente",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAssistente",dataset.getValue(0, "mail"));		
		 
		 
		 //form.setEnabled('responsavel', false);
		 form.setEnabled('rateioconfigurado', false);
		 
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
	else if (activity == AVALIAR_ERRO){
		 form.setEnabled('validacao', false);
		 form.setEnabled('justificativaReprovacao', false);
		 
		 //form.setEnabled('responsavel', false);
		 form.setEnabled('rateioconfigurado', false);
		 
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
	
	
	function UsuarioLogado(solicit){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicit, solicit, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 log.info("---RECUPERA DADOS DO USUARIO LOGADO---");
		 return dataset;
	}





}