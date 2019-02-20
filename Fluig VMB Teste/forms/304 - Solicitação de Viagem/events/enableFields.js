function enableFields(form) {
	   
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
	
    /*
     * Evento usado para desabilitar campos
    */

	 form.setEnabled('viagemplanejada', false);		
	 form.setEnabled('cotacaoVoo', false);
	 form.setEnabled('cotacaoHotel', false);
	 form.setEnabled('aprovacao', false);
	
		
	 
	 
	var activityEnable = getValue('WKNumState');
	log.info("----ATIVIDADE enableFields: " + activityEnable);
	
	var solicitante = getValue("WKUser");  
	
	 log.info("numero da atividade "+activityEnable);
	
	if (activityEnable == ABERTURA || activityEnable == CORRIGIRSOLICITACAO){
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
		 
		 
		 
		 
		 
		 
		 if (activityEnable == ABERTURA){
			 form.setValue("matriculasolicitante",solicitante); 	
			 
			 var constraints   = new Array();
			 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
			 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			 			 			 			 
			 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
			 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
			
	
			 var aprovador = usuarioAprovador();
			 if (aprovador!= null && aprovador != ""){
				 form.setValue("emailGestor",aprovador.getValue(0, "EMAIL_APROVADOR"));
				 form.setValue("matriculaApr",aprovador.getValue(0, "MATRICULA_APROVADOR"));
				 form.setValue("aprovador",aprovador.getValue(0, "DIRETOR"));
				 form.setValue("solicitanteFuncionario",aprovador.getValue(0, "FUNCIONARIO_VMB"));
				 
				 //form.setEnabled('solicitanteFuncionario', false);
			 }
			 //log.info("Campo funcionario: "+form.getValue("solicitanteFuncionario"));
			 
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
		 
		 
 
		 //CAMPOS DADOS DO PASSAGEIRO
		 form.setEnabled('solicitanteFuncionario', false);
		 form.setEnabled('solicitantepassageiro', false);
		 form.setEnabled('passageirofuncionario', false);	
		 form.setEnabled('embaixador', false);
		 form.setEnabled('nomepassageiro', false);
		 form.setEnabled('nomemae', false);
		 form.setEnabled('datanasc', false);
		 form.setEnabled('cpfpassageiro', false);
		 form.setEnabled('rgpassageiro', false);
		 form.setEnabled('passaporte', false);
		 form.setEnabled('finalidade', false);
		 
		 
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
	
		 
		 
		 //PROCESSO DE APROVAÇÃO
		 if (activityEnable == APROVACAO){
			 //CAMPOS HOSPILIDADE
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('aprovacao', true);
			
			 //set numero da solicitação
			 form.setValue("solicitacao",getValue('WKNumProces'));
			 
			 //para o caso da solicitação ter sido retornada da tarefa de comprar passagem e precisar ser aprovada ou reprovada novamente
			 form.setValue("aprovacao","");
			 
			 form.setEnabled('cotacaoHotel', true);
			 form.setEnabled('cotacaoVoo', true);
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
						 
		   // form.setValue("solicitacao",getValue('WKNumProces'));
		 
				if (form.getValue("tipoviagem") == "nacional"){			
					if (form.getValue("remarcacao") == "nao" ){					
						if (form.getValue("solicitanteFuncionario") == "sim" &&
								form.getValue("solicitantepassageiro") == "sim" &&
								form.getValue("tipovoo") != "ida" ){
					
							//PROPRIO SOLICITANTE PEDINDO PASSAGEM
							form.setValue("recebediarias","sim");
						} 
						else if (form.getValue("solicitanteFuncionario") == "sim" &&
								form.getValue("solicitantepassageiro") == "nao" &&
								form.getValue("passageirofuncionario") == "sim" &&
								form.getValue("tipovoo") != "ida"){
							
							//nesse momento é não ate ver uma forma de fazer o protheus gravar 
							//o fornecedor pelo passageiro não pelo solicitante
							form.setValue("recebediarias","nao");
							
						}
						else if (form.getValue("solicitanteFuncionario") == "nao" &&
								form.getValue("solicitantepassageiro") == "sim" &&
								form.getValue("passageirofuncionario") == "nao" &&
								form.getValue("tipovoo") != "ida"){
							
							//solicitante nao é funcionario: verificar com finanças/p&c/adm como saber se tem direito a diarias
							form.setValue("recebediarias","nao");
							
						}			
					}
					//solicitacao do tipo remarcacao					
					else {
						if (form.getValue("solicitanteFuncionario") == "sim" &&
								form.getValue("solicitantepassageiro") == "sim" ){
					
							form.setValue("recebediarias","sim");
						} 
						else if (form.getValue("solicitanteFuncionario") == "sim" &&
								form.getValue("solicitantepassageiro") == "nao" &&
								form.getValue("passageirofuncionario") == "sim" ){
							
							//nesse momento é não ate ver uma forma de fazer o protheus gravar 
							//o fornecedor pelo passageiro não pelo solicitante							
								form.setValue("recebediarias","nao");
							
						}
						//remarcao sendo feita por terceiros ou para terceiros
						else {
							form.setValue("recebediarias","nao");
							
						}
						
						
					
					
					}
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
			 form.setEnabled('recebediarias', true);
			 
			 
			 
			 
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
		 else if (activityEnable == PAGARDIARIAS){
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
		 
		  


		 if (activityEnable != ABERTURA &&  activityEnable != APROVACAO && activityEnable != COMPRARPASSAGEM && activityEnable != CORRIGIRSOLICITACAO){
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
	
	

	function usuarioAprovador(){	
		 var dataset = DatasetFactory.getDataset("VM_AprovadorViagem", null, null, null);
		 
		 return dataset;
	}
					



}