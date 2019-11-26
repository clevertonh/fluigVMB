//NO PROTHEUS CORRESPONDE A CLASSE DE VALOR
function defineStructure() {
	addColumn("CONTRATO");
	addColumn("REVISAO");
	addColumn("VALOR_TOTAL");
	addColumn("SALDO");
	addColumn("DT_INICIO");
	addColumn("DT_FIM");
	addColumn("CODIGO_FORNECE");
	addColumn("CGC");
	addColumn("FORNECEDOR");
	addColumn("FILIAL");
	
	
	
	setKey(["CONTRATO","REVISAO"]);
	//addIndex(["CONTRATO"]);
	//addIndex(["CGC"]);
	
}


function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CONTRATO");
    dataset.addColumn("REVISAO");
    dataset.addColumn("VALOR_TOTAL");
    dataset.addColumn("SALDO");
    dataset.addColumn("DT_INICIO");
    dataset.addColumn("DT_FIM");
    dataset.addColumn("CODIGO_FORNECE");
    dataset.addColumn("CGC");
    dataset.addColumn("FORNECEDOR");
    dataset.addColumn("FILIAL");
    
    var dados;
    
   var webservice = '/VM_CONTRATOS';
	
	try {
   	 var clientService = fluigAPI.getAuthorizeClientService();
   	 //realiza tentativa de conexão com link primario
	        var data = {
	            companyId : getValue("WKCompany") + '',
	            serviceCode : 'REST FLUIG',
	            endpoint : webservice,
	            method : 'get',   
	            timeoutService: '240'        	  
	        }
   
   var vo = clientService.invoke(JSON.stringify(data));
   
	        if(vo.getResult()== null || vo.getResult().isEmpty()){
	        	//realiza tentativa de conexão com link secundario
	            var data = {
	    	            companyId : getValue("WKCompany") + '',
	    	            serviceCode : 'REST FLUIG 2',
	    	            endpoint :  webservice,
	    	            method : 'get',    
	    	            timeoutService: '240'       	  
	    	        }   	
	            vo = clientService.invoke(JSON.stringify(data));
	            
	        }
	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
	        
	        	throw new Exception("Retorno está vazio");
	        }
   
	        else{    
	        	dados = vo.getResult();
	        	}
   
   } catch(err) {
   		throw new Exception(err);
   }
    
    
    var objdata;  
    //var filtro = getConstraints(constraints, "DESC_COMPETENCIA");
    
    if(dados != null){
    	objdata = JSON.parse(dados);
		for(var i in objdata){
			dataset.addRow([objdata[i].CCONTRATO, 
			                objdata[i].CREVISAO,
			                objdata[i].NVALORT,
			                objdata[i].NSALDO, 
			                objdata[i].DDTINICIO,
			                objdata[i].DDTFIM,
			                objdata[i].CCODIGOF,
			                objdata[i].CCGC,
			                objdata[i].CFORNECE,
			                objdata[i].CFILCTR
			                ]
			);
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