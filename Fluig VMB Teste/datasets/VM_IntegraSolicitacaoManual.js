function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "12581", "12581", ConstraintType.MUST));     
	 
	
	 var produto="SVIPS002";
	 var valor="1500";	 	
	 constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

