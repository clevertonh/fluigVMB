function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2349", "2349", ConstraintType.MUST));     
	constraint.push(DatasetFactory.createConstraint("valor", "100", "100", ConstraintType.MUST));
	constraint.push(DatasetFactory.createConstraint("produto", "SVPRT073", "SVPRT073", ConstraintType.MUST));
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

