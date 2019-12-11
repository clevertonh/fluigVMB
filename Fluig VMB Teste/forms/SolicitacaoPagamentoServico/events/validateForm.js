function validateForm(form){	
	var ABERTURA = 0;
	var SOLICITAR = 4;
	var INCLUIR_MEDICAO = 87;
	var AGUARDAR_APROVACAO = 65;
	var CORRIGIR = 92;
	var ANEXAR_RELATORIO = 74;
	var ENCERRAR_MEDICAO = 13;
	var PRE_NOTA = 100;
	var CLASSIFICAR_NOTA = 51;
	
	
	
	var activity = getValue('WKNumState');
	var solicitante = getValue("WKUser"); 
	
	
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
	
	
	
	
	if (activity == SOLICITAR ){
		if (parseFloat(form.getValue("saldoAtual")) <  parseFloat(form.getValue("vl_servico"))){
			 throw "O contrato não possui saldo suficiente para pagar essa nota fiscal.";
		}
		
		
		//funções para validar informações financeiras
		validaLinhasPreenchidas();
		validaLinhasRepetidas();
		validaPercentualRateio();
		validaAtividades();
		
		
		
	}
	else if (activity == INCLUIR_MEDICAO){
		if (form.getValue("validacao") == "" || form.getValue("validacao") == null){
			throw "Você precisa indicar se valida ou invalida a nota fiscal e relatório enviado pelo usuário.";
		}
		
		
		 if (form.getValue("validacao") == "invalido" && form.getValue("justificativaR")  == "" ) {
             throw "Você precisa informar o motivo por invalidar a solicitação.";
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
               var fieldValue = parseFloat(form.getValue("percentual___" + indexes[i]));                   
               if (isNaN(fieldValue)) {
                   throw "Existem linhas sem percentual informado no rateio de pagamento.";

               }

               total = total + fieldValue;	        
           }
           
           if ((total.toFixed(2) < 100) || total.toFixed(2) > 100) {
               throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
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
          	   if (atividade == "A450101"){
          		   throw "Você não pode usar uma atividade de capacitação para custear uma viagem.";
          	   }
            
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