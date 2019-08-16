function displayFields(form,customHTML){ 
	var ABERTURA = 0;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16;
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;

	
	var activity = getValue('WKNumState');
	
	
  	customHTML.append("<script>");
    customHTML.append("			var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
     form.setVisibleById("matriculasolicitante", false);
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("prazoaprovacao", false); 
	
	 
	 if (activity == ABERTURA || activity == APROVACAO || activity == REALIZAR_PGTO || activity == AVALIAR_PGTO || activity == CORRIGIR){
		 form.setVisibleById("3b", false);
		 
	 }
    
		/*	
		 * 
	if (activity == APROVACAO  ) {
		recuperaValorAgenda();
	}


	
	   //RECUPERA VALOR DE DIARIA DA ATIVIDADE E PREENCHE CAMPO VALOR TOTAL
    function recuperaValorAgenda(){
   	   var indexes = form.getChildrenIndexes("tbAgendaViagem");            
   	   var valortotal = 0;
   	   
   	  	
          for (var i = 0; i < indexes.length; i++) {            
	              var valor = parseFloat(form.getValue("custo___" + indexes[i]));   
	              valortotal = valortotal + valor;
             
              
          }        
          
          form.setValue("vl_diarias",valortotal);
          
    }
    
    */
	
}