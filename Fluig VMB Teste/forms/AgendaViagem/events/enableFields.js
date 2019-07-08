function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var REVISAR_AGENDA = 13;
	
	var matriculaSolicitante = getValue("WKUser");  
	var activity = getValue('WKNumState');
	
	

	

//	 form.setEnabled('codigoAgenda', false);
//	 form.setEnabled('solicitante', false);
	 
	 
	
	
	 if (activity == ABERTURA){
		 
		 
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", matriculaSolicitante, matriculaSolicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 
		 form.setValue("solicitante",nomeSolicitante); 	 
		 form.setValue("matriculaSolicitante",matriculaSolicitante);

		 
		 
	 }
	 
	 
	 //PROCESSO DE APROVAÇÃO
	 if (activity == APROVACAO){
		 //set numero da agenda
		 form.setValue("codigoAgenda",getValue('WKNumProces')); 	
		 form.setValue('documento', form.getDocumentId());
				 
		 form.setEnabled('mesagenda', false);
		 
			
		 
		 
		 var indexes = form.getChildrenIndexes("tbAgendaViagem");	    	    	    	   
		    	    for (var i = 0; i < indexes.length; i++) {
		     	      //  form.setEnabled("justificativa___"+ indexes[i], false);	
		     	        form.setEnabled("atividade___"+ indexes[i], false);	
		     	       	form.setEnabled("calendarPeriodoDe___"+ indexes[i], false);	
		     	       	form.setEnabled("calendarPeriodoAte___"+ indexes[i], false);

		    	    }    	        	  
 
	 }
	 

	 if (activity == REVISAR_AGENDA){
		 form.setEnabled('mesagenda', false);
		 
		 var indexes = form.getChildrenIndexes("tbAgendaViagem");	    	    	    	   
		    	    for (var i = 0; i < indexes.length; i++) {
		     	        form.setEnabled("justificativa___"+ indexes[i], false);	
		     	        form.setEnabled("atividade___"+ indexes[i], false);	
		     	       	form.setEnabled("calendarPeriodoDe___"+ indexes[i], false);	
		     	       	form.setEnabled("calendarPeriodoAte___"+ indexes[i], false);
		     	        form.setEnabled("aprovacao___"+ indexes[i], false);
		     	       
		    	    }    
	 }

	 
	 
}