function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "1637", "1637", ConstraintType.MUST));     
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_COMPRAS", null, constraint, null);
    
    return dataset;
	
	
}

