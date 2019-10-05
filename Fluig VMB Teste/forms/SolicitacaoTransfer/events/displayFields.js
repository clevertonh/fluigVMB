function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO =5;
	var CONTRATAR = 15;
	var CORRIGIR = 12;
	
	
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
	
	
	 if (activity == ABERTURA || activity == CORRIGIR){		 
		 form.setVisibleById("div_produto", false); 
	 }
	 else if (activity == APROVACAO){		 
	 }
	 
	 else if (activity == CONTRATAR){
		 
	 }
	 
}


