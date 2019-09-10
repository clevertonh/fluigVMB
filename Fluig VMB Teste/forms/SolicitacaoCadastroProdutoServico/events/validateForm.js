function validateForm(form){
	var SOLICITAR = 4;
	var COMPRAS = 5;
	var CONTABILIDADE = 10;
	
	var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
	
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
	else if (activity == COMPRAS){
		
	}
	else if (activity == CONTABILIDADE){
		
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