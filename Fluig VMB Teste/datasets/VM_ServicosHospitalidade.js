/*
function createDataset(fields, constraints, sortFields) {
	 var dataset = DatasetBuilder.newDataset();
	
	 dataset.addColumn("CODIGO");
	 dataset.addColumn("DESCRICAO");
	 dataset.addColumn("PRODUTO");
	 
	
	 
	 dataset.addRow(new Array("DVPSG001", "PASSAGEM NACIONAL", "DVPSG001-PASSAGEM NACIONAL"));
	 dataset.addRow(new Array("DVPSG002", "PASSAGEM INTERNACIONAL", "DVPSG002-PASSAGEM INTERNACIONAL"));
	 dataset.addRow(new Array("DVVIG002", "SEGURO VIAGEM", "DVVIG002-SEGURO VIAGEM"));
	 dataset.addRow(new Array("DVVIG003", "VISTO", "DVVIG003-VISTO"));
	 dataset.addRow(new Array("DVHOS001", "HOSPEDAGEM NACIONAL", "DVHOS001-HOSPEDAGEM NACIONAL"));
	 dataset.addRow(new Array("DVHOS002", "HOSPEDAGEM INTERNACIONAL", "DVHOS002-HOSPEDAGEM INTERNACIONAL"));
	 
	   
	    
	  
	  return dataset;

}

*/

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("CODIGO");
	 dataset.addColumn("DESCRICAO");
	 dataset.addColumn("PRODUTO");
	 dataset.addColumn("FLUIG");
          
    var dados;
    var webservice;
    
    //var filtro = getConstraints(constraints, "FLUIG");
    var filtro = 1;
    if (filtro!= null){
    	webservice = '/PRODUTO/'+filtro +'';
    }
    else {
    	webservice = '/PRODUTO/';
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
			if(filtro != null ){
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CPRODUTO, objdata[i].CFLUIG]);
			
			}
			if(filtro == null){
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESCRICAO, objdata[i].CPRODUTO, objdata[i].CFLUIG]);		
			}		
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



