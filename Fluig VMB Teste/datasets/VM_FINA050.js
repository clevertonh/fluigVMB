function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    	try {
    		var clientService = fluigAPI.getAuthorizeClientService();
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : '/F_FINA050',
	            method : 'POST',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100', // segundos
	            params : {
	            	processo : '' + 1 + '' ,
	            	solicitacao : '' + codSolicitacao + '' ,
	                solicitante : '' + solicitante +'',
	                valorTotal : '' + valorDiarias + '' ,
	                datasolicitacao :'' + datasolicitacao +'',	
	                emailsolicitante : '' + emailsolicitante +'',
	                cpf				: '' + cpf +'',
	        		rateioDigitado: aRateio 
	            },
	          options : {
	             encoding : 'UTF-8',
	             mediaType: 'application/json'
	          }
	        }
         
     	        var vo = clientService.invoke(JSON.stringify(data));
         
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	            throw "Retorno está vazio";
	        }
	        else if((JSON.parse(vo.getResult()).errorMessage != null && JSON.parse(vo.getResult()).errorMessage != "")){
	        	throw JSON.parse(vo.getResult()).errorMessage;
	        }
	        else {	            
	        	log.info(vo.getResult());
	        }
	        
    	}  catch(err) {
           	throw new Exception(err);
        }
    	
 
	
	

}function onMobileSync(user) {

}