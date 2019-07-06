function displayFields(form,customHTML){
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields Solicitacao Desligamento: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
    
}