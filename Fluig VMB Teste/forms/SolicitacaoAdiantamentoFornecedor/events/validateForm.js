function validateForm(form){
	var INICIO =0;
	var ABERTURA = 4;
	var GERAR_ADTO = 10;
	var GERAR_ADF_CARTAO = 24;
	var GERENTE_ADM = 31;
	var DIRETOR_FINANCEIRO = 5;
	var DIRETOR_RH = 48;
	var DIRETOR_MINISTERIO = 50;
	var DIRETOR_MKT = 52;
	var DIRETOR_ADVOCACY = 54;
	var DIRETOR_NACIONAL = 46;
	
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
		if (form.getValue("condicaoPgto") == "" || form.getValue("condicaoPgto") == null){
			throw "Você precisa indicar a forma de pagamento no qual o fornecedor deverá receber.";
		}
		if (form.getValue("dtNecessidade") == "" || form.getValue("dtNecessidade") == null){
			throw "Você precisa informar a data de necessidade.";
		}
		if (form.getValue("cnpjcpf") == "" || form.getValue("cnpjcpf") == null){
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
				
		
		if (form.getValue("tipoAprovacao") == "" || form.getValue("tipoAprovacao") == null  ){
			throw "Você precisa indicar o campo tipo.";
		}
			
		
		//necessario criar um webservice de consultar saldo de adiantamento a fornecedor
		//consultaPendenciaAdiantamento();
		
		 if (!grupoCommpradores(usuarioLogado)){
			 //throw "Apenas funcionários da área de Administração podem solicitar adiantamento a fornecedor.";
		 }
		
		
	}
	else if (activity == GERENTE_ADM){		
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
	
	else if (activity == DIRETOR_FINANCEIRO){		
		//valida se o aprovador marcou o campo de aprovacao ou reprovação
		if (form.getValue("aprovacaoDIR") == false || form.getValue("aprovacaoDIR") == "") {
            throw "Você precisa indicar se a solicitação será aprovada.";
        }

        if (form.getValue("aprovacaoDIR") == "reprovado" && form.getValue("justificativaReprovacaoDIR")  == "" ) {
            throw "Você precisa informar o motivo para reprovação da solicitação.";
        }
    	
	
	}
	
	
	else if (activity == GERAR_ADF_CARTAO){
		if (!form.getValue("cartaocredito").match(/^[0-9]/)){
			 throw "Você deve informar apenas os números do cartão de crédito.";			
			
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
   
		function grupoCommpradores(usuario){
			var constraint = new Array();
			constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuario, usuario, ConstraintType.MUST));
			constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "GestaoCompras", "GestaoCompras", ConstraintType.MUST));
			var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraint, null);
			
			
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