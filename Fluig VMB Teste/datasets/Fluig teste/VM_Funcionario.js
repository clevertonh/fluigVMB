function createDataset(fields, constraints, sortFields) {
	
	//retorna lista de funcionários
	
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NOME");
	dataset.addColumn("MAE");
    dataset.addColumn("RG");
    dataset.addColumn("CPF");
    dataset.addColumn("PASSAPORTE");
    dataset.addColumn("DTNASC");
    dataset.addColumn("EMAIL_G");
    dataset.addColumn("EMAIL_F");
           
    var dados;
    var webservice;
    var emailFuncionario = null;
    
    //var emailFuncionario =  getConstraints(constraints, 'CEMAILFUN');
    
    if (emailFuncionario != null && emailFuncionario != ''){
    	webservice = '/FUNCIONARIO/'+emailFuncionario +'';
    }
    else {
    	webservice = '/FUNCIONARIO';
    }
    
    
    
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
	    	            serviceCode : 'REST FLUIG 2',
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
			dataset.addRow([objdata[i].CNOME, objdata[i].CMAE, objdata[i].CRG, objdata[i].CCPF, objdata[i].CPASSAP, objdata[i].CDATANASC, objdata[i].CEMAILG,objdata[i].CEMAILFUN]);
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





