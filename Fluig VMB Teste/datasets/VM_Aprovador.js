function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NOME");
    dataset.addColumn("EMAIL_FUN");
    dataset.addColumn("EMAIL_APR");
    dataset.addColumn("MATRICULA_APR");   
    
	 var user = getValue("WKUser");	
	
	 var constraints   = new Array();
	 constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
	 var datasetFuncionario = DatasetFactory.getDataset("colleague", null, constraints, null);
	 			 			 			 	 
	 var emailFuncionario = datasetFuncionario.getValue(0, "mail");
           
     var dados;
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/FUNCIONARIO/'+ emailFuncionario,
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint : '/FUNCIONARIO/'+ emailFuncionario,
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
			constraintsApr.push(DatasetFactory.createConstraint("mail", objdata[i].CAPRVIAGEM, objdata[i].CAPRVIAGEM, ConstraintType.MUST));
//			constraintsApr.push(DatasetFactory.createConstraint("mail", "DANUBIA_CARVALHO@WVI.ORG", "DANUBIA_CARVALHO@WVI.ORG", ConstraintType.MUST));    		
			var datasetAprovador = DatasetFactory.getDataset("colleague", null, constraintsApr, null);    	    		
		
			if (datasetAprovador.rowsCount > 0){
				dataset.addRow([objdata[i].CNOME, objdata[i].CEMAILFUN, objdata[i].CAPRVIAGEM, datasetAprovador.getValue(0,"colleaguePK.colleagueId")]);	
			}						

			//dataset.addRow([objdata[i].CNOME, objdata[i].CEMAILFUN, objdata[i].CAPRVIAGEM]);
    	}
	}
		
    return dataset;

}





