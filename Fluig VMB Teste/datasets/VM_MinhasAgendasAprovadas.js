function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
		
	 dataset.addColumn("Codigo");
	 dataset.addColumn("Funcionario");
	 dataset.addColumn("Mes");
	 
	   var user = getValue("WKUser");	
		
		var constraints = new Array();
		constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("matriculasolicitante", user , user, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("aprovacaoAgenda", "" , "", ConstraintType.MUST));
		
		
	    var datasetPrincipal = DatasetFactory.getDataset("VM_AgendaViagem", null, constraints, null);
	    
  	  for(var i = 0 ; i < datasetPrincipal.rowsCount; i++){
	    	
          //Adiciona os valores nas colunas respectivamente.
           dataset.addRow(new Array(		 	          
           		datasetPrincipal.getValue(i, "codigoAgenda"),
           		datasetPrincipal.getValue(i, "solicitante"),
           		datasetPrincipal.getValue(i, "mesagenda")));
                   
       		}	
   	
		return dataset;
	 
}