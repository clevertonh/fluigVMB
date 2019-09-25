function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 11;
	
	
	var activity = getValue('WKNumState');
	
	
	if (activity !=  INICIAL && activity != ACORDO){
		
		 form.setEnabled("Funcionario", false);	
		 form.setEnabled("campo_1", false);	
		 form.setEnabled("campo_2", false);	
		 form.setEnabled("campo_3", false);	
		 form.setEnabled("campo_4", false);	
		 form.setEnabled("campo_5", false);	
		
		//BLOQUEIA CAMPOS DE SERVIÇO
		 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
		    for (var i = 0; i < indexes.length; i++) {
		        form.setEnabled("acao___"+ indexes[i], false);	
		       	form.setEnabled("porque___"+ indexes[i], false);
		        form.setEnabled("como___"+ indexes[i], false);	
		        form.setEnabled("tx_competencia___"+ indexes[i], false);
	        
		    }
	}
	
	
	else if (activity ==  FEEDBACK1){
		
	}
	else if (activity ==  FEEDBACK2){
		form.setEnabled("campo_6___1", false);	
		form.setEnabled("_campo_7", false);	
		form.setEnabled("_campo_8", false);	
		form.setEnabled("_campo_9", false);	
	
	}

	    
	
	
	
}