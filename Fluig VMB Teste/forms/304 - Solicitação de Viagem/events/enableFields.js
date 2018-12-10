function enableFields(form) {

	
	
	   
	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CORRIGIRSOLICITACAO = 98;
	
    /*
     * Evento usado para desabilitar campos
    */

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
		 
		 form.setValue("aceitenorma","");
		 form.setValue("aprovacao","");
		 
		 
		 if (activityEnable == ABERTURA){
			 form.setValue("matriculasolicitante",solicitante); 	
			 
			 var constraints   = new Array();
			 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
			 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			 			 			 			 
			 form.setValue("solicitante",dataset.getValue(0, "colleagueName"));
			 form.setValue("emailSolicitante",dataset.getValue(0, "mail"));
		 }
		 
	}
	
	
	
	else {
		  
		
		 
		 
		 //CAMPOS ABA INICIAL
		 form.setEnabled('tipoviagem', false);
		 form.setEnabled('remarcacao', false);
		 form.setEnabled('dataset_solicitacaoviagem', false);
		 form.setEnabled('tipoPagamento', false);
		 form.setEnabled('aceitenorma', false);
		 form.setEnabled('justificativa', false);
		 form.setEnabled('dataSolicitacao', false);
		 form.setEnabled('justificativaremarcacao', false);
		 
		 
 
		 //CAMPOS DADOS DO PASSAGEIRO
		 form.setEnabled('solicitantepassageiro', false);
		 form.setEnabled('passageirofuncionario', false);		 
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
			
			 
			
			 //set numero da solicitação
			 form.setValue("solicitacao",getValue('WKNumProces'));
		 }
		 
		 
		 //PROCESSO DE COMPRA DE PASSAGEM
		 else  if (activityEnable == COMPRARPASSAGEM){
			 //CAMPOS APROVACAO 
			 form.setEnabled('aprovacao', false);
			 form.setEnabled('justificativaReprovacao', false);
			 
		   		if (form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null){
		   		 form.setEnabled('vooComprado', false);
	    		}

		   		if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null){
			   		 form.setEnabled('hotelComprado', false);
		    		}
						 
		   // form.setValue("solicitacao",getValue('WKNumProces'));
		 }
		 
		 //PROCESSO SOLICITAR CANCELAMENTO
		 else if (activityEnable == OBTERPASSAGEM ){
			 //CAMPOS APROVACAO 
			 form.setEnabled('aprovacao', false);
			 
			 //CAMPOS HOSPITALIDADE
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 
			// form.setValue("cancelarpassagem","");
			// form.setValue("justificativacancelamento",""); 
			 
			 form.setEnabled('tipo_hosp1', false);		 
			 form.setEnabled('tipo_hosp2', false);	
			 form.setEnabled('tipo_hosp3', false);	 
			 
		 }
		 
		 //PROCESSO DE REGISTRAR CANCELAMENTO DA VIAGEM
		 else if (activityEnable == REGISTRARCANCELAMENTO ||  activityEnable == CONFIRMARREEMBOLSO){
			 //CAMPOS SOLICITAR CANCELAMENTO
			 form.setEnabled('justificativacancelamento', false);
			 form.setEnabled('cancelarpassagem', false);
			 
			 //CAMPOS COMPRAR PASSAGEM
			 form.setEnabled('vooComprado', false);
			 form.setEnabled('hotelComprado', false);
			 form.setEnabled('valorVoo', false);
			 form.setEnabled('valorHotel', false);
			 
			 
			 
			 
			 //CAMPOS APROVAÇÃO
			 form.setEnabled('aprovacao', false);

			 if (activityEnable == CONFIRMARREEMBOLSO){
				 form.setEnabled('ressarcimento', false);
				 form.setEnabled('cobranca', false);
				 form.setEnabled('valorTx', false);
				 
				 	 
			 }
			 
			 form.setEnabled('tipo_hosp1', false);		 
			 form.setEnabled('tipo_hosp2', false);	
			 form.setEnabled('tipo_hosp3', false);	
			 
			 
		 }	 
		 

		 if (activityEnable != ABERTURA &&  activityEnable != APROVACAO && activityEnable != COMPRARPASSAGEM && activityEnable != CORRIGIRSOLICITACAO){
				//BLOQUEIA CAMPOS DE RATEIO DE PAGAMENTO POIS JA FOI ENVIADO PARA O PROTHEUS
			    if ( form.getValue("tipoPagamento") == "normal" ){
			    	 var indexes = form.getChildrenIndexes("tableItens");	    	    	    	   
			    	    for (var i = 0; i < indexes.length; i++) {
			     	        form.setEnabled("txtcentrocusto___"+ indexes[i], false);	
			     	       	form.setEnabled("txtprojeto___"+ indexes[i], false);	
			     	      	form.setEnabled("txtareaestrategica___"+ indexes[i], false);	
			     	     	form.setEnabled("txtcategoria___"+ indexes[i], false);	
			     	    	form.setEnabled("txtfontefinanciamento___"+ indexes[i], false);	
			     	   		form.setEnabled("txtatividade___"+ indexes[i], false);	
			     	   		form.setEnabled("percentual___"+ indexes[i], false);	
		     	        
			    	    }    	        	  
			    }
			    else {
					 form.setEnabled('rateioconfigurado', false);
			    }
		 }
	 
	 
		
		 
		 
	 
	 }	 
	
		
					    
	    
}