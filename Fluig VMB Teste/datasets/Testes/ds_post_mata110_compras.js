function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2181", "2181", ConstraintType.MUST));     
	
    var dataset = DatasetFactory.getDataset("VM_SOLICITACAO_ADIANTAMENTO_FORNECEDOR", null, constraint, null);
    
    return dataset;
	
	
}

