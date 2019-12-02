function enableFields(form){ 
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO =5;
	var CORRIGIR = 39;
	var COTAR = 47;
	var VALIDAR_RH = 55;
	var SOLICITAR_APROVACAO = 59;
	var APROVACAO_SERVICO = 61;
	var SOLICITAR_CONTRATO = 65;
	var SOLICITACAO_CONTRATO = 77;
	var VERIFICAR_ASSINATURA = 79;
	var FINALIZAR = 83;

	
	var activity = getValue('WKNumState');	
	var solicitante = getValue("WKUser");  

	 var dataset = UsuarioLogado(solicitante);		 			 			 			 
	 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		var emailSolicitante = dataset.getValue(0, "mail");
	 
	 
	 form.setEnabled("matriculasolicitante", true);	
	
	if (activity == ABERTURA || activity == CORRIGIR || activity == SOLICITAR){
		 nomeSolicitante = dataset.getValue(0, "colleagueName");
		 emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setEnabled("aprovacao", false);	
		 form.setEnabled("justificativaReprovacao", false);		 
		 
		
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != "" && aprovador.values.length > 0){
			 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
			 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
			 	 
		 }
		 else {
			 throw "Seu cadastro está sem diretor, por favor, procure o setor de Recursos Humanos e solicite a atualização";
		 }
		 
		 //reseta campo de corrigir marcado pelo aprovador
		 if (activity == CORRIGIR){
			 form.setValue("aprovacao","");			 
		 }

			 
	}
	else if (activity == APROVACAO){	 

		//set numero da solicitação
		form.setValue("solicitacao",getValue('WKNumProces'));

			/*
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		    var mapaForm = new java.util.HashMap();
		    mapaForm = form.getCardData();
		    var it = mapaForm.keySet().iterator();
		     
		    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		        var key = it.next();
		        form.setEnabled(key, habilitar);
		    }
		    */
		    form.setEnabled("aprovacao", true);		 
			form.setEnabled("justificativaReprovacao", true);
			form.setEnabled("valor", true);	
			form.setEnabled("matriculasolicitante", true);	
			form.setEnabled("justificativa", true);
			form.setEnabled("prazoaprovacao", true);
		
		 
		 
		 
	}
	else if (activity == COTAR){		
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
	    form.setEnabled("origem", true);	    
	    form.setEnabled("Numerocontrato", true);	  
	    form.setEnabled("revisao", true);
	    form.setEnabled("filial", true);
	    form.setEnabled("dtInicioC", true);
	    form.setEnabled("dtFimC", true);
	    form.setEnabled("vlcontrato", true);
	    form.setEnabled("saldoAtual", true);
	    form.setEnabled("codigoFluig", true);
	    
	    form.setEnabled("formapgto", true);
	    form.setEnabled("definicaoValor", true);
	    
	    form.setEnabled("competencia", true);
	    form.setEnabled("Anocompetencia", true);
	    
	    form.setEnabled("comprador", true);
	    form.setEnabled("emailComprador", true);
	    
	   
		 
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

	else if (activity == SOLICITAR_CONTRATO ){
		form.setValue("statusContrato","");
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	}
	else if (activity ==  VERIFICAR_ASSINATURA){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	}
	
	else if (activity == SOLICITAR_APROVACAO ){
		form.setValue("aprovacaoServico","");
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
	}
	
	else if (activity ==  FINALIZAR){
		form.setEnabled("dtVencimento", true);
		
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
	

	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
	}

	
	function usuarioAprovador(emailSolicitante){		
		var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
		 		 
		 return dataset;
	}



	//recebe data do Fluig e convert para data normal
	function convertStringToData(StringToData) {
	    //variavel para armazenar a data limite para aprovação   
	    var data = StringToData.split('/');

	    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
	}   
}

