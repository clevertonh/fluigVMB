function displayFields(form,customHTML){
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	if (activity == ABERTURA){
		//form.setVisibleById("vl_aprovado", false);
		
	}
}