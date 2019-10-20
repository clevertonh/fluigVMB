function displayFields(form,customHTML){
	var ABERTURA = 0;
	var APROVACAO =5;
	var COMPRAS = 12;
	var HOSPITALIDADE = 22;
	
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
	 else if (activity == COMPRAS || activity == HOSPITALIDADE ){
		 form.setVisibleById("div_produto", false); 
		 form.setVisibleById("div_status", false); 
		 
	 }
	 
	 
    
}
