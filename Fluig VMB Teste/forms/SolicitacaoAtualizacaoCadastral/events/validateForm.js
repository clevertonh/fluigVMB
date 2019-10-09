function validateForm(form){
	var INICIO = 4;
	var ATUALIZACAO = 5;
	
	
	var activity = getValue('WKNumState');	
	 
	//recupera usuario logado
    var usuarioLogado = getValue('WKUser');
    var usuariosubstituto = getValue('WKReplacement');
    
    if (usuariosubstituto != null){
    	usuarioLogado = usuariosubstituto;
    }
	
    //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	
	if (activity == INICIO){		 
		 if (form.getValue("cep") == "" && !form.getValue("cep").match(/^[0-9]{8}/) ) {
			  throw "Você precisa informar o CEP.";
         }
		 if (form.getValue("endereco") == "" || form.getValue("endereco") == null) {
	            throw "Você precisa informar o endereço.";
	        }
		 
		 if (form.getValue("numero") == "" && !form.getValue("numero").match(/^[0-9]/)) {
			  throw "Você precisa informar o número da residência/edificio.";
          }
		 
		 if (form.getValue("bairro") == "" || form.getValue("bairro") == null) {
	            throw "Você precisa informar o bairro.";
	        }
		 if (form.getValue("municipio") == "" || form.getValue("municipio") == null) {
	            throw "Você precisa informar o Municipio.";
	        }
		 if (form.getValue("estado") == "" || form.getValue("estado") == null) {
	            throw "Você precisa informar o Estado.";
	        }
		 if (form.getValue("estadoCivil") == "" || form.getValue("estadoCivil") == null) {
	            throw "Você precisa informar seu estado cívil.";
	        }
		 if (form.getValue("etnia") == "" || form.getValue("etnia") == null) {
	            throw "Você precisa declarar sua etnia.";
	        }
		 if (form.getValue("contato") == "" || form.getValue("contato") == null) {
	            throw "Você precisa informar um nome para contato de emergência.";
	        }
		 if (form.getValue("parentesco") == "" || form.getValue("parentesco") == null) {
	            throw "Você precisa informar o grau de parentesco da pessoa de contato.";
	        }
		 if (form.getValue("telefone") == "" && form.getValue("celular") == "") {
	            throw "Você precisa informar um dos campos de telefone para contato.";
	        }
		 if (form.getValue("tamanhoCamisa") == "" || form.getValue("tamanhoCamisa") == null) {
	            throw "Você precisa informar o tamanho desejado para camisa de campanhas da Visão Mundial.";
	        }
		 
	}
	else if (activity == ATUALIZACAO){
		var statusUsuario = false;
		
		//consulta situação atual do solicitante
		statusUsuario = consultaAfastamento(email);
		
		if (statusUsuario == true ){
			 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
		}
	}
	
	
	
	
	 function UsuarioLogado(solicitante){
		 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", solicitante, solicitante, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		 
		 return dataset;
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
	
     function consultaAfastamento(email){   	    	
   	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", email, email, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
		 
		// log.info("usuario afastado");
		// log.dir(dataset);
		 
		 if (dataset.values.length >0 ) {
		//	 log.info("Usuario afastado");
			 return true;
	        	
	        }  
	        else {
	       // 	log.info("Usuario não afastado");
	        	return false;
	        }	 
   }

	
}