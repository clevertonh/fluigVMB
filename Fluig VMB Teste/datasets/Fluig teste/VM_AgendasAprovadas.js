function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
		
	 dataset.addColumn("Codigo");
	 dataset.addColumn("Funcionario");
	 dataset.addColumn("Mes");
	 dataset.addColumn("PeriodoDe");
	 dataset.addColumn("PeriodoAte");
	 dataset.addColumn("Atividade");

	 var codigo = 1509;
		var constraints = new Array();
		constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("CodigoAgenda", codigo, codigo, ConstraintType.MUST));
	    var datasetPrincipal = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);
	    
  	  for(var i = 0 ; i < datasetPrincipal.rowsCount; i++){
	    	 var documentId = datasetPrincipal.getValue(i, "metadata#id");
	         var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

	         
	    	//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
  		var constraintsFilhos = new Array();
  		constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tbAgendaViagem" , "tbAgendaViagem", ConstraintType.MUST));
  		constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
  		constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
  		
  		constraintsFilhos.push(DatasetFactory.createConstraint("aprovacao", "aprovado", "aprovado", ConstraintType.MUST));
  		
	 
	        //Busca o dataset
	        var datasetFilhos = DatasetFactory.getDataset("VM_AgendaViagem", null, constraintsFilhos, null);
	        
	
	 	        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	 	            //Adiciona os valores nas colunas respectivamente.
	 	            dataset.addRow(new Array(		 	          
	 	            		datasetPrincipal.getValue(i, "codigoAgenda"),
	 	            		datasetPrincipal.getValue(i, "solicitante"),
	 	            		datasetPrincipal.getValue(i, "mesagenda"),
	 	                    datasetFilhos.getValue(j, "calendarPeriodoDe"),
	 	                    datasetFilhos.getValue(j, "calendarPeriodoAte"),
	 	                    datasetFilhos.getValue(j, "atividade" )));
	 	        		}	  	

	    	 }
	  

	    
	    	
		return dataset;
	 
}