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
		 form.setVisibleById("div_tipoPessoa", false);
		 
	 }
	 else if (activity == VALIDAR ){
		 form.setVisibleById("div_contabilidade", false);
		 form.setVisibleById("div_compras2", false);
		 form.setVisibleById("div_tipoPrd", false);
		 
			if (form.getValue("tipo") == "servico"){
				 form.setVisibleById("vl_base", false);
				
			}
		 
		 
	 }
	 else if ( activity == CORRIGIR){
		 form.setVisibleById("div_contabilidade", false);
		 
		 
		 
	 }
	 
	
}