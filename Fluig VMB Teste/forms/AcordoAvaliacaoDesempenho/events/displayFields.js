function displayFields(form,customHTML){
	var INICIAL = 0;
	var ACORDO = 4;
	
	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("			var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    if (activity == INICIAL || activity == ACORDO){
		 //form.setVisibleById("3b", false);
		 
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setVisibleById("comentarioF___"+ indexes[i], false);	
		       	form.setVisibleById("campo_10___"+ indexes[i], false);
		        form.setVisibleById("comentarioG___"+ indexes[i], false);	
	        
		    }
		    form.setVisibleById("div_comentarioF", false);	
		    form.setVisibleById("div_campo_10", false);	
		    form.setVisibleById("div_comentarioG", false);	
		    form.setVisibleById("div_progresso", false);	
		    form.setVisibleById("div_analise", false);
		    form.setVisibleById("campo_6", false);
		    form.setVisibleById("campo_7", false);
		    form.setVisibleById("campo_8", false);
		    form.setVisibleById("campo_9", false);
		    
		    
		    
		    
		    
	 }
   
	
	
}