function validateForm(form){
	var SOLICITAR = 4;
	var VALIDAR = 5;
	var DADOS_CONTABEIS = 10;
	var CORRIGIR = 16;
	
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	
	//GATEWAY
	var GATEWAYINTEGRACAO = 12;
	
	
    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    var usuariosubstituto = getValue('WKReplacement');
    
    if (usuariosubstituto != null){
    	usuarioLogado = usuariosubstituto;
    }
	
	 //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
    	
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	if (statusUsuario == true ){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
	}
	
	
	
	if (activity == SOLICITAR ){
		if (form.getValue("desc_res") == false || form.getValue("desc_res") == "") {
            throw "O campo descrição resumida não foi preenchido";
        }
		
		if (form.getValue("tipo") == 'servico' ){		
			if (form.getValue("desc_detalhada") == false || form.getValue("desc_detalhada") == "") {
	            throw "O campo descrição detalhada não foi preenchido";
	        }
		}
		
		
	}
	else if (activity == VALIDAR || activity == CORRIGIR){
		if (form.getValue("descricao") == false || form.getValue("descricao") == "") {
            throw "O campo descrição resumida não foi preenchido";
        }
		if (form.getValue("tipo") == 'servico' ){		
			if (form.getValue("descricao_det") == false || form.getValue("descricao_det") == "") {
	            throw "O campo descrição detalhada não foi preenchido";
	        }
		}
		if (form.getValue("tipoG") == false || form.getValue("tipoG") == "") {
            throw "Você precisa informar um código de tipo valido no sistema Protheus";
        }
		if (form.getValue("grupo") == false || form.getValue("grupo") == "") {
            throw "Você precisa informar um grupo valido no sistema Protheus";
        }
		if (form.getValue("unidade") == false || form.getValue("unidade") == "") {
            throw "O campo descrição resumida não foi preenchido";
        }
		if (form.getValue("mostrafluig") == false || form.getValue("mostrafluig") == "") {
            throw "O campo descrição resumida não foi preenchido";
        }
	}
	else if (activity == DADOS_CONTABEIS && nextAtv == GATEWAYINTEGRACAO){
		if (form.getValue("contacontabil") == false || form.getValue("contacontabil") == "") {
            throw "O campo conta contábil precisa ser informado";
        }
		if (form.getValue("tes") == false || form.getValue("tes") == "") {
            throw "O código TES precisa ser informado";
        }
		
	}
	
	 function consultaAfastamento(emailLogado){   	    	
 	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", emailLogado, emailLogado, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
			 
		 if (dataset.values.length >0 ) {
			 return true;
	        	
	        }  
	        else {
	        	return false;
	        }	 
 }
  
	 
	 
	
    function retornaEmailUsuario(userId){
      	 var constraints   = new Array();
   		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", userId, userId, ConstraintType.MUST));
   		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
   			
   	        if (dataset != null && dataset.values.length > 0) {
   	        	return dataset.getValue(0, "mail");
   	        }  
   	        else {
   	        	return null;
   	        }	    
      }
    
    
}