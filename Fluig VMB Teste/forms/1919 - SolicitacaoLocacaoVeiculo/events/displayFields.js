function displayFields(form,customHTML){
	var ABERTURA = 0;
	var APROVACAO =5;
	var CORRIGIR = 39;
	var CONTRATAR = 47;

	
	var activity = getValue('WKNumState');
//	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
   // var ABERTURA = 0;
    
    //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("_matriculasolicitante", false);
	 form.setVisibleById("prazoaprovacao", false);
	 form.setVisibleById("_prazoaprovacao", false);
	 form.setVisibleById("justificativa", false);	 	 
	 form.setVisibleById("matricula", false);	 
	 form.setVisibleById("divMatrApr", false);
	 
	
	 
	 if (activity == ABERTURA || activity == CORRIGIR){
		 form.setVisibleById("div_solicitacaoAnterior", false);
		 form.setVisibleById("div_produto", false); 
		 
		 
	 }
}