function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ENVIAR_ASSINATURA = 18;
	var REGISTRAR = 32;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    
}