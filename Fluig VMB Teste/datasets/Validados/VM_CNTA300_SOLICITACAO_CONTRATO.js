function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	dataset.addColumn("NUMERO");
	dataset.addColumn("REVISAO");
	
	
	var aItemServico = new Array();
	var aRateio = new Array();;
	var itens = new Array();
	var documentId;
	var valor;
	var produto;
	var emailcomprador ="";
	var acaocontrato;
	var acao;
	var filial ='02';
	var solicitacaoPai;
	var tipoPlanilha;
	var documentIdPai;
	var condPagamento ="001";
	var nProcesso;
	
	
	//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO SOLICITAÇÃO NA POSIÇÃO 0 e do tipo MUST
    if(constraints !== null && constraints.length){
    	if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") {     		
    			var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);	
    			var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
        		var solicitacao = DatasetFactory.getDataset("VM_SolicitacaoContrato", null, new Array(c0,c1), null);
        		        	
        		if (solicitacao.getValue(0,"definicaoValor") =="demanda"){
        			tipoPlanilha = "005";	
        		}
        		else if (solicitacao.getValue(0,"definicaoValor") =="fixo"){
        			tipoPlanilha = "025";
        		}
        		
        		documentId = solicitacao.getValue(0,"documentid");    
         		
        		if (solicitacao.getValue(0,"tipoContrato") != "" && solicitacao.getValue(0,"tipoContrato") != null){        		
            		//inclusao de contrato
            		acaocontrato = "1";
            		
        		}
        		else  {
        			//inclusão de aditivo
        			acaocontrato = "2";
        		}
       		
        		if (solicitacao.getValue(0,"condicaoPgto") != "" && solicitacao.getValue(0,"condicaoPgto") != null){
        			condPagamento = solicitacao.getValue(0,"condicaoPgto").split('-');        		            		      	
            		condPagamento = condPagamento[0];	
        		}
 
        	//	log.info("erro condição de pagamento");
        	//	log.dir(condPagamento);
        		
        		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        		var codSolicitacaoPai = retornaProcessoSolicitacao.getValue(0,"sourceProcess");
            	 
        		if (codSolicitacaoPai == 0){
        			//SOLICITAÇÃO DE CONTRATO AVULSA NÃO POSSUI INTEGRAÇÃO AUTOMATICA.
          			//APENAS SOLICITAÇÕES DE EVENTOS DEVEM TER CONTRATOS AVULSOS
          			dataset.addRow(new Array("SUCESSO"),"","");
          			return dataset;
        		}
        	         		
        		//IDENTIFICAR PROCESSO
        		var retornaProcessoPAI = retornaSolicitacaoPai(codSolicitacaoPai,solicitacao.getValue(0,"companyid"));
        		var nomeProcesso = retornaProcessoPAI.getValue(0,"processId");
        		documentIdPai = retornaProcessoPAI.getValue(0,"cardDocumentId");
        		
        		if (nomeProcesso == "SolicitacaoContratacaoServico"){
        			nProcesso = 11;
        			var constraint2  = new Array(); 
        			constraint2.push(DatasetFactory.createConstraint("documentid", documentIdPai , documentIdPai, ConstraintType.MUST));
        			constraint2.push(DatasetFactory.createConstraint("metadata#active", true , true, ConstraintType.MUST));      			
        			solicitacaoPai = DatasetFactory.getDataset("VM_SolicitacaoContratacoesServico", null, constraint2, null)        		           
     			
        			
        			if (solicitacaoPai.getValue(0,"filialSC") != null && solicitacaoPai.getValue(0,"filialSC") != ""){
        				filial = solicitacaoPai.getValue(0,"filialSC");
        			}
        			else {
        				filial ="02";
        			}
        			
        			
					 try {
						  var c3 = DatasetFactory.createConstraint("metadata#id", documentIdPai, documentIdPai, ConstraintType.MUST);   
						  var c4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST); 
 						  var datasetProdutos = DatasetFactory.getDataset("VM_SolicitacaoContratacaoServicoProdutos", null, new Array(c3,c4), null);
 						  
 						  
 						  //addItemCompra(produto,codigo,quantidade,dtnecessidade,id_form, nValor)
 						  
						 if (datasetProdutos.rowsCount > 0){
							  for (var a=0; a<datasetProdutos.rowsCount;a++){
	   							 aItemServico.push(addItemCompra(	   									   								
	   									 datasetProdutos.getValue(a,"COD_PRODUTO"),
	   									 datasetProdutos.getValue(a,"SOLICITACAO"),
	   									 datasetProdutos.getValue(a,"QUANTIDADE"),
	   									 null,
	   									 datasetProdutos.getValue(a,"metadata#id"),	
	   									 datasetProdutos.getValue(a,"VALOR_EMPENHADO")  
	   									 ));       						        							
	    						 }
						
			        			//BUSCA ITENS FINANCEIRO
			        	  		var c5 = DatasetFactory.createConstraint("metadata#id", documentIdPai, documentIdPai, ConstraintType.MUST);   
			        	  		var c6 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST); 
			                	var itensFinanceiro = DatasetFactory.getDataset("VM_SolicitacoesContratacaoServicoDadosPagamento", null, new Array(c5,c6), null);    				  

			           		 	 try {
									//chama função que monta array de objetos dos itens do rateio
									 aRateio = preencheRateio(itensFinanceiro);
								 }
								 catch (erro){
									 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
								 }
						 }					 
						 
					 }
					 
					 catch (erro){
						 dataset.addRow(["ERRO AO MONTAR ITENS"]);
						 return dataset;
					 }
					 
					 
					 
        		}
        		else if (nomeProcesso == "SolicitacaoLocacaoVeiculo"){
        				nProcesso = 6;
        				//dataset.addRow(["ENTROU AQUI"]);
	        			var constraint2  = new Array(); 
	        			constraint2.push(DatasetFactory.createConstraint("documentid", documentIdPai , documentIdPai, ConstraintType.MUST));
	        			constraint2.push(DatasetFactory.createConstraint("metadata#active", true , true, ConstraintType.MUST));      			
	        			solicitacaoPai = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculo", null, constraint2, null)
	        			
	        	    			
	        			
	      
						 try {
						
							 //criação do item da solicitação de compra
							 aItemServico.push(addItemCompra(
									 solicitacaoPai.getValue(0,"codigoProduto"),
									 solicitacaoPai.getValue(0,"solicitacao"),
        							 solicitacaoPai.getValue(0,"quantidade"),
        							 solicitacaoPai.getValue(0,"dtSolicitacao"),
        							 solicitacaoPai.getValue(0,"documentid"),
        							 solicitacaoPai.getValue(0,"CotacaovalorMensal")
        							 )); 
        					 
        					 
							 
						  			//BUSCA ITENS FINANCEIRO
				        	  		var c3 = DatasetFactory.createConstraint("metadata#id", documentIdPai, documentIdPai, ConstraintType.MUST);   
				        			var c4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST); 
				                	var itensFinanceiro = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculoDadosPagamento", null, new Array(c3,c4), null);    				  
				
				                	
								 	 try {
											//chama função que monta array de objetos dos itens do rateio
											 aRateio = preencheRateio(itensFinanceiro);
										 }
										 catch (erro){
											 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
										 }
							 
							 					 
							 
						 }
						 catch (erro){
							 dataset.addRow(["ERRO AO MONTAR ITENS"]);
							 return dataset;
						 }	
								 
        		}
        		else if (nomeProcesso == "SolicitacaoTransfer"){
        			nProcesso = 12;
        			var constraint2  = new Array(); 
        			constraint2.push(DatasetFactory.createConstraint("documentid", documentIdPai , documentIdPai, ConstraintType.MUST));
        			constraint2.push(DatasetFactory.createConstraint("metadata#active", true , true, ConstraintType.MUST));      			
        			solicitacaoPai = DatasetFactory.getDataset("VM_SolicitacoesTransfer", null, constraint2, null)
        			
        			//BUSCA ITENS FINANCEIRO
        	  		var c3 = DatasetFactory.createConstraint("metadata#id", documentIdPai, documentIdPai, ConstraintType.MUST);   
        			var c4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST); 
                	var itensFinanceiro = DatasetFactory.getDataset("VM_SolicitacoesTransferDadosPagamento", null, new Array(c3,c4), null);    				  

       			 	 //criação do item da solicitação de compra
					 aItemServico.push(addItemCompra(
							 solicitacaoPai.getValue(0,"codigoProduto"),
							 solicitacaoPai.getValue(0,"solicitacao"),
							 solicitacaoPai.getValue(0,"quantidade"),
							 solicitacaoPai.getValue(0,"dtSolicitacao"),
							 solicitacaoPai.getValue(0,"documentid"),
							 solicitacaoPai.getValue(0,"CotacaovalorMensal")
							 )); 
					
                	
				 	 try {
							//chama função que monta array de objetos dos itens do rateio
							 aRateio = preencheRateio(itensFinanceiro);
						 }
						 catch (erro){
							 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
						 }
        			
        		}

          		for (var a=0; a<constraints.length; a++){
        			if (constraints[a].fieldName == "acao"){
        				acao = constraints[a].initialValue;
            		}
        		}
          		
          	
          			try{
				        var clientService = fluigAPI.getAuthorizeClientService();
				        var data = {
				            companyId : 1 + '',
				            serviceCode : 'REST FLUIG',
				            endpoint : '/F_CNTA300',
				            method : 'POST',// 'delete', 'patch', 'put', 'get'     
				            timeoutService: '420', // segundos
				            params : {
				            	PROCESSO : 			'' + nProcesso + '' ,
				            	SOLICITACAO : 		'' + codSolicitacaoPai + '' ,
				            	FILIAL : 			'' + filial + '',
				            	ACAO :				'' + acao + '',
				            	ACAOCONTRATO : 		'' + acaocontrato + '',
				            	DATAINICIO : 		'' + solicitacao.getValue(0,"dtInicio") +'',
				            	FINALIDADE :		'' + solicitacao.getValue(0,"finalidade") +'',
				            	NEGOCIACAO :		'' + solicitacao.getValue(0,"negociacao") +'',
				            	DATAFIM : 			'' + solicitacao.getValue(0,"dtFim") +'',
				            	TIPOCONTRATO: 		'' + solicitacao.getValue(0,"tipoContrato") +'',
				            	NUMEROCONTRATO:		'' + solicitacao.getValue(0,"Numerocontrato") +'',
				            	REVISAO:			'' + solicitacao.getValue(0,"revisao") +'',	
				            	TIPOREVISAO: 		'' + solicitacao.getValue(0,"tipoRevisao") +'',
				            	JUSTIFICATIVA: 		'' + "ALTERACAO DE CONTRATO" +'',
				            	TIPOPLANILHA: 		'' + tipoPlanilha +'',				            	
				            	CONDICAOPGTO: 		'' + condPagamento +'',						            	
				            	DATAASSINATURA : 	'' + solicitacao.getValue(0,"dataAssinatura") +'',
				            	FORNECEDOR : 		'' + solicitacao.getValue(0,"codigoFornecedor") +'',				            					            	
				            	VALORTOTAL : 		'' + solicitacao.getValue(0,"CotacaovalorAnual") +'',
				            	SOLICITANTE : 		'' + solicitacao.getValue(0,"solicitante") +'',
				            	COMPRADOR :  		'' + solicitacao.getValue(0,"emailsolicitante") +'',  
				            	RESPONSAVEL :  		'' + solicitacaoPai.getValue(0,"emailsolicitante") +'',
				            	ITENS : 				aItemServico ,
				            	RATEIODIGITADO : 		aRateio ,
				            	DOCUMENTID :			''+ documentIdPai +''
				            },
				          options : {
				             encoding : 'UTF-8',
				             mediaType: 'application/json'
				          }
				        }
				             
				        
				        var vo = clientService.invoke(JSON.stringify(data));        		        					        
				        var obj = JSON.parse(vo.getResult());
				        
				        if(vo.getResult()== null || vo.getResult().isEmpty()){
				        	dataset.addRow(new Array("RETORNO VAZIO"));
				        }        					                					       
				        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
				        	
				        	dataset.addRow(new Array(JSON.parse(vo.getResult()).errorMessage));
				        }
				        else if (JSON.parse(vo.getResult()).CODIGO != "100"){

				        	dataset.addRow(new Array(obj.MSG));
				        }
				        else if (JSON.parse(vo.getResult()).CODIGO == "100"){	   
				            dataset.addRow(new Array(
				            		"SUCESSO",
				            		JSON.parse(vo.getResult()).NUMERO,
				            		JSON.parse(vo.getResult()).REVISAO
				            		));					           
				        	// dataset.addRow(new Array("SUCESSO"));
				        }
				        
				    } 
					catch(err) {

						dataset.addRow([err.message]);
				    }
          		
          	
	
    		}
    		
    		
    }
    	 	
	return dataset;
}



