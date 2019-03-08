function defineStructure() {
	addColumn("CODIGO");
	addColumn("DESCRICAO");
	addColumn("TIPO");

	
	setKey(["CODIGO"]);
	addIndex(["CODIGO"]);
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODIGO");
    dataset.addColumn("DESCRICAO");
    dataset.addColumn("TIPO");
         
    var objdata;
    var data;
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	     //BUSCA SERVIÇO CADASTRADO PARA PROVEDOR PRINCIPAL 
    	 var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/CENTRO_CUSTO',
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
    if(vo.getResult()== null || vo.getResult().isEmpty()){
    	//BUSCA SERVIÇO CADASTRADO PARA PROVEDOR SECUNDARIO EM CASO DE FALHA NO PRIMEIRO
        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG 2',
	            endpoint : '/CENTRO_CUSTO',
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
        data = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
    var filtro = getConstraints(constraints, "Descricao","Codigo");
    
    
    if(data != null){
    	objdata = JSON.parse(data);
		for(var i in objdata){
			if(filtro != null && (objdata[i].CDESCRICAO.toUpperCase().indexOf(filtro.toUpperCase())  > -1 || objdata[i].CCODIGO.indexOf(filtro)  > -1)){
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CTIPO]);
			
			}
			if(filtro == null){
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CTIPO]);			
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
			log.info("--------------DATASET CENTRO DE CUSTO-------------");
			log.info("CAMPO: "+field);
			log.info("CONSTRAINTS: "+constraints[i]);
			log.info("INFORMACAO DIGITADA: "+constraints[i].initialValue);
							
			return constraints[i].initialValue;
		}
	}
	
	return null;
}






