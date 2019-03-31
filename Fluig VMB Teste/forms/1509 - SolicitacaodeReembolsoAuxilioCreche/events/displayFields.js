function displayFields(form,customHTML){ 
	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    form.setVisibleById("aprPrazo", false);
    //form.setVisibleById("cpfbeneficiario", false);    
    form.setVisibleById("divPrazoApr", false);
    //form.setVisibleById("divMatricualApr", false);
    
    form.setVisibleById("div_photo", false);
    
    
    
    if (activity == ABERTURA || activity == SOLICITAR){
   	 form.setVisibleById("3b", false);
	 form.setVisibleById("4b", false);	 
	
    
    }
    
    else if (activity == APROVACAO_GESTOR){
    	form.setVisibleById("3b", false);
    	form.setVisibleById("4b", false);    
    	
    }

	else if (activity == VALIDACAO){
		 form.setVisibleById("4b", false);	 
		 form.setVisibleById("justificativaReprovacaoV", false);	 
	}
	
	else if (activity == APROVACAO_RH){
		 form.setVisibleById("justificativaR", false);	
	}
	
	
}