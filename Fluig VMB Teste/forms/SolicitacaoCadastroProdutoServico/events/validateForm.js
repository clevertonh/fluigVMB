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
	else {
		if (activity == SOLICITAR ){
			if (form.getValue("desc_res") == null || form.getValue("desc_res") == "") {
	            throw "O campo descrição resumida não foi preenchido";
	        }
			
			if (form.getValue("tipo") =="" || form.getValue("tipo") == null){
				throw "O campo tipo de cadastro precisa ser informado.";
			}
			
			if (form.getValue("tipo") == 'servico' ){		
				if (form.getValue("desc_detalhada") == null || form.getValue("desc_detalhada") == "") {
		            throw "O campo descrição detalhada não foi preenchido";
		        }
				if (form.getValue("tipoPessoa") == null || form.getValue("tipoPessoa") == "") {
		            throw "O tipo de pessoa não foi informado";
		        }
			}
			
			
		}
		else if (activity == VALIDAR || activity == CORRIGIR){
			
			if (form.getValue("produtoExiste")  =="" || form.getValue("produtoExiste")  == null){
				 throw "É preciso informar se o produto já existe ou não.";
			}
			
			if (form.getValue("produtoExiste") == 'nao'){
				if (form.getValue("descricao") == null || form.getValue("descricao") == "") {
		            throw "O campo descrição não foi preenchido";
		        }
				
				if (form.getValue("tipo") == "servico" ){		
					if (form.getValue("descricao_det") == false || form.getValue("descricao_det") == "" ) {
			            throw "O campo descrição detalhada não foi preenchido";
			        }
				}
				
				if (form.getValue("tipoG") == null || form.getValue("tipoG") == "") {
		            throw "Você precisa informar um código de tipo valido no sistema Protheus";
		        }
				
				if (form.getValue("grupo") == null || form.getValue("grupo") == "") {
		            throw "Você precisa informar um grupo valido no sistema Protheus";
		        }
				
				if (form.getValue("unidade") == null || form.getValue("unidade") == "") {
		            throw "O campo unidade de medida precisa ser informado";
		        }
				
				if (form.getValue("mostrafluig") == null || form.getValue("mostrafluig") == "") {
		            throw "Você precisa indicar em qual processo do Intrasomos esse produto deverá ficar visivel para ser utilizado";
		        }
				
				if (form.getValue("tipo") == "produto"){
					if (form.getValue("vl_base") == null || form.getValue("vl_base") == "") {
			            throw "O valor de referencia precisa ser preenchido";
			        }
					
					if (parseFloat(form.getValue("vl_base")) < 0){
						throw "Valor menor que zero, por favor, verifique.";
					}
					
				}
				
		
				
				
			}
			
			else {
				if (form.getValue("produto") == null || form.getValue("produto") == "") {
		            throw "Se o produto já existe, o mesmo deve ser informado para o usuário.";
		        }
			}
			
		
		}
		else if (activity == DADOS_CONTABEIS && nextAtv == GATEWAYINTEGRACAO){
			if (form.getValue("contacontabil") == null || form.getValue("contacontabil") == "") {
	            throw "O campo conta contábil precisa ser informado";
	        }
			if (form.getValue("tes") == null || form.getValue("tes") == "") {
	            throw "O código TES precisa ser informado";
	        }
			
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