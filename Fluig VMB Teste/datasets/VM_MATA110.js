function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	
	var aItemServico = new Array();
	
	 var c1 = DatasetFactory.createConstraint("metadata#id", "1579", "1579", ConstraintType.MUST);	    
	 //var solicitacao = DatasetFactory.getDataset("VM_SolicitacoesViagemDadosPagamento", null, new Array(c1), null);
	 var solicitacao = DatasetFactory.getDataset("ds_get_SolicitacaoViagemDadosPagamento", null, new Array(c1), null);
	 
	// log.info("------INTEGRACAO MATA110----");
	// log.dir(solicitacao);
	 
	 //chama função que preenche rateio
	 var aRateio = preencheRateio(solicitacao);
	 
	 addItemViagem("DVPSG001",1,"Nacional","1579","200");
	 
	//throw "Integrado com o Protheus"			
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
	            	solicitacao : '' + "1" + '' ,
	            	solicitante : '' + "WASLEY" +'',
	            	emailsolicitante : '' + "wasley_santos@wvi.org" +'',
	                cpf				: '' + "01666448621" +'',
	                datasolicitacao :'' + "09/03/2018" +'',	
	                passageiro : '' + "WASLEY SANTOS" +'',
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
	        	dataset.addRow(new Array("RETORNO ESTA VAZIO"));
	        }
	        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
	        	//throw JSON.parse(vo.getResult()).errorMessage;
	        	log.info(JSON.parse(vo.getResult()).errorMessage);
	        	dataset.addRow(new Array(JSON.parse(vo.getResult()).errorMessage));
	        }
	        else {
	            //log.info(vo.getResult());	           
	            dataset.addRow([vo.getResult()]);
	        }
	    } 
		catch(err) {
	        //throw err;
			//log.info(err);
			dataset.addRow([err.message]);
			//ta entrando sempre aqui, mas esta executando
	    }		
	
	

		   
		   
		   //FUNÇÃO QUE ADD ITEM NA SOLICITAÇÃO DE COMPRA
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
				
				aItemServico.push(itemServico);
		   }
		 	
	return dataset;
}

function preencheRateio(solicitacao){
	   var rateio = new Array();
	   
	   for (var i=0; i < solicitacao.length ; i++){
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