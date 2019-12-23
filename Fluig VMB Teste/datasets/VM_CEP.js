function defineStructure() {
	addColumn("CEP");
	addColumn("LOGRADOURO");
	addColumn("BAIRRO");
	addColumn("MUNICIPIO");
	addColumn("ESTADO");

	
	setKey(["CEP"]);
	//addIndex(["CEP"]);
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
    var CEP ="50010340";
    
    try {
    	 var clientService = fluigAPI.getAuthorizeClientService();
	     //BUSCA SERVIÇO CADASTRADO PARA PROVEDOR PRINCIPAL 
    	 var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'CEP',
	            endpoint : CEP + '/json',
	            method : 'get',// 'delete', 'patch', 'put', 'get'     
	            timeoutService: '100' // segundos	            	  
	        }
    
    var vo = clientService.invoke(JSON.stringify(data));
    
     if (vo.getResult()== null || vo.getResult().isEmpty()){
    
    	throw new Exception("Não foi possivel consultar o endereço. Preencha manualmente.");
    }
    
    else{
     	dados = vo.getResult();
    }
    
    } catch(err) {
    	throw new Exception(err);
    }
    
    
     if(dados != null){
    	objdata = JSON.parse(dados);      	
 		
		dataset.addRow([objdata.cep, objdata.logradouro, objdata.bairro, objdata.localidade, objdata.uf]);		
				
	}
    	
    return dataset;

}




function getConstraints(constraints, field){
	
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field  ){		
			return constraints[i].initialValue;
		}
	}
	
	return null;
}


/*
 * 
 * {
  "uf" : "PE",
  "complemento" : "",
  "logradouro" : "Rua do Fogo",
  "bairro" : "Santo Antônio",
  "localidade" : "Recife",
  "ibge" : "2611606",
  "unidade" : "",
  "gia" : "",
  "cep" : "50010-340"
}
 */




