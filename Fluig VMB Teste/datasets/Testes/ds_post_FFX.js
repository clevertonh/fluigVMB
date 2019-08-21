function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2042", "2042", ConstraintType.MUST));     
	 
	//constraint.push(DatasetFactory.createConstraint("dtAprovacao", "06/07/2019", "06/07/2019", ConstraintType.MUST));   
	
    //var dataset = DatasetFactory.getDataset("VM_SOLICITACAO_FUNDO_FIXO", null, constraint, null);
	var dataset = DatasetFactory.getDataset("VM_SOLICITACAO_ADIANTAMENTO", null, constraint, null);
    
    return dataset;
	
	
}

