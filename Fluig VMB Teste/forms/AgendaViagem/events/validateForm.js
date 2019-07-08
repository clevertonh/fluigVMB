function validateForm(form){
	var ABERTURA = 4;
	var APROVACAO = 5;
	var REVISAR_AGENDA = 13;
	
	var activity = getValue('WKNumState');
	

	if(activity == ABERTURA ||  activity == REVISAR_AGENDA){
	
			if (form.getValue("mesagenda") == "" || form.getValue("mesagenda") == null){
				throw "Você precisa informar o mês da agenda!";
			}
		
            var indexes = form.getChildrenIndexes("tbAgendaViagem");
            
            if (indexes.length < 1){
            	throw "Você precisa informar pelo menos um item na agenda!";
            }
            else {
                for (var i = 0; i < indexes.length; i++) {
                    var fieldValue = form.getValue("cAtividade__" + indexes[i]);              
                    var dtDeValue = parseInt(form.getValue("calendarPeriodoDe___" + indexes[i]));
                    var dtAtedValue = parseInt(form.getValue("calendarPeriodoAte___" + indexes[i]));                                   
          
                    if (isNaN(dtDeValue)) {
                        throw "O campo Período de do detalhe da agenda não foi informado e seu preenchimento é obrigatório.";

                    }
                  
                    if (isNaN(dtAtedValue)) {
                        throw "O campo Período até do detalhe da agenda não foi informado e seu preenchimento é obrigatório.";

                    }
                
                    
                    if (fieldValue == "" || fieldValue == null) {
                     //   throw "O campo Atividade do detalhe da agenda não foi informado e seu preenchimento é obrigatório.";
                    }
                    
                    
                 
                }
            }
            

		
	}
	
		if (activity == APROVACAO){
			 var indexes = form.getChildrenIndexes("tbAgendaViagem");
			 
	            for (var i = 0; i < indexes.length; i++) {
	                var statusAprovacao = form.getValue("aprovacao___" + indexes[i]);              
	                var justificativa = form.getValue("justificativa___" + indexes[i]);
	                                  
	      
	                if (statusAprovacao == "reprovado") {
	                	if (justificativa == null || justificativa == ""){
	                //		throw "O campo Justificativa referente a reprovação de uma atividade não foi informado.";
      		
	                	}
	                	
	         
	                }

	            
	            }
		}
	
	
	
}