function displayFields(form,customHTML){ 

	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var JUSTIFICARCANCELAMENTO = 93 ;
	var CORRIGIRSOLICITACAO = 98;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
  	customHTML.append("<script>");
    customHTML.append("var ATIVIDADE = " + activity + ";");
    customHTML.append("</script>");
	
    
	//campos sempre ocultos
	 form.setVisibleById("matricula", false);
	 form.setVisibleById("prazoCancelamento", false);
	 form.setVisibleById("prazoaprovacao", false); 
	 form.setVisibleById("matriculasolicitante", false); 
	 form.setVisibleById("cpfaprovador", false); 
	 form.setVisibleById("codigorateio", false);
	 form.setVisibleById("prazoreembolso", false);
     form.setVisibleById("divMatrApr", false);

	
	   
    if (activity == ABERTURA ) {
    	//campos aba aprovador e hospitalidade
       	form.setVisibleById("2b", false);
    	form.setVisibleById("3b", false);    	
    	
    	//campos aba dados gerais
    	form.setVisibleById("selecaodeviagens", false);
        form.setVisibleById("selecaorateio", false);
     	form.setVisibleById("panelItens",false);
      	form.setVisibleById("div_justificativaremarcacao", false);    
      	form.setVisibleById("divJustificativaCancelamento", false);
      	form.setVisibleById("divDataSetAgenda", false);
      	
      	
    	//campos aba passageiro
    	form.setVisibleById("divdadospassageiro", false);
    	form.setVisibleById("divOutroFun", false);
    	form.setVisibleById("divOutroApr", false);
    	
    	//campos aba agenda
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

   
  
    else {
    	
    	//remove botão de excluir item da agenda
    	//tomar cuidado porque essa função oculta o botao padrão de deletar do filho. Se um outro form for adicionado
    	//irá ocultar os botões dele tambem.
		 form.setHideDeleteButton(true);
 		
	        if (form.getValue("tipoPagamento") == "normal"){
				form.setVisibleById("selecaorateio", false);
			}
	 		else {
	 			form.setVisibleById("panelItens",false);
	 		}
	        
	       
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
		
		
	
 		
		
    	
    	
	
    }
    
    if (activity == APROVACAO ) {
		form.setVisibleById("3b", false);
		form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
        form.setVisibleById("div_tipohotel1", false);
        form.setVisibleById("div_tipohotel2", false);
        form.setVisibleById("div_tipohotel3", false);
       
   
        
	} 
	
	else if (activity == COMPRARPASSAGEM ) {
		form.setVisibleById("div_valores", false);
        form.setVisibleById("divRessarcimento", false);
        form.setVisibleById("divCobranca", false);
        form.setVisibleById("divJustificativaCancelamento", false);
        form.setVisibleById("divReembolso", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);

               
    } 		
	
	else if (activity == OBTERPASSAGEM  ) {
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
	else if (activity == REGISTRARCANCELAMENTO ){
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
    	form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);  
	    form.setVisibleById("divJustificativa", false);
        form.setVisibleById("div_tipohotel1", false);
        form.setVisibleById("div_tipohotel2", false);
        form.setVisibleById("div_tipohotel3", false);
	}
	
	else if (activity ==  JUSTIFICARCANCELAMENTO){
      	form.setVisibleById("3b", false); 
	  	form.setVisibleById("divJustificativaCancelamento", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
		form.setVisibleById("div_justificativaremarcacao", false);    
	    form.setVisibleById("divJustificativa", false);
		form.setVisibleById("divJustificativaReprovacaoViagem", false);
	    	
	}
}