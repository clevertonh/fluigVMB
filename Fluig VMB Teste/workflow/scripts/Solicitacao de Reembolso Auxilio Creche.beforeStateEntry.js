function beforeStateEntry(sequenceId){
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	//RECUPERAR O ID DO PROCESSO
	var PROCESSO_ID = 3;
	
	//recupera atividade
	var ativAtual 		= getValue("WKNumState");	
	var nextAtv  		= getValue("WKNextState");
	var codSolicitacao  = getValue("WKNumProces");
	
	var autorizado 		 = hAPI.getCardValue("aprovacao");
	var aprovadoNoPrazo  = hAPI.getCardValue("aprPrazo");		
	
	var solicitante;
	var idFormulario;
	var emailSolicitante;
    var dtVencimento;
    var dtSolicitacao;
    var valorTotal;
    var documentId;
	var aRateio = new Array();
	var solicitacao;
	var cpfbeneficiario;
		
	
	
	if ((ativAtual == APROVACAO_RH && autorizado == "aprovado" && aprovadoNoPrazo == "" ) || ativAtual == ALTERACAO_DATA){
		
		//chama função de retorna dados do formulário filho
		solicitacao = itensPagamento();				    
		    
		if ( solicitacao.rowsCount > 1){		    					    					    			
			//só cria um array de objeto com os dados de pagamento e enviar para a propriedade rateio		    			
			for (var i=0; i < solicitacao.rowsCount ; i++){
				var obj = new Array();				
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
			log.info('----------RATEIO REEMBOLSO CRECHE');
			log.info(aRateio);
		}	
	
			
			//chama função de integração
	    	integracao(PROCESSO_ID,codSolicitacao,emailSolicitante,dtSolicitacao,dtVencimento,valorTotal,aRateio);
	   
	
	
	}
		
			
	    
	    
	
		 function itensPagamento(){
			 var datasetFilhos;
			 //Cria a constraint para buscar os formulários ativos
			    var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);	
				//var cst2 = DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST);
				var cst2 = DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST);
				
				
			    var constraints = new Array(cst1,cst2);
			    var datasetPrincipal = DatasetFactory.getDataset("VM_Solicitacao_Reembolso_creche", null, constraints, null);
			    	    
			    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
			        documentId = datasetPrincipal.getValue(i, "metadata#id");
			        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
			        solicitante = datasetPrincipal.getValue(i, "solicitante");
			        emailSolicitante = datasetPrincipal.getValue(i, "emailSolicitante");
			        dtSolicitacao = datasetPrincipal.getValue(i, "dataSolicitacao");
			        dtVencimento = datasetPrincipal.getValue(i, "dtPagamento");
			        valorTotal = datasetPrincipal.getValue(i, "vl_rmb");
			        cpfbeneficiario = datasetPrincipal.getValue(i, "cpfbeneficiario");
			        
			        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
			        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
			        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
			        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
			        var constraintsFilhos = new Array(c1, c2, c3);
			 
			        //Busca o dataset
			        datasetFilhos = DatasetFactory.getDataset("VM_Solicitacao_Reembolso_creche", null, constraintsFilhos, null);
				
			 
			    }
			    
			    log.info('------DATASETFILHO');
			    log.info(datasetFilhos);
			    
			    return datasetFilhos;
			    
			    
		 }
	    
		 

			function integracao(PROCESSO_ID,codSolicitacao,emailSolicitante,dtEmissao,dtVencimento,valorTotal,aRateio){	
				 try{
				        var clientService = fluigAPI.getAuthorizeClientService();
				        var data = {
				            companyId : getValue("WKCompany") + '',
				            serviceCode : 'REST FLUIG',
				            endpoint : '/F_FINA050',
				            method : 'post',// 'delete', 'patch', 'put', 'get'     
				            timeoutService: '100', // segundos
				            params : {
				            	processo : '' + PROCESSO_ID +'',
				            	solicitacao : '' + codSolicitacao + '' ,	                
				                solicitante : '' + solicitante + '' ,
				                emailSolicitante : '' + emailSolicitante +'',
				                cpf : '' + cpfbeneficiario + '',
				            	dataEmissao :'' + dtEmissao +'',
				            	dataVencimento :'' + dtVencimento +'',
				                valorTotal :'' + valorTotal +'',	
				        		rateioDigitado: aRateio + ''
				        		
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
				    } catch(err) {
				        throw err;
				    }
				
				
			}	
	    
	    
	

}