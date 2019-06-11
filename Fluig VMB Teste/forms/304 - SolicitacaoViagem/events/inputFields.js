function inputFields(form){
	var ABERTURA = 4;
	var APROVACAO = 5;
    var VERIFICARAPROVACAO = 9;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var PEDIUCANCELAR = 60;
	var CONFIRMARREEMBOLSO = 79;
    var PEDIUREEMBOLSO = 80;
	var CORRIGIRSOLICITACAO = 98;
	
	
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	log.info("----ATIVIDADE inputFields: " + activity);
	
	
	
	if (activity == REGISTRARCANCELAMENTO && nextAtv == OBTERPASSAGEM){
		 form.setValue("cancelarpassagem","");
	}
	

	
	/*
	if (activity == ABERTURA || activity == CORRIGIRSOLICITACAO){
		var embaixador = getValue('embaixador');

		log.info("EMBAIXADOR: " + embaixador);
		
		if (embaixador == 'sim'){					
				 var constraints   = new Array();
				 constraints.push(DatasetFactory.createConstraint("mail", 'raissa_rossiter@wvi.org', 'raissa_rossiter@wvi.org', ConstraintType.MUST));
				 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
				 			 			 			 			
				 if (dataset!= null && dataset != ''){
					 form.setValue("emailGestor","raissa_rossiter@wvi.org");
					 form.setValue("matriculaApr",dataset.getValue(0, "colleaguePK.colleagueId"));
					 form.setValue("aprovador",dataset.getValue(0, "colleagueName"));	 
				 }
				 else {
					 form.setValue("emailGestor","");
					 form.setValue("matriculaApr","");
					 form.setValue("aprovador","");	
				 }
				 
				 		
		}
			
	}
	
*/
	

	
	
	/*
	var calendarios = new Array("datapartida2","dataretorno2","datapartida3","dataretorno3","datacheckout","datacheckin","dataAprovacao");
	
	for (var i= 0; i < calendarios.lenght ; i++){

		if (form && form.getValue(calendarios[i]) && form.getValue(calendarios[i]).match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue(calendarios[i]).split('/');
	        form.setValue(calendarios[i], split[2] + '-' + split[1] + '-' + split[0]);
	    }
	
	}
	
*/
	/*
	 if (form && form.getValue("datapartida2") && form.getValue("datapartida2").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datapartida2").split('/');
	        form.setValue("datapartida2", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 

	 if (form && form.getValue("dataretorno2") && form.getValue("dataretorno2").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("dataretorno2").split('/');
	        form.setValue("dataretorno2", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 

	 if (form && form.getValue("datapartida3") && form.getValue("datapartida3").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datapartida3").split('/');
	        form.setValue("datapartida3", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 

	 if (form && form.getValue("dataretorno3") && form.getValue("dataretorno3").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("dataretorno3").split('/');
	        form.setValue("dataretorno3", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 

	 if (form && form.getValue("datacheckout") && form.getValue("datacheckout").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datacheckout").split('/');
	        form.setValue("datacheckout", split[2] + '-' + split[1] + '-' + split[0]);
	    }

	 if (form && form.getValue("datacheckin") && form.getValue("datacheckin").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datacheckin").split('/');
	        form.setValue("datacheckin", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	
	
	 if (form && form.getValue("datanasc") && form.getValue("datanasc").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datanasc").split('/');
	        form.setValue("datanasc", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 
	 if (form && form.getValue("dataAprovacao") && form.getValue("dataAprovacao").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("dataAprovacao").split('/');
	        form.setValue("dataAprovacao", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 
	 
	 if (form && form.getValue("datapartida1") && form.getValue("datapartida1").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("datapartida1").split('/');
	        form.setValue("datapartida1", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 
	 if (form && form.getValue("prazoaprovacao") && form.getValue("prazoaprovacao").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("prazoaprovacao").split('/');
	        form.setValue("prazoaprovacao", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 
	 
	 if (form && form.getValue("prazoCancelamento") && form.getValue("prazoCancelamento").match("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
	        var split = form.getValue("prazoCancelamento").split('/');
	        form.setValue("prazoCancelamento", split[2] + '-' + split[1] + '-' + split[0]);
	    }
	 
	 
	 
	 */
	 
	 
	
}