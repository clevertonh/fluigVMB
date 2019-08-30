function validateForm(form){
	var INICIO =0;
	var ABERTURA = 4;
	var APROVACAO_DIRETOR = 5;
	var GERAR_ADTO = 10;
	var SOLICITANTE = 24;
	var APROVACAO_GESTOR = 31;
	var INTEGRAR = 18;
	
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
		if (form.getValue("formapgto") == "" || form.getValue("formapgto") == null){
			throw "Você precisa indicar a forma de pagamento no qual o fornecedor deverá receber.";
		}
		if (form.getValue("dtNecessidade") == "" || form.getValue("dtNecessidade") == null){
			throw "Você precisa informar a data de necessidade.";
		}
		if (form.getValue("cgcFornecedor") == "" || form.getValue("cgcFornecedor") == null){
			throw "Você precisa informar o fornecedor que receberá o adiantamento.";
		}
		if (form.getValue("vl_total") == "" || form.getValue("vl_total") == null || form.getValue("vl_total") <= 0 ){
			throw "Você precisa indicar o valor total da compra ou serviço.";
		}
		if (form.getValue("vl_adiantado") == "" || form.getValue("vl_adiantado") == null || form.getValue("vl_adiantado") <= 0 ){
			throw "Você precisa indicar o valor desejado para o adiantamento.";
		}
	
		if (form.getValue("justificativa") == "" || form.getValue("justificativa") == null  ){
			throw "Você precisa informar a justificativa pelo adiantamento.";
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
		
		//necessario criar um webservice de consultar saldo de adiantamento a fornecedor
		//consultaPendenciaAdiantamento();
		
	}
	else if (activity == APROVACAO_GESTOR){		
		//valida se o aprovador marcou o campo de aprovacao ou reprovação
		if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
            throw "Você precisa indicar se a solicitação será aprovada";
        }

        if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
            throw "Você precisa informar o motivo para reprovação da solicitação.";
        }
        
		//valida se aprovador é diferente do solicitante
		if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
          	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
        }
	
	
	
	}
	
	else if (activity == APROVACAO_DIRETOR){		
		//valida se o aprovador marcou o campo de aprovacao ou reprovação
		if (form.getValue("aprovacaoDIR") == false || form.getValue("aprovacaoDIR") == "") {
            throw "Você precisa indicar se a solicitação será aprovada.";
        }

        if (form.getValue("aprovacaoDIR") == "reprovado" && form.getValue("justificativaReprovacaoDIR")  == "" ) {
            throw "Você precisa informar o motivo para reprovação da solicitação.";
        }
    	
	
	}
	
	
	else if (activity == SOLICITANTE){
		if (!form.getValue("cartaocredito").match(/^[0-9]/)){
			 throw "Você deve informar apenas os números do cartão de crédito.";			
			
		}
		

	}
	
	else if (activity == GERAR_ADTO){
		if (nextAtv == INTEGRAR){
			if (form.getValue("banco") == "" || form.getValue("banco") == null ){
				 throw "Os dados bancários não foram informados";			
				
			}
			if (form.getValue("agencia") == "" || form.getValue("agencia") == null ){
				 throw "Os dados bancários não foram informados";				
				
			}
			if (form.getValue("contabanco") == "" || form.getValue("contabanco") == null ){
				 throw "Os dados bancários não foram informados";				
				
			}
			
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
			 
		 if (dataset.values.length >0 ) {
			 return true;
	        	
	        }  
	        else {
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