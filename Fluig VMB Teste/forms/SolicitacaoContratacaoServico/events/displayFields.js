function displayFields(form,customHTML){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO = 22;
	var SOLICITAR_APROVACAO = 206;
	var APROVACAO_SERVICO = 94;
	var SOLICITACAO_CONTRATO = 66;
	var VERIFICAR_APROVACAO = 151;
	var FINALIZAR = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATRA = 270;
	var APROVACAO_DIR = 292;
	var APROVACAO_DN = 301;

	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	

    
  //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("_matriculasolicitante", false);
	// form.setVisibleById("codCondPgto", false)
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("div_tipoAprovacao", false); 
	 form.setVisibleById("div_comprador", false); 
	
	 
	 
	 
	 
	 if (activity == ABERTURA || activity == SOLICITAR || activity == CORRIGIR || activity == APROVACAO_GESTOR){
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 

	 }
	 else if (activity == REALIZAR_COTACAO ){ 
				 form.setVisibleById("div_status", false); 
				 form.setVisibleById("div_rh", false);
				 form.setVisibleById("4b", false);
				 
				 if (form.getValue("cnpjcpf") == "" || form.getValue("cnpjcpf") == null){
					 form.setVisibleById("div_statusContrato", false);
				 }
				 
				 
				 
				 if (form.getValue("definicaoValor") == "demanda") {
					 form.setVisibleById("div_itensServico", false);
				 }
		 
		 
		 
	 }
	 else if (activity == APROVACAO_DIR){
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
	 }
	 else if (activity == APROVACAO_DN){
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 
	 }
	 
	 else if (activity == VALIDAR_RH){
		 form.setVisibleById("div_status", false); 
		 form.setVisibleById("div_statusContrato", false); 
		
		 if (form.getValue("definicaoValor") == "demanda") {
			 form.setVisibleById("div_itensServico", false);
		 }
		 
	 }
	 else if (activity == SOLICITAR_APROVACAO ){
		// form.setVisibleById("div_status", false); 
		 form.setVisibleById("div_statusContrato", false); 
		 
		 if (form.getValue("definicaoValor") == "demanda") {
			 form.setVisibleById("div_itensServico", false);
		 }
		 
	 }
	 else if (activity == SOLICITACAO_CONTRATO){
		 		form.setVisibleById("div_statusContrato", false);
		 		
		 		 if (form.getValue("definicaoValor") == "demanda") {
					 form.setVisibleById("div_itensServico", false);
				 }
	 }

	 
    
}
