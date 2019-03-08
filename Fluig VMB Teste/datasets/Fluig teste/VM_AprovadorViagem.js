function defineStructure() {
	addColumn("NOME");
	addColumn("EMAIL_USUARIO");
	addColumn("EMAIL_APROVADOR");
	addColumn("MATRICULA_APROVADOR");
	addColumn("DIRETOR");
	addColumn("FUNCIONARIO_VMB");
	
	setKey(["EMAIL_USUARIO"]);
	addIndex(["EMAIL_USUARIO"]);
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NOME");
    dataset.addColumn("EMAIL_USUARIO");
    dataset.addColumn("EMAIL_APROVADOR");
    dataset.addColumn("MATRICULA_APROVADOR");
    dataset.addColumn("DIRETOR");  
    dataset.addColumn("FUNCIONARIO_VMB");   
    
        
    //verificar documentação sobre query param
    //rest/webservice?parametro=+variavel
    
     //var user = getConstraints(constraints, field);
    
	
	 
           
     var dados;
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/APR_VIAGEM',
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint : '/APR_VIAGEM',
	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	    	            timeoutService: '100' // segundos	            	  
	    	        }   	
	            vo = clientService.invoke(JSON.stringify(data));
	            
	        }
	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
	        
	        	throw new Exception("Retorno está vazio");
	        }
    
    else{
        log.info(vo.getResult());        
        dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
    var objdata;
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		    	 
    	for(var i in objdata){
    		
      		var constraintsApr   = new Array();		    		
			constraintsApr.push(DatasetFactory.createConstraint("mail", objdata[i].CEMAILG, objdata[i].CEMAILG, ConstraintType.MUST));    		
			var datasetAprovador = DatasetFactory.getDataset("colleague", null, constraintsApr, null);    	    		
		
			if (datasetAprovador.rowsCount > 0){
				dataset.addRow([objdata[i].CNOME, objdata[i].CEMAILFUN, objdata[i].CEMAILG, datasetAprovador.getValue(0,"colleaguePK.colleagueId"),datasetAprovador.getValue(0,"colleagueName"),  objdata[i].CFUNC]);	
			}						
    	}
	}
		
    return dataset;


    
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



