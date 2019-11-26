function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2680", "2680", ConstraintType.MUST));     
	 
	var dataset = DatasetFactory.getDataset("VM_CNTA120_SOLICITACAO_PAGAMENTO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

