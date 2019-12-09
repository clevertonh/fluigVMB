function defineStructure() {
	addColumn("CPF");
	addColumn("EMAIL");
	addColumn("DATA_INICIO");
	addColumn("DATA_FIM");
	addColumn("STATUS");
	
	
	
	setKey(["CPF"]);
	
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("CPF");
	 dataset.addColumn("EMAIL");
	 dataset.addColumn("DATA_INICIO");
	 dataset.addColumn("DATA_FIM");
	 dataset.addColumn("STATUS");

	 
    var dados;
    var webservice = '/AFASTADOS';
     
    
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
       // log.info(vo.getResult());        
        dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
   
    var objdata;
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		for(var i in objdata){
			dataset.addRow([objdata[i].CCPF, objdata[i].CEMAILF, objdata[i].CDATAI, objdata[i].CDATAF, objdata[i].CSTATUS]);					
		}
	}
		
    return dataset;

}




function getConstraints(constraints, field){
	
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field  ){		
			log.info("--------------DATASET CENTRO DE CUSTO-------------");
//			log.info("CAMPO: "+field);
			log.info("CONSTRAINTS: "+constraints[i]);
			log.info("INFORMACAO DIGITADA: "+constraints[i].initialValue);
							
			return constraints[i].initialValue;
		}
	}
	
	return null;
}





