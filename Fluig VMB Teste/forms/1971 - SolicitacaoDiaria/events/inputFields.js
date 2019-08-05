function inputFields(form){
	
	var ABERTURA = 4;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16;
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;
	
	var activity = getValue('WKNumState');
	
	
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
	
}