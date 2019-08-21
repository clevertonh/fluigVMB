function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	
	
	var activity = getValue('WKNumState');
	
	
	if (activity ==  INICIAL || activity == ACORDO){
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("comentarioF___"+ indexes[i], false);	
		       	form.setEnabled("campo_10___"+ indexes[i], false);
		        form.setEnabled("comentarioG___"+ indexes[i], false);	
	        
		    }
	}
	    
	
	
	
}