function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var REGISTRAR_PGTO = 16; 
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	
	var activity = getValue('WKNumState');
	
	
    log.info("evento displayFields 2");
    log.info(activity);
	
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
     form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("prazoaprovacao", false); 
    
    
	if (activity == ABERTURA  ) {
		recuperaValorAgenda();
	}
	else if (activity == APROVACAO  ) {
		recuperaValorAgenda();
	}
	
	else if (activity == REGISTRAR_PGTO  ) {
		//recuperaValorAgenda();
	}
	
	
	
	   //RECUPERA VALOR DE DIARIA DA ATIVIDADE E PREENCHE CAMPO VALOR TOTAL
    function recuperaValorAgenda(){
   	   var indexes = form.getChildrenIndexes("tbAgendaViagem");            
   	   var valortotal = 0;
   	   
   	  	
          for (var i = 0; i < indexes.length; i++) {            
	              var valor = parseFloat(form.getValue("custo___" + indexes[i]));   
	                               
	              log.info("valor unitario da diaria");
	              log.info(valor);
	              valortotal = valortotal + valor;
             
              
          }        
          
          form.setValue("vl_diarias",valortotal);
          
    }
    
}