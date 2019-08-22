function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	
	
	var activity = getValue('WKNumState');
	
	
	if (activity !=  INICIAL && activity != ACORDO){
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
	        
		    }
	}
	    
	
	
	
}