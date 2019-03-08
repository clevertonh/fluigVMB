function defineStructure() {
	addColumn("Codigo");
	addColumn("Descricao");
	addColumn("Centro_Custo");
	addColumn("Alocacao");
	addColumn("Localizacao");
	
	setKey(["Codigo"]);
	addIndex(["Codigo"]);
}


function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("Codigo");
	dataset.addColumn("Descricao");
	dataset.addColumn("Centro_Custo");
	dataset.addColumn("Alocacao");
	dataset.addColumn("Localizacao");

	var filtro = getConstraints(constraints, "Centro_Custo");

	//filtro ='20201';
	   var dados;
	   
	if (filtro != null) {	
		var webservice = '/ATIVIDADESXCCUSTO/'+filtro +'';
    	
    	try {
       	 var clientService = fluigAPI.getAuthorizeClientService();
       	 //realiza tentativa de conexão com link primario
   	        var data = {
   	            companyId : getValue("WKCompany") + '',
   	            serviceCode : 'REST FLUIG',
   	            endpoint : webservice,
   	            method : 'get',// 'delete', 'patch', 'put', 'get'     
   	            timeoutService: '100' // segundos	            	  
   	        }
       
       var vo = clientService.invoke(JSON.stringify(data));
       
   	        if(vo.getResult()== null || vo.getResult().isEmpty()){
   	        	//realiza tentativa de conexão com link secundario
   	            var data = {
   	    	            companyId : getValue("WKCompany") + '',
   	    	            serviceCode : 'REST FLUIG 2',
   	    	            endpoint :  webservice,
   	    	            method : 'get',// 'delete', 'patch', 'put', 'get'     
   	    	            timeoutService: '100' // segundos	            	  
   	    	        }   	
   	            vo = clientService.invoke(JSON.stringify(data));
   	            
   	        }
   	        else if (vo.getResult()== null || vo.getResult().isEmpty()){
   	        
   	        	throw new Exception("Retorno está vazio");
   	        }
       
       else{
//           log.info(vo.getResult());        
           dados = vo.getResult();
       }
       
       } catch(err) {
       	throw new Exception(err);
       }

       

		var objdata;
		
		var codigo = getConstraints(constraints, "Codigo");
		
		
		if (dados != null) {
			objdata = JSON.parse(dados);
			for ( var i in objdata) {
				if (codigo != "" && codigo != null && codigo != undefined) {
					if ((objdata[i].CATV.toUpperCase().indexOf(codigo.toUpperCase()) > -1 || objdata[i].CDESCATV.toUpperCase().indexOf(codigo.toUpperCase()) > -1)) {
						dataset.addRow([ objdata[i].CATV, objdata[i].CDESCATV, objdata[i].CT1, objdata[i].CT9, objdata[i].CT0 ]);
					}
				} else {
					dataset.addRow([ objdata[i].CATV, objdata[i].CDESCATV, objdata[i].CT1, objdata[i].CT9, objdata[i].CT0 ]);
				}

				/*
				 * else if(filtro == null) { dataset.addRow([objdata[i].CATV,
				 * objdata[i].CDESCATV, objdata[i].CT1, objdata[i].CT9,
				 * objdata[i].CT0]); }
				 */

			}
		}
	}
	return dataset;

}

function getConstraints(constraints, field) {
	if (constraints == null)
		return null;

	for (var i = 0; i < constraints.length; i++) {
		if (constraints[i].fieldName == field) {
			log.info("--------------DATASET CUSTOMIZADO-------------");
			log.info("CAMPO: "+field);
			log.info("CONSTRAINTS: "+constraints[i]);
			log.info("INFORMACAO DIGITADA: "+constraints[i].initialValue);
			
			
			return constraints[i].initialValue;
		}
	}

	return null;
}



