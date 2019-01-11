function beforeStateEntry(sequenceId){
	
	var ABERTURA = 0;
	var APROVACAO_GESTOR = 5;
	var VALIDACAO = 48;
	var APROVACAO_RH = 27;
	var ALTERACAO_DATA = 67;
	
	//RECUPERAR O ID DO PROCESSO
	var PROCESSO_ID = 3;
	
	//recupera atividade
	var ativAtual = getValue("WKNumState");	
	var nextAtv  = getValue("WKNextState");
	var idFormulario;
	
	var autorizado = hAPI.getCardValue("aprovacao");
	var aprovadoNoPrazo = hAPI.getCardValue("aprPrazo");
	
	var codSolicitacao = getValue("WKNumProces");
	
	var emailSolicitante;
    var dtVencimento;
    var valorTotal;
    var documentId;

	var aRateio = new Array();
	var itemContabil = new Array();
	
	
	if ((ativAtual == APROVACAO_RH && autorizado == "aprovado" && aprovadoNoPrazo == "" ) || ativAtual == ALTERACAO_DATA){
		
		var itensSolicitacao;
		
		 //Cria a constraint para buscar os formulários ativos
	    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);	
		var cst3 = DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST);
		var cst5 = DatasetFactory.createConstraint("solicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST);
		
		
	    var constraints = new Array(cst,cst3,cst5);
	    var datasetPrincipal = DatasetFactory.getDataset("VM_Reembolso_creche", null, constraints, null);
	    
	    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
	        documentId = datasetPrincipal.getValue(i, "metadata#id");
	        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");	        
	        emailSolicitante = datasetPrincipal.getValue(i, "emailSolicitante");
	        dtVencimento = datasetPrincipal.getValue(i, "dtPagamento");
	        valorTotal = datasetPrincipal.getValue(i, "vl_rmb");
	        
	        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
	        var c1 = DatasetFactory.createConstraint("tablename", "tableItens" , "tableItens", ConstraintType.MUST);
	        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
	        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
	        var constraintsFilhos = new Array(c1, c2, c3);
	 
	        //Busca o dataset
	        var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
		
	        itensSolicitacao = datasetFilhos;
	 
	                
	        
	    }
	    
	    //verifica quantidade de linhas do rateio manual		    		
		if ( itensSolicitacao.rowsCount == 1){
			for (var i=0; i < itensSolicitacao.length ; i++){
				var obj = new Array();		
				obj.valor = '' + valorTotal + '';
				obj.ccusto =  '' + itensSolicitacao.getValue(0, "txtcentrocusto") +'';			
				
				if (itensSolicitacao.getValue(0, "txtprojeto") != null ){
					obj.projeto = '' + itensSolicitacao.getValue(0, "txtprojeto") +'';	
				}
				obj.atividade = '' + itensSolicitacao.getValue(0, "txtatividade") +'';
				
				if (itensSolicitacao.getValue(0, "txtcategoria") != null){
					obj.categoria = '' + itensSolicitacao.getValue(0, "txtcategoria") +'';
				}
				if (itensSolicitacao.getValue(0, "txtfontefinanciamento") != null){
					obj.fonte = '' + itensSolicitacao.getValue(0, "txtfontefinanciamento") +'';
				}
				if (itensSolicitacao.getValue(0, "txtareaestrategica")  != null){
					obj.area = '' + solicitacao.getValue(0, "txtareaestrategica") +'';
				}	    					
				if (itensSolicitacao.getValue(0, "alocacao") != null){
					obj.alocacao = '' + itensSolicitacao.getValue(0, "alocacao") +'';	
				}
				if (itensSolicitacao.getValue(0, "contacontabil") != null){
					obj.conta = '' + itensSolicitacao.getValue(0, "contacontabil") +'';	
				}	    					
				if (itensSolicitacao.getValue(0, "localizacao") != null){
					obj.localizacao = '' + itensSolicitacao.getValue(0, "localizacao") +'';	
				}
				
				itemContabil[i] = obj;	
				
			}

			
		}
		//possui rateio por centro de custo
		else if ( itensSolicitacao.rowsCount > 1){		    					    					    			
			//só criar um array de objeto com os dados de pagamento e enviar para a propriedade rateio		    			
			for (var i=0; i < itensSolicitacao.rowsCount ; i++){
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
				obj.valor = '' + valorTotal + '';				
				obj.ccusto =  '' + itensSolicitacao.getValue(i, "txtcentrocusto") +'';				    					
				if (itensSolicitacao.getValue(i, "txtprojeto") != null){
					obj.projeto = '' + itensSolicitacao.getValue(i, "txtprojeto") +'';	
				}
				obj.atividade = '' + itensSolicitacao.getValue(i, "txtatividade") +'';		    					
				if (itensSolicitacao.getValue(i, "txtcategoria") != null){
					obj.categoria = '' + itensSolicitacao.getValue(i, "txtcategoria") +'';
				}		    					
				if (itensSolicitacao.getValue(i, "txtfontefinanciamento") != null){
					obj.fonte = '' + itensSolicitacao.getValue(i, "txtfontefinanciamento") +'';
				}	    					
				if (itensSolicitacao.getValue(i, "txtareaestrategica")  != null){
					obj.area = '' + itensSolicitacao.getValue(i, "txtareaestrategica") +'';
				}
				if (itensSolicitacao.getValue(i, "alocacao") != null){
					obj.alocacao = '' + itensSolicitacao.getValue(i, "alocacao") +'';	
				}
				if (itensSolicitacao.getValue(i, "contacontabil") != null){
					obj.conta = '' + itensSolicitacao.getValue(i, "contacontabil") +'';	
				}
				if (itensSolicitacao.getValue(i, "localizacao") != null){
					obj.localizacao = '' + itensSolicitacao.getValue(i, "localizacao") +'';	
				}	    					
				obj.percentual = 1 * parseInt(itensSolicitacao.getValue(i, "percentual")) ;
				
				aRateio[i] = obj;	
				//log.info(aRateio);
			}		    			
		}	
		
		
	    if (datasetPrincipal.rowsCount > 0){
	    	integracao(codSolicitacao,emailSolicitante,dtVencimento,valorTotal,itemContabil,aRateio);
	    }
	    
	}


	
}

//ADD ITENS
function addItemPagamento(){
	   var item = {   
				ccusto :  '' ,
				projeto :'' ,
				atividade :'' ,
				categoria :'' ,
				fonte :'' ,
				area :'' ,
				alocacao :'' ,
				conta : '' ,
				localizacao :''
					};	
		
	   	itemContabil.push(item);
}

function integracao(codSolicitacao,emailSolicitante,dtVencimento,valorTotal,itemContabil,aRateio){	
	 try{
	        var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/REST/FLUIG',
	            method : 'post',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100', // segundos
	            params : {
	                solicitante : '' + emailSolicitante +'',	
	                dataVencimento :'' + dtVencimento +'',
	                valorTotal :'' + valorTotal +'',	
	                itens: itemContabil ,
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