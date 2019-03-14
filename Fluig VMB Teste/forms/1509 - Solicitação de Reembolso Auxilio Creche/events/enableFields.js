function enableFields(form){ 
	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE displayFields: " + activity);
	
	var solicitante = getValue("WKUser");  
	
	var nomeSolicitante;
	var emailSolicitante;
	
	
	if (activity == ABERTURA || activity == SOLICITAR){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 nomeSolicitante = dataset.getValue(0, "colleagueName");
		 emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
		 
		 //emailSolicitante = emailSolicitante.toUpperCase();
		 
		 var aprovador = usuarioAprovador();
		 if (aprovador!= null && aprovador != ""){
			// form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			// form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			// form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
			 form.setValue("matriculaApr","001649");	 
		 }
		 
	}
	
	else if (activity == APROVACAO_GESTOR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 form.setEnabled('Funcionario', false);
		
		
	}
	
	else if (activity == VALIDACAO){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 
		 form.setValue("assistente",dataset.getValue(0, "colleagueName"));
		 form.setValue("emailAssistente",dataset.getValue(0, "mail"));		 
		 form.setValue("aprovacao","");
		 form.setEnabled('Funcionario', false);
		 
		
	}
	
	else if (activity == APROVACAO_RH){
		form.setEnabled('validacao', false);
		form.setEnabled('justificativaReprovacaoV', false);
		 form.setEnabled('Funcionario', false);
		 
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
		form.setEnabled('aprovacao', false);
		form.setEnabled('justificativaR', false);
		form.setEnabled('validacao', false);
		form.setEnabled('vl_rmb', false);
		form.setEnabled('justificativaReprovacaoV', false);
		 form.setEnabled('Funcionario', false);
	}
 

	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 log.info("---RECUPERA DADOS DO USUARIO LOGADO---");
		 return dataset;
	}

	function usuarioAprovador(){
		log.info("---GERENTE FUNCIONARIO----"); 
		log.info(emailSolicitante);
		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailSolicitante,emailSolicitante, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		 
		  
		 log.info(dataset.getValue(0, "EMAIL_G"));
		 return dataset;
	}




	 if (activity != ABERTURA &&  activity != APROVACAO_GESTOR){
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

    console.log("MES: " + mes);

    if (dataToString.getDate().toString().length == 1) {
        dia = dataToString.getDate();
        dia = "0" + dia.toString();

    } else {
        dia = dataToString.getDate();

    }

    console.log("TAMANHO MES: " + mes.toString().length);
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
