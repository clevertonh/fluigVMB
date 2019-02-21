function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Codigo");
    dataset.addColumn("Descricao");
    dataset.addColumn("Conta");
    
    var filtro = getConstraints(constraints, "Codigo","Descricao","Conta");

    var dados;
    
    var webservice = '/PROJETO';
 	
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
 	        	//realiza tentativa de conexão com link secundario
 	            var data = {
 	    	            companyId : getValue("WKCompany") + '',
 	    	            serviceCode : 'REST FLUIG 2',
 	    	            endpoint :  webservice,
 	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
 	    	            timeoutService: '100' // segundos	            	  
 	    	        }   	
 	            vo = clientService.invoke(JSON.stringify(data));
 	            
 	        }
 	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
 	        
 	        	throw new Exception("Retorno está vazio");
 	        }
    
    else{
//        log.info(vo.getResult());        
        dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
    
    var objdata;  
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		for(var i in objdata){
			if(filtro != null && (objdata[i].CCODIGO.indexOf(filtro)  > -1 || objdata[i].CDESCRICAO.toUpperCase().indexOf(filtro.toUpperCase())  > -1 || objdata[i].CCONTA.toUpperCase().indexOf(filtro.toUpperCase())  > -1 ))
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CCONTA]);
			if(filtro == null)
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CCONTA]);
		}
	}
		
    return dataset;

}

function getConstraints(constraints, field, field2, field3){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field || constraints[i].fieldName == field2 || constraints[i].fieldName == field3){
			return constraints[i].initialValue;
		}
	}
	
	return null;
}