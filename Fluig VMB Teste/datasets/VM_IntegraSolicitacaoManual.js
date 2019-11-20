function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "11630", "11630", ConstraintType.MUST));     
	 
	 var produto="SVALG012";
	 var valor="0";	 	
	 constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

