function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var APROVACAO_FINANCAS = 16;
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;


	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("			var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	

    
    

    
}