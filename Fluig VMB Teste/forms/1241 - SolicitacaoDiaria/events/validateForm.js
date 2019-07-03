function validateForm(form){

	var ABERTURA = 4;
	var APROVACAO = 5;
	

	var activity = getValue('WKNumState');
	log.info("----ATIVIDADE validateForm: " + activity);
	
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    
    
    
	if(activity == ABERTURA){

		 validaLinhasPreenchidas();
	     validaLinhasRepetidas();
	     validaPercentualRateio();
	       
	}
	else if (activity == APROVACAO){

		 validaLinhasPreenchidas();
	     validaLinhasRepetidas();
	     validaPercentualRateio();
	       
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
                     		log.info("Segunda linha do rateio de projeto");
                     		for (var a=0; a < aCentroCusto.length ; a++){
                     				if (aCentroCusto[a] == ccusto && aProjeto[a] == projeto && aArea[a] == area && aCategoria[a] == categoria && aFonte[a] == fonte && aAtividade[a] == atividade  ) {
                     					 throw "Existem linhas do rateio repetidas.";
                     				}
                 				
                     		}
                     		
                     		log.info("Adiciona os dados do projeto atual no array");
 							aCentroCusto.push(ccusto);	
                     		aProjeto.push(projeto);	
                     		aCategoria.push(categoria);
                     		aFonte.push(fonte);
                     		aAtividade.push(atividade);
                     		aArea.push(area);
                     		
                  }
                  else {
                    		log.info("Adiciona a primeira linha de dados do projeto ao array");
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
	
}