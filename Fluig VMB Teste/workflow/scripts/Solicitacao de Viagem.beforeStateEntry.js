function beforeStateEntry(sequenceId){	
	//REST PADRÃO TOTVS USUÁRIO
	//http://pessoasecultura.intranetvm.org.br:8082/REST/USERS
	
	var ABERTURA = 0;
	var SOLICITARVIAGEM = 4;
	var APROVACAO = 97;
	var COMPRARPASSAGEM = 13;
	var OBTERPASSAGEM = 33
	var REGISTRARCANCELAMENTO = 64;
	var CONFIRMARREEMBOLSO = 79;
	var CORRIGIRSOLICITACAO = 98;
	var COTARREMARCACAO = 135;
	var PAGARDIARIAS = 129;
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");	
	var codSolicitacao = getValue("WKNumProces");
	var nextAtv  = getValue("WKNextState");
	var idFormulario;
	
	var vooComprado = hAPI.getCardValue("vooComprado");
	var hotelComprado = hAPI.getCardValue("hotelComprado");

	var tipoPagamento = hAPI.getCardValue("tipoPagamento");				
	var codRateio = hAPI.getCardValue("codigorateio");
	//var codSolicitacao = hAPI.getCardValue("solicitacao");				
	var tipoViagem = hAPI.getCardValue("tipoviagem");				
	var solicitacao;
	var integraProtheus = false;
	var tipoHospedagem1 = hAPI.getCardValue("tipo_hosp1");
	var tipoHospedagem2 = hAPI.getCardValue("tipo_hosp2");
	var tipoHospedagem3 = hAPI.getCardValue("tipo_hosp3");
	
	/*
	 * verifica se foi adicionado anexo. 
	 * Pois quando tem anexo é obrigatório marcar algo como comprado
	 * */
	
	//falta identificar em que fase foi anexado o documento
	 var anexos   = hAPI.listAttachments();
     var temAnexo = false;
	
	
     	if (ativAtual == 13 && ( vooComprado == '' && hotelComprado == '') || ( vooComprado == null && hotelComprado == null) ){
     	     if (anexos.size() > 0) {
     	          temAnexo = true;
     	      }

     	      if (temAnexo) {
     	          throw "Você anexou um bilhete e/ou voucher então é necessário indicar qual serviço foi comprado!";
     	      }

     	}
     
	   if (ativAtual == 13 && ( vooComprado == 'sim' || hotelComprado == 'sim' ) ) {
		   
				
	
				if (anexos.size() > 0) {
		            temAnexo = true;
		        }

		        if (!temAnexo) {
		            throw "É preciso anexar o documento para continuar o processo!";
		        }
		        
		  			
				    //Cria a constraint para buscar os formulários ativos
				    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);	
					var cst3 = DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST);
					var cst5 = DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST);
					
				    var constraints = new Array(cst,cst3,cst5);
				     //dataset interno: formularios preenchidos
				    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
				    
				    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
				        var documentId = datasetPrincipal.getValue(i, "metadata#id");
				        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
				        var solicitacaoId = datasetPrincipal.getValue(i, "solicitacao");
				        
				        idFormulario = documentId;
				        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
				        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
				        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
				        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
				        var constraintsFilhos = new Array(c1, c2, c3);
				 
				        //Busca o dataset
				        var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
					
				        solicitacao = datasetFilhos;
				        
				    }
					//objeto serviço
					var aItemServico = new Array();
					//array referente ao Rateio
					var aRateio = new Array();
					var voo = hAPI.getCardValue("tipovoo");
					var hospedagem = hAPI.getCardValue("tipoquarto");
					var codProdutoH;
					var codProdutoP;
					var codSeguro = "DVVIG002";
					var valor;	
					

					if (tipoViagem == "nacional"){
						//código de produto hotel e passagem nacional
						codProdutoH = "DVHOS001";
						codProdutoP = "DVPSG001";
					}
					//código de produto hotel e passagem internacional
					else {
						codProdutoH = "DVHOS002";
						codProdutoP = "DVPSG002";
					}
	
					if (vooComprado != null && vooComprado != "" ){		
						 valor = hAPI.getCardValue("valorVoo");						 	
							
						 //chama função para adicionar item ao array
							addItemViagem(codProdutoP,codSolicitacao,tipoViagem,idFormulario,valor);							
							
							//voos internacional possuem seguro viagem
							if (tipoViagem == "internacional"){
								addItemViagem(codSeguro,codSolicitacao,tipoViagem,idFormulario,valor);		
							}	
							
							integraProtheus = true;
					}
					
					
					if (hotelComprado != null && hotelComprado != ""  ){					
						valor = hAPI.getCardValue("valorHotel");
							//local 1 sempre é preenchido na situação de ter 1 periodo de hotel
							if (tipoHospedagem1 != "GUESTHOUSE" && tipoHospedagem1 != "BALCAO"){
								addItemViagem(codProdutoH,codSolicitacao,tipoViagem,idFormulario,valor);
								
								integraProtheus = true;
							}
							
							//verificar se a solicitação tem varios trechos
							if (voo =="varios"){
								//verifica se local 2 foi preenchido											
								if (tipoHospedagem2 != "GUESTHOUSE" && tipoHospedagem2 != "BALCAO" ){
									addItemViagem(codProdutoH,codSolicitacao,tipoViagem,idFormulario,valor);
									
									integraProtheus = true;
								}									
								//verifica se local 3 foi preenchido
								if (tipoHospedagem3 != "GUESTHOUSE" && tipoHospedagem3 != "BALCAO"){
									addItemViagem(codProdutoH,codSolicitacao,tipoViagem,idFormulario,valor);
									
									integraProtheus = true;
								}																										
							}	
							
					
							
					}
					
					if (integraProtheus == true){
						//verifica se informação do pagamento é normal
					    if ( tipoPagamento == "normal" ){		    		
					    		//verifica quantidade de linhas do rateio manual: Falta implementar consulta da dataset para retornar quantidade e itens		    		
					    		if ( solicitacao.rowsCount == 1){
					    			for (var i=0; i < aItemServico.length ; i++){
					    				var obj = aItemServico[i];		    				 
				    					obj.ccusto =  '' + solicitacao.getValue(0, "txtcentrocusto") +'';			
				    					
				    					if (solicitacao.getValue(0, "txtprojeto") != null){
				    						obj.projeto = '' + solicitacao.getValue(0, "txtprojeto") +'';	
				    					}
				    					obj.atividade = '' + solicitacao.getValue(0, "txtatividade") +'';
				    					
				    					if (solicitacao.getValue(0, "txtcategoria") != null){
				    						obj.categoria = '' + solicitacao.getValue(0, "txtcategoria") +'';
				    					}
				    					if (solicitacao.getValue(0, "txtfontefinanciamento") != null){
				    						obj.fonte = '' + solicitacao.getValue(0, "txtfontefinanciamento") +'';
				    					}
				    					if (solicitacao.getValue(0, "txtareaestrategica")  != null){
				    						obj.area = '' + solicitacao.getValue(0, "txtareaestrategica") +'';
				    					}	    					
				    					if (solicitacao.getValue(0, "alocacao") != null){
				    						obj.alocacao = '' + solicitacao.getValue(0, "alocacao") +'';	
				    					}
				    					if (solicitacao.getValue(0, "contacontabil") != null){
				    						obj.conta = '' + solicitacao.getValue(0, "contacontabil") +'';	
				    					}	    					
				    					if (solicitacao.getValue(0, "localizacao") != null){
				    						obj.localizacao = '' + solicitacao.getValue(0, "localizacao") +'';	
				    					}
				    					aItemServico[i] = obj;	
					    			}
					    				
					    		}
					    		//possui rateio por centro de custo
					    		else if ( solicitacao.rowsCount > 1){		    					    					    			
					    			//só criar um array de objeto com os dados de pagamento e enviar para a propriedade rateio		    			
					    			for (var i=0; i < solicitacao.rowsCount ; i++){
					    				var obj = {
					    						ccusto : '' ,
					    						projeto :'' ,
					    						atividade :'' ,
					    						categoria :'' ,
					    						fonte :'' ,
					    						area :'' ,
					    						alocacao :'' ,
					    						conta : '' ,
					    						localizacao :''
					    						
					    				};		    				 
					    				obj.ccusto =  '' + solicitacao.getValue(i, "txtcentrocusto") +'';				    					
				    					if (solicitacao.getValue(i, "txtprojeto") != null){
				    						obj.projeto = '' + solicitacao.getValue(i, "txtprojeto") +'';	
				    					}
				    					obj.atividade = '' + solicitacao.getValue(i, "txtatividade") +'';		    					
				    					if (solicitacao.getValue(i, "txtcategoria") != null){
				    						obj.categoria = '' + solicitacao.getValue(i, "txtcategoria") +'';
				    					}		    					
				    					if (solicitacao.getValue(i, "txtfontefinanciamento") != null){
				    						obj.fonte = '' + solicitacao.getValue(i, "txtfontefinanciamento") +'';
				    					}	    					
				    					if (solicitacao.getValue(i, "txtareaestrategica")  != null){
				    						obj.area = '' + solicitacao.getValue(i, "txtareaestrategica") +'';
				    					}
				    					if (solicitacao.getValue(i, "alocacao") != null){
				    						obj.alocacao = '' + solicitacao.getValue(i, "alocacao") +'';	
				    					}
				    					if (solicitacao.getValue(i, "contacontabil") != null){
				    						obj.conta = '' + solicitacao.getValue(i, "contacontabil") +'';	
				    					}
				    					if (solicitacao.getValue(i, "localizacao") != null){
				    						obj.localizacao = '' + solicitacao.getValue(i, "localizacao") +'';	
				    					}	    					
				    					obj.percentual = 1 * parseInt(solicitacao.getValue(i, "percentual")) ;
				    					
				    					aRateio[i] = obj;	
				    					//log.info(aRateio);
					    			}		    			
					    		}
					  }
					    
					    
						
						//throw "Integrado com o Protheus"			
						 try{
						        var clientService = fluigAPI.getAuthorizeClientService();
						        var data = {
						            companyId : getValue("WKCompany") + '',
						            serviceCode : 'REST FLUIG',
						            endpoint : '/F_MATA110',
						            method : 'POST',// 'delete', 'patch', 'put', 'get'     
						            timeoutService: '100', // segundos
						            params : {
						            	processo : '' + 1 + '' ,
						            	solicitacao : '' + codSolicitacao + '' ,
						            	solicitante : '' + hAPI.getCardValue("solicitante") +'',
						                datasolicitacao :'' + hAPI.getCardValue("dataSolicitacao") +'',	
						                passageiro : '' + hAPI.getCardValue("nomepassageiro") +'',
						                itens: aItemServico ,
						        		rateioDigitado: aRateio ,
						        		rateioConfigurado:'' +  codRateio +''
						            },
						          options : {
						             encoding : 'UTF-8',
						             mediaType: 'application/json'
						          }
						        }
						              
						        //log.info(aRateio);
						        
						        var vo = clientService.invoke(JSON.stringify(data));
						        
						        if(vo.getResult()== null || vo.getResult().isEmpty()){
						            throw "Retorno está vazio";
						        }
						        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
						        	throw JSON.parse(vo.getResult()).errorMessage;
						        }
						        else {
						            log.info(vo.getResult());
						        }
						    } 
							catch(err) {
						        throw err;
						    }					    
					    
					    
					    
					}
				 	   
			   
		   }
	   	//INTEGRAÇÃO COM ROTINA DO CONTAS A PAGAR FINA050
		   else if ( ativAtual == PAGARDIARIAS && hAPI.getCardValue("recebediarias") == "sim") {
			    
			   var aRateio = new Array();
			   var aItem = new Array();
			   var valorDiarias = hAPI.getCardValue("vl_diarias");
		   		solicitacao = itensPagamento();
				
		   		if ( solicitacao.rowsCount == 1){
	    				var obj = new Array();	    				 
    					obj.ccusto =  '' + solicitacao.getValue(0, "txtcentrocusto") +'';			
    					
    					if (solicitacao.getValue(0, "txtprojeto") != null){
    						obj.projeto = '' + solicitacao.getValue(0, "txtprojeto") +'';	
    					}
    					obj.atividade = '' + solicitacao.getValue(0, "txtatividade") +'';
    					
    					if (solicitacao.getValue(0, "txtcategoria") != null){
    						obj.categoria = '' + solicitacao.getValue(0, "txtcategoria") +'';
    					}
    					if (solicitacao.getValue(0, "txtfontefinanciamento") != null){
    						obj.fonte = '' + solicitacao.getValue(0, "txtfontefinanciamento") +'';
    					}
    					if (solicitacao.getValue(0, "txtareaestrategica")  != null){
    						obj.area = '' + solicitacao.getValue(0, "txtareaestrategica") +'';
    					}	    					
    					if (solicitacao.getValue(0, "alocacao") != null){
    						obj.alocacao = '' + solicitacao.getValue(0, "alocacao") +'';	
    					}
    					if (solicitacao.getValue(0, "contacontabil") != null){
    						obj.conta = '' + solicitacao.getValue(0, "contacontabil") +'';	
    					}	    					
    					if (solicitacao.getValue(0, "localizacao") != null){
    						obj.localizacao = '' + solicitacao.getValue(0, "localizacao") +'';	
    					}
    					aItem[i] = obj;	
	    			
	    				
	    		}
				
				
				
				
				//throw "Integrado com o Protheus"			
				 try{
				        var clientService = fluigAPI.getAuthorizeClientService();
				        var data = {
				            companyId : getValue("WKCompany") + '',
				            serviceCode : 'REST FLUIG',
				            endpoint : '/F_FINA050',
				            method : 'POST',// 'delete', 'patch', 'put', 'get'     
				            timeoutService: '100', // segundos
				            params : {
				            	processo : '' + 1 + '' ,
				            	solicitacao : '' + codSolicitacao + '' ,
				                solicitante : '' + hAPI.getCardValue("solicitante") +'',
				                valorTotal : '' + valorDiarias + '' ,
				                datasolicitacao :'' + hAPI.getCardValue("dataSolicitacao") +'',	
				                emailsolicitante : '' + hAPI.getCardValue("emailSolicitante") +'',
				                itens: aItem ,
				        		rateioDigitado: aRateio ,
				        		rateioConfigurado:'' +  codRateio +''
				            },
				          options : {
				             encoding : 'UTF-8',
				             mediaType: 'application/json'
				          }
				        }
				              
				        //log.info(aRateio);
				        
				        var vo = clientService.invoke(JSON.stringify(data));
				        
				        if(vo.getResult()== null || vo.getResult().isEmpty()){
				            throw "Retorno está vazio";
				        }
				        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
				        	throw JSON.parse(vo.getResult()).errorMessage;
				        }
				        else {
				            log.info(vo.getResult());
				        }
				    } 
					catch(err) {
				        throw err;
				    }	
			   
			   
			   
		   
	   
	}
	   
	   //FUNÇÃO QUE ADD ITEM NA SOLICITAÇÃO DE COMPRA
	   function addItemViagem(produto,codigo,tipoV,id_form,nValor){
		   var itemServico = { 
					produto: ''+produto +'', 
					quantidade: 1, 
					codSolicitacao: '' + codigo +'',
					ccusto :  '' ,
					projeto :'' ,
					atividade :'' ,
					categoria :'' ,
					fonte :'' ,
					area :'' ,
					alocacao :'' ,
					conta : '' ,
					localizacao :'',
					tipoviagem : '' + tipoV +'', 
					idDocumento: '' + id_form +'',
					valor: '' + nValor + ''
						};	
			
			aItemServico.push(itemServico);
	   }
	   
	   
	   function itensPagamento(){
		   var datasetFilhos;
		   
		    //Cria a constraint para buscar os formulários ativos
		    var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);	
			var cst2 = DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST);				
			var cst3 = DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST);
			
		    var constraints = new Array(cst1,cst2,cst3);
		    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
		    
		    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
		        var documentId = datasetPrincipal.getValue(i, "metadata#id");
		        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
		        var solicitacaoId = datasetPrincipal.getValue(i, "solicitacao");
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
		        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
		        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		        var constraintsFilhos = new Array(c1, c2, c3);
		 
		        //Busca o dataset
		        datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
					       
		      
		    }
		    return datasetFilhos;
		    
	   }
	   
	}
