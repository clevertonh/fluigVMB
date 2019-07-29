function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var valorTotal;
	var dataVencimento;
	var aRateio = new Array();
	

	 
    if((constraints!==null && constraints.length) && constraints[0].fieldName != 'sqlLimit' ){ //se tiver constraint filtra
		//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
		 if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") {
			// log.info("entrando aqui 1");
	    		var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
	    		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesDiaria", null, new Array(c0,c1), null);
	    		
	    		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        	
        		log.info("solicitação de diaria");
        		log.info(codSolicitacao);
	    		
	    		var c2 = DatasetFactory.createConstraint("SOLICITACAO", codSolicitacao, codSolicitacao, ConstraintType.MUST);    
	    	    var itensSolicitacao = DatasetFactory.getDataset("VM_SolicitacoesDiariasDadosPagamento", null, new Array(c2), null);    				  

	    	    

				 try {
					//chama função que monta array de objetos dos itens do rateio
					 aRateio = preencheRateio(itensSolicitacao);
				 }
				 catch (erro){
					 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
					 return dataset;
				 }
			  			
				 
				 if(aRateio === null || aRateio == ""){
					 dataset.addRow(new Array("NÃO FOI POSSÍVEL MONTAR AS INFORMAÇÕES DE PAGAMENTO"));
					 return dataset;
					 
				 }
				 
				 //atribui constraints recebida de valor e datavencimento a variaveis
				 for (var a=0; a<constraints.length;a++){						
					 if (constraints[a].fieldName == "vl_diarias" ){
						 valorTotal = constraints[a].initialValue;
					 }
					 else if (constraints[a].fieldName == "dtPgto" ){
						 dataVencimento = constraints[a].initialValue;
						 
						 
					 }
				 }

					 try {
						 var clientService = fluigAPI.getAuthorizeClientService();
					        var data = {
					        		 companyId : 1 + '',
					        	serviceCode : 'REST FLUIG',
					            endpoint : '/F_FINA050',
					            method : 'POST',// 'delete', 'patch', 'put', 'get'     
					            timeoutService: '100', // segundos
					            params : {
					            	PROCESSO : '' + 5 + '' ,
					            	SOLICITACAO : '' + codSolicitacao + '' ,
					                SOLICITANTE : '' + solicitacao.getValue(0,"solicitante") +'',
					                VALORTOTAL : '' + valorTotal + '' ,
					                DATASOLICITACAO :'' + solicitacao.getValue(0,"datasolicitacao") +'',	
					                EMAILSOLICITANTE : '' + solicitacao.getValue(0,"emailsolicitante") +'',
					                EMAILAPROVADOR : '' + solicitacao.getValue(0,"emailGestor") +'',
					                CPF				: '' + solicitacao.getValue(0,"cpfbeneficiario") +'',
					                DATAVENCIMENTO  : '' + dataVencimento + '',
					        		RATEIODIGITADO: aRateio ,
					        		IDDOCUMENTO: '' + solicitacao.getValue(0,"documentid") + ''
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
					        else if (obj.CODIGO != "100"){
					        	dataset.addRow(new Array(obj.MSG));
					        }
					        else if (obj.CODIGO == "100"){	                    
					            dataset.addRow(new Array("SUCESSO"));					           
					            
					        }
					       
					        
				    	}  catch(err) {
							dataset.addRow([err.message]);
							
				        }	 
				    	
				    
					 
					 
	    	}
	 
	 }
	
    	
	 //dataset.addRow(new Array("RETORNO VAZIO"));
 
		return dataset;
	

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
			
			log.info("--retorno rateio--");
			log.dir(rateio[i]);
	   }
	 			   
	   return rateio;
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
