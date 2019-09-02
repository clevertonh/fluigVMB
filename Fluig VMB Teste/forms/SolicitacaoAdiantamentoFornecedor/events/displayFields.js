function displayFields(form,customHTML){
	
	
	var ABERTURA = 0;
	var APROVACAO_DIRETOR = 5;
	var GERAR_ADTO = 10;
	var SOLICITANTE = 24;
	var APROVACAO_GESTOR = 31;

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
	 
	 
		
	if (activity == ABERTURA){
		 form.setVisibleById("div_projeto", false);
		 form.setVisibleById("div_fonte", false);
		 form.setVisibleById("div_aprovador", false);
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_diretor", false);
		
	}
	else if (activity == APROVACAO_GESTOR) {
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_diretor", false);
	}
	else if (activity == APROVACAO_DIRETOR) {
		 form.setVisibleById("div_pagador", false);

	}
	else if (activity == GERAR_ADTO) {
		 form.setVisibleById("div_cartao", false);
		 
		 //quando os adiantamentos passarem a ser gerados direto para o contas a pagar, esses campos precisarão ser descomentados
		 form.setVisibleById("div_banco", false);
		 form.setVisibleById("div_agencia", false);
		 form.setVisibleById("div_conta", false);
		 form.setVisibleById("div_dtPgto", false);
		 
	}
	else if (activity == SOLICITANTE) {
		 form.setVisibleById("div_banco", false);
		 form.setVisibleById("div_agencia", false);
		 form.setVisibleById("div_conta", false);
	}
	
	
	
}