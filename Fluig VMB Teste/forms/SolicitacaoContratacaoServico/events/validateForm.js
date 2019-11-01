function validateForm(form){
	var ABERTURA = 0;
	var SOLICITAR = 4;	
	var APROVACAO_GESTOR =5;
	var CORRIGIR = 142;
	var REALIZAR_COTACAO_COMPRAS = 12;
	var REALIZAR_COTACAO_HOSPITALIDADE = 22;
	var ENVIAR_APROVACAO_COMPRAS = 209;
	var ENVIAR_APROVACAO_HOSPITALIDADE = 206;
	var APROVACAO_SERVICO_COMPRAS = 105;
	var APROVACAO_SERVICO_HOSPITALIDADE = 94;
	var VERIFICAR_APROVACAO_HOSPITALIDADE = 151;
	var VERIFICAR_APROVACAO_COMPRAS = 145;
	var SOLICITACAO_CONTRATO_HOSPITALIDADE = 66;
	var SOLICITACAO_CONTRATO_COMPRAS = 63;
	var INTEGRAR_PROTHEUS_COMPRAS_COMPRAS = 212;
	var INTEGRAR_PROTHEUS_COMPRAS_HOSPITALIDADE = 215;
	var VALIDAR_RH = 161;
	
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
	
	
	if (activity == SOLICITAR || activity == CORRIGIR){
	
			if (form.getValue("solicitante") == null || form.getValue("solicitante") == "") {
	            throw "Seus dados de solicitante não foram carregados, por favor, atualize o navegador e tente novamente. Se o erro persistir, entre em contato com o setor de Sistemas.";
	        }
		 
		 
		//funções para validar informações financeiras
		validaLinhasPreenchidas();
		validaLinhasRepetidas();
		validaPercentualRateio();
		validaAtividades();
		
		validaCamposPreenchidos();
		
	}
   
	else if (activity == APROVACAO_GESTOR){
		
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
		
		
		//funções para validar informações financeiras
		validaLinhasPreenchidas();
		validaLinhasRepetidas();
		validaPercentualRateio();
		validaAtividades();
	
		validaCamposPreenchidos();
	
	}
	else if (activity == REALIZAR_COTACAO_COMPRAS || activity == REALIZAR_COTACAO_HOSPITALIDADE){
		//valida se aprovador é diferente do solicitante
		if (form.getValue("cnpjcpf") == null  || form.getValue("cnpjcpf")  == "" ){
          	 throw "Você precisa selecionar o fornecedor vencedor da cotação.";
        } 
		if (form.getValue("negociacao") == null  || form.getValue("negociacao")  == "" ){
         	 throw "O campo de negociação deve ser preenchida.";
        } 
		if (form.getValue("condicaoPgto") == null  || form.getValue("condicaoPgto")  == "" ){
        	 throw "É preciso informar o campo Forma de pagamento.";
       } 
		
		
		if (form.getValue("melhorProposta") == "nao" ){
			if (form.getValue("justificativaP") !="" && form.getValue("justificativaP") != null){
				throw "É preciso informar o motivo por não estar escolhendo o fornecedor de menor valor.";
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
               var quantidade = form.getValue("id_quantidade___" + indexes[i]);      
        
               if (produto == "" || produto === null){
               	throw "O produto não foi informado!";
               }
               else if (valor == "" || valor === null || valor == 0){
               	throw "O valor empenhado para o produto não foi informado ou deve ser maior que zero!";
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
              
                  }
           }
     }
	
     
     function validaCamposPreenchidos(){
    	 if (form.getValue("resumo") == null || form.getValue("resumo") == "") {
	            throw "Você precisa informar o campo resumo do serviço";
	        }
		   if (form.getValue("objetivos") == null || form.getValue("objetivos") == "") {
	            throw "Você precisa informar o campo objetivo";
	        }
		   if (form.getValue("justificativa") == null || form.getValue("justificativa") == "") {
	            throw "Você precisa informar o campo justificativa";
	        }
		   if (form.getValue("resultados") == null || form.getValue("resultados") == "") {
	            throw "Você precisa informar o campo resutlado";
	        }
		   if (form.getValue("localServico") == null || form.getValue("localServico") == "") {
	            throw "Você precisa informar o o campo local de realização do serviço";
	        }
		   if (form.getValue("perfil") == null || form.getValue("perfil") == "") {
	            throw "Você precisa informar o tipo de perfil.";
	        }
		   if (form.getValue("supervisao") == null || form.getValue("supervisao") == "") {
	            throw "Você precisa informar quem é o supervisor/responsável pelas atividades.";
	        }
		
		   if (form.getValue("dtInicio") == null || form.getValue("dtInicio") == "") {
	            throw "Você precisa informar prevista para inicio da execução do serviço.";
	        }
		   if (form.getValue("dtFim") == null || form.getValue("dtFim") == "") {
	            throw "Você precisa informar prevista para termino da execução do serviço.";
	        }
		   
		   if (form.getValue("formapgto") == null || form.getValue("formapgto") == "") {
	            throw "Você precisa informar o campo período de pagamento.";
	        }
		   if (form.getValue("definicaoValor") == null || form.getValue("definicaoValor") == "") {
	            throw "Você precisa informar o campo de definição de valor.";
	        }
		   
		   if (form.getValue("definicaoValor") == "fixo"){
			
			   if (form.getValue("valorMensal") == null || form.getValue("valorMensal") == "" || parseFloat(form.getValue("valorMensal")) == 0) {
		            throw "Você precisa informar qual o valor mensal do serviço.";
		        }
		   }
		   
		   if (form.getValue("valorAnual") == null || form.getValue("valorAnual") == "" || parseFloat(form.getValue("valorAnual")) == 0) {
	            throw "Você precisa informar o valor total ou o valor limite total para a vigência do contrato.";
	        }
		   
		   if ( parseFloat(form.getValue("valorAnual"))  < parseFloat(form.getValue("valorMensal")) ){
			   throw "O valor total ou limite total não pode ser menor que o valor mensal.";
		   }
     }
	
}



//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}