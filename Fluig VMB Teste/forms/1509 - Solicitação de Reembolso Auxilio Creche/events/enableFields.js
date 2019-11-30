function enableFields(form){ 
	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	var REALIZAR_PAGAMENTO = 97;
	var AVALIAR_PAGAMENTO = 93;
	var CORRIGIR_DOCUMENTO = 85;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
			
	if (activity == ABERTURA || activity == SOLICITAR){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != "" && aprovador.values.length > 0){
			 form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
				 
		 }
		 else {
			 throw "Seu cadastro está sem aprovador, por favor, procure o setor de Recursos Humanos e solicite a atualização";
		 }
		 
				 
	}
	
	else if (activity == APROVACAO_GESTOR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 form.setEnabled('Funcionario', false);
		 form.setEnabled('dependente', false);
		
		
	}
	
	else if (activity == VALIDACAO){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("assistente",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAssistente",dataset.getValue(0, "mail"));		 
		 form.setValue("aprovacao","");
		 
	}
	
	else if (activity == APROVACAO_RH){
		form.setEnabled('validacao', false);
		form.setEnabled('justificativaReprovacaoV', false);
		form.setEnabled('dtPagamento', false);
		
		 
		//recupera data de pagamento do Fluig
		var dtPagamento = form.getValue("dtPagamento");
					
		var dtAprovacao = new Date ();	
		var dtAprovacaoString = convertDataToString(dtAprovacao);
		
		//verifica se data de aprovação é maior que data de pagamento
		if (dtAprovacaoString > dtPagamento){
				form.setValue("aprPrazo","nao");
		}
			
		
	}
	
	else if (activity == ALTERACAO_DATA){		
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	    form.setEnabled('dtPagamento', true);
		
	}
	else if (activity == CORRIGIR_DOCUMENTO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	}
	
	else if (activity == REALIZAR_PAGAMENTO || activity == AVALIAR_PAGAMENTO){
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
	    var mapaForm = new java.util.HashMap();
	    mapaForm = form.getCardData();
	    var it = mapaForm.keySet().iterator();
	     
	    while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
	        var key = it.next();
	        form.setEnabled(key, habilitar);
	    }
		
	}
 
	 if (activity != ABERTURA &&  activity != APROVACAO_GESTOR && activity != SOLICITAR){
		 form.setEnabled('Funcionario', false);
		 form.setEnabled('dependente', false);
		 form.setEnabled('rateioconfigurado', false);
		 
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
			 log.info("---RECUPERA DADOS DO USUARIO LOGADO---");
			 return dataset;
		}

		function usuarioAprovador(emailLogado){
			log.info("---GERENTE FUNCIONARIO----"); 
			//log.info(emailSolicitante);
			
			var email = DatasetFactory.createConstraint("EMAIL_F",emailLogado,emailLogado, ConstraintType.MUST);		
			var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
			 
			//var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
			//var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
			 
			 log.info(dataset.getValue(0, "EMAIL_G"));
			 return dataset;
		}


	 
}
//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}

//recebe data JS e convert para data FLuig
function convertDataToString(dataToString) {
    var dia;

    //MES INICIA DO ZERO POR ISSO SOMA 1 PARA ACHAR O MES CORRETO
    var mes = dataToString.getMonth() + 1;


    if (dataToString.getDate().toString().length == 1) {
        dia = dataToString.getDate();
        dia = "0" + dia.toString();

    } else {
        dia = dataToString.getDate();

    }

    
    //converte mes
    if (mes.toString().length == 1) {
        mes = "0" + mes.toString();

    }
    //else {mes = dataToString.getMonth() + 1;}


    //novo formato de data: para salvar em campos data do Fluig
    return dia + "/" + mes + "/" + dataToString.getFullYear();


}

function addDias(data, dias) {
    return new Date(data.setDate(data.getDate() + dias));;

}
