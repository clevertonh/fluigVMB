function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var ELABORAR =10;
	var ASSINAR = 18;
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    if (activity != ASSINAR){
    	 form.setVisibleById("div_status", false);
    }
    
    
}