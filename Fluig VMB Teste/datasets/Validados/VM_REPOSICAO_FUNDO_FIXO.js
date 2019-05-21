function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var valorDiarias;
	var dataVencimento;
	var vl_tarifa;
	var fornecedor_tarifa;
	var dt_tarifa;
	var aRateio = new Array();

	 
	 if(constraints !== null && constraints.length){
		//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
		 if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") {
			// log.info("entrando aqui 1");
	    		
			 	var documentId = constraints[0].initialValue;
			 	var dtAprovacao = constraints[1].initialValue;
			 
			 	var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
	    		var solicitacao = DatasetFactory.getDataset("VM_ReposicoesFundoFixo", null, new Array(c0,c1), null);
	    		
	    		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        	

        		if (solicitacao.getValue(0,"tipoffx") == "administrativo"){
        			tipoFFX =2;
        		}
        		else {
        			tipoFFX =1;
        		}
        		
				
					 try {
						 var clientService = fluigAPI.getAuthorizeClientService();
					        var data = {
						        	companyId : 1 + '',
						        	serviceCode : 'REST FLUIG',
						            endpoint : '/F_FUNDOFX',
						            method : 'POST',// 'delete', 'patch', 'put', 'get'     
						            timeoutService: '100', // segundos
						            params : {
						            	DATAPAGTO : '' + solicitacao.getValue(0,"dtDeposito") + '',
						            	TIPOFFX : '' + tipoFFX +'',
						            	VALOR : '' + solicitacao.getValue(0,"vl_reposicao") + '' ,
						            	CPF_FORNECEDOR :'' + solicitacao.getValue(0,"cpfbeneficiario") +'',	
						            	ANO_FISCAL : '' + "" +"2019"+'',
						            	EMAIL_APROVADOR	: '' + solicitacao.getValue(0,"emailAprovador") +'',
						            	EMAIL_SOLICITANTE	: '' + solicitacao.getValue(0,"emailSolicitante") +'',
						            	DATAAPROV  : '' + dtAprovacao + '',
						            	SOLICITACAO  : '' + codSolicitacao + '' ,
						            	OPERACAO:'' + "2" + '',
						            	HISTORICO  : '' + "REPOSICAO FUNDO FIXO" + '',
						            	DATASOLICITACAO :'' + solicitacao.getValue(0,"dtSolicitacao") + '',
						            	IDDOCUMENTO: '' + solicitacao.getValue(0,"documentid") + ''
						            },
						          options : {
						             encoding : 'UTF-8',
						             mediaType: 'application/json'
						          }
						        }
				         
					      //  log.info("---RETORNO PARAMETROS---");
					     //   log.dir(data);
					        
					        var vo = clientService.invoke(JSON.stringify(data));
				         
					        if(vo.getResult()== null || vo.getResult().isEmpty()){
					        	log.info("RETORNO ESTA VAZIO");
					        	dataset.addRow(new Array("RETORNO VAZIO"));
					        }
					        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){					        	
					        	//log.info(JSON.parse(vo.getResult()).errorMessage);
					        	dataset.addRow(new Array(JSON.parse(vo.getResult()).errorMessage));
					        }
					        else if (JSON.parse(vo.getResult()).CODIGO != "100"){
					        	dataset.addRow([vo.getResult()]);
					        }
					        else if (JSON.parse(vo.getResult()).CODIGO == "100"){	            
					        	//log.info(vo.getResult());	           
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




//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 

   return historicoFormulario;
}
