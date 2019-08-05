function displayFields(form,customHTML){ 

	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CANCELARSOLICITACAO = 93 ;
	var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var PAGARDIARIAS = 129;
	var REALIZAR_PAGAMENTO = 165;
	var AVALIAR_ATRASO = 159;
	
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	//var nextAtv = getValue("WKNextState");
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
	//campos sempre ocultos
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("prazoCancelamento", false);
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	 form.setVisibleById("divMatrApr", false); 
	 form.setVisibleById("cpfaprovador", false); 
	 form.setVisibleById("prazoreembolso", false);
     //form.setVisibleById("divDataSetAgenda", false);
     form.setVisibleById("emailPassageiro", false);
     form.setVisibleById("btn_add_itemS", false);
    
     form.setVisibleById("div_valorp", false);
     form.setVisibleById("div_valorh", false);
    // form.setVisibleById("divEventos", false);
         
	   
    if (activity == ABERTURA ) {
    	//campos aba aprovador e hospitalidade
       	//form.setVisibleById("2b", false);
    	form.setVisibleById("3b", false);
    	form.setVisibleById("4b", false);
    	form.setVisibleById("divCotacao", false);
    	
     	
    		//campos aba dados gerais
        	form.setVisibleById("selecaodeviagens", false);
          	form.setVisibleById("div_justificativaremarcacao", false);    
          	form.setVisibleById("divJustificativaCancelamento", false);
            
          	//campos aba passageiro
        	form.setVisibleById("divdadospassageiro", false);
        	form.setVisibleById("divOutroFun", false);
            form.setVisibleById("div_embaixador", false);
            form.setVisibleById("div_funcionario", false);
      		

    	
        
        
    	//campos aba agenda
    	//retirar depois do teste
    	form.setVisibleById("divDataSetAgenda", false);
    	
    	

    		//campos aba voo
    		form.setVisibleById("trecho1", false);
            form.setVisibleById("trecho2", false);
            form.setVisibleById("trecho3", false);
            form.setVisibleById("observacaoVoo", false);
            form.setVisibleById("div_tipoVoo", false);

    	
    	
    	 
       	//campos hospedagem
     	form.setVisibleById("divDatasHotel1", false);
     	form.setVisibleById("divDatasHotel2", false);
     	form.setVisibleById("divDatasHotel3", false);
        form.setVisibleById("observacaoHotel", false);
        form.setVisibleById("div_tipohotel1", false);
        form.setVisibleById("div_tipohotel2", false);
        form.setVisibleById("div_tipohotel3", false);
        form.setVisibleById("div_tipoHotel", false);
    	
        //campos aba final      
        form.setVisibleById("divJustificativa", false);
               
       
        
    }

    else if (activity == SOLICITARVIAGEM){
    	//campos aba aprovador e hospitalidade
       	//form.setVisibleById("2b", false);
    	form.setVisibleById("3b", false);
    	form.setVisibleById("4b", false);
    	form.setVisibleById("divCotacao", false);
    	
    	//campos aba dados gerais    
    	form.setVisibleById("divJustificativaCancelamento", false);
    	
    	
    	if (form.getValue("remarcacao") == "" || form.getValue("remarcacao") == null ){
    		//campos aba dados gerais
        	form.setVisibleById("selecaodeviagens", false);
          	form.setVisibleById("div_justificativaremarcacao", false);    
          	
    	}
    	else if (form.getValue("remarcacao") == "nao" ){    	
    		//campos aba dados gerais
        	form.setVisibleById("selecaodeviagens", false);          
    		form.setVisibleById("div_justificativaremarcacao", false); 
    	}
    	
    	
    	
      
  
      	
      	if (form.getValue("solicitanteFuncionario") == "" || form.getValue("solicitanteFuncionario") === null ){
      	//campos aba passageiro
        	form.setVisibleById("divdadospassageiro", false);
        	form.setVisibleById("divOutroFun", false);
            form.setVisibleById("div_embaixador", false);
            form.setVisibleById("div_funcionario", false);
      		
      	}
  
    	else if ( form.getValue("solicitanteFuncionario") == "sim"){
      		//campos aba passageiro
      		form.setVisibleById("div_funcionario", false);
      		
      		      		
      		if (form.getValue("solicitantepassageiro") == "nao"){
      			
      			if (form.getValue("passageirofuncionario") == "nao"){
      				form.setVisibleById("divOutroFun", false);
      			}
      			
      			else if (form.getValue("passageirofuncionario") == "sim"){
      				form.setVisibleById("div_embaixador", false);
      			}
      			
      		}
      		else if (form.getValue("solicitantepassageiro") == "sim"){
      				form.setVisibleById("div_embaixador", false);
      				form.setVisibleById("divOutroFun", false);
      		}
      		
      	}
      	
   
  
    	
        
        
    	//campos aba agenda
    	//retirar depois do teste
    	form.setVisibleById("divDataSetAgenda", false);
    	
    	
    	if (form.getValue("pedirPassagem") == "" || form.getValue("pedirPassagem") === null ){
    		//campos aba voo
    		form.setVisibleById("trecho1", false);
            form.setVisibleById("trecho2", false);
            form.setVisibleById("trecho3", false);
            form.setVisibleById("observacaoVoo", false);
            form.setVisibleById("div_tipoVoo", false);
    	}
    	else {
    		if (form.getValue("tipovoo") == "" ||  form.getValue("tipovoo") == null){
    			form.setVisibleById("trecho1", false);
                form.setVisibleById("trecho2", false);
                form.setVisibleById("trecho3", false);
                form.setVisibleById("observacaoVoo", false);
                form.setVisibleById("div_tipoVoo", false);
        	}
    		else if (form.getValue("tipovoo") == "idavolta" ){
    			form.setVisibleById("trecho2", false);
                form.setVisibleById("trecho3", false);
                
                if (form.getValue("tipoviagem") == "nacional" ){
                	form.setVisibleById("div_internacional1", false);
     				form.setVisibleById("div_internacional2", false);
     				form.setVisibleById("div_internacional3", false);
                }
             
               
    			           		
    		}
    		else if (form.getValue("tipovoo") == "ida" ){
    			 form.setVisibleById("trecho2", false);
                 form.setVisibleById("trecho3", false);          
                 form.setVisibleById("div_datadestino1", false);
                 
                 
 				
 			     if (form.getValue("tipoviagem") == "nacional" ){
                 	form.setVisibleById("div_internacional1", false);
      				form.setVisibleById("div_internacional2", false);
      				form.setVisibleById("div_internacional3", false);
                 }
 				
 				
                 
    		}
    		else if (form.getValue("tipovoo") == "varios"){
    			  form.setVisibleById("div_datadestino1", false);
    		}
    		
		
    		
    	}
    	
    	
    	if (form.getValue("pedirHotel") == "" || form.getValue("pedirHotel") == null){
    		//campos hospedagem
         	form.setVisibleById("divDatasHotel1", false);
         	form.setVisibleById("divDatasHotel2", false);
         	form.setVisibleById("divDatasHotel3", false);
            form.setVisibleById("observacaoHotel", false);
            form.setVisibleById("div_tipohotel1", false);
            form.setVisibleById("div_tipohotel2", false);
            form.setVisibleById("div_tipohotel3", false);
            form.setVisibleById("div_tipoHotel", false);
    	}
    	else {    		    	
    		if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null) {
    			form.setVisibleById("divDatasHotel1", false);
             	form.setVisibleById("divDatasHotel2", false);
             	form.setVisibleById("divDatasHotel3", false);
                form.setVisibleById("observacaoHotel", false);

    		}

    		
    	}
    	 
       	
    	
        //campos aba final      
        form.setVisibleById("divJustificativa", false);
    }
   
  
    else {
    	
    	//remove botão de excluir item da agenda
    	//tomar cuidado porque essa função oculta o botao padrão de deletar do filho. Se um outro form for adicionado
    	//irá ocultar os botões dele tambem.
		 form.setHideDeleteButton(true);
	       
	        if (form.getValue("viagemplanejada") == "nao"){
	        	form.setVisibleById("divDataSetAgenda", false);
			}
	        
	    		 
		if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null ) {
			form.setVisibleById("observacaoHotel",false);
			form.setVisibleById("divDatasHotel1",false);
			form.setVisibleById("divDatasHotel2",false);
			form.setVisibleById("divDatasHotel3",false);
			
	
	    }
		
		if (form.getValue("remarcacao") == "nao" ) {
			form.setVisibleById("selecaodeviagens",false);
			form.setVisibleById("div_justificativaremarcacao",false);
			form.setVisibleById("divCotacao", false);	
		
	    }
 		
 		
 		if (form.getValue("tipovoo") == "idavolta") {				
			form.setVisibleById("trecho1",true);
			form.setVisibleById("div_destino1",true);
			form.setVisibleById("div_datadestino1",true);
			form.setVisibleById("trecho2",false);
			form.setVisibleById("trecho3",false);	
			
			form.setVisibleById("divDatasHotel2",false);
			form.setVisibleById("divDatasHotel3",false);
			
			
			
			
			if (form.getValue("tipoviagem") == "nacional"){
				form.setVisibleById("div_internacional1",false);
				form.setVisibleById("div_internacional2",false);
				form.setVisibleById("div_internacional3",false);
					
			}
			else {
				form.setVisibleById("div_Nacional1",false);
				form.setVisibleById("div_Nacional2",false);
				form.setVisibleById("div_Nacional3",false);
			}
			
			
	    }
		
		else if (form.getValue("tipovoo") == "ida") {
			form.setVisibleById("trecho1",true);
			form.setVisibleById("trecho2",false);
			form.setVisibleById("trecho3",false);
			form.setVisibleById("div_destino1",true);
			form.setVisibleById("div_datadestino1",false);		
			
			form.setVisibleById("divDatasHotel2",false);
			form.setVisibleById("divDatasHotel3",false);
			
			if (form.getValue("tipoviagem") == "nacional"){
				form.setVisibleById("div_internacional1",false);
				form.setVisibleById("div_internacional2",false);
				form.setVisibleById("div_internacional3",false);
					
			}
			else {
				form.setVisibleById("div_Nacional1",false);
				form.setVisibleById("div_Nacional2",false);
				form.setVisibleById("div_Nacional3",false);
			}
	    }
		
		else if (form.getValue("tipovoo") == "varios") {
			form.setVisibleById("trecho1",true);
			form.setVisibleById("trecho2",true);
			form.setVisibleById("trecho3",true);
			form.setVisibleById("div_destino1",true);
			form.setVisibleById("div_datadestino1",true);		
			
			
			if (form.getValue("tipoviagem") == "nacional"){
				form.setVisibleById("div_internacional1",false);
				form.setVisibleById("div_internacional2",false);
				form.setVisibleById("div_internacional3",false);
					
			}
			else {
				form.setVisibleById("div_Nacional1",false);
				form.setVisibleById("div_Nacional2",false);
				form.setVisibleById("div_Nacional3",false);
			}
	    
		}
		
		if (form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null ) {
			form.setVisibleById("trecho1",false);
			form.setVisibleById("trecho2",false);
			form.setVisibleById("trecho3",false);
	
	    }
		
		
		if (form.getValue("solicitanteFuncionario") == "sim") {
			form.setVisibleById("divOutroFun",false);
		}
 		
		
    	
    	
	
    }
    
    if (activity == APROVACAO ) {
		form.setVisibleById("3b", false);
		form.setVisibleById("4b", false);
		form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
        form.setVisibleById("div_tipohotel1", false);
        form.setVisibleById("div_tipohotel2", false);
        form.setVisibleById("div_tipohotel3", false);
    	

   
        
	} 
	
	else if (activity == COMPRARPASSAGEM ) {
		form.setVisibleById("4b", false);
		form.setVisibleById("div_valores", false);
        form.setVisibleById("divRessarcimento", false);
        form.setVisibleById("divCobranca", false);
        form.setVisibleById("divJustificativaCancelamento", false);
        form.setVisibleById("divReembolso", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
		form.setVisibleById("divTipormb", false);
		form.setVisibleById("btn_add_itemS", true);
		
	
		
    } 		
	
	else if (activity == OBTERPASSAGEM  ) {
    		//form.setVisibleById("2b", false);  
    		//form.setVisibleById("3b", false); 
			//form.setVisibleById("4b", false);
	        form.setVisibleById("divJustificativaCancelamento", true);
	        form.setVisibleById("justificativacanc", false);
	        form.setVisibleById("divRessarcimento", false);
	        form.setVisibleById("divCobranca", false);
		    form.setVisibleById("btn_add_item",false);
			form.setVisibleById("removeitem",false);
			form.setVisibleById("divReembolso", false);    
    		form.setVisibleById("divJustificativaReprovacaoViagem", false);
            form.setVisibleById("div_tipohotel1", true);
            form.setVisibleById("divTipormb", false);
            form.setVisibleById("div_tarifa", false); 
            //form.setVisibleById("div_aptodiarias", false);
            //form.setVisibleById("div_dtPgto", false);
            
        	//form.setVisibleById("removeitem", false);
          	//form.setVisibleById("removeServico", false);
            
            if (form.getValue("tipovoo") != "varios"){
	            form.setVisibleById("divDatasHotel2", false);
	            form.setVisibleById("divDatasHotel3", false);
            	
            }
              //so funciona quando é o botao padrão de deletar 
            //form.setHideDeleteButton(false);
            
	}
	else if (activity == REGISTRARCANCELAMENTO ){
		//form.setVisibleById("2b", false);
    	form.setVisibleById("4b", false);
		form.setVisibleById("divReembolso", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
 		form.setVisibleById("div_valortx", false);
		
		
        if (form.getValue("tipovoo") != "varios"){
            form.setVisibleById("divDatasHotel2", false);
            form.setVisibleById("divDatasHotel3", false);
        	
        }
		

        
	}
	
	else if (activity ==  CORRIGIRSOLICITACAO){
	   	form.setVisibleById("2b", false);		
    	form.setVisibleById("3b", false);
    	form.setVisibleById("4b", false);
    	form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);  
	    form.setVisibleById("divJustificativa", false);
        form.setVisibleById("div_tipohotel1", false);
        form.setVisibleById("div_tipohotel2", false);
        form.setVisibleById("div_tipohotel3", false);
        
        if (form.getValue("pedirHotel") != "sim" ){
        	 form.setVisibleById("div_tipoHotel", false);
        }
        
        
        if (form.getValue("pedirPassagem") != "sim" ){
       	 form.setVisibleById("div_tipoVoo", false);
       }
        
	}
	
	else if (activity ==  CANCELARSOLICITACAO){
		form.setVisibleById("2b", false);  
      	form.setVisibleById("3b", false); 
	  	form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
		form.setVisibleById("div_justificativaremarcacao", false);    
	    form.setVisibleById("divJustificativa", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
	    	
	}
    
	else if (activity == COTARREMARCACAO){
		//form.setVisibleById("2b", false);  
    	form.setVisibleById("3b", false);  
		form.setVisibleById("4b", false);
        form.setVisibleById("divJustificativaCancelamento", true);
        form.setVisibleById("justificativacanc", false);
        form.setVisibleById("divRessarcimento", false);
        form.setVisibleById("divCobranca", false);
	    form.setVisibleById("btn_add_item",false);
		form.setVisibleById("removeitem",false);
		form.setVisibleById("divReembolso", false);    
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
        form.setVisibleById("div_tipohotel1", true);
        
        if (form.getValue("tipovoo") != "varios"){
            form.setVisibleById("divDatasHotel2", false);
            form.setVisibleById("divDatasHotel3", false);
        	
        }

	}
	else if (activity == PAGARDIARIAS){
		//form.setVisibleById("2b", false);  
		//form.setVisibleById("3b", false); 
		//form.setVisibleById("div_tarifa", false); 
	}
    
	else if (activity == CONFIRMARREEMBOLSO){
		 form.setVisibleById("4b", false); 
	}
	else if (activity == REALIZAR_PAGAMENTO){
		 form.setVisibleById("div_tarifa", false); 
	}
    
}