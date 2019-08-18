function validateForm(form){

	var ABERTURA = 4;
	var APROVACAO = 5;
	var CALCULAR_DIARIAS = 16;
	var REALIZAR_PGTO = 21;
	var AVALIAR_PGTO = 28;
	var CORRIGIR = 41;
	var GERAR_TARIFA = 46;

	

	var activity = getValue('WKNumState');

	
	var aCentroCusto = new Array();
    var aProjeto	  = new Array();    
    var aAtividade	  = new Array();
    var aCategoria	  = new Array();
    var aFonte	  = new Array();
    var aArea	  = new Array();
    
    
    
    validaLinhasPreenchidas();
    validaLinhasRepetidas();
    validaPercentualRateio();
    validaCamposAgenda();
	 

     
     if(activity == ABERTURA  || activity == CORRIGIR){

    	 if (form.getValue("beneficiario") == null || form.getValue("beneficiario") == "" ) {
             throw "O nome do beneficiário que irá receber as diárias não foi selecionado.";

         }
    	 
    	 if (form.getValue("cpfbeneficiario") == null || form.getValue("cpfbeneficiario") == "" ) {
             throw "O campo CPF não foi preenchido. Por favor, entre em contato com o setor de Sistemas através de chamado.";

         }
    	 
      	 
    	 
     }
     else  if (activity == APROVACAO){
		  if (form.getValue("aprovacao") == null || form.getValue("aprovacao") == "" ) {
	             throw "Você precisa indicar se deseja aprovar ou reprovar a solicitação.";

	         }
	  }
     
     
     
     else if(activity == CALCULAR_DIARIAS  ){
    	  	if (form.getValue("recebediarias") == null || form.getValue("recebediarias") == "" ) {
	             throw "Você precisa indicar se o beneficiário tem direito de receber diarias ou não.";

	         }
    	  
    	 	if (form.getValue("recebediarias") =="sim"){
    	 		 var valorTotal = parseFloat(form.getValue("vl_diarias"));
    	    	 
    	    	  if (isNaN(valorTotal)) {
    	              throw "O campo valor total das diárias não foi calculado automaticamente. Por favor, entre em contato com o setor de Sistemas através de chamado.";

    	          }
    	    	  
    	    	  if (form.getValue("dtVencimento") == null || form.getValue("dtVencimento") == "" ) {
    		             throw "Você precisa indicar a data de vencimento do registro.";

    		      }
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
                     	
                     		for (var a=0; a < aCentroCusto.length ; a++){
                     				if (aCentroCusto[a] == ccusto && aProjeto[a] == projeto && aArea[a] == area && aCategoria[a] == categoria && aFonte[a] == fonte && aAtividade[a] == atividade  ) {
                     					 throw "Existem linhas do rateio repetidas.";
                     				}
                 				
                     		}
                     		
                     		
 							aCentroCusto.push(ccusto);	
                     		aProjeto.push(projeto);	
                     		aCategoria.push(categoria);
                     		aFonte.push(fonte);
                     		aAtividade.push(atividade);
                     		aArea.push(area);
                     		
                  }
                  else {
                    		
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
                     throw "A linha " + indexes[i] + " está sem percentual informado no rateio de pagamento.";

                 }

                 total = total + fieldValue;	        
             }
             
             //if ((total < 100) || total > 100) {
             if ((total.toFixed(2) < 100) || total.toFixed(2) > 100) {
                 throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
             }
         
     }
     
     
	 //VALIDA SE TODAS AS LINHAS DA AGENDA FORAM PREENCHIDAS
     function validaCamposAgenda(){
    	   var indexes = form.getChildrenIndexes("tbAgendaViagem");            
    	   
    	   if (indexes.length == 0 ){
   			 throw "É obrigatório informar pelo menos um item na agenda!";
   		  }
    	   else {
               for (var i = 0; i < indexes.length; i++) {            
                   var dtAtividade = form.getValue("dtAtividade___" + indexes[i]);           
                   var tempoestimado = form.getValue("tempoestimado___" + indexes[i]);
                   var temporefeicao = form.getValue("temporefeicao___" + indexes[i]);
                   var acao = form.getValue("acao___" + indexes[i]);
                   var itemFinalidade = form.getValue("itemFinalidade___" + indexes[i]);
                   var localAcao = form.getValue("localAcao___" + indexes[i]);
                   var custo = parseFloat(form.getValue("custo___" + indexes[i]));                          
                
                  if (dtAtividade =="" || dtAtividade === null){
                	  throw "A data da atividade não foi preenchida";
                  }
                  if (tempoestimado =="" || tempoestimado === null){
                	  throw "O tempo estimado para atividade não foi preenchido";
                  }
                  if (temporefeicao =="" || temporefeicao === null){
                	  throw "O tempo de intervalo para refeição não foi preenchido";
                  }
                  if (itemFinalidade =="" || itemFinalidade === null){
                	  throw "A finalidade da atividade não foi preenchida";
                  }
                  if (localAcao =="" || localAcao === null){
                	  throw "O local da atividade não foi preenchido";
                  }
                  if (acao =="" || acao === null){
                	  throw "A atividade não foi preenchida";
                  }                     
                  if (isNaN(custo)) {
                      throw "A linha " + indexes[i] + " está sem o valor informado na agenda de trabalho.";

                  }
               }
    	   }
        
           
          
           
     }

	
}