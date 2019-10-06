function displayFields(form,customHTML){
	var ABERTURA = 0;
	var APROVACAO =5;
	var CONTRATAR = 12;
	
	var activity = getValue('WKNumState');

	var solicitante = getValue("WKUser");  
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	

    
  //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("_matriculasolicitante", false);
	 
	 form.setVisibleById("prazoaprovacao", false); 
	 
	 if (activity == ABERTURA || activity == APROVACAO){
		 form.setVisibleById("3b", false);

	 }
	 else if (activity == CONTRATAR ){
		 form.setVisibleById("div_produto", false); 
	 }
    
}
