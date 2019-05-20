function createDataset(fields, constraints, sortFields) {
	  var dataset = DatasetBuilder.newDataset();
	    dataset.addColumn("PROCESSO");
	    dataset.addColumn("SOLICITACAO");
	    dataset.addColumn("DATA_PAGAMENTO");
	    
	    var dados;
	   // var solicitacao ='1678';
	   
	    //constraints[0].fieldName == "documentid"
	    
	    if(constraints!==null && constraints.length){ //se tiver constraint filtra
	        if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "documentid") { // implementação somente para o MUST
	        	var c0 = DatasetFactory.createConstraint("documentid", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
	    		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
	    		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, new Array(c0,c1), null);
	    		
	    		if (solicitacao.rowsCount == 0){
	    			solicitacao = DatasetFactory.getDataset("VM_SolicitacoesReembolsoAuxilioCreche1", null, new Array(c0,c1), null);
	    		}
	    		
	    		//log.info("VM PAGAMENTOS");
	    		//log.dir(solicitacao);
	    		
	    		var retornaProcessoSolicitacao = retornaSolicitacao(solicitacao.getValue(0,"metadata#card_index_id"),solicitacao.getValue(0,"documentid"),solicitacao.getValue(0,"companyid"));
        		var codSolicitacao = retornaProcessoSolicitacao.getValue(0,"workflowProcessPK.processInstanceId");
        	
	        		        	
	        	var webservice = '/PAGAMENTOS/'+codSolicitacao;	        	
	        	
	        	 try {
	            	 var clientService = fluigAPI.getAuthorizeClientService();
	            	 //realiza tentativa de conexão com link primario
	         	        var data = {
	         	            companyId : getValue("WKCompany") + '',
	         	            serviceCode : 'REST FLUIG',
	         	            endpoint : webservice,
	         	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	         	            timeoutService: '100' // segundos	            	  
	         	        }
	            
	         	       var vo = clientService.invoke(JSON.stringify(data));
				        
				        if(vo.getResult()== null || vo.getResult().isEmpty()){
				            //throw "Retorno está vazio";
				        	log.info("RETORNO ESTA VAZIO");
				        	dataset.addRow(new Array("RETORNO VAZIO"));
				        }
			   
				        else{
				        	//log.info(vo.getResult());        
				        	dados = vo.getResult();
				        	}
				    } 
					catch(err) {
				        //throw err;
						//log.info(err);
						dataset.addRow([err.message]);
				    }
	        	 
	        	 
	        }
	    }
	    
	     var objdata;  
	     
	     if(dados != null){
	     	objdata = JSON.parse(dados);
	 		for(var i in objdata){
	 			dataset.addRow([objdata[i].CPROCESSO, objdata[i].CSOLICITACAO, objdata[i].CDTBAIXA]);
	 		}
	 	}
	 		
	     return dataset;

	 }


	 function getConstraints(constraints, field){
	 	if(constraints == null)
	 		return null;
	 	
	 	for(var i=0;i<constraints.length;i++){
	 		if(constraints[i].fieldName == field ){
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