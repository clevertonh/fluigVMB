function displayFields(form,customHTML){
	
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	 
	 form.setVisibleById("divMatrApr", false); 
	 form.setVisibleById("_matriculasolicitante", false); 
	 form.setVisibleById("_prazoaprovacao", false); 
	 
	 
	
	
		
	if (activity == ABERTURA){
		 form.setVisibleById("div_projeto", false);
		 form.setVisibleById("div_fonte", false);
		 form.setVisibleById("div_vlapr", false);
		 
		
	}
	
	
}