//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   return DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);
}


//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacaoPai(idprocesso,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", idprocesso , idprocesso, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   return DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);
}


//FUNÇÃO QUE MONTA OBJETO E ADD ITEM NA SOLICITAÇÃO DE COMPRA
function addItemCompra(produto,codigo,quantidade,dtnecessidade,id_form, nValor){
	   var itemServico = { 
				produto: ''+produto +'', 
				codSolicitacao: '' + codigo +'',
				quantidade: ''+ quantidade +'',
				dtNecessidade: '' + dtnecessidade +'',											
				idDocumento: '' + id_form +'',
				valor: '' + nValor + ''								
					};	
		
		return itemServico;
}


function preencheRateio(solicitacao){
	   var rateio = new Array();
	   
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
			obj.ccusto =  '' + solicitacao.getValue(i, "CENTRO_CUSTO") +'';	
			obj.atividade = '' + solicitacao.getValue(i, "ATIVIDADE") +'';	
			obj.alocacao = '' + solicitacao.getValue(i, "ALOCACAO") +'';
			obj.localizacao = '' + solicitacao.getValue(i, "LOCALIZACAO") +'';		    					
			obj.percentual = 1 * parseFloat(solicitacao.getValue(i, "PERCENTUAL")) ;
			
			if (solicitacao.getValue(i, "PROJETO") != null){
				obj.projeto = '' + solicitacao.getValue(i, "PROJETO") +'';	
			}						    				
			if (solicitacao.getValue(i, "CATEGORIA") != null){
				obj.categoria = '' + solicitacao.getValue(i, "CATEGORIA") +'';
			}		    					
			if (solicitacao.getValue(i, "FONTE") != null){
				obj.fonte = '' + solicitacao.getValue(i, "FONTE") +'';
			}	    					
			if (solicitacao.getValue(i, "AREA")  != null){
				obj.area = '' + solicitacao.getValue(i, "AREA") +'';
			}									
			if (solicitacao.getValue(i, "CONTA_CONTABIL") != null){
				obj.conta = '' + solicitacao.getValue(i, "CONTA_CONTABIL") +'';	
			}
			
			rateio[i] = obj;	
				
	   }
	 			   
	   return rateio;
}

function getConstraints(constraints, field){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field){			
			return constraints[i].initialValue;
		}
	}
	
	return null;
}

