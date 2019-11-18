function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "10467", "10467", ConstraintType.MUST));     
	 
	 var produto="DVPSG001";
	 var valor="1";	 	
	 constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_CONTRATACAO_SERVICO", null, constraint, null);
    
    return dataset;
	
	
}

