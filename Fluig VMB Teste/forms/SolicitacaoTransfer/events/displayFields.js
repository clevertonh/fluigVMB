function displayFields(form,customHTML){ 
	
	var activity = getValue('WKNumState');
	//log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	
	 form.setVisibleById("_matriculasolicitante", false); 
	 form.setVisibleById("_prazoaprovacao", false); 
	 form.setVisibleById("_prazoaprovacaoDIR", false);
	
	
}