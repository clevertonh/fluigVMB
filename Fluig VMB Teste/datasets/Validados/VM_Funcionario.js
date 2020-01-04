function defineStructure() {
	addColumn("NOME");
	addColumn("MAE");
	addColumn("RG");
	addColumn("CPF");
	addColumn("PASSAPORTE");
	addColumn("DTNASC");
	addColumn("EMAIL_G");
	addColumn("EMAIL_F");
	addColumn("ID_GERENTE");
	addColumn("NOME_GERENTE");
	addColumn("DEPARTAMENTO");
	addColumn("FILIAL");
	addColumn("MATRICULA");
	addColumn("DT_ADMISSAO");
	addColumn("FUNCAO");
	addColumn("GESTOR_MATRICIAL");
	addColumn("EMAIL_MATRICIAL");
	
	setKey(["EMAIL_F"]);
	addIndex(["EMAIL_F"]);
}


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
    dataset.addColumn("ID_GERENTE");
    dataset.addColumn("NOME_GERENTE");
    dataset.addColumn("DEPARTAMENTO");
    dataset.addColumn("FILIAL");
    dataset.addColumn("MATRICULA");
    dataset.addColumn("DT_ADMISSAO");
    dataset.addColumn("FUNCAO");
    dataset.addColumn("GESTOR_MATRICIAL");
    dataset.addColumn("EMAIL_MATRICIAL");
           
    var dados;
    var webservice = '/FUNCIONARIO';
   // var emailFuncionario = null;
    
    //var emailFuncionario =  getConstraints(constraints, 'CEMAILFUN');
    
    
    
    
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : webservice,
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '360' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint : webservice,
	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	    	            timeoutService: '360' // segundos	            	  
	    	        }   	
	            vo = clientService.invoke(JSON.stringify(data));
	            
	        }
	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
	        
	        	throw new Exception("Retorno está vazio");
	        }
    
    else{
    //    log.info(vo.getResult());        
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
				constraintsApr.push(DatasetFactory.createConstraint("mail", objdata[i].CEMAILG.toUpperCase(), objdata[i].CEMAILG.toUpperCase(), ConstraintType.MUST));    		
				var datasetAprovador = DatasetFactory.getDataset("colleague", null, constraintsApr, null);    	    		
			
				if (datasetAprovador.rowsCount > 0){
					dataset.addRow([objdata[i].CNOME, objdata[i].CMAE, objdata[i].CRG, objdata[i].CCPF, objdata[i].CPASSAP, objdata[i].CDATANASC, 
					                objdata[i].CEMAILG,objdata[i].CEMAILFUN, datasetAprovador.getValue(0,"colleaguePK.colleagueId"),
					                datasetAprovador.getValue(0,"colleagueName"),objdata[i].CDEPART,
					                null,null,
					                objdata[i].CADMISSAO,
					                objdata[i].CFUNCAO,
					                objdata[i].CMATRICIAL,
					                objdata[i].CEMAILMATR
					                ]);
				}
				else {
					dataset.addRow([objdata[i].CNOME, objdata[i].CMAE, objdata[i].CRG, objdata[i].CCPF, objdata[i].CPASSAP, 
					                objdata[i].CDATANASC, objdata[i].CEMAILG,
					                objdata[i].CEMAILFUN, null,null,objdata[i].CDEPART,null,null,
					                objdata[i].CADMISSAO,
					                objdata[i].CFUNCAO,
					                objdata[i].CMATRICIAL,
					                objdata[i].CEMAILMATR
					                ]);
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





