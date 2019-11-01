function defineStructure() {
	addColumn("CODIGO");
	addColumn("CNPJ");
	addColumn("RAZAO_SOCIAL");
	addColumn("TIPO");
	addColumn("QTDE");
	
	addColumn("FANTASIA");
	addColumn("FORM_PGTO");
	addColumn("BANCO");
	addColumn("AGENCIA");
	addColumn("CONTA_F");
	addColumn("TIPO_CONTA");
	
	setKey(["CODIGO"]);
	
}


function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("CODIGO");
	dataset.addColumn("CNPJ");
	dataset.addColumn("RAZAO_SOCIAL");
	dataset.addColumn("TIPO");
	dataset.addColumn("QTDE");
	dataset.addColumn("FANTASIA");
	dataset.addColumn("FORM_PGTO");
	dataset.addColumn("BANCO");
	dataset.addColumn("AGENCIA");
	dataset.addColumn("CONTA_F");
	dataset.addColumn("TIPO_CONTA");
	
	  var objdata;
	    var dados;
	    
	    try {
	    	 var clientService = fluigAPI.getAuthorizeClientService();
		     //BUSCA SERVIÇO CADASTRADO PARA PROVEDOR PRINCIPAL 
	    	 var data = {
		            companyId : getValue("WKCompany") + '',
		            serviceCode : 'REST FLUIG',
		            endpoint : '/VM_FORNECEDOR',
		            method : 'get',// 'delete', 'patch', 'put', 'get'     
		            timeoutService: '100' // segundos	            	  
		        }
	    
	    var vo = clientService.invoke(JSON.stringify(data));
	    
	    if(vo.getResult()== null || vo.getResult().isEmpty()){
	    	//BUSCA SERVIÇO CADASTRADO PARA PROVEDOR SECUNDARIO EM CASO DE FALHA NO PRIMEIRO
	        var data = {
		            companyId : getValue("WKCompany") + '',
		            serviceCode : 'REST FLUIG 2',
		            endpoint : '/VM_FORNECEDOR',
		            method : 'get',// 'delete', 'patch', 'put', 'get'     
		            timeoutService: '100' // segundos	            	  
		        }   	
	        vo = clientService.invoke(JSON.stringify(data));
	        
	    }
	    else if (vo.getResult()== null || vo.getResult().isEmpty()){
	    
	    	throw new Exception("Retorno está vazio");
	    }
	    
	    else{
	        //log.info(vo.getResult());        
	    	dados = vo.getResult();
	    }
	    
	    } catch(err) {
	    	throw new Exception(err);
	    }
	    
	    var filtro = getConstraints(constraints, "RAZAO_SOCIAL","CODIGO");
	    
	    
	    if(dados != null){
	    	objdata = JSON.parse(dados);
			for(var i in objdata){
				if(filtro != null && (objdata[i].CNOME.toUpperCase().indexOf(filtro.toUpperCase())  > -1 || objdata[i].CCODIGO.indexOf(filtro)  > -1)){
					dataset.addRow([objdata[i].CCODIGO, objdata[i].CCGC, objdata[i].CNOME, objdata[i].CTIPO.trim(),objdata[i].NQTDE_ADF,objdata[i].CREDUZ,objdata[i].CFPGTO,objdata[i].CBANCO,objdata[i].CAGENCIA,objdata[i].CCONTAF,objdata[i].CTIPOC]);	
				
				}
				if(filtro == null){
					dataset.addRow([objdata[i].CCODIGO, objdata[i].CCGC, objdata[i].CNOME, objdata[i].CTIPO.trim(),objdata[i].NQTDE_ADF,objdata[i].CREDUZ,objdata[i].CFPGTO,objdata[i].CBANCO,objdata[i].CAGENCIA,objdata[i].CCONTAF,objdata[i].CTIPOC]);			
				}		
			}
		}
	    	
	    return dataset;

	
}


function getConstraints(constraints, field, field2){
	
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field || constraints[i].fieldName == field2 ){		
							
			return constraints[i].initialValue;
		}
	}
	
	return null;
}

