function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "6726", "6726", ConstraintType.MUST));     
	 
	constraint.push(DatasetFactory.createConstraint("dtAprovacao", "29/05/2019", "29/05/2019", ConstraintType.MUST));   
	
    //var dataset = DatasetFactory.getDataset("VM_SOLICITACAO_FUNDO_FIXO", null, constraint, null);
	var dataset = DatasetFactory.getDataset("VM_PRESTACAO_CONTAS_FUNDO_FIXO", null, constraint, null);
    
    return dataset;
	
	
}

