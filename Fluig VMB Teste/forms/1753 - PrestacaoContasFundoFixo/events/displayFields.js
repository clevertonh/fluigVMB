function displayFields(form,customHTML){
	
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO = 5;
	var AVALIAR_ERRO = 18;
	var CORRIGIR = 25;
	var PRESTAR_CONTAS = 38;
	var VALIDAR_NOTA = 39;

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
	 form.setVisibleById("matriculasolicitante", false); 
	// form.setVisibleById("codigoProduto", false);
	 
	 
	 if (activity == INICIO || activity == ABERTURA || activity == PRESTAR_CONTAS || activity == VALIDAR_NOTA){
		 form.setVisibleById("2b", false);
	 
	 }
	 

	 
	 
}