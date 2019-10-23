function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var SOLICITAR = 56;
	var APROVACAO =5;
	var COMPRAS = 12;
	var HOSPITALIDADE = 22;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	log.info("----ATIVIDADE APROVACAO CONTRATOS: " + activity);
	
	//campos sempre ocultos
	 form.setVisibleById("aprovacaoServico", false);
	 
	if (activity == ABERTURA || activity == SOLICITAR){
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false); 
		 form.setVisibleById("divJustificativaReprovacao", false);
		 
		 
		 
		 
	}
    
	
	
	
	
}