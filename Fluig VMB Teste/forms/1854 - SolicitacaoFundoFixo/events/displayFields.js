function displayFields(form,customHTML){
	
	//var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("divMatrApr", false); 
	 
	 
	 if (activity == ABERTURA){
		 form.setVisibleById("2b", false);
	 }
	 
	 
}