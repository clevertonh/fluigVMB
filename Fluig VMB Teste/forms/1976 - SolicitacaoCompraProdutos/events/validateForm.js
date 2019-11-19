function validateForm(form){
	var ABERTURA = 4;
	var APROVACAO =5;
	var CORRIGIR = 15;
	var GERAR_SC = 42;
	
	//recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");	
		
	 //variaveis usadas para validação de linhas repetidas no rateio
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    
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
	
	
	if (activity == ABERTURA ||  activity == APROVACAO || activity == CORRIGIR || activity == GERAR_SC){
	
		//funções para validar informações financeiras
		validaLinhasPreenchidas();
		validaLinhasRepetidas();
		validaPercentualRateio();
		validaAtividades();
		
		//valida campos do produto
		validaProdutos();
		
		
		if (activity == APROVACAO){
			
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
	        	log.info("Usuario não afastado");
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
	
    
    
   
	
    
    
	
	 //VALIDA SE AS LINHAS FORAM PREENCHIDAS CORRETAMENTE
    function validaLinhasPreenchidas(){
   	   var indexes = form.getChildrenIndexes("tableItens");            
   	   
          for (var i = 0; i < indexes.length; i++) {
              var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
              var projeto = form.getValue("txtprojeto___" + indexes[i]);
              var area = form.getValue("txtareaestrategica___" + indexes[i]);
              var categoria = form.getValue("txtcategoria___" + indexes[i]);
              var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
              var atividade = form.getValue("txtatividade___" + indexes[i]);
           
        if (ccusto == "99990") {
                  if (projeto == null || projeto == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo projeto não foi informado";

                  }
             
                  if (area == null || area == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo area estratégica não foi informado";

                  }
                  if (categoria == null || categoria == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo categoria não foi informado";

                  }
                  if (fonte == null || fonte == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo fonte de financiamento não foi informado";

                  }
                  if (atividade == null || atividade == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                  }
              } 
              else {                	
                  if (ccusto == null || ccusto == "") {
                      //    fieldValue = 0;
                      throw "Existem linhas no rateio de pagamento cujo campo centro de custo não foi informado.";

                  }

                  
                  if (atividade == null || atividade == "") {
                      throw "Existem linhas no rateio de pagamento cujo campo atividade não foi informado";

                  }
             
                 }
          }
    }
    
    function validaLinhasRepetidas(){
        ///VALIDA LINHAS REPETIDAS
            var indexes = form.getChildrenIndexes("tableItens");            
           
            for (var i = 0; i < indexes.length; i++) {
                var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
                var projeto = form.getValue("txtprojeto___" + indexes[i]);
                var area = form.getValue("txtareaestrategica___" + indexes[i]);
                var categoria = form.getValue("txtcategoria___" + indexes[i]);
                var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
                var atividade = form.getValue("txtatividade___" + indexes[i]);
 
				if (aCentroCusto.length > 0){
                    		//log.info("Segunda linha do rateio de projeto");
                    		for (var a=0; a < aCentroCusto.length ; a++){
                    				if (aCentroCusto[a] == ccusto && aProjeto[a] == projeto && aArea[a] == area && aCategoria[a] == categoria && aFonte[a] == fonte && aAtividade[a] == atividade  ) {
                    					 throw "Existem linhas do rateio repetidas.";
                    				}
                				
                    		}
                    		
                    		//log.info("Adiciona os dados do projeto atual no array");
							aCentroCusto.push(ccusto);	
                    		aProjeto.push(projeto);	
                    		aCategoria.push(categoria);
                    		aFonte.push(fonte);
                    		aAtividade.push(atividade);
                    		aArea.push(area);
                    		
                 }
                 else {
                   		//log.info("Adiciona a primeira linha de dados do projeto ao array");
                   		aCentroCusto.push(ccusto);	
						aProjeto.push(projeto);	
                    	aCategoria.push(categoria);
                    	aFonte.push(fonte);
                    	aAtividade.push(atividade);
                    	aArea.push(area);
                 }
               
            }
        
    }
    
    function validaPercentualRateio(){
        //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO
            var indexes = form.getChildrenIndexes("tableItens");
            var total = 0;

            for (var i = 0; i < indexes.length; i++) {
                //var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
                var fieldValue = parseFloat(form.getValue("percentual___" + indexes[i]));                   
                if (isNaN(fieldValue)) {
                    throw "Existem linhas sem percentual informado no rateio de pagamento.";

                }

                total = total + fieldValue;	        
            }
            
            //if ((total < 100) || total > 100) {
            if ((total.toFixed(2) < 100) || total.toFixed(2) > 100) {
                throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
            }
        
    }
  
     //VALIDA SE FOI INFORMADO PELO MENOS 1 SERVIÇO E SE TODOS OS CAMPOS FORAM PREENCHIDOS
     function validaProdutos(){
    	   var indexes = form.getChildrenIndexes("tableCompras");            
    	   
           for (var i = 0; i < indexes.length; i++) {
               var produto = form.getValue("txtproduto___" + indexes[i]);
               var valor = form.getValue("vrTotUnit___" + indexes[i]);
               var dataViagem = form.getValue("dtNecessidade___" + indexes[i]);      
               var quantidade = form.getValue("idquantidade___" + indexes[i]);      
        
               if (produto == "" || produto === null){
               	throw "O produto não foi informado!";
               }
               else if (valor == "" || valor === null || valor == 0){
               	throw "O valor de referencia para o produto não existe, por favor, entre em contato com assessoria_administrativa@wvi.org informando o código do produto e solicite a atualização desse registro.";
               }
               else if (dataViagem == "" || dataViagem === null){
               	throw "A data de necessidade  não foi informada!";
               }
               else if (quantidade == "" || quantidade === null || quantidade == 0){
                  	throw "A quantidade não foi informado ou deve ser maior que zero!";
                  }
               
           }        
     }
     
     
     //VALIDA SE FOI INFORMADO ATIVIDADE ESTRUTURAL OU FOLHA E PROIBE USO
     function validaAtividades(){
    	   var indexes = form.getChildrenIndexes("tableItens");            
    	   
           for (var i = 0; i < indexes.length; i++) {
        	   var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
               var atividade = form.getValue("txtatividade___" + indexes[i]);
            
         if (ccusto == "99990") {             
                   if (atividade == "P952101" || atividade == "P953101" || atividade == "P650101") {
                       throw "Você não pode usar uma atividade do tipo CAM ou de GN para custear uma compra.";

                   }
               } 
               else {                	
            	   if (atividade == "E010101" ) {
                	   throw "Você não pode usar uma atividade de folha  para custear uma compra.";

                   }
            	   if (atividade == "A443201"){
            		   throw "Você não pode usar uma atividade de capacitação para custear uma viagem.";
            	   }
              
                  }
           }
     }
	
	
}