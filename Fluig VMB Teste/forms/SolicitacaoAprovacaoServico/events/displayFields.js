function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var SOLICITAR = 56;
	var GERENTE_ADM =5;
	var DIRETOR_FIN = 35;
	var DIRETOR_RH = 11;
	var DIRETOR_MINISTERIO = 13;
	var DIRETOR_MKT = 15;
	var DIRETOR_ADVOCACY = 18;
	var DIRETOR_NACIONAL = 27;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	
	//log.info("----ATIVIDADE APROVACAO CONTRATOS: " + activity);
	
	//campos sempre ocultos
	
	 
	if (activity == ABERTURA || activity == SOLICITAR){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divJustificativaReprovacao", false); 
		 form.setVisibleById("divAprovacaoServico", false);
		 
	}
	else if (activity == GERENTE_ADM){		 
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);		 
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if ( activity == DIRETOR_FIN){
		 form.setVisibleById("div_nivel1", false);	
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if (activity == DIRETOR_RH){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if (activity == DIRETOR_MINISTERIO){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);		 
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if (activity == DIRETOR_MKT){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);		 
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if (activity == DIRETOR_ADVOCACY){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	else if (activity == DIRETOR_NACIONAL){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divAprovacaoServico", false);
	}
	
	
	
}