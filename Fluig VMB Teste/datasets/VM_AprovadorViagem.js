function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NOME");
    dataset.addColumn("EMAIL");
    dataset.addColumn("MATRICULA");   
	
	
    var constraint = new Array();	
	constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "VM_AprovadorViagem", "VM_AprovadorViagem", ConstraintType.MUST));
	var datasetApr = DatasetFactory.getDataset("colleagueGroup", null, constraint, null);
    
	if(datasetApr != null && datasetApr.rowsCount > 0) {		
		
		for(var x = 0 ; x < datasetApr.rowsCount; x++){
		  	var constraintUser = new Array();	
			constraintUser.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", datasetApr.getValue(x,"colleagueGroupPK.colleagueId"), datasetApr.getValue(x,"colleagueGroupPK.colleagueId"), ConstraintType.MUST));
			var datasetUsuarios = DatasetFactory.getDataset("colleague", null, constraintUser, null);
			
			if (datasetUsuarios != null && datasetUsuarios.rowsCount > 0){
				dataset.addRow([datasetUsuarios.getValue(0,"colleagueName"),datasetUsuarios.getValue(0,"mail"),datasetUsuarios.getValue(0,"colleaguePK.colleagueId")]);	
			}							
	  }
	
	
	}	
	
	  
    return dataset;
}


