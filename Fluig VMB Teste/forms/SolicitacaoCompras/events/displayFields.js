function displayFields(form,customHTML){
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    var ABERTURA = 0;
    
  //campos sempre ocultos
	 form.setVisibleById("matriculasolicitante", false);
	 
	 /*
	 form.setVisibleById("div_codProduto", false);	 
	 var indexes = form.getChildrenIndexes("tableCompras");
     for (var i = 0; i < indexes.length; i++) {
         form.setVisibleById("codigoProduto___" + indexes[i], false);
     }
     */
	 
    
}