function displayFields(form,customHTML){
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 11;
	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("			var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    if (activity == INICIAL || activity == ACORDO){		    
    		
    		form.setVisibleById("div_comentario1", false);	
    		form.setVisibleById("div_comentario2", false);	
    		form.setVisibleById("div_comentario3", false);	
		    form.setVisibleById("div_comentario4", false);	
		    form.setVisibleById("div_comentario5", false);	
		    form.setVisibleById("div_comentario6", false);	
		    
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
		    
			    
		    form.setVisibleById("div_progresso", false);	
		    form.setVisibleById("div_progresso2", false);
		    
		    form.setVisibleById("div_analise", false);
		    form.setVisibleById("div_analise2", false);
		    
		    form.setVisibleById("campo_6", false);
		    form.setVisibleById("campo_7", false);
		    form.setVisibleById("campo_8", false);
		    form.setVisibleById("campo_9", false);
		    form.setVisibleById("campo_10", false);
		    form.setVisibleById("campo_11", false);
		    form.setVisibleById("campo_12", false);
		    form.setVisibleById("campo_13", false);
		    form.setVisibleById("campo_14", false);
		    form.setVisibleById("campo_15", false);
		    form.setVisibleById("campo_16", false);
		
		    form.setVisibleById("div_sumario", false);
		    form.setVisibleById("div_avancar", false);
		    form.setVisibleById("wizard_3", false);
		    
	 
		    
		    
		    
	 }
    else if (activity == FEEDBACK1){
    	form.setVisibleById("div_sumario", false);
    	//ABA 1
    	//form.setVisibleById("div_comentario4", false);	
		//form.setVisibleById("div_comentario5", false);	
		//form.setVisibleById("div_comentario6", false);
		
		/*
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		       	form.setVisibleById("campo_15___"+ indexes[i], false);
		        form.setVisibleById("campo_16___"+ indexes[i], false);
		        form.setVisibleById("campo_17___"+ indexes[i], false);	
		        			
		    }
		*/
		//ABA 2
    	form.setVisibleById("div_analise2", false);		    
		form.setVisibleById("campo_11", false);
    	form.setVisibleById("campo_12", false);
    	form.setVisibleById("campo_13", false);
    	form.setVisibleById("campo_14", false);
    	
        form.setVisibleById("div_campo11", false);
		form.setVisibleById("div_campo12", false);
		form.setVisibleById("div_campo13", false);
		form.setVisibleById("div_campo14", false);
		
		
    	
    	
    }
    else if (activity == FEEDBACK2){
    	form.setVisibleById("div_sumario", false);
    	//form.setVisibleById("div_analise", false);
    	
    	
    	
    }
    
    else if (activity == AVALIACAO){
    
    	
    	
    	
    }
	
	
}