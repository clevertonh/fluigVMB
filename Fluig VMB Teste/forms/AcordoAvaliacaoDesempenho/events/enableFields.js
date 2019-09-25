function enableFields(form){ 
	var INICIAL = 0;
	var ACORDO = 4;
	var FEEDBACK1 = 5;
	var FEEDBACK2 = 9;
	var AVALIACAO = 11;
	
	
	var activity = getValue('WKNumState');
	
	
	    
  if (activity ==  FEEDBACK1){
		
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
		     	form.setEnabled("campo_15___"+ indexes[i], false);
		        form.setEnabled("campo_16___"+ indexes[i], false);
		        form.setEnabled("campo_17___"+ indexes[i], false);	
		        form.setEnabled("progresso2___"+ indexes[i], false);
		    }
		    
			
		    
		    
		  
	}
	else if (activity ==  FEEDBACK2){		
			 form.setEnabled("Funcionario", false);	
			 form.setEnabled("campo_1", false);	
			 form.setEnabled("campo_2", false);	
			 form.setEnabled("campo_3", false);	
			 form.setEnabled("campo_4", false);	
			 form.setEnabled("campo_5", false);	
			 
			 form.setEnabled("campo_6", false);		
			 form.setEnabled("campo_7", false);	
			 form.setEnabled("campo_8", false);	
			 form.setEnabled("campo_9", false);	
	
			 
		
			 
			 
			//BLOQUEIA CAMPOS DE SERVIÇO
			 var indexes = form.getChildrenIndexes("tableMetas");	    	    	    	   
			    for (var i = 0; i < indexes.length; i++) {
			        form.setEnabled("acao___"+ indexes[i], false);	
			       	form.setEnabled("porque___"+ indexes[i], false);
			        form.setEnabled("como___"+ indexes[i], false);	
			        form.setEnabled("tx_competencia___"+ indexes[i], false);
			        form.setEnabled("comentarioF___"+ indexes[i], false);
			        form.setEnabled("campo_10___"+ indexes[i], false);
			        form.setEnabled("comentarioG___"+ indexes[i], false);			        
			        form.setEnabled("progresso___"+ indexes[i], false);
		        
			        if (form.getValue("progresso___" + indexes[i]) =="branco"){
			        	 form.setValue("progresso2___"+ indexes[i],"branco");
			        	 form.setEnabled("progresso2___"+ indexes[i], false);
			        	 
			        	 form.setEnabled("campo_15___"+ indexes[i], false);	
						 form.setEnabled("campo_16___"+ indexes[i], false);	
						 form.setEnabled("campo_17___"+ indexes[i], false);	
						 
						 
			        }
			    }
		    
		   
			    
			    
		    
	}
    else if (activity ==  AVALIACAO){
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    //form.setEnabled("recebediarias", true);	
    }

	    
	
	
	
}