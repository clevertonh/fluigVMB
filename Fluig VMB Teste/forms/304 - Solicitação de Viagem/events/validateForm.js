function validateForm(form) {
    //NESSE EVENTO NÃO EXISTE A ATIVIDADE ABERTURA == 0, A TAREFA INICIAL É A 4
    //TAREFAS
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
    var COMPRARPASSAGEM = 13;
    var OBTERPASSAGEM = 33
    var REGISTRARCANCELAMENTO = 64;
    var CONFIRMARREEMBOLSO = 79;
    var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var CALCULARDIARIAS = 129;
	
	
	//GATEWAY
	var GATEWAYPASSAGEMCOMPRADA = 143;
	var GATEWAYREMARCACAO = 133;
	var GATEWAYVERIFICARAPROVACAO = 9;
	var GATEWAYFINALIZARSOLICITACAO = 116;

	 //variaveis usadas para validação de linhas repetidas no rateio
 	 var aCentroCusto = new Array();
     var aProjeto	  = new Array();    
     var aAtividade	  = new Array();
     var aCategoria	  = new Array();
     var aFonte	  = new Array();
     var aArea	  = new Array();
     
    //recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
//    log.info("----ATIVIDADE ATUAL WASLEY: " + activity);


    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
	
    //retorna email usuario logado
    var email = retornaEmailUsuario(usuarioLogado);
	
	var statusUsuario = false;
		
	//consulta situação atual do solicitante
	statusUsuario = consultaAfastamento(email);
	
	if (statusUsuario == true ){
		 throw "Atenção! Você está afastado de suas atividades de trabalho, por esse motivo, não poderá realizar nenhuma solicitação em nossos sistemas!";
	}
	
	
    if ((activity == SOLICITARVIAGEM || activity == CORRIGIRSOLICITACAO ) && (nextAtv == GATEWAYREMARCACAO))  {

      	if (form.getValue("solicitante") == "" || form.getValue("solicitante") == null
    			|| form.getValue("emailSolicitante") == "" || form.getValue("emailSolicitante") == null
    			|| form.getValue("dataSolicitacao") == "" || form.getValue("dataSolicitacao") == null
    			
    	) {
            throw "Seus dados de solicitante não foram preenchidos, caso não esteja de férias, atualize a página e inicie novamente a solicitação.";
        }
    	
      	
      	if (form.getValue("tipoviagem") == "" || form.getValue("tipoviagem") == null) {
            throw "Você precisa indicar se a solicitação é uma viagem nacional ou internacional.";
        }
        if (form.getValue("finalidade") == "" || form.getValue("finalidade") == null) {
            throw "Você precisa informar uma finalidade para a solicitação.";
        }
        if (form.getValue("remarcacao") == "sim" && (form.getValue("dataset_solicitacaoviagem") == null || form.getValue("dataset_solicitacaoviagem") == '')) {
            throw "Você necessita informar uma solicitação original para remarcar uma viagem.";
        }
        if (form.getValue("remarcacao") == "sim" && (form.getValue("justificativaremarcacao") == null  || form.getValue("justificativaremarcacao") == '' )) {
            throw "Você necessita informar uma justificativa para a remarcação.";
        }        
      
        if (form.getValue("solicitantepassageiro") == "" || form.getValue("solicitantepassageiro") == null) {
            throw "É necessário indicar se você é o passageiro da viagem.";
        }
        if (form.getValue("passageiroestrangeiro") == "" || form.getValue("passageiroestrangeiro") == null) {
            throw "É necessário indicar se você o passageiro da viagem é estrangeiro ou não.";
        }
        if (form.getValue("nomepassageiro") == "" || form.getValue("nomepassageiro") == null) {
            throw "É necessário indicar o nome do passageiro.";
        }
        /*
        if (form.getValue("nomemae") == "" || form.getValue("nomemae") == null) {
            throw "É necessário indicar o nome da mãe do passageiro.";
        }
        
        */
        if (form.getValue("datanasc") == "" || form.getValue("datanasc") == null) {
            throw "É necessário indicar a data de nascimento do passageiro.";
        }
        
        if (form.getValue("passageiroestrangeiro") == "nao" ){
        	 if (form.getValue("cpfpassageiro") == "" && !form.getValue("cpfpassageiro").match(/^[0-9]{11}/)) {
                 throw "O campo CPF está invalido, verifique se foi informado apenas números";
             }
             if (form.getValue("rgpassageiro") == "" && !form.getValue("rgpassageiro").match(/^[0-9]/)) {
                 throw "O campo RG está invalido, verifique se foi informado apenas números.";
             }
       
             //throw "O campo RG está invalido, verifique se foi informado apenas números.";
        
        }
        
        if (form.getValue("passageirofuncionario") == "nao" &&  form.getValue("passageiroestrangeiro") == "nao" ){
       	 if (form.getValue("cpfpassageiro") == "" && !form.getValue("cpfpassageiro").match(/^[0-9]{11}/)) {
                throw "O campo CPF está invalido, verifique se foi informado apenas números";
            }
            if (form.getValue("rgpassageiro") == "" && !form.getValue("rgpassageiro").match(/^[0-9]/)) {
                throw "O campo RG está invalido, verifique se foi informado apenas números.";
            }
      
            //throw "O campo RG está invalido, verifique se foi informado apenas números.";
       
       }
        
        
        
        if (form.getValue("tipoviagem") == "internacional"){
        	if(form.getValue("passaporte") == "" && form.getValue("solicitanteFuncionario") == "sim"){
        		throw "É obrigatório informar o número do passaporte. Solicite ao setor de P&C que atualize seu cadastro.";
        	}
        	
        	if(form.getValue("passaporte") == "" && form.getValue("solicitanteFuncionario") == "nao"){
        		throw "É obrigatório informar o número do passaporte.";
        	}
        }
        
        
        if (form.getValue("passageirofuncionario") == "" || form.getValue("passageirofuncionario") == null) {
            throw "É necessário indicar se o passageiro é um funcionário ou não.";
        }

        if (form.getValue("emailGestor") == "" || form.getValue("emailGestor") == null) {
        	throw "Houve algum problema e não possível identificar seu aprovador. Tente novamente mais tarde! Se o erro persistir, entre em contato com o setor de Pessaos e Cultura.";	  
        }
        
        

     
        
        
        //valida se foi informado pelo menos um item de serviço
        if ((form.getValue("tipovoo") == false || form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null) && (form.getValue("tipoquarto") == false || form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null)) {
            throw "Você precisa informar pelo menos um item de viagem (voo e/ou hospedagem).";
        } else {
            //valida se foi marcado voo e qual seu tipo e se todos os campos foram preenchidos
            if (form.getValue("tipovoo") == "ida") {
                //VERIFICA TIPO DE VIAGEM
//                if (form.getValue("tipoviagem") == "nacional" && (form.getValue("origem1") == null || form.getValue("origem1") == "" || form.getValue("datapartida1") == "")) {
               	if (form.getValue("tipoviagem") == "nacional" && (form.getValue("origem1") == null || form.getValue("origem1") == "" || form.getValue("datapartida1") == "" || form.getValue("destino1") == "" || form.getValue("destino1") == null)) {
                	throw "Existem campos relacionados ao voo que não foram preenchidos e são obrigatórios.";
                } else if (form.getValue("tipoviagem") == "internacional" && (form.getValue("internacionalOrigem1") == null || form.getValue("internacionalOrigem1") == "" || form.getValue("datapartida1") == "")) {

                }               	
            } else if (form.getValue("tipovoo") == "idavolta") {
                if (form.getValue("tipoviagem") == "nacional" && (form.getValue("datapartida1") == "" || form.getValue("origem1") == "" || form.getValue("origem1") == null || form.getValue("dataretorno1") == "" || form.getValue("destino1") == "" || form.getValue("destino1") == null)) {
                    throw "Existem campos relacionados ao voo que não foram preenchidos e são obrigatórios.";
                } else if (form.getValue("tipoviagem") == "internacional" && (form.getValue("datapartida1") == "" || form.getValue("internacionalOrigem1") == "" || form.getValue("internacionalOrigem1") == null || form.getValue("dataretorno1") == "" || form.getValue("destino1") == "" || form.getValue("internacionalDestino1") == null)) {

                }
            
        		var dataPartida = convertStringToData(form.getValue("datapartida1"));
        		var dataRetorno = convertStringToData(form.getValue("dataretorno1"));

               	//verifica datas
               	if (dataPartida > dataRetorno){
               		throw "Atenção! A data de partida é maior que a data de retorno. Por favor, corriga um dos campos";
               	}
            
            } else if (form.getValue("tipovoo") == "varios") {
                if (form.getValue("tipoviagem") == "nacional" && (form.getValue("datapartida1") == "" || form.getValue("datapartida2") == ""  || form.getValue("origem1") == "" || form.getValue("origem2") == "" || form.getValue("destino1") == "" || form.getValue("destino2") == "" || form.getValue("origem1") == null || form.getValue("destino1") == null || form.getValue("origem2") == null || form.getValue("destino2") == null  )) {
                    throw "Existem campos relacionados ao voo que não foram preenchidos e são obrigatórios.";
                } else if (form.getValue("tipoviagem") == "internacional" && (form.getValue("datapartida1") == "" || form.getValue("datapartida2") == "" || form.getValue("datapartida3") == "" || form.getValue("internacionalOrigem1") == "" || form.getValue("internacionalOrigem2") == "" || form.getValue("internacionalOrigem3") == "" || form.getValue("destinternacionalDestino1ino1") == "" || form.getValue("internacionalDestino2") == "" || form.getValue("internacionalDestino3") == "" || form.getValue("internacionalOrigem1") == null || form.getValue("internacionalOrigem2") == null || form.getValue("internacionalOrigem3") == null || form.getValue("internacionalDestino1") == null || form.getValue("internacionalDestino2") == null || form.getValue("internacionalDestino3") == null)) {

                }
                if (form.getValue("tipoviagem") == "nacional" &&  (form.getValue("origem3") != "" && form.getValue("origem3") != null) && (form.getValue("destino3") == "" || form.getValue("destino3") == null)){
                	 throw "Existem campos relacionados ao 3 trecho do voo que não foram preenchidos corretamemte e são obrigatórios.";
                }
                if (form.getValue("tipoviagem") == "nacional" &&  (form.getValue("origem3") != "" && form.getValue("origem3") != null) && (form.getValue("datapartida3") == "" || form.getValue("datapartida3") == null)){
               	 throw "Existem campos relacionados ao 3 trecho do voo que não foram preenchidos corretamemte e são obrigatórios.";
               }
                var dataPartida1 = convertStringToData(form.getValue("datapartida1"));        		
                var dataPartida2;
                var dataPartida3;
                
                if (form.getValue("datapartida2") != null &&  form.getValue("datapartida2") != ""){
                	dataPartida2 = convertStringToData(form.getValue("datapartida2"));	
                	//verifica datas
                   	if (dataPartida1 > dataPartida2){
                   		throw "Atenção! A data de partida do primeiro voo é maior que a data do segundo voo. Por favor, corriga um dos campos";
                   	}               
                }
                
                	if (form.getValue("datapartida3") != null &&  form.getValue("datapartida3") != ""){
                		dataPartida3 = convertStringToData(form.getValue("datapartida3"));	
                		if (dataPartida1 > dataPartida3){
                			throw "Atenção! A data de partida do primeiro voo é maior que a data do terceiro voo. Por favor, corriga um dos campos";
                		}
                			else if (dataPartida2 > dataPartida3){
                				throw "Atenção! A data de partida do segundo voo é maior que a data do terceiro voo. Por favor, corriga um dos campos";
                			}
                	
                	}
 
            }


            

        }

        
          	//dados de hospedagem
           	if (form.getValue("tipoquarto") != "" && form.getValue("tipoquarto") !== null ){
           		
           		if (form.getValue("datacheckin") == "" || form.getValue("datacheckout") == "" ){
           			throw "A data de check-out da primeira hospedagem não foi informada.";
           		}
           		if (form.getValue("tipovoo") == "varios"){
           			if (form.getValue("datacheckin2") == "" || form.getValue("datacheckin2") == null ){
                   		throw "A data de check-in da segunda hospedagem não foi informada.";
                   	}
           			if (form.getValue("datacheckout2") == "" || form.getValue("datacheckout2") == null ){
                   		throw "A data de check-out da segunda hospedagem não foi informada.";
                   	}
           		}
           		
           		
           		//log.info("-----DATAS CHECK-IN----");
           		//log.info(form.getValue("datacheckin"));
           		//log.info(form.getValue("datacheckout"));
           		
           		var dataCheckin1 = convertStringToData(form.getValue("datacheckin"));
           		var dataCheckout1 = convertStringToData(form.getValue("datacheckout"));
           		var dataCheckin2;
           		var dataCheckout2;
           		var dataCheckin3;
        		var dataCheckout3;

        		
           		if (dataCheckin1 > dataCheckout1){
           			throw "A data de check-in está maior que a data de check-out. Por favor, corrija uma das datas.";
           		}
           		
           		if(form.getValue("datacheckin2") != '' && form.getValue("datacheckin2") !== null ){
           			dataCheckin2 = convertStringToData(form.getValue("datacheckin2"));                		
           			if (dataCheckin1 > dataCheckin2){
           				throw "A data de check-in da primeira hospedagem está maior que a data de check-in da segunda hospedagem. Por favor, corrija uma das datas.";	
           			}
           			
           		}
           		if(form.getValue("datacheckout2") != '' && form.getValue("datacheckout2") !== null ){
           			dataCheckout2 = convertStringToData(form.getValue("datacheckout2"));	
           			if (dataCheckin1 > dataCheckout2){
           				throw "A data de check-in da primeira hospedagem está maior que a data de check-out da segunda hospedagem. Por favor, corrija uma das datas.";
           			}
           			else if (dataCheckin2 > dataCheckout2){
           				throw "A data de check-in da segunda hospedagem está maior que a data de check-out da segunda hospedagem. Por favor, corrija uma das datas.";
           			}
           			else if (dataCheckout1 > dataCheckin2){
           				throw "A data de check-in da segunda hospedagem está menor que a data de check-out da primeira hospedagem. Por favor, corrija uma das datas.";
           			}
           		}
           		if(form.getValue("datacheckin3") != '' && form.getValue("datacheckin3") !== null ){
           			if (form.getValue("datacheckout3") == "" || form.getValue("datacheckout3") == null ){
               			throw "A data de check-out da terceira hospedagem não foi informada.";
               		}
           			
           			dataCheckin3 = convertStringToData(form.getValue("datacheckin3"));	
           			if (dataCheckin1 > dataCheckin3){
           				throw "A data de check-in da primeira hospedagem está maior que a data de check-in da terceira hospedagem. Por favor, corrija uma das datas.";
           			}
           			else if (dataCheckin2 > dataCheckin3){
           				throw "A data de check-in da segunda hospedagem está maior que a data de check-in da terceira hospedagem. Por favor, corrija uma das datas.";
           			}
           			else if (dataCheckout2 > dataCheckin3){
           				throw "A data de check-out da segunda hospedagem está maior que a data de check-in da terceira hospedagem. Por favor, corrija uma das datas.";
           			}
           			
           		}
           		if(form.getValue("datacheckout3") != '' && form.getValue("datacheckout3") !== null ){
           			dataCheckout3 = convertStringToData(form.getValue("datacheckout3"));	
           			if (dataCheckin1 > dataCheckout3){
           				throw "A data de check-in da primeira hospedagem está maior que a data de check-out da terceira hospedagem. Por favor, corrija uma das datas.";
           				
           			}
           			else if (dataCheckin2 > dataCheckout3){
           				throw "A data de check-in da segunda hospedagem está maior que a data de check-out da terceira hospedagem. Por favor, corrija uma das datas.";
           				
           			}
           			else if (dataCheckout2 > dataCheckin3){
           				throw "A data de check-out da segunda hospedagem está maior que a data de check-in da terceira hospedagem. Por favor, corrija uma das datas.";
           				
           			}
           			else if (dataCheckout2 > dataCheckout3){
           				throw "A data de check-out da segunda hospedagem está maior que a data de check-out da terceira hospedagem. Por favor, corrija uma das datas.";
           				
           			}
           		}
           		
        		
           	}

        
        //valida se o campo estou ciente da norma foi marcado
        if (form.getValue("aceitenorma") == "") {
            throw "Você precisa informar que está ciente das normas de viagem.";
        }
      
        if (form.getValue("justificativa") == "" || form.getValue("justificativa") == null) {
            throw "Você precisa informar uma justificativa pelo não cumprimento do prazo minímo para solicitação.";
        }
       
        //VALIDA SE USUARIO INFORMOU OBSERVACAO MAS NAO MARCOU ALGUM DOS TIPOS DE SERVICO
        if ((form.getValue("tipoquarto") == null || form.getValue("tipoquarto") == '' ) && (form.getValue("observacaoHotel") != null && form.getValue("observacaoHotel") != '') ){
          	 throw "Você não pode inserir uma observação sem escolher um tipo de quarto.";
          }
           
          
        if ((form.getValue("tipoquarto") == null || form.getValue("tipoquarto") == '' ) && (form.getValue("datacheckin") != null && form.getValue("datacheckin") != '') ){
        	 throw "Você precisa escolher um tipo de quarto.";
        }
        
         if ((form.getValue("tipovoo") == null || form.getValue("tipovoo") == '' ) && (form.getValue("observacaoVoo") != null && form.getValue("observacaoVoo") != '') ){
             	 throw "Você precisa escolher um tipo de voo.";
           }
         
         validaLinhasPreenchidas();
         validaLinhasRepetidas();
         validaPercentualRateio();
         validaAtividades();
         
    } else if (activity == APROVACAO && nextAtv ==GATEWAYVERIFICARAPROVACAO) {
        	
        		//valida se o aprovador marcou o campo de aprovacao ou reprovação
            if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
                throw "Você precisa indicar se a solicitação será aprovada, reprovada ou devolvida para correção.";
            }

            if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
                throw "Você precisa informar o motivo para reprovação da solicitação.";
            }
      	        
            if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
          	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
            }     

            if (form.getValue("cpfpassageiro") == retornaCPFAprovador()){
            	 throw "Você não pode aprovar uma solicitação onde você é o passageiro.";
            }
            
            
            validaLinhasPreenchidas();
            validaLinhasRepetidas();
            validaPercentualRateio();
            validaAtividades();
    }

    else if (activity == COMPRARPASSAGEM && nextAtv == GATEWAYPASSAGEMCOMPRADA ) {  	
//    else if (activity == COMPRARPASSAGEM) {    	
    	
    	log.info("PROXIMA ATIVIDADE");
    	log.info(nextAtv);
    	
        //valida se existe pedido de voo o campo valor da compra deve ser informado
        if ((form.getValue("vooComprado") != "" &&  form.getValue("vooComprado") != null ) || form.getValue("vooComprado") =='sim'){
        	/*
        	
        	if (form.getValue("valorVoo") == '' || form.getValue("valorVoo") == null || form.getValue("valorVoo") <= 0 ){
        		throw "Você precisa informar o valor total da viagem aerea.";	
        	}
        	*/
        	if (form.getValue("tipovoo") == "" || form.getValue("tipovoo") == null){
        		throw "Você não pode informar que comprou uma passagem aerea se o solicitante não pediu.";	
	    		}        	
        }
        
        
        //valida se existe pedido de voo o campo valor da compra deve ser informado
        if ((form.getValue("hotelComprado") != "" &&  form.getValue("hotelComprado") != null ) || form.getValue("hotelComprado") =='sim'){
        	if (form.getValue("tipoquarto") == "" || form.getValue("tipoquarto") == null){
        		throw "Você não pode informar que comprou uma hospedagem se o solicitante não pediu.";	
	    		}
        	
        }  
        
        //valida se serviço de viagem foi informado
        validaProdutos();
       
    }
    else if (activity == OBTERPASSAGEM) {
        //valida se o campo de cancelamento foi marcado
        if (form.getValue("cancelarpassagem") == "sim" && (form.getValue("justificativacancelamento") == null || form.getValue("justificativacancelamento") == "")) {
            throw "Você deve informar uma justificativa para solicitar o cancelamento.";
        }
        
        if (form.getValue("cancelarpassagem") == "" || form.getValue("cancelarpassagem") == null ){
            //data do dia
            var dataAtual = new Date();

         	//formato da data: October 22, 2018 10:54:38 PM BRST
            //falta retornar a real data final da viagem pois essa esta acrescida do prazo de 2 dias
        	var dataFinalViagem = form.getValue("prazoCancelamento");
        	var dataFinalConvertida = convertStringToData(dataFinalViagem);

        	if (dataAtual < dataFinalConvertida){
        		throw "Você não pode finalizar uma viagem que ainda não foi realizada por completo.";
        	}
        	
        }
        
        

    }
    else if (activity == CALCULARDIARIAS && nextAtv == GATEWAYFINALIZARSOLICITACAO){
    	if (form.getValue("recebediarias") == "sim") {
    		if (form.getValue("vl_diarias") == "" || form.getValue("vl_diarias") === null || parseFloat(form.getValue("vl_diarias")) < 0){
    			throw "Você deve informar o valor total das diarias.";	
    		}
            
        }
    }
    else if (activity == CONFIRMARREEMBOLSO) {
        if (form.getValue("datareembolso") == "") {
            throw "Você deve informar a data do reembolso.";
        }

    }


    else if (activity == REGISTRARCANCELAMENTO ){
    	 if (form.getValue("ressarcimento") == "" || form.getValue("ressarcimento") == null) {
             throw "Você deve informar se a passagem será reembolsada ou ficará como crédito.";
         }
    }
    
    else if (activity == COTARREMARCACAO){
    	
   		if (form.getValue("tipovoo") != "" && form.getValue("tipovoo") != null){
   			if (form.getValue("cotacaoVoo") == '' || form.getValue("cotacaoVoo") == null || form.getValue("cotacaoVoo") <= 0 ){
   	    		throw "Você precisa informar o valor da cotação da passagem.";	
   	    	}
   		}

	   		if (form.getValue("tipoquarto") != "" && form.getValue("tipoquarto") != null){
	   			
	   	       	if (form.getValue("cotacaoHotel") == '' || form.getValue("cotacaoHotel") == null || form.getValue("cotacaoHotel") <= 0 ){
	   	    		throw "Você precisa informar o valor da cotação das diárias.";	
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
     
     
   //VALIDA SE FOI INFORMADO ATIVIDADE ESTRUTURAL OU FOLHA E PROIBE USO
     function validaAtividades(){
    	   var indexes = form.getChildrenIndexes("tableItens");            
    	   
           for (var i = 0; i < indexes.length; i++) {
        	   var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
               var atividade = form.getValue("txtatividade___" + indexes[i]);
            
         if (ccusto == "99990") {             
                   if (atividade == "P952101" || atividade == "P953101" || atividade == "P650101") {
                       throw "Você não pode usar uma atividade do tipo CAM ou de GN para custear uma viagem.";

                   }
               } 
               else {                	
            	   if (atividade == "E010101" || atividade == "E020201") {
                	   throw "Você não pode usar uma atividade de folha ou estutural para custear uma viagem.";

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
                  var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
                  if (isNaN(fieldValue)) {
                      throw "Existem linhas sem percentual informado no rateio de pagamento.";

                  }

                  total = total + fieldValue;	        
              }
              if ((total < 100) || total > 100) {
                  throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
              }
          
      }
   
      //VALIDA SE FOI INFORMADO PELO MENOS 1 SERVIÇO E SE TODOS OS CAMPOS FORAM PREENCHIDOS
      function validaProdutos(){
     	   var indexes = form.getChildrenIndexes("tableViagem");            
     	   
     	  if (form.getValue("vooComprado") =="sim" || form.getValue("hotelComprado") =="sim" ){
     		  if (indexes.length == 0 ){
     			 throw "É obrigatório informar pelo menos um item de serviço!";
     		  }
     		  else {
     	         for (var i = 0; i < indexes.length; i++) {
                     var produto = form.getValue("txtservico___" + indexes[i]);
                     var valor = form.getValue("valores___" + indexes[i]);
                     var dataViagem = form.getValue("dtViagem___" + indexes[i]);               
              
                     if (produto == "" || produto === null){
                     	throw "O serviço comprado não foi informado";
                     }
                     else if (valor == "" || valor === null){
                     	throw "O valor do serviço não foi informado";
                     }
                     else if (dataViagem == "" || dataViagem === null){
                     	throw "A data do serviço não foi informado";
                     }
                     
                 } 
     		  }
     		 
     	  }
     	  
     	   
   
      
            
      }
      



    function validaDatas(){
    	//retorna todos os ID de campos com informação de datas    	
      	var datasHospedagem = ["datacheckin","datacheckout","datacheckin2","datacheckout2","datacheckin3","datacheckout3"];    	
    	    	
          
    }

    
    function retornaCPFAprovador(){
        var email = retornaEmailUsuario(usuarioLogado);

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
		 
		 log.info("usuario afastado");
		 log.dir(dataset);
		 
		 if (dataset.length >0 ) {
			 log.info("Usuario afastado");
			 return true;
	        	
	        }  
	        else {
	        	log.info("Usuario não afastado");
	        	return false;
	        }	 
   }

    
}

//recebe data do Fluig e convert para data normal
function convertStringToData(StringToData) {
    //variavel para armazenar a data limite para aprovação   
    var data = StringToData.split('/');

    return new Date(data[1] + "/" + data[0] + "/" + data[2]);
}    

