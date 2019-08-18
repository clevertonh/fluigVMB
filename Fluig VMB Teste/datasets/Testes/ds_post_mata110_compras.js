function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2124", "2124", ConstraintType.MUST));     
	
    var dataset = DatasetFactory.getDataset("VM_SOLICITACAO_VIAGEM_ADIANTAMENTO", null, constraint, null);
    
    return dataset;
	
	
}

