function enableFields(form){ 
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO_COMPRAS = 12;
	var REALIZAR_COTACAO_HOSPITALIDADE = 22;
	var ENVIAR_APROVACAO_COMPRAS = 209;
	var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
	var APROVACAO_SERVICO_COMPRAS = 105;
	var APROVACAO_SERVICO_HOSPITALIDADE = 94;
	var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
	var VERIFICAR_APROVACAO_COMPRAS = 145;
	var SOLICITACAO_CONTRATO_HOSPITALIDADE = 66;
	var SOLICITACAO_CONTRATO_COMPRAS = 63;
	var INTEGRAR_PROTHEUS_COMPRAS_COMPRAS = 212;
	var INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE = 215;
	var VALIDAR_RH = 161;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
	
	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	
	if (activity == ABERTURA || activity  == SOLICITAR || activity == CORRIGIR){
		 form.setEnabled("aprovacao", false);	
		 form.setValue("aprovacao","");
		 form.setValue("dtInicio","");
		 form.setValue("dtFim","");
		 
		
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
			 	 
		 }
		 
	
			 
	}
	else if (activity == APROVACAO_GESTOR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
	
		 
	}
	else if (activity == REALIZAR_COTACAO_COMPRAS || activity == REALIZAR_COTACAO_HOSPITALIDADE){					
			
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		    form.setEnabled("cnpjcpf", true);
		    form.setEnabled("razaosocial", true);		    
		    form.setEnabled("nomefantasia", true);	
		    form.setEnabled("codigoFornecedor", true);	
		    form.setEnabled("tipoPessoa", true);	
		    form.setEnabled("meioPagamento", true);	
		    form.setEnabled("condicaoPgto", true);	
		    form.setEnabled("banco", true);
		    form.setEnabled("agencia", true);
		    form.setEnabled("contaFornecedor", true);
		    form.setEnabled("tipoConta", true);
		    form.setEnabled("valor", true);	
		    form.setEnabled("txtproduto", true);	
		    form.setEnabled("codigoProduto", true);
		    form.setEnabled("negociacao", true);
		    form.setEnabled("condicaoPgto", true);
		    form.setEnabled("melhorProposta", true);		    
		    form.setEnabled("justificativaP", true);
		    
		    
		    form.setEnabled("CotacaovalorMensal", true);
		    form.setEnabled("CotacaovalorAnual", true);
		    
		    
		
	}
	else if (activity == VALIDAR_RH ){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    
	    form.setEnabled("valido", true);
	    
	    form.setValue("nome_rh",nomeSolicitante);
	    form.setValue("emailRH",emailSolicitante);
	    
	    
	}
	else if (activity == ENVIAR_APROVACAO_COMPRAS ||  activity == ENVIAR_APROVACAO_HOSPITALIDADE ){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
		 form.setValue("comprador",nomeSolicitante);
		 form.setValue("emailComprador",emailSolicitante);
		  
	    
	}


	
	function bloqueiaDadosFinanceiro(){
		//BLOQUEIA CAMPOS DE RATEIO DE PAGAMENTO POIS JA FOI ENVIADO PARA O PROTHEUS
   	 var indexes = form.getChildrenIndexes("tableItens");	    	    	    	   
   	    for (var i = 0; i < indexes.length; i++) {
    	        form.setEnabled("txtcentrocusto___"+ indexes[i], false);	
    	       	form.setEnabled("txtprojeto___"+ indexes[i], false);	
    	      	form.setEnabled("txtareaestrategica___"+ indexes[i], false);	
    	     	form.setEnabled("txtcategoria___"+ indexes[i], false);	
    	    	form.setEnabled("txtfontefinanciamento___"+ indexes[i], false);	
    	   		form.setEnabled("txtatividade___"+ indexes[i], false);	
    	   		form.setEnabled("percentual___"+ indexes[i], false);	
    	   		form.setEnabled("rateio___"+ indexes[i], false);
	        
   	    }    
   
 
}
	
	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	
	function usuarioAprovador(emailSolicitante){
	
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		  
		 //log.info(dataset.getValue(0, "EMAIL_G"));
		 return dataset;
	}



}

