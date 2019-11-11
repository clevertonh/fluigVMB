function displayFields(form,customHTML){
	
	
	var ABERTURA = 0;
	var GERAR_ADTO = 10;
	var GERAR_ADF_CARTAO = 24;
	var GERENTE_ADM = 31;
	var DIRETOR_FINANCEIRO = 5;
	var DIRETOR_MKT = 48;
	var DIRETOR_RH = 50;
	var DIRETOR_ADVOCACY = 52;
	var DIRETOR_MINISTERIO = 54;
	var DIRETOR_NACIONAL = 46;
	

	var activity = getValue('WKNumState');
	//log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	 form.setVisibleById("prazoaprovacaoDIR", false);
	
	 form.setVisibleById("_matriculasolicitante", false); 
	 form.setVisibleById("_prazoaprovacao", false); 
	 form.setVisibleById("_prazoaprovacaoDIR", false);
	 
	 form.setVisibleById("div_contrato", false);
	 
	 
		
	if (activity == ABERTURA){
		 form.setVisibleById("div_projeto", false);
		 form.setVisibleById("div_fonte", false);
		 form.setVisibleById("div_nivel1", false);
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);
		 form.setVisibleById("divJustificativaReprovacao", false);
		 
		 
		
	}
	else if (activity == GERENTE_ADM) {
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_nivel2", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);
	}
	else if (activity == DIRETOR_FINANCEIRO) {
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_nivel3", false);
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);

	}
	else if (activity == DIRETOR_MKT) {
		 form.setVisibleById("div_pagador", false);		 
		 form.setVisibleById("div_nivel4", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);

	}
	else if (activity == DIRETOR_RH) {
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_nivel5", false);
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);

	}
	else if (activity == DIRETOR_ADVOCACY) {
		 form.setVisibleById("div_pagador", false);
		 
		 form.setVisibleById("div_nivel6", false);
		 form.setVisibleById("div_nivel7", false);

	}
	else if (activity == DIRETOR_MINISTERIO) {
		 form.setVisibleById("div_pagador", false);
		 form.setVisibleById("div_nivel7", false);

	}
	else if (activity == DIRETOR_NACIONAL) {
		 form.setVisibleById("div_pagador", false);		 

	}
	
	
	else if (activity == GERAR_ADTO) {
		 form.setVisibleById("div_pagador", false);
		 
		 //quando os adiantamentos passarem a ser gerados direto para o contas a pagar, esses campos precisarão ser solicitados
		 form.setVisibleById("div_banco", false);
		 form.setVisibleById("div_agencia", false);
		 form.setVisibleById("div_conta", false);
		 form.setVisibleById("div_dtPgto", false);
		 
	}
	else if (activity == GERAR_ADF_CARTAO) {
		 form.setVisibleById("div_banco", false);
		 form.setVisibleById("div_agencia", false);
		 form.setVisibleById("div_conta", false);
	}
	
	
	
}