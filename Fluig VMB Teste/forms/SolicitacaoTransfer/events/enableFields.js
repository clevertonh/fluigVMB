function enableFields(form){ 
	var ABERTURA = 0;
	var APROVACAO =5;
	var COTACAO = 15;
	var CORRIGIR = 12;
	var VALIDAR_RH = 30;
	var SOLICITAR_APROVACAO = 28;
	var APROVACAO_SERVICO = 36;
	var SOLICITAR_CONTRATO = 37;
	var SOLICITACAO_CONTRATO = 43;
	var VERIFICAR_ASSINATURA = 44;
	var FINALIZAR = 48;
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  

	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
	 var emailSolicitante = dataset.getValue(0, "mail");
	 
	
	if (activity == ABERTURA || activity == CORRIGIR){
		 form.setEnabled("aprovacao", false);	
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 form.setValue("matriculasolicitante",solicitante);
		 
		 
		 
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
			
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
			 form.setValue("solicitanteFuncionario",aprovador.getValue(0, "FUNCIONARIO_VMB"));
			 
			
		 }
		 
		 //reseta campo de corrigir marcado pelo aprovador
		 if (activity == CORRIGIR){
			 form.setValue("aprovacao","");			 
		 }

		 form.setEnabled("justificativaReprovacao", false);
			 
	}
	else if (activity == APROVACAO){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    
		 form.setEnabled("aprovacao", true);
		 form.setEnabled("justificativaReprovacao", true);
		 form.setEnabled("valor", true);
		 
		 //bloqueiaDadosFinanceiro();
		 
	}
	else if (activity == COTACAO){		
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
	    form.setEnabled("valorAdiantado", true);	
	    form.setEnabled("negociacao", true);
	    form.setEnabled("condicaoPgto", true);
	    form.setEnabled("melhorProposta", true);		    
	    form.setEnabled("justificativaP", true);
	    form.setEnabled("tipoPJ", true);
	    form.setEnabled("contatoEmpresa", true);
	    form.setEnabled("CotacaovalorMensal", true);
	    form.setEnabled("dtCotacao", true);
	    
	    form.setValue("comprador",nomeSolicitante);
		form.setValue("emailComprador",emailSolicitante);
		 
		 
	    
	}
	else if (activity == VALIDAR_RH){

		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    
	    
	    form.setEnabled("valido", true);
		form.setValue("valido","");
	    
	    form.setValue("nome_rh",nomeSolicitante);
	    form.setValue("emailRH",emailSolicitante);
	    
	}
	else if (activity == SOLICITAR_APROVACAO ){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	    

	    
	}
	else if (activity == SOLICITAR_CONTRATO ){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	}
	else if (activity == VERIFICAR_ASSINATURA){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
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
	
	function bloqueiaDadosProduto(){		
   	    //BLOQUEIA CAMPOS DE SERVIÇO
	    	 var indexes = form.getChildrenIndexes("tableCompras");	    	    	    	   
	    	    for (var i = 0; i < indexes.length; i++) {
	     	        form.setEnabled("txtproduto___"+ indexes[i], false);	
	     	         form.setEnabled("idquantidade___"+ indexes[i], false);	
	     	      	 form.setEnabled("vrTotUnit___"+ indexes[i], false);	
	     	      	 form.setEnabled("dtNecessidade___"+ indexes[i], false);
    	        
	    	    } 
   
	    	    
	}
	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	
	function usuarioAprovador(emailLogado){
		var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailLogado,emailLogado, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
		 
		  
		 return dataset;
	}
		



}

