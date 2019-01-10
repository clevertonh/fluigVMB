function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Projeto");
	dataset.addColumn("Codigo");
    dataset.addColumn("Descricao");

    
    var codigo = getConstraints(constraints,"Projeto");
    var codigo = '186412';
    
    var filtro = getConstraints(constraints,"Codigo","Descricao");
    
 
    if (codigo!= null){
    	var webservice = '/AREA_ESTRATEGICA/'+codigo +'';
    	
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
   	        	//realiza tentativa de conexão com segundo link de internet
   	            var data = {
   	    	            companyId : getValue("WKCompany") + '',
   	    	            serviceCode : 'REST FLUIG 2',
   	    	         //endpoint : '/AREA_ESTRATEGICA/'+codigo +'',
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
//           log.info(vo.getResult());        
           dados = vo.getResult();
       }
       
       } catch(err) {
       	throw new Exception(err);
       }

        
        
        
        var objdata;  
        
        if(dados != null){
        	objdata = JSON.parse(dados);
    		for(var i in objdata){
    			if (filtro != "" && filtro!= null && filtro != undefined){
    				if ( objdata[i].CCODIGO.toUpperCase().indexOf(filtro.toUpperCase())  > -1 || objdata[i].CDESCRICAO.toUpperCase().indexOf(filtro.toUpperCase())  > -1 ) {
    					dataset.addRow([objdata[i].CPROJETO, objdata[i].CCODIGO, objdata[i].CDESCRICAO]);
    				}    				
    			}
    			else {
    				dataset.addRow([objdata[i].CPROJETO, objdata[i].CCODIGO, objdata[i].CDESCRICAO]);
    			}    			    			
    		}
    	}
    		
    }
    
      
    return dataset;

}

function getConstraints(constraints, field, field2){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field || constraints[i].fieldName == field2){
			return constraints[i].initialValue;
		}
	}
	
	return null;
}