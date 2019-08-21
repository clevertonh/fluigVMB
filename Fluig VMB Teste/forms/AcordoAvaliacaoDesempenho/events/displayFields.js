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
    	
    	
	 }
   
	
	
}