function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NOME");
    dataset.addColumn("EMAIL_USUARIO");
    dataset.addColumn("EMAIL_APROVADOR");
    dataset.addColumn("MATRICULA_APROVADOR");
    dataset.addColumn("DIRETOR");   
    
        
	 var user = getValue("WKUser");	
	 var constraintUser   = new Array();
	 constraintUser.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
	 var datasetFuncionario = DatasetFactory.getDataset("colleague", null, constraintUser, null);
	 			 			 			 	 
	 var emailFuncionario = datasetFuncionario.getValue(0, "mail"); 
	 
           
     var dados;
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/APR_VIAGEM/'+ emailFuncionario,
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint : '/APR_VIAGEM/'+ emailFuncionario,
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
				dataset.addRow([objdata[i].CNOME, objdata[i].CEMAILFUN, objdata[i].CEMAILG, datasetAprovador.getValue(0,"colleaguePK.colleagueId"),datasetAprovador.getValue(0,"colleagueName")]);	
			}						
    	}
	}
		
    return dataset;

}



