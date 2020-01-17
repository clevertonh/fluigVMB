function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO =5;
	var COTACAO = 15;
	var CORRIGIR = 12;
	var VALIDAR_RH = 30;
	var SOLICITAR_APROVACAO = 28;
	var APROVACAO_SERVICO = 36;
	var SOLICITAR_CONTRATO = 37;
	var SOLICITACAO_CONTRATO = 43;
	var VERIFICAR_ASSINATURA = 44;
	var FINALIZAR = 48;
	
	
	
	var activity = getValue('WKNumState');
	//log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("_prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	 form.setVisibleById("_matriculasolicitante", false); 
	 form.setVisibleById("prazoaprovacaoDIR", false);
	 form.setVisibleById("div_tipoAprovacao", false);
	 form.setVisibleById("codCondPgto", false)
	 
	 
	
	
	 if (activity == ABERTURA || activity == CORRIGIR){		 
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
		 form.setVisibleById("div_filial", false);
		 
		 
		 
	 }
	 else if (activity == APROVACAO){		 
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
	 }
	 
	 else if (activity == COTACAO){
		 form.setVisibleById("div_status", false); 
		 form.setVisibleById("div_rh", false);
		 form.setVisibleById("4b", false);
		 
		 if (form.getValue("cnpjcpf") == "" || form.getValue("cnpjcpf") == null){
			 form.setVisibleById("div_statusContrato", false);
		 }
	 }
	 
	 else if (activity == VALIDAR_RH){
		 form.setVisibleById("div_status", false); 
		 form.setVisibleById("div_statusContrato", false); 
		 
	 }
	 
}


