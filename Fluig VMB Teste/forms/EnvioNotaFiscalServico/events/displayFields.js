function displayFields(form,customHTML){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var VALIDAR = 29;
	var AGUARDAR_APROVACAO = 13;
	var CORRIGIR = 32;
	var GERAR_PEDIDO = 35;
	var AUTORIZAR_NF = 44;
	var ENVIAR_NF = 42;
	var LANCAR_PRE_NOTA = 49;
	var CLASSIFICAR_NOTA = 51;
	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	

	 
	 
}