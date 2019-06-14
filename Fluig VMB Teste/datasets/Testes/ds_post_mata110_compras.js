function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "1905", "1905", ConstraintType.MUST));     
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_EVENTO", null, constraint, null);
    
    return dataset;
	
	
}

