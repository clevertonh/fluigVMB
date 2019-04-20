function displayFields(form,customHTML){ 
	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO_GESTOR = 5;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
	 form.setVisibleById("matriculasolicitante", false); 
	 
	 
}