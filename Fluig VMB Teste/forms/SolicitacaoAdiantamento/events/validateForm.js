function validateForm(form){
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO =5;
	
	
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
	
	
		
	if (activity == ABERTURA){
		if (form.getValue("vl_solicitado") == "" ){
			throw "Você precisa informar o valor desejado.";
		}
		if (form.getValue("dtNecessidade") == "" ){
			throw "Você precisa informar a data de necessidade.";
		}
		if (form.getValue("Funcionario") == "" || form.getValue("Funcionario") == null){
			throw "Você precisa informar o beneficiário que receberá o adiantamento.";
		}
		if (form.getValue("itinerario") == "" || form.getValue("itinerario") == null ){
			throw "Você precisa informar o itinerário da viagem (país/cidade de origem e país/cidade de destino";
		}
		if (form.getValue("dtViagem") == "" || form.getValue("dtViagem") == null ){
			throw "Você precisa informar a data da viagem.";
		}
		if (form.getValue("centrocusto") == "" || form.getValue("centrocusto") == null ){
			throw "Você precisa informar o centro de custo.";
		}
		if (form.getValue("centrocusto") == "99990" ){
			if (form.getValue("projeto") == "" || form.getValue("projeto") == null ){
				throw "Você precisa informar o projeto.";
			}
			if (form.getValue("fontefinanciamento") == "" || form.getValue("fontefinanciamento") == null){
				throw "Você precisa informar a fonte de financiamento.";
			}
			
		}
		
		consultaPendenciaAdiantamento();
		
	}
	else if (activity == APROVACAO){
		if (form.getValue("vl_aprovado") == "" ){
			throw "O valor a ser aprovado deve ser informado e maior que zero.";
		}
		if ( form.getValue("vl_aprovado") <= 0 ){
			throw "O valor a ser aprovado deve ser maior que zero.";
		}
		//valida se o aprovador marcou o campo de aprovacao ou reprovação
		if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
            throw "Você precisa indicar se a solicitação será aprovada, reprovada ou devolvida para correção.";
        }

        if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
            throw "Você precisa informar o motivo para reprovação da solicitação.";
        }
        
		//valida se aprovador é diferente do solicitante
		if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
          	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
            }
	
	
		if (form.getValue("aprovacao") == "aprovado"){
			consultaPendenciaAdiantamento();
		}
	
	
	}
	
	function 	consultaPendenciaAdiantamento(){
		 var dataset = DatasetFactory.getDataset("VM_PendenciaAdiantamento", null, null, null);

		 for (var a=0; a<dataset.rowsCount; a++ ){
			 if (form.getValue("cpfbeneficiario") == dataset.getValue(a,"CPF")){
				 if (dataset.getValue(a,"QUANTIDADE") > 0){
					 throw "O beneficiário possui um adiantamento pendente.";					 
				 }				 
			 };
		 }
		 	 
	}
	
	
	
	 function consultaAfastamento(emailLogado){   	    	
 	 	 var constraints   = new Array();
		 constraints.push(DatasetFactory.createConstraint("EMAIL", emailLogado, emailLogado, ConstraintType.MUST));
		 var dataset = DatasetFactory.getDataset("ds_get_afastado", null, constraints, null);
		 
		// log.info("usuario afastado: " + emailLogado);
		// log.dir(dataset);
		 
		 if (dataset.values.length >0 ) {
		//	 log.info("Usuario afastado");
			 return true;
	        	
	        }  
	        else {
	      //  	log.info("Usuario não afastado");
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