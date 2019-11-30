function displayFields(form,customHTML){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO =5;
	var CORRIGIR = 39;
	var COTAR = 47;
	var VALIDAR_RH = 55;
	var SOLICITAR_APROVACAO = 59;
	var APROVACAO_SERVICO = 61;
	var SOLICITAR_CONTRATO = 65;
	var SOLICITACAO_CONTRATO = 77;
	var VERIFICAR_ASSINATURA = 79;
	var FINALIZAR = 83;

	
	var activity = getValue('WKNumState');
//	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
   // var ABERTURA = 0;
    
    //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("prazoaprovacao", false);
	 form.setVisibleById("justificativa", false);	 	 
	 form.setVisibleById("matricula", false);	 
	 form.setVisibleById("divMatrApr", false);
	 form.setVisibleById("prazoaprovacaoDIR", false);
	 form.setVisibleById("div_tipoAprovacao", false); 
	
	 
		
	 
	 if (activity == ABERTURA || activity == CORRIGIR || activity == SOLICITAR){
		 form.setVisibleById("div_solicitacaoAnterior", false);
		 
		 if (activity != SOLICITAR){
			 form.setVisibleById("div_produto", false); 
		 }
		 
		 
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
		 
		 
	 }
	 else if (activity == APROVACAO){		 
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
	 }
	 
	 else if (activity == COTAR){
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
	 
	 
	 if (form.getValue("Numerocontrato") !="" && form.getValue("Numerocontrato") != null){
		 form.setVisibleById("div_statusContrato", false); 
		 form.setVisibleById("div_status", false); 
		 
	 }
	 
	
	 
	 
	 
}