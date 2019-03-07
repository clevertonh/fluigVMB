function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODIGO");
	dataset.addColumn("MES AGENDA");
	dataset.addColumn("PERIODO DE");
	dataset.addColumn("PERIODO ATE");
	dataset.addColumn("ATIVIDADE");
	
	    var codigo = getConstraints(constraints,"CodigoAgenda");

		log.info('-----codigo agenda---');
		log.info(codigo);
		
	    //var codigo = 1509;
		var constraints = new Array();
		constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
		if (codigo != null || codigo != null){
			constraints.push(DatasetFactory.createConstraint("codigoAgenda", codigo, codigo, ConstraintType.MUST));
		}
		
	    
		var datasetPrincipal = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);
	
	    
	    for(var i = 0 ; i < datasetPrincipal.rowsCount; i++){
	    	 var documentId = datasetPrincipal.getValue(i, "metadata#id");
	         var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
	    
	         var constraintsFilhos = new Array();
	   		constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tbAgendaViagem" , "tbAgendaViagem", ConstraintType.MUST));
	   		constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	   		constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
	   		//constraintsFilhos.push(DatasetFactory.createConstraint("aprovacao", "aprovado", "aprovado", ConstraintType.MUST));
	   		

	 	   	    
	 	   
	   		 var datasetFilhos = DatasetFactory.getDataset("VM_AgendaViagem", null, constraintsFilhos, null);

	 	    
	          for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	 	            //Adiciona os valores nas colunas respectivamente.
	 	            dataset.addRow(new Array(		 	          
	 	            		datasetPrincipal.getValue(i, "codigoAgenda"),
	 	            		datasetPrincipal.getValue(i, "mesagenda"),
	 	                    datasetFilhos.getValue(j, "calendarPeriodoDe"),
	 	                    datasetFilhos.getValue(j, "calendarPeriodoAte"),
	 	                    datasetFilhos.getValue(j, "atividade" )));
	 	        		}
	          
	          
	    }
	    
	   
        
       

	   return    dataset ; 
	    
	
}


function getConstraints(constraints, field){
	if(constraints == null) {
		return null;
		
	}
	else {
		for(var i=0;i<constraints.length;i++){
			if(constraints[i].fieldName == field){
				return constraints[i].initialValue;
			}
		}
	}
		

}