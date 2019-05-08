function createDataset(fields, constraints, sortFields) {

	//dataset usado para solicitações do tipo REMARCAÇÃO
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("produto");
	dataset.addColumn("quantidade");
	dataset.addColumn("valor");
	dataset.addColumn("dataViagem");
		
	
	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));	
	
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
    
    for(var x = 0 ; x < retornoDataset.rowsCount; x++){    	    	 
    	 var empresa = retornoDataset.getValue(x, "companyid");
    	 var carddocumentid =  retornoDataset.getValue(x, "metadata#id");
    	 var documentVersion = retornoDataset.getValue(x, "metadata#version");          
    	 var cardindexdocumentid = retornoDataset.getValue(x, "metadata#card_index_id")
	     
    	     		
    	 if (vooComprado =='sim' || hotelComprado =='sim'){
    	 	 //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
             var c1 = DatasetFactory.createConstraint("tablename", "tableViagem" , "tableViagem", ConstraintType.MUST);
             var c2 = DatasetFactory.createConstraint("metadata#id", carddocumentid, carddocumentid, ConstraintType.MUST);
             var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
             var constraintsFilhos = new Array(c1, c2, c3);

             //Busca o dataset
             var datasetFilhos = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsFilhos, null);
             for (var j = 0; j < datasetFilhos.rowsCount; j++) {            	 	
              	//Adiciona os valores nas colunas respectivamente.
                 dataset.addRow(new Array(
                         datasetFilhos.getValue(j, "codigoProduto"),
                         1,
                         datasetFilhos.getValue(j, "valores"),                         
                         datasetFilhos.getValue(j, "dtViagem")
                 ));
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
