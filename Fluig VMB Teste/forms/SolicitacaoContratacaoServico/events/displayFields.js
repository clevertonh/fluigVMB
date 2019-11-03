function displayFields(form,customHTML){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO_COMPRAS = 12;
	var REALIZAR_COTACAO_HOSPITALIDADE = 22;
	var ENVIAR_APROVACAO_COMPRAS = 209;
	var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
	var APROVACAO_SERVICO_COMPRAS = 105;
	var APROVACAO_SERVICO_HOSPITALIDADE = 94;
	var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
	var VERIFICAR_APROVACAO_COMPRAS = 145;
	var SOLICITACAO_CONTRATO_HOSPITALIDADE = 243;
	var SOLICITACAO_CONTRATO_COMPRAS = 151;
	var INTEGRAR_PROTHEUS_COMPRAS_COMPRAS = 212;
	var INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE = 215;
	var VALIDAR_RH = 161;
	var VERIFICAR_ASSINATRA_HOSPITALIDADE = 270;
	var VERIFICAR_ASSINATRA_COMPRAS = 274;
	
	
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
	 form.setVisibleById("div_tipoAprovacao", false); 
	 form.setVisibleById("div_comprador", false); 
	
	 
	 
	 
	 
	 if (activity == ABERTURA || activity == SOLICITAR || activity == CORRIGIR || activity == APROVACAO_GESTOR){
		 form.setVisibleById("3b", false);
		 form.setVisibleById("4b", false);
		 form.setVisibleById("div_statusContrato", false); 

	 }
	 else if (activity == REALIZAR_COTACAO_COMPRAS || activity == REALIZAR_COTACAO_HOSPITALIDADE ){
		 form.setVisibleById("div_produto", false); 
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
	 else if (activity == ENVIAR_APROVACAO_COMPRAS || activity == ENVIAR_APROVACAO_HOSPITALIDADE ){
		 form.setVisibleById("div_status", false); 
		 form.setVisibleById("div_statusContrato", false); 
		 
	 }
	 else if (activity == SOLICITACAO_CONTRATO_HOSPITALIDADE || activity == SOLICITACAO_CONTRATO_COMPRAS){
		 		form.setVisibleById("div_statusContrato", false);
	 }

	 
    
}
