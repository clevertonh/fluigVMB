function defineStructure() {
	addColumn("CEP");
	addColumn("LOGRADOURO");
	addColumn("BAIRRO");
	addColumn("MUNICIPIO");
	addColumn("ESTADO");

	
	setKey(["CEP"]);
	addIndex(["CEP"]);
}

function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CEP");
    dataset.addColumn("LOGRADOURO");
    dataset.addColumn("BAIRRO");
    dataset.addColumn("MUNICIPIO");
    dataset.addColumn("ESTADO");
         
    var objdata;
    var dados;
    var CEP;
    // https://viacep.com.br/ws/01001000/json/
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	     //BUSCA SERVIÇO CADASTRADO PARA PROVEDOR PRINCIPAL 
    	 var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'CONSULTA CEP',
	            endpoint : '/'+CEP+'/json',
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
     if (vo.getResult()== null || vo.getResult().isEmpty()){
    
    	throw new Exception("Não foi possivel consultar o endereço. Preencha manualmente.");
    }
    
    else{
        //log.info(vo.getResult());        
    	dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
    var filtro = getConstraints(constraints,"CODIGO");
    
    
    if(dados != null){
    	objdata = JSON.parse(dados);
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
		
							
			return constraints[i].initialValue;
		}
	}
	
	return null;
}






