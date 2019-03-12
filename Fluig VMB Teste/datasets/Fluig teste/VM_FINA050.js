function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var valorDiarias;
	var dataVencimento;
	var aRateio = new Array();
	 
	 if(constraints !== null && constraints.length){
		//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
		 if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "solicitacao") {
			// log.info("entrando aqui 1");
	    		var c0 = DatasetFactory.createConstraint("solicitacao", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
	    		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, new Array(c0,c1), null);
	    		
	    		var c2 = DatasetFactory.createConstraint("SOLICITACAO", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
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
					 //atribui constraints recebida de valor e datavencimento a variaveis
					 for (var a=0; a<constraints.length;a++){						
						 if (constraints[a].fieldName == "valorDiarias" ){
							 valorDiarias = constraints[a].initialValue;
						 }
						 else if (constraints[a].fieldName == "dataVencimento" ){
							 dataVencimento = constraints[a].initialValue;
							 
							 
						 }
					 }
					 //log.info("entrando aqui 2");
					// log.dir(constraints);
				
					 try {
						 var clientService = fluigAPI.getAuthorizeClientService();
					        var data = {
					        		 companyId : 1 + '',
					        	serviceCode : 'REST FLUIG',
					            endpoint : '/F_FINA050',
					            method : 'POST',// 'delete', 'patch', 'put', 'get'     
					            timeoutService: '100', // segundos
					            params : {
					            	processo : '' + 1 + '' ,
					            	solicitacao : '' + solicitacao.getValue(0,"solicitacao") + '' ,
					                solicitante : '' + solicitacao.getValue(0,"solicitante") +'',
					                valorTotal : '' + valorDiarias + '' ,
					                datasolicitacao :'' + solicitacao.getValue(0,"datasolicitacao") +'',	
					                emailsolicitante : '' + solicitacao.getValue(0,"emailsolicitante") +'',
					                cpf				: '' + solicitacao.getValue(0,"cpfpassageiro") +'',
					                dataVencimento  : '' + dataVencimento + '',
					        		rateioDigitado: aRateio 
					            },
					      
					            
					            
					          options : {
					             encoding : 'UTF-8',
					             mediaType: 'application/json'
					          }
					        }
				         
					        //log.info("---RETORNO PARAMETROS---");
					        //log.dir(params);
					        
					        var vo = clientService.invoke(JSON.stringify(data));
				         
					        if(vo.getResult()== null || vo.getResult().isEmpty()){
					        	log.info("RETORNO ESTA VAZIO");
					        	dataset.addRow(new Array("RETORNO VAZIO"));
					        }
					        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){					        	
					        	//log.info(JSON.parse(vo.getResult()).errorMessage);
					        	dataset.addRow(new Array(JSON.parse(vo.getResult()).errorMessage));
					        }
					        else {	            
					        	log.info(vo.getResult());	           
					            //dataset.addRow([vo.getResult()]);
					            dataset.addRow(new Array("SUCESSO"));
					        }
					        
				    	}  catch(err) {
				    		   //throw err;
							//log.info(err);
							dataset.addRow([err.message]);
				    		//dataset.addRow(new Array("entrando aqui"));
							
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
			
			//log.info("--retorno rateio--");
			//log.dir(rateio[i]);
	   }
	 			   
	   return rateio;
}