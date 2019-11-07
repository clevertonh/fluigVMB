function validateForm(form){
	var ABERTURA = 0;
	var SOLICITAR = 56;
	var GERENTE_ADM =5;
	var DIRETOR_FIN = 35;
	var DIRETOR_RH = 11;
	var DIRETOR_MINISTERIO = 13;
	var DIRETOR_MKT = 15;
	var DIRETOR_ADVOCACY = 18;
	var DIRETOR_NACIONAL = 27;
	

	
	//recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");	
	
	 //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
	
	 //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	if (statusUsuario == true ){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação/tarefa em nossos sistemas!";
	}
	
	
	
	if (activity == GERENTE_ADM ){		
		if (form.getValue("aprNivel1") == "" ||  form.getValue("aprNivel1") == null){
			throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
		}
		
		
		if (form.getValue("aprNivel1") =="reprovado"){
			if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
				throw "É necessário informar a justificativa pela reprovação.";
			}
		}
		
		
		
	}
	else if (activity == DIRETOR_FIN ){		
			if (form.getValue("aprNivel2") == "" ||  form.getValue("aprNivel2") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			
			
			if (form.getValue("aprNivel2") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
			}
		
		
	}
	else if (activity == DIRETOR_RH ){		
			if (form.getValue("aprNivel4") == "" ||  form.getValue("aprNivel4") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			
			if (form.getValue("aprNivel4") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
			}
		
	}
	else if (activity == DIRETOR_MINISTERIO ){		
			if (form.getValue("aprNivel6") == "" ||  form.getValue("aprNivel6") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			if (form.getValue("aprNivel6") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
			}
			
	}
	else if (activity == DIRETOR_MKT ){		
			if (form.getValue("aprNivel3") == "" ||  form.getValue("aprNivel3") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			if (form.getValue("aprNivel3") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
			}
		
	}
	else if (activity == DIRETOR_ADVOCACY ){		
			if (form.getValue("aprNivel5") == "" ||  form.getValue("aprNivel5") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			if (form.getValue("aprNivel5") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
			}
		
	}
	else if (activity == DIRETOR_NACIONAL ){		
			if (form.getValue("aprNivel4") == "" ||  form.getValue("aprNivel4") == null){
				throw "Você precisa escolher entre aprovar ou reprovar a compra/serviço.";
			}
			if (form.getValue("aprNivel4") =="reprovado"){
				if (form.getValue("justificativaReprovacao") == "" ||  form.getValue("justificativaReprovacao") == null){
					throw "É necessário informar a justificativa pela reprovação.";
				}
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
   
   
   function retornaCPFAprovador(emailGestor){     
       var constraints = new Array();
       constraints.push(DatasetFactory.createConstraint("EMAIL_F", emailGestor, emailGestor, ConstraintType.MUST));
       var dataset = DatasetFactory.getDataset("ds_get_Funcionario", null, constraints, null);

       if (dataset != null && dataset.values.length > 0) {
       	return dataset.getValue(0, "CPF");
       }  
       else {
       	return null;
       }
   }
	
}