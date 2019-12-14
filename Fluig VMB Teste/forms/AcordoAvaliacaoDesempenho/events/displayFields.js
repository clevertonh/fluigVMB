function displayFields(form,customHTML){
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 15;
	var RESULTADO = 11;
	var MATRICIAL = 20;
	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("			var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
    
    form.setVisibleById("matriculaMatricial", false);	
    form.setVisibleById("div_gestorImediato", false);
    
    
	
    if (activity == INICIAL || activity == ACORDO){		    
    		
    		form.setVisibleById("div_comentario1", false);	
    		form.setVisibleById("div_comentario2", false);	
    		form.setVisibleById("div_comentario3", false);	
		    form.setVisibleById("div_comentario4", false);	
		    form.setVisibleById("div_comentario5", false);	
		    form.setVisibleById("div_comentario6", false);	
		    
		    
		    form.setVisibleById("div_comentario7", false);
		    form.setVisibleById("div_comentario8", false);
		    form.setVisibleById("div_comentario9", false);
		
		    
		    
		    
		    form.setVisibleById("div_campo6", false);
		    form.setVisibleById("div_campo11", false);
		    form.setVisibleById("div_campo7", false);
		    form.setVisibleById("div_campo8", false);
		    form.setVisibleById("div_campo12", false);
		    form.setVisibleById("div_campo13", false);
		    form.setVisibleById("div_campo9", false);
		    form.setVisibleById("div_campo14", false);
		    form.setVisibleById("div_campo15", false);
		    form.setVisibleById("div_campo16", false);
		    form.setVisibleById("div_campo17", false);
			form.setVisibleById("div_campo23", false);
			form.setVisibleById("div_campo22", false);
			form.setVisibleById("div_campo24", false);
			form.setVisibleById("div_campo25", false);
			
		    
			
			
			    
		    form.setVisibleById("div_progresso", false);	
		    form.setVisibleById("div_progresso2", false);
		    form.setVisibleById("div_progresso3", false);
		    
		    form.setVisibleById("div_analise", false);
		    form.setVisibleById("div_analise2", false);
		    form.setVisibleById("div_analise3", false);
		    
		    
		    form.setVisibleById("campo6", false);
		    form.setVisibleById("campo7", false);
		    form.setVisibleById("campo8", false);
		    form.setVisibleById("campo9", false);
		    form.setVisibleById("campo10", false);
		    form.setVisibleById("campo11", false);
		    form.setVisibleById("campo12", false);
		    form.setVisibleById("campo13", false);
		    form.setVisibleById("campo14", false);
		    form.setVisibleById("campo15", false);
		    form.setVisibleById("campo16", false);
		    form.setVisibleById("campo21", false);
		    form.setVisibleById("campo22", false);
		    form.setVisibleById("campo23", false);
		    form.setVisibleById("campo24", false);
		
		    form.setVisibleById("div_sumario", false);
		    form.setVisibleById("div_avancar", false);
		    form.setVisibleById("wizard_3", false);
		    
	 
		    
		    
		    
	 }
    else if (activity == FEEDBACK1){
	    	form.setVisibleById("div_sumario", false);
	        form.setVisibleById("div_avancar", false);
	        form.setVisibleById("wizard_3", false);
	        form.setVisibleById("div_analise2", false);		    
			form.setVisibleById("campo11", false);
	    	form.setVisibleById("campo12", false);
	    	form.setVisibleById("campo13", false);
	    	form.setVisibleById("campo14", false);
	    	form.setVisibleById("campo21", false);
	        form.setVisibleById("campo22", false);
		    form.setVisibleById("campo23", false);
		    form.setVisibleById("campo24", false);
	    	
	    	
	        form.setVisibleById("div_campo11", false);
			form.setVisibleById("div_campo12", false);
			form.setVisibleById("div_campo13", false);
			form.setVisibleById("div_campo14", false);
			form.setVisibleById("div_campo23", false);
			form.setVisibleById("div_campo22", false);
			form.setVisibleById("div_campo24", false);
			form.setVisibleById("div_campo25", false);
			
		
			
			
			form.setVisibleById("div_analise3", false);	
			
		
		
    	
    	
    }
    else if (activity == FEEDBACK2){
	    	form.setVisibleById("div_sumario", false);
	        form.setVisibleById("div_avancar", false);
	        form.setVisibleById("wizard_3", false);
    	
	        form.setVisibleById("div_analise3", false);
	        form.setVisibleById("div_campo23", false);
	        form.setVisibleById("div_campo24", false);
	        form.setVisibleById("div_campo22", false);
			form.setVisibleById("div_campo25", false);
			
			
			form.setVisibleById("campo22", false);
			form.setVisibleById("campo23", false);
			form.setVisibleById("campo24", false);
		
	
			
    	
    }
    else if (activity == AVALIACAO){
    	form.setVisibleById("div_sumario", false);
        form.setVisibleById("div_avancar", false);
        form.setVisibleById("wizard_3", false);
    }

	
}