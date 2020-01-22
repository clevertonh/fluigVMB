function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "12890", "12890", ConstraintType.MUST));     
	 
	
	var produto="SVPRT066";
	var valor="3000";	 	
	constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
	constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

