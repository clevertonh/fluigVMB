function validateForm(form) {
    //NESSE EVENTO A ATIVIDADE INICIAL É 4 E NÃO 0
    var ABERTURA = 4;
	var APROVACAO = 97;
    var VERIFICARAPROVACAO = 9;
    var COMPRARPASSAGEM = 13;
    var OBTERPASSAGEM = 33
    var REGISTRARCANCELAMENTO = 64;
    var CONFIRMARREEMBOLSO = 79;
    var FINALIZARCOMPRA = 77;
	var CORRIGIRSOLICITACAO = 98;

    //recupera atividade do processo
    var activity = getValue('WKNumState');
	var nextAtv  = getValue("WKNextState");
//    log.info("----ATIVIDADE ATUAL WASLEY: " + activity);


    //recupera usuario logado
    var usuarioLogado = getValue('WKUser');
      
    if (activity == ABERTURA || activity == CORRIGIRSOLICITACAO) {

      	if (form.getValue("solicitante") == "" || form.getValue("solicitante") == null
    			|| form.getValue("emailSolicitante") == "" || form.getValue("emailSolicitante") == null
    			|| form.getValue("dataSolicitacao") == "" || form.getValue("dataSolicitacao") == null
    			
    	) {
            throw "Seus dados de solicitante não foram carregados, caso não esteja de férias, atualize a página e inicie novamente a solicitação.";
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
        if (form.getValue("tipoPagamento") == "" || form.getValue("tipoPagamento") == null) {
            throw "Você precisa indicar se o tipo de pagamento é normal ou rateio.";
        }
        if (form.getValue("solicitantepassageiro") == "" || form.getValue("solicitantepassageiro") == null) {
            throw "É necessário indicar se você é o passageiro da viagem.";
        }
        if (form.getValue("nomepassageiro") == "" || form.getValue("nomepassageiro") == null) {
            throw "É necessário indicar o nome do passageiro.";
        }
        if (form.getValue("nomemae") == "" || form.getValue("nomemae") == null) {
            throw "É necessário indicar o nome da mãe do passageiro.";
        }
        if (form.getValue("datanasc") == "" || form.getValue("datanasc") == null) {
            throw "É necessário indicar a data de nascimento do passageiro.";
        }
        if (!form.getValue("cpfpassageiro").match(/^[0-9]{11}/)) {
            throw "O campo CPF está invalido, verifique se foi informado apenas números";
        }
        if (!form.getValue("rgpassageiro").match(/^[0-9]/)) {
            throw "O campo RG está invalido, verifique se foi informado apenas números.";
        }
        if (form.getValue("passageirofuncionario") == "" || form.getValue("passageirofuncionario") == null) {
            throw "É necessário indicar se o passageiro é um funcionário ou não.";
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
            }


            if (form.getValue("tipoquarto") != "" && (form.getValue("datacheckin") == "" || form.getValue("datacheckout") == "" )) {
                throw "Existem campos relacionados a hospedagem que não foram preenchidos e são obrigatórios.";
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
         
    } else if (activity == APROVACAO && nextAtv == VERIFICARAPROVACAO) {
        	
    		//valida se o aprovador marcou o campo de aprovacao ou reprovação
            if (form.getValue("aprovacao") == false || form.getValue("aprovacao") == "") {
                throw "Você precisa indicar se a solicitação será aprovada ou reprovada.";
            }

            /*
            if (form.getValue("aprovador") == "" || form.getValue("aprovador") == null) {
                throw "Seus dados de aprovador não foram carregados, por favor, atualize a página e tente novamente!";
            }
            */
            if (form.getValue("aprovacao") == "reprovado" && form.getValue("justificativaReprovacao")  == "" ) {
                throw "Você precisa informar o motivo para reprovação da solicitação.";
            }
            
            /*          
            if (form.getValue("cpfpassageiro") == form.getValue("cpfaprovador") && form.getValue("aprovacao")  == "aprovado" ){
           	 throw "Você não pode aprovar uma solicitação onde você é o passageiro.";
           }
           */       	        
            if (form.getValue("matriculasolicitante") == usuarioLogado  && form.getValue("aprovacao")  == "aprovado" ){
          	 throw "Você não pode aprovar uma solicitação onde você é o solicitante.";
           }     

    }
   /*
    else if (activity == APROVACAO && nextAtv == ABERTURA){
    	//valida se o aprovador marcou o campo de aprovacao ou reprovação
        if (form.getValue("aprovacao") != false && form.getValue("aprovacao") != "") {
            throw "Para retornar a solicitação o campo de aprovar ou reprovar não pode ser marcado. Atualize a página e tente novamente!";
        }
    }
   */
    else if (activity == COMPRARPASSAGEM && nextAtv == OBTERPASSAGEM ) {  	
     /* com a possibilidade  de enviar para o solicitante cancelar, nao faz mais sentido validar obrigação dos campos
    	//valida se o campo de cancelamento foi marcado
        if ((form.getValue("vooComprado") == "" || form.getValue("vooComprado") == null) && (form.getValue("hotelComprado") == "" || form.getValue("hotelComprado") == null)) {        	
        	if (form.getValue("solicitoucancelamento") == "" || form.getValue("solicitoucancelamento") == null){
        		throw "Você precisa informar que o viajante solicitou o cancelamento.";
        	}
        	else {
        		throw "Você precisa informar se um ou mais serviços de hospitalidade foram realizados.";	
        	}            
        }
       
   */
        //valida se existe pedido de voo o campo valor da compra deve ser informado
        if ((form.getValue("vooComprado") != "" &&  form.getValue("vooComprado") != null ) || form.getValue("vooComprado") =='sim'){
        	if (form.getValue("valorVoo") == '' || form.getValue("valorVoo") == null || form.getValue("valorVoo") <= 0 ){
        		throw "Você precisa informar o valor total da passagem aerea.";	
        	}
        	
        }
        
       
        
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
    else if (activity == CONFIRMARREEMBOLSO && nextAtv == FINALIZARCOMPRA) {
        if (form.getValue("datareembolso") == "") {
            throw "Você deve informar a data do reembolso.";
        }

    }


    else if (activity == REGISTRARCANCELAMENTO ){
    	 if (form.getValue("ressarcimento") == "" || form.getValue("ressarcimento") == null) {
             throw "Você deve informar se a passagem será reembolsada ou ficará como crédito.";
         }
    }

    if (activity == ABERTURA || activity == APROVACAO || activity == COMPRARPASSAGEM || activity ==  CORRIGIRSOLICITACAO) {
        //VALIDA SE AS LINHAS FORAM PREENCHIDAS CORRETAMENTE
        if (form.getValue("tipoPagamento") == "normal") {
            var indexes = form.getChildrenIndexes("tableItens");
            var linhasRateio = [];

            for (var i = 0; i < indexes.length; i++) {
                var ccusto = form.getValue("txtcentrocusto___" + indexes[i]);
                var projeto = form.getValue("txtprojeto___" + indexes[i]);
                var area = form.getValue("txtareaestrategica___" + indexes[i]);
                var categoria = form.getValue("txtcategoria___" + indexes[i]);
                var fonte = form.getValue("txtfontefinanciamento___" + indexes[i]);
                var atividade = form.getValue("txtatividade___" + indexes[i]);

                //linhas em caso de projeto
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
        //se pagamento não é normal então é rateio
        else {
            if (form.getValue("tipoPagamento") == "rateio") {
                if (form.getValue("rateioconfigurado") == null || form.getValue("rateioconfigurado") == "" || form.getValue("codigorateio") == null || form.getValue("codigorateio") == "") {
                    throw "É necessário informar o código do rateio.";
                }
            }
        }


        //VALIDA PERCENTUAL TOTAL DO ORÇAMENTO
        if (form.getValue("tipoPagamento") == "normal") {
            var indexes = form.getChildrenIndexes("tableItens");
            var total = 0;

            for (var i = 0; i < indexes.length; i++) {
                var fieldValue = parseInt(form.getValue("percentual___" + indexes[i]));
                if (isNaN(fieldValue)) {
                    //    fieldValue = 0;
                    throw "Existem linhas sem percentual informado no rateio de pagamento.";

                }

                total = total + fieldValue;
//                log.info(total);

                //console.log(total); 	        
            }
//            log.info(total);
            if ((total < 100) || total > 100) {
                throw "Percentual Total do rateio não pode ser inferior ou superior a 100";
            }
        }       
    }

  //recebe data do Fluig e convert para data normal
    function convertStringToData(StringToData) {
        //variavel para armazenar a data limite para aprovação   
        var data = StringToData.split('/');

        return new Date(data[1] + "/" + data[0] + "/" + data[2]);
    }

    
    
}