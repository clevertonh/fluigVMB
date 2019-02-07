function displayFields(form,customHTML){ 
	
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    //form.setVisible("alocacao");
    //form.setVisible("localizacao");
    //form.setVisible("contacontabil");
    
}