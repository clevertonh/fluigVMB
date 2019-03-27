function displayFields(form,customHTML){ 
	
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
    form.setVisibleById("matriculasolicitante", false); 
   // form.setVisibleById("vl_diarias", false); 
    
    
    
    
}