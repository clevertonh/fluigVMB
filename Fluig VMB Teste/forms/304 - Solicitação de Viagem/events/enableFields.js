function enableFields(form) {
	   
	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33;
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CANCELARSOLICITACAO = 93 ;
	var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var CALCULARDIARIAS = 129;
	var REALIZAR_PAGAMENTO = 165;
	var AVALIAR_ATRASO = 159;
	var GERAR_TARIFA = 196;

	
		//CALCULARDIARIAS
	 //form.setEnabled('viagemplanejada', false);		
	 form.setEnabled('cotacaoVoo', false);
	 form.setEnabled('cotacaoHotel', false);
	 
 
	var activityEnable = getValue('WKNumState');
	//log.info("----ATIVIDADE enableFields: " + activityEnable);
	
	var solicitante = getValue("WKUser");  

	 
	// log.info("numero da atividade "+activityEnable);
	
	if (activityEnable == ABERTURA || activityEnable == CORRIGIRSOLICITACAO || activityEnable == SOLICITARVIAGEM){
		//CAMPOS DO APROVADOR

		 form.setEnabled('aprovacao', false);
		 form.setEnabled('vooComprado', false);
		 form.setEnabled('hotelComprado', false);
		 form.setEnabled('ressarcimento', false);
		 form.setEnabled('justificativaReprovacao', false);		 
		 form.setEnabled('cobranca', false);	
		 form.setEnabled('tipormb', false);		
		 form.setValue("aceitenorma","");
		 form.setValue("aprovacao","");
		 form.setEnabled('vl_aprovado', false);
							 
		 if (activityEnable == ABERTURA){
			 form.setValue("matriculasolicitante",solicitante); 	
			 
			 var constraints   = new Array();
			 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
			 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			
			 var nomeSolicitante = dataset.getValue(0, "colleagueName");
			 var emailSolicitante = dataset.getValue(0, "mail");
			 
			 form.setValue("solicitante",nomeSolicitante);
			 form.setValue("emailSolicitante",emailSolicitante);
				
			 var aprovador = usuarioAprovador(emailSolicitante);
	
			 if (aprovador!= null && aprovador != ""){
				 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
				 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
				 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
				 form.setValue("solicitanteFuncionario",aprovador.getValue(0, "FUNCIONARIO_VMB"));
				 
				
			 }
			 
			
		 }
		 
	}
	
	
	
	else {		 
		 //CAMPOS ABA INICIAL
		 form.setEnabled('tipoviagem', false);
		 form.setEnabled('remarcacao', false);
		 form.setEnabled('dataset_solicitacaoviagem', false);		 
		 form.setEnabled('aceitenorma', false);
		 form.setEnabled('justificativa', false);
		 form.setEnabled('dataSolicitacao', false);
		 form.setEnabled('justificativaremarcacao', false);
		 form.setEnabled('rateioconfigurado', false)
		 form.setEnabled('finalidade', false);
 
		 //CAMPOS DADOS DO PASSAGEIRO
		 form.setEnabled('solicitanteFuncionario', false);
		 form.setEnabled('solicitantepassageiro', false);
		 form.setEnabled('passageirofuncionario', false);	
		 form.setEnabled('passageiroestrangeiro', false);
		 form.setEnabled('embaixador', false);
		 form.setEnabled('nomepassageiro', false);
		 form.setEnabled('nomemae', false);
		 form.setEnabled('datanasc', false);
		 form.setEnabled('cpfpassageiro', false);
		 form.setEnabled('rgpassageiro', false);
		 form.setEnabled('passaporte', false);
		 form.setEnabled('outroFuncionario', false);
		 
		 
		 //CAMPOS DA ABA AGENDA
		 form.setEnabled('viagemplanejada', false);
		 form.setEnabled('agenda', false);
		 
	 
		 //CAMPOS ABA VOO		 
		 form.setEnabled('pedirPassagem', false);
		 form.setEnabled('tipovoo', false);
		 form.setEnabled('origem1', false);
		 form.setEnabled('destino1', false);
		 form.setEnabled('origem2', false);
		 form.setEnabled('destino2', false);
		 form.setEnabled('origem3', false);
		 form.setEnabled('destino3', false);
		 form.setEnabled('observacaoVoo', false);
		 form.setEnabled('datapartida1', false);
		 form.setEnabled('dataretorno1', false);
		 form.setEnabled('datapartida2', false);
		 form.setEnabled('datapartida3', false);
		 
		 form.setEnabled('internacionalOrigem1', false);
		 form.setEnabled('internacionalOrigem2', false);
		 form.setEnabled('internacionalOrigem3', false);
		 form.setEnabled('internacionalDestino1', false);
		 form.setEnabled('internacionalDestino2', false);
		 form.setEnabled('internacionalDestino3', false);
		 
		 
		 //CAMPOS DA ABA DE HOSPEDAGEM
		 form.setEnabled('pedirHotel', false);
		 form.setEnabled('tipoquarto', false);
		 form.setEnabled('datacheckout', false);
		 form.setEnabled('datacheckin', false);
		 form.setEnabled('localhospedagem', false);	
		 form.setEnabled('datacheckin2', false);
		 form.setEnabled('datacheckout2', false);
		 form.setEnabled('localhotel2', false);		
		 form.setEnabled('datacheckin3', false);
		 form.setEnabled('datacheckout3', false);
		 form.setEnabled('localhotel3', false);		 
		 form.setEnabled('observacaoHotel', false);

		 
		 //CAMPOS DA ABA DE APROVAÇAO
		 form.setEnabled('dataAprovacao', false);
	
		 
		 //CAMPOS DA ABA DE ADIANTAMENTO
		 form.setEnabled('adiantamento', false);
		 form.setEnabled('vl_solicitado', false);
		 form.setEnabled('vl_aprovado', false);
		 form.setEnabled('dtNecessidade', false);
		 form.setEnabled('itinerario', false);
		 form.setEnabled('centrocustoAdto', false);
		 form.setEnabled('projetoAdto', false);
		 form.setEnabled('fontefinanciamentoAdto', false);
		 
		 //PROCESSO DE APROVAÇÃO
		 if (activityEnable == APROVACAO){
			 //CAMPOS HOSPILIDADE
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('aprovacao', true);
			 form.setEnabled('rateioconfigurado', true);
			 
			 //set numero da solicitação
			 form.setValue("solicitacao",getValue('WKNumProces'));
			 
			 //para o caso da solicitação ter sido retornada da tarefa de comprar passagem e precisar ser aprovada ou reprovada novamente
			 form.setValue("aprovacao","");
			 
			 form.setEnabled('cotacaoHotel', true);
			 form.setEnabled('cotacaoVoo', true);
			 
			 
			 if (form.getValue('adiantamento') == 'sim'){
				 form.setEnabled('vl_aprovado', true);
				 form.setEnabled('centrocustoAdto', true);				 				 
				 form.setEnabled('projetoAdto', true);
				 form.setEnabled('fontefinanciamentoAdto', true);
				 
			 }
			
			 
			 
		 }
		 
		 		 
		 //PROCESSO DE COMPRA DE PASSAGEM
		 else  if (activityEnable == COMPRARPASSAGEM){
			 			
			 //CAMPOS APROVACAO 
			 form.setEnabled('aprovacao', false);
			 form.setEnabled('justificativaReprovacao', false);
			 
			 if (form.getValue('remarcacao') =='sim'){
				 if (form.getValue('cotacaoVoo') != ''){
					 form.setValue("valorVoo",form.getValue('cotacaoVoo'));
				 }
				 
				 if (form.getValue('cotacaoHotel') != ''){
					 form.setValue("valorHotel",form.getValue('cotacaoHotel'));
				 }
				 
			 }
	
		   		if (form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null){
		   			 form.setEnabled('vooComprado', false);
	    		}

		   		if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null){
			   		 form.setEnabled('hotelComprado', false);
		    		}
		 
				if (form.getValue("tipoviagem") == "nacional"){	
					form.setValue("recebediarias","sim");
				}	
				//solicitacao do tipo internacional
				else {
					form.setValue("recebediarias","nao");
				} 
		 }
		 
		 //PROCESSO SOLICITAR CANCELAMENTO
		 else if (activityEnable == OBTERPASSAGEM ){
			 //CAMPOS APROVACAO 
			 form.setEnabled('aprovacao', false);
			 
			 //CAMPOS HOSPITALIDADE
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('cobranca', false);
			 form.setEnabled('tipormb', false);
			 			 
			 form.setValue("cancelarpassagem","");
			 form.setValue("justificativacancelamento",""); 
			 form.setValue("ressarcimento","");
			 form.setValue("cobranca","");
			 
			 form.setEnabled('tipo_hosp1', false);		 
			 form.setEnabled('tipo_hosp2', false);	
			 form.setEnabled('tipo_hosp3', false);	 
			 
			 form.setEnabled('valorVoo', false);	
			 form.setEnabled('valorHotel', false);	
			 form.setEnabled('valorTx', false);	
			 
			 
			 form.setEnabled('dtSaida', false);	
			 form.setEnabled('dtRetorno', false);	
			 form.setEnabled('vl_diarias', false);	
			 form.setEnabled('recebediarias', false);
			 form.setEnabled('dtPgto', false);
			 
			 form.setEnabled('tarifa', false);
			 form.setEnabled('tarifaFornecedor', false);
			 form.setEnabled('vl_tarifa', false);
			 
		 
		 }
		 
		 //PROCESSO DE REGISTRAR CANCELAMENTO DA VIAGEM
		 else if (activityEnable == REGISTRARCANCELAMENTO ||  activityEnable == CONFIRMARREEMBOLSO ){
			 //CAMPOS SOLICITAR CANCELAMENTO
			 form.setEnabled('justificativacancelamento', false);
			 form.setEnabled('cancelarpassagem', false);
			 form.setEnabled('justificativaReprovacao', false);
			 
			 //CAMPOS COMPRAR PASSAGEM
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('valorVoo', false);
			 form.setEnabled('valorHotel', false);			
			 form.setEnabled('tipo_hosp1', false);		 
			 form.setEnabled('tipo_hosp2', false);	
			 form.setEnabled('tipo_hosp3', false);	
			 
			 
		 }
		 else if (activityEnable == CALCULARDIARIAS || activityEnable == REALIZAR_PAGAMENTO || activityEnable == AVALIAR_ATRASO ){
			//CAMPOS SOLICITAR CANCELAMENTO
			 form.setEnabled('justificativacancelamento', false);
			 form.setEnabled('cancelarpassagem', false);
			 form.setEnabled('justificativaReprovacao', false);
			 
			 //CAMPOS COMPRAR PASSAGEM
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('valorVoo', false);
			 form.setEnabled('valorHotel', false);			
			 form.setEnabled('tipo_hosp1', false);		 
			 form.setEnabled('tipo_hosp2', false);	
			 form.setEnabled('tipo_hosp3', false);
			 form.setEnabled('ressarcimento', false);	
			 form.setEnabled('cobranca', false);	
			 form.setEnabled('datareembolso', false);	
			 form.setEnabled('tipormb', false);
			 form.setEnabled('valorTx', false);	
			 
				 if (activityEnable == REALIZAR_PAGAMENTO || activityEnable == AVALIAR_ATRASO){
				 form.setEnabled('dtPgto', false);
				 form.setEnabled('recebediarias', false);
				 form.setEnabled('vl_diarias', false);
			 }	 
			 
		 }
		 		 
		 else if (activityEnable == COTARREMARCACAO){
			 form.setValue("cotacaoVoo","");
			 form.setValue("cotacaoHotel","");
			 
			 form.setEnabled('aprovacao', false);
			 form.setEnabled('justificativaReprovacao', false);
			 form.setEnabled('justificativacancelamento', false);
			 form.setEnabled('cancelarpassagem', false);
			 
		   		if (form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null){
			   		 form.setEnabled('vooComprado', false);
			   		 form.setEnabled('cotacaoHotel', true);
			   		}
			   		else {
			   		 form.setEnabled('cotacaoVoo', true);
			   		}

			   		if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null){
				   		 form.setEnabled('hotelComprado', false);
				   		 form.setEnabled('cotacaoVoo', true);
			    	}
			   		else {
			   			form.setEnabled('cotacaoHotel', true);
			   		}						 
		 }

		 if (activityEnable != ABERTURA && activityEnable != APROVACAO && activityEnable != CORRIGIRSOLICITACAO){
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
			    	    
			    	    //BLOQUEIA CAMPOS DE SERVIÇO
				    	 var indexes = form.getChildrenIndexes("tableViagem");	    	    	    	   
				    	    for (var i = 0; i < indexes.length; i++) {
				     	        form.setEnabled("txtservico___"+ indexes[i], false);	
				     	       	form.setEnabled("dtViagem___"+ indexes[i], false);
				     	        form.setEnabled("valores___"+ indexes[i], false);	
				     	      	form.setEnabled("codigoProduto___"+ indexes[i], false);	
				     	      	form.setEnabled("txtfornecedor___"+ indexes[i], false);	
			     	        
				    	    }   
		 }	 
	 }	 
	
	

	function usuarioAprovador(emailLogado){
		var email = DatasetFactory.createConstraint("EMAIL_USUARIO",emailLogado,emailLogado, ConstraintType.MUST);		
		var dataset = DatasetFactory.getDataset("ds_get_AprovadorViagem", null, new Array(email), null);
		 
		  
		 return dataset;
	}
					

	
}