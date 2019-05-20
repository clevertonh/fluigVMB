function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "1821", "1821", ConstraintType.MUST));     
	 
	
	
    var dataset = DatasetFactory.getDataset("VM_REPOSICAO_FUNDO_FIXO", null, constraint, null);
    
    return dataset;
	
	
}

