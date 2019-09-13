function displayFields(form,customHTML){
	var ABERTURA = 0;
	var VALIDAR = 5;
	var DADOS_CONTABEIS = 10;
	var CORRIGIR = 16;
	
	var activity = getValue('WKNumState');
	//log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	 
	 form.setVisibleById("matriculasolicitante", false); 
	
	 // form.setVisible("campoA", false);
	// form.setVisibleById("_matriculasolicitante", false); 
	
	 if (activity == ABERTURA){
		 form.setVisibleById("div_compras", false);
		 form.setVisibleById("div_contabilidade", false); 
	 }
	 else if (activity == VALIDAR || activity == CORRIGIR){
		 form.setVisibleById("div_contabilidade", false);
		 
	 }

	 
	
}