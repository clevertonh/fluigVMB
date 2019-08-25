function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var valorTarifa;
	var dtTarifa;
	var aRateio = new Array();
	var banco;
	var agencia;
	var contabanco;

	
	/*Enquanto webservice com a rotina FINA100 não é desenvolvido o dataset considerará 
	 * que toda vez que for chamado terá seu retorno a informação de sucesso
	 * */
	 dataset.addRow(new Array("SUCESSO"));
	 return dataset;

	 
    if((constraints!==null && constraints.length) && constraints[0].fieldName != 'sqlLimit' ){ //se tiver constraint filtra
		//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
		 if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") {
			// log.info("entrando aqui 1");
	    		var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
	    		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, new Array(c0,c1), null);
	    		
	    		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        	
           		var c2 = DatasetFactory.createConstraint("SOLICITACAO", codSolicitacao, codSolicitacao, ConstraintType.MUST);    
	    	    var itensSolicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagemDadosPagamento", null, new Array(c2), null);    				  

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
				 
		
				 //atribui constraints recebida de valor e datavencimento as variaveis
				 for (var a=0; a<constraints.length;a++){						
					 if (constraints[a].fieldName == "vl_tarifa" ){
						 valorTarifa = constraints[a].initialValue;
					 }
					 else if (constraints[a].fieldName == "dtTarifa" ){
						 dtTarifa = constraints[a].initialValue;
	 					
					 }
					 else if (constraints[a].fieldName == "banco" ){
						 banco = constraints[a].initialValue;
	 					
					 }		
					 else if (constraints[a].fieldName == "agencia" ){
						 agencia = constraints[a].initialValue;
	 					
					 }						 
					 else if (constraints[a].fieldName == "contabanco" ){
						 contabanco = constraints[a].initialValue;
	 					
					 }	
					 
				 }
				 
				 //soma valor diarias mais tarifa
				 valorTotal = valorTotal + valorTarifa;

					 try {
						 var clientService = fluigAPI.getAuthorizeClientService();
					        var data = {
					        		 companyId : 1 + '',
					        	serviceCode : 'REST FLUIG',
					            endpoint : '/F_FINA100',
					            method : 'POST',// 'delete', 'patch', 'put', 'get'     
					            timeoutService: '100', // segundos
					            params : {
					            	PROCESSO : '' + 1 + '' ,
					            	SOLICITACAO : '' + codSolicitacao + '' ,
					                SOLICITANTE : '' + solicitacao.getValue(0,"solicitante") +'',
					                VALORTARIFA : '' + valorTarifa + '' ,	
					                BANCO				: '' + banco +'',					                
					                AGENCIA				: '' + agencia +'',
					                CONTA				: '' + contabanco +'',
					                DATALANCAMENTO  : '' + dtTarifa + '',
					        		RATEIODIGITADO: aRateio ,
					        		IDDOCUMENTO: '' + solicitacao.getValue(0,"documentid") + '',
					        		EVENTO: '' + solicitacao.getValue(0,"dataset_solicitacaoevento") + ''
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
			
			obj.ccusto =  '' + solicitacao.getValue(0, "CENTRO_CUSTO") +'';	
			obj.atividade = '' + solicitacao.getValue(0, "ATIVIDADE") +'';	
			obj.alocacao = '' + solicitacao.getValue(0, "ALOCACAO") +'';
			obj.localizacao = '' + solicitacao.getValue(0, "LOCALIZACAO") +'';		    					
			obj.percentual = 1 * parseInt(solicitacao.getValue(0, "PERCENTUAL")) ;
			
			if (solicitacao.getValue(0, "PROJETO") != null){
				obj.projeto = '' + solicitacao.getValue(0, "PROJETO") +'';	
			}						    				
			if (solicitacao.getValue(0, "CATEGORIA") != null){
				obj.categoria = '' + solicitacao.getValue(0, "CATEGORIA") +'';
			}		    					
			if (solicitacao.getValue(0, "FONTE") != null){
				obj.fonte = '' + solicitacao.getValue(0, "FONTE") +'';
			}	    					
			if (solicitacao.getValue(0, "AREA")  != null){
				obj.area = '' + solicitacao.getValue(0, "AREA") +'';
			}									
			if (solicitacao.getValue(0, "CONTA_CONTABIL") != null){
				obj.conta = '' + solicitacao.getValue(0, "CONTA_CONTABIL") +'';	
			}
			
			rateio[i] = obj;	

	   
	 			   
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
