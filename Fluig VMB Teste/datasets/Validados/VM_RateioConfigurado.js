function defineStructure() {
	addColumn("CODIGO");	
	addColumn("DESCRICAO");
	addColumn("TIPO");
	
	
	setKey(["CODIGO"]);
	addIndex(["CODIGO"]);
	
}
function onSync(lastSyncDate) {
	
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODIGO");
    dataset.addColumn("DESCRICAO");
    dataset.addColumn("TIPO");
    
   // var filtro = getConstraints(constraints, "Descricao");
   
	var dados;       
    var webservice = '/RATEIO';
	
	try {
   	 var clientService = fluigAPI.getAuthorizeClientService();
   	 //realiza tentativa de conexão com link primario
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : webservice,
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '360' // segundos	            	  
	        }
   
   var vo = clientService.invoke(JSON.stringify(data));
   
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	//realiza tentativa de conexão com link secundario
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint :  webservice,
	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	    	            timeoutService: '360' // segundos	            	  
	    	        }   	
	            vo = clientService.invoke(JSON.stringify(data));
	            
	            if (vo.getResult()== null || vo.getResult().isEmpty()){
	    	        
		        	throw new Exception("Retorno está vazio");
		        }
	   
	            else{  
	            	dados = vo.getResult();
	            }
	            
	        }	      
   
   else{  
       dados = vo.getResult();
   }
   
   } catch(err) {
   	throw new Exception(err);
   }
    
    var objdata;  
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		for(var i in objdata){
				dataset.addRow([objdata[i].CCODIGO, objdata[i].CDESC, objdata[i].CTIPO]);
		}
	}
		
    return dataset;

}

function getConstraints(constraints, field){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field ){
			return constraints[i].initialValue;
		}
	}
	
	return null;
}