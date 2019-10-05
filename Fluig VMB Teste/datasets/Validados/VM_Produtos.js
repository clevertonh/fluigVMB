function defineStructure() {
	addColumn("CODIGO");
	addColumn("DESCRICAO");
	addColumn("PRODUTO");
	addColumn("UNIDADE_MEDIDA");
	addColumn("ULTIMA_COMPRA");
	addColumn("TERMO_REFERENCIA");
	addColumn("FLUIG");
	addColumn("GERA_SC");
	addColumn("ULTIMO_VALOR");
	addColumn("PRAZO_FORNECEDOR");
	
	setKey(["CODIGO"]);
	addIndex(["CODIGO"]);
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("CODIGO");
	 dataset.addColumn("DESCRICAO");
	 dataset.addColumn("PRODUTO");
	 dataset.addColumn("UNIDADE_MEDIDA");
	 dataset.addColumn("ULTIMA_COMPRA");
	 dataset.addColumn("TERMO_REFERENCIA");
	 dataset.addColumn("FLUIG");
	 dataset.addColumn("GERA_SC");
	 dataset.addColumn("ULTIMO_VALOR");
	 dataset.addColumn("PRAZO_FORNECEDOR");
	 
    var dados;
    var webservice = '/PRODUTO';
     
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : webservice,
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG ',
	    	            endpoint : webservice,
	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	    	            timeoutService: '100' // segundos	            	  
	    	        }   	
	            vo = clientService.invoke(JSON.stringify(data));
	            
	        }
	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
	        
	        	throw new Exception("Retorno está vazio");
	        }
    
    else{       
        dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
   
    var objdata;
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		for(var i in objdata){
			dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CPRODUTO, objdata[i].CUNIDADE, objdata[i].CULTIMAC,objdata[i].CTERMOREF, objdata[i].CFLUIG, objdata[i].CGERASC, objdata[i].CULTIMOV,objdata[i].CPRAZOFOR]);					
		}
	}
		
    return dataset;

}




function getConstraints(constraints, field){
	
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field  ){		
			return constraints[i].initialValue;
		}
	}
	
	return null;
}



