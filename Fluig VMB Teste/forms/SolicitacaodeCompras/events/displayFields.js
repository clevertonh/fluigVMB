function displayFields(form,customHTML){
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    var ABERTURA = 0;
    
  //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
    
    
}