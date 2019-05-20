function validateForm(form){
	var ABERTURA = 4;
	var APROVACAO = 5;
	
		
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
	
  
	if (activity == ABERTURA) {
		
		
		if (form.getValue("vl_reposicao") == "" ){
			throw "Você precisa informar o valor da reposição.";
		}				
		else if (form.getValue("emailSolicitante")==""){
			throw "Seus dados de usuário não foram carregados, por favor tente novamente mais tarde.";
		}
		else if (form.getValue("responsavel")==""){
			throw "O responsável pelo fundo fixo não foi informado.";
		}	
		else if (form.getValue("cpfbeneficiario")==""){
			throw "O CPF do beneficiário não foi preenchido. Selecione novamente o responsável pelo fundo fixo.";
		}
		else if (form.getValue("tipoffx")==""){
			throw "O tipo de fundo fixo não foi selecionado.";
		}
	
		
	}
	
	
	else if (activity == APROVACAO){
		if (form.getValue("vl_reposicao") == "" ){
			throw "Você precisa informar o valor da nota fiscal.";
		}		
		else if (form.getValue("responsavel")==""){
			throw "O responsável pelo fundo fixo não foi informado.";
		}	
		else if (form.getValue("cpfbeneficiario")==""){
			throw "O CPF do beneficiário não foi preenchido. Selecione novamente o responsável pelo fundo fixo.";
		}
		else if (form.getValue("tipoffx")==""){
			throw "O tipo de fundo fixo não foi selecionado.";
		}		
		else if (form.getValue("aprovacao") == "" || form.getValue("aprovacao") == null){
			throw "Você precisa escolher entre as opções de aprovado ou reprovado.";
		}
		
		else if (form.getValue("emailAprovador") == "" ){
			throw "Seu email não foi carregado, tente novamente mais tarde!";
		}	
		
		else if (form.getValue("emailSolicitante") ==  email ){
		//	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
		}
		else if (form.getValue("cpfbeneficiario") == retornaCPFAprovador(email)){
       	 //throw "Você não pode aprovar uma solicitação onde você é o beneficiário.";
       }
		
		
	}
	
	
    function consultaAfastamento(emailLogado){   	    	
 	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", emailLogado, emailLogado, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
		 
		 log.info("usuario afastado: " + emailLogado);
		 log.dir(dataset);
		 
		 if (dataset.values.length >0 ) {
			 log.info("Usuario afastado");
			 return true;
	        	
	        }  
	        else {
	        	//log.info("Usuario não afastado");
	        	return false;
	        }	 
 }
   
        
            
            
            function retornaCPFAprovador(email){

                if (email != null && email.length>0){
                	  var constraints = new Array();
                      constraints.push(DatasetFactory.createConstraint("EMAIL_F", email, email, ConstraintType.MUST));
                      var dataset = DatasetFactory.getDataset("ds_get_Funcionario", null, constraints, null);

                      if (dataset != null && dataset.values.length > 0) {
                      	return dataset.getValue(0, "CPF");
                      }  
                      else {
                      	return null;
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
         	
             
}

