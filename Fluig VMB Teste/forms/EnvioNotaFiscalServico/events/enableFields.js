function enableFields(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var VALIDAR = 29;
	var AGUARDAR_APROVACAO = 13;
	var CORRIGIR = 32;
	var GERAR_PEDIDO = 35;
	var AUTORIZAR_NF = 44;
	var ENVIAR_NF = 42;
	var LANCAR_PRE_NOTA = 49;
	var CLASSIFICAR_NOTA = 51;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser");  
			
	if (activity == ABERTURA){
		 var dataset = UsuarioLogado(solicitante);		 			 			 			 		 
		 var nomeSolicitante = dataset.getValue(0, "colleagueName");
		 var emailSolicitante = dataset.getValue(0, "mail");
		 
		 form.setValue("solicitante",nomeSolicitante);
		 form.setValue("emailSolicitante",emailSolicitante);
 
		 /*
		 var aprovador = usuarioAprovador(emailSolicitante);
		 if (aprovador!= null && aprovador != ""){
			 form.setValue("gestor",aprovador.getValue(0, "NOME_GERENTE"));
			 form.setValue("emailLider",aprovador.getValue(0, "EMAIL_G"));
			 form.setValue("matriculaApr",aprovador.getValue(0, "ID_GERENTE"));
				 
		 }
		 */
				 
	}
	
	else if (activity == VALIDAR){
		 //set numero da solicitação
		 form.setValue("solicitacao",getValue('WKNumProces'));
		 
		
		
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