function displayFields(form,customHTML){
	var ABERTURA = 0;
	var COMPRAS = 5;
	var CONTABILIDADE = 10;
	
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
	 else if (activity == COMPRAS){
		 form.setVisibleById("div_contabilidade", false);
		 
	 }
	 
	
}