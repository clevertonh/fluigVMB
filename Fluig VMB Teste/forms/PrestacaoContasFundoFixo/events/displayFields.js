function displayFields(form,customHTML){
	
	//var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
	 form.setVisibleById("matriculasolicitante", false); 
	// form.setVisibleById("codigoProduto", false);
	 
	 
	 if (activity == ABERTURA){
		 form.setVisibleById("2b", false);
	 }
	 
	 
}