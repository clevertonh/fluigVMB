function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var aItemServico = new Array();
	var aRateio;
	var itens = new Array();
	var documentId;
	
	//log.info("LOG CONSTRAINTS 1");
	//log.dir(constraints);
	
	//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
    if(constraints !== null && constraints.length){
    	if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") {
     		
    			//var c0 = DatasetFactory.createConstraint("solicitacao", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
    			var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);	
    			var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
        		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesEventos", null, new Array(c0,c1), null);
        		
        		documentId = solicitacao.getValue(0,"documentid");
        		
        		log.info("LOG SOLICITACAO");
        		log.dir(solicitacao);
        		
        		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        		
        		log.info("---RETORNO METADATA");
        		log.info(codSolicitacao);
    
        	
        		var c2 = DatasetFactory.createConstraint("metadata#id", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);            		        	
            	var itensSolicitacao = DatasetFactory.getDataset("VM_SolicitacoesEventosDadosPagamento", null, new Array(c2), null);    				  

        		
        		
        	    log.info("--RETORNO DE CONTRAINTS 21:43---")
        	    log.dir(itensSolicitacao);
        	    
        					 try {
        						//chama função que monta array de objetos dos itens do rateio
        						 aRateio = preencheRateio(itensSolicitacao);
        					 }
        					 catch (erro){
        						 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
        					 }
        				  				 
        					 
        					 try {
        						 
        						  var c1 = DatasetFactory.createConstraint("metadata#id", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
        						  var datasetProdutos = DatasetFactory.getDataset("VM_SolicitacaoEventosProdutos", null, new Array(c1), null);
        						  
        						  log.info("DATASET PRODUTOS");
        						  log.dir(datasetProdutos);
        						  
        						 for (var a=0; a<datasetProdutos.rowsCount;a++){
        							 aItemServico.push(addItemCompra(
        									 datasetProdutos.getValue(a,"COD_PRODUTO"),
        									 datasetProdutos.getValue(a,"SOLICITACAO"),
        									 datasetProdutos.getValue(a,"QUANTIDADE"),								
        									 datasetProdutos.getValue(a,"DT_NECESSIDADE"),
        									 datasetProdutos.getValue(a,"metadata#id")        									
        									 ));       						        							
         						 }
        						 
        						 
        					 }
        					 catch (erro){
        						 dataset.addRow(["ERRO AO MONTAR ITENS"]);
        					 }
        					 
				            	//solicitacao : '' + solicitacao.getValue(0,"solicitacao") + '' ,
        					        							
        					 try{
        					        var clientService = fluigAPI.getAuthorizeClientService();
        					        var data = {
        					            companyId : 1 + '',
        					            serviceCode : 'REST FLUIG',
        					            endpoint : '/F_MATA110',
        					            method : 'POST',// 'delete', 'patch', 'put', 'get'     
        					            timeoutService: '100', // segundos
        					            params : {
        					            	PROCESSO : '' + 3 + '' ,
        					            	SOLICITACAO : '' + codSolicitacao + '' ,
        					            	SOLICITANTE : '' + solicitacao.getValue(0,"solicitante") +'',
        					            	EMAILSOLICITANTE : '' + solicitacao.getValue(0,"emailsolicitante") +'', 
        					            	DATASOLICITACAO :'' + solicitacao.getValue(0,"datasolicitacao") +'',	        					                
        					            	ITENS: aItemServico ,
        					            	RATEIODIGITADO: aRateio ,
        					            	DOCUMENTID:''+ documentId +''
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
        					            dataset.addRow(new Array("SUCESSO"));					           
        					            
        					        }
        					        
        					    } 
        						catch(err) {
        					        //throw err;
        							//log.info(err);
        							dataset.addRow([err.message]);
        					    }

    		}
    		
    		
    }
    	 	
	return dataset;
}


//FUNÇÃO QUE MONTA OBJETO E ADD ITEM NA SOLICITAÇÃO DE COMPRA
function addItemCompra(produto,codigo,quantidade,dtnecessidade,id_form){
	   var itemServico = { 
				produto: ''+produto +'', 
				codSolicitacao: '' + codigo +'',
				quantidade: ''+ quantidade +'',
				dtNecessidade: '' + dtnecessidade +'',											
				idDocumento: '' + id_form +''
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
			obj.percentual = 1 * parseInt(solicitacao.getValue(i, "PERCENTUAL")) ;
			
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

//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 

   return historicoFormulario;
}