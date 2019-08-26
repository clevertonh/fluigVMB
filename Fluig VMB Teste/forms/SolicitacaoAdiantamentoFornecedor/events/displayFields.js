function displayFields(form,customHTML){
	
	
	var ABERTURA = 0;
	var APROVACAO = 5;
	var TESOURARIA = 10;
	var SOLICITANTE = 24;

	var activity = getValue('WKNumState');
	//log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	  
	// form.setVisibleById("_matriculasolicitante", false); 
	// form.setVisibleById("_prazoaprovacao", false); 
	 
	 
	
	
		
	if (activity == ABERTURA){
		 form.setVisibleById("div_projeto", false);
		 form.setVisibleById("div_fonte", false);
		 	 
		
	}
	
	
}