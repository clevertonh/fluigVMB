function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var aItemServico = new Array();
	var aRateio;
	var itens = new Array();

	
	log.info("LOG CONSTRAINTS");
	log.dir(constraints);
	//INTEGRAÇÃO PARA SER REALIZADA PRECISA RECEBER UMA CONSTRAINT COM O CAMPO solicitacao NA POSIÇÃO 0 e do tipo MUST
    if(constraints !== null && constraints.length){
    	if(constraints[0].constraintType==ConstraintType.MUST && constraints[0].fieldName == "solicitacao") {
    			var c0 = DatasetFactory.createConstraint("solicitacao", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
        		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);        		
        		var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, new Array(c0,c1), null);
        		
        		var c2 = DatasetFactory.createConstraint("SOLICITACAO", constraints[0].initialValue, constraints[0].initialValue, ConstraintType.MUST);    
        	    var itensSolicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagemDadosPagamento", null, new Array(c2), null);    				  

        	   // log.info("--RETORNO DE CONTRAINTS 23:51---")
        	    //log.dir(constraints);
        	    
        					 try {
        						//chama função que monta array de objetos dos itens do rateio
        						 aRateio = preencheRateio(itensSolicitacao);
        					 }
        					 catch (erro){
        						 dataset.addRow(["ERRO AO RECUPERAR RATEIO"]);
        					 }
        				  				 
        					 
        					 try {
        						 
        						 
        						 for (var a=0; a<constraints.length;a++){
        							 var codproduto;
        							 var vpassagem;
        							 var qtde;
        							 
        								 
        							 if (constraints[a].fieldName == "produto" ){
        								 codproduto = constraints[a].initialValue;
        								// log.info(constraints[a].initialValue);
        								 
        							 }
        							 else if (constraints[a].fieldName == "quantidade" ){
        								 qtde = constraints[a].initialValue;
        							 }
        							 else if (constraints[a].fieldName == "valor" ){
        								 vpassagem = constraints[a].initialValue;
        								//chama função que monta array de objetos dos itens da viagem   
        								 aItemServico.push(addItemViagem(codproduto,qtde,solicitacao.getValue(0,"tipoviagem"),solicitacao.getValue(0,"solicitacao"),vpassagem));    						 
        	        				
        								 //log.dir(aItemServico);
        							 }    			     				
         						 }
        					 }
        					 catch (erro){
        						 dataset.addRow(["ERRO AO MONTAR ITENS"]);
        					 }
        					 
        							
        					 try{
        					        var clientService = fluigAPI.getAuthorizeClientService();
        					        var data = {
        					            companyId : 1 + '',
        					            serviceCode : 'REST FLUIG',
        					            endpoint : '/F_MATA110',
        					            method : 'POST',// 'delete', 'patch', 'put', 'get'     
        					            timeoutService: '100', // segundos
        					            params : {
        					            	processo : '' + 1 + '' ,
        					            	solicitacao : '' + solicitacao.getValue(0,"solicitacao") + '' ,
        					            	solicitante : '' + solicitacao.getValue(0,"solicitante") +'',
        					            	emailsolicitante : '' + solicitacao.getValue(0,"emailsolicitante") +'', 
        					                datasolicitacao :'' + solicitacao.getValue(0,"datasolicitacao") +'',	
        					                passageiro : '' + solicitacao.getValue(0,"nomepassageiro") +'',
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
        					            //throw "Retorno está vazio";
        					        	log.info("RETORNO ESTA VAZIO");
        					        	dataset.addRow(new Array("RETORNO VAZIO"));
        					        }
        					        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
        					        	//throw JSON.parse(vo.getResult()).errorMessage;
        					        	log.info(JSON.parse(vo.getResult()).errorMessage);
        					        	dataset.addRow(new Array(JSON.parse(vo.getResult()).errorMessage));
        					        }
        					        else {
        					            log.info(vo.getResult());	           
        					            //dataset.addRow([vo.getResult()]);
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