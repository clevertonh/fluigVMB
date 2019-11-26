function enableFields(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var INCLUIR_MEDICAO = 87;
	var AGUARDAR_APROVACAO = 65;
	var CORRIGIR = 92;
	var ANEXAR_RELATORIO = 74;
	var ENCERRAR_MEDICAO = 13;
	var CLASSIFICAR_NOTA = 51;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
			
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 				 
		 
		
	}
	
	else if (activity == INCLUIR_MEDICAO){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 
		
		
	}
	
	if (activity != INCLUIR_MEDICAO){
		 form.setEnabled("validacao", false);		
	}
	
	

	
	function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		 return dataset;
	}

	function usuarioAprovador(emailLogado){

		
		var email = DatasetFactory.createConstraint("EMAIL_F",emailLogado,emailLogado, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_Gerente", null, new Array(email), null);
		
		 return dataset;
	}

	
}