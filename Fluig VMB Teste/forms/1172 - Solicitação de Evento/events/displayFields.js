function displayFields(form,customHTML){ 
	
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CORRIGIR = 45;
	var GERENCIAR = 55;
	var AVALIACAO = 57;
	
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
	 form.setVisibleById("matriculasolicitante", false); 
	 form.setVisibleById("divMatrApr", false); 
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("_matricula", false);
	 form.setVisibleById("_matriculasolicitante", false);
	 
	 form.setVisibleById("prazoaprovacao", false); 
	 
	 if (activity != AVALIACAO){
		 form.setVisibleById("step4", false); 
		 form.setVisibleById("avancarAvaliacao", false); 
		 
		 
	 }
	 
	 
}