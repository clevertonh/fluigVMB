function displayFields(form,customHTML){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var INCLUIR_MEDICAO = 87;
	var AGUARDAR_APROVACAO = 65;
	var CORRIGIR = 92;
	var ANEXAR_RELATORIO = 74;
	var ENCERRAR_MEDICAO = 13;
	var CLASSIFICAR_NOTA = 51;
	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    if (activity == ABERTURA || activity == SOLICITAR){
    	 form.setVisibleById("2b", false);
    }

	 
	 
}