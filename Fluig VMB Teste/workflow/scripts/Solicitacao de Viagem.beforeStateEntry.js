function beforeStateEntry(sequenceId){	
	//REST PADRÃO TOTVS USUÁRIO
	//http://pessoasecultura.intranetvm.org.br:8082/REST/USERS
	
	//VARIAVEIS DEFAULT
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
	
	//RECUPERA NUMERO DA ATIVIDADE
	var ativAtual 		 = getValue("WKNumState");		
	//RECUPERA CODIGO DA SOLICITAÇÃO
	var codSolicitacao 	 = getValue("WKNumProces");
	//VERIFICA QUAL A PROXIMA ATIVIDADE
	var nextAtv  		 = getValue("WKNextState");
	
	var vooComprado		 = hAPI.getCardValue("vooComprado");
	var hotelComprado	 = hAPI.getCardValue("hotelComprado");					
	var tipoViagem 		 = hAPI.getCardValue("tipoviagem");
	var valorDiarias 	 = hAPI.getCardValue("vl_diarias");
	var voo 			 = hAPI.getCardValue("tipovoo");
	var hospedagem 		 = hAPI.getCardValue("tipoquarto");
	var recebeDiarias 	 = hAPI.getCardValue("recebediarias");
	var emailsolicitante = hAPI.getCardValue("emailSolicitante");
	var datasolicitacao  = hAPI.getCardValue("dataSolicitacao");	
    var passageiro 		 = hAPI.getCardValue("nomepassageiro") ;
    var solicitante 	 = hAPI.getCardValue("solicitante");
    var cpf 			 = hAPI.getCardValue("cpfpassageiro");
	
	
	//VARIAVEIS SIMPLES
	var solicitacao;
	var documentId;
	var aRateio = new Array();
	
	/*
	 * verifica se foi adicionado anexo. 
	 * Pois quando tem anexo é obrigatório marcar algo como comprado
	 * */
	 var anexos   = hAPI.listAttachments();
     var temAnexo = false;
	
	
     	if (ativAtual == COMPRARPASSAGEM && ( vooComprado == '' && hotelComprado == '') || ( vooComprado == null && hotelComprado == null) ){
     	     if (anexos.size() > 0) {
     	          temAnexo = true;
     	      }

     	      if (temAnexo) {
     	          throw "Você anexou um bilhete e/ou voucher então é necessário indicar qual serviço foi comprado!";
     	      }

     	}
     
	   if (ativAtual == COMPRARPASSAGEM && ( vooComprado == 'sim' || hotelComprado == 'sim' ) ) {
		   log.info('ATIVIDADE ATUAL DE COMPRA PASSAGEM : '+ ativAtual);
	
				if (anexos.size() > 0) {
		            temAnexo = true;
		        }

		        if (!temAnexo) {
		            throw "É preciso anexar o documento para continuar o processo!";
		        }
		        
		      //objeto serviço
				var aItemServico = new Array();
				var aRateio = new Array();		
				
		        //chama função que retorna informações financeiras de pagamento
		  		solicitacao = itensPagamento();	

		  		//EXECUTA FUNÇÃO QUE RETORNA PRODUTOS A SEREM GERADOS PARA SOLICITAÇÃO DE VIAGEM
		  		itensServico();
				
		  		if (aItemServico.length >0){
		    		//VERIFICA QUANTIDADE DE LINHAS DA INFORMAÇÃO FINANCEIRA PARA SABER SE EXISTE RATEIO DIGITADO
		    		//EM CASO DE UMA UNICA LINHA SIGNIFICA QUE NÃO É RATEIO
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
		    		//INFORMAÇOES FINANCEIRAS
		    		else if ( solicitacao.rowsCount > 1){		    					    					    								    					    		
		    			    //chama função que monta rateio de pagament
		 			   		preencheRateio(solicitacao);	    			
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
					            	solicitante : '' + solicitante +'',
					            	emailsolicitante : '' + emailsolicitante +'',
					                cpf				: '' + cpf +'',
					                datasolicitacao :'' + datasolicitacao +'',	
					                passageiro : '' + passageiro +'',
					                itens: aItemServico ,
					        		rateioDigitado: aRateio 
					            },
					          options : {
					             encoding : 'UTF-8',
					             mediaType: 'application/json'
					          }
					        }
					              						        
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
		   else if ( ativAtual == PAGARDIARIAS && recebeDiarias == "sim") {		   
		   	   //chama função que retorna informações financeiras do formulário
			   solicitacao = itensPagamento();
				
			   //chama função que monta rateio de pagament
			   preencheRateio(solicitacao)
			  								
		   	  //chama função de integração com contas a pagar
		   	  integraFina050();
   
	}
	   
	   function preencheRateio(solicitacao){
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
		   }
	   }
	   
	   function integraFina050(){
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
			                solicitante : '' + solicitante +'',
			                valorTotal : '' + valorDiarias + '' ,
			                datasolicitacao :'' + datasolicitacao +'',	
			                emailsolicitante : '' + emailsolicitante +'',
			                cpf				: '' + cpf +'',
			        		rateioDigitado: aRateio 
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
			var cst2 = DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST);
			
		    var constraints = new Array(cst1,cst2);
		    var datasetPrincipal = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
		    
		    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
		        documentId = datasetPrincipal.getValue(i, "metadata#id");
		        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
		        //var solicitacaoId = datasetPrincipal.getValue(i, "solicitacao");
		        
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
	   
		function itensServico(){
			
			var processo = getValue("WKNumProces");
			var campos   = hAPI.getCardData(processo);
			var contador = campos.keySet().iterator();

			while (contador.hasNext()) {
			    var id = contador.next();

			    if (id.match(/codigoProduto___/)) { // qualquer campo do Filho
			        var campo = campos.get(id);
			        var seq   = id.split("___");

			        var codproduto = campos.get("codigoProduto___" + seq[1]);
			        var valor = campos.get("valores___" + seq[1]);

			        addItemViagem(codproduto,codSolicitacao,tipoViagem,documentId,valor);
			        
			    }
			}
			
			
			/*
			   var indexes = hAPI.getChildrenIndexes("tableViagem");						   
			   for (var i = 0; i < indexes.length; i++) {
				    var codproduto = getValue("codigoProduto___" + indexes[i]);
				    var valor = getValue("valores___" + indexes[i]);
				    var dtviagem = getValue("dtViagem___" + indexes[i]);
				     
				    addItemViagem(codproduto,codSolicitacao,tipoViagem,idFormulario,valor);
				     
			   }

			   */
		   }
	   
   
	   
	}
