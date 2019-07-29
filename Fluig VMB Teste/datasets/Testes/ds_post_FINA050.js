function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2048", "2048", ConstraintType.MUST));     
	 
	
	
	 var valorDiarias="300";
	 var dataVencimento="26/03/2019";	 	
	 constraint.push(DatasetFactory.createConstraint("vl_diarias", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("dtPgto", dataVencimento, dataVencimento, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_DIARIAS", null, constraint, null);
    
    return dataset;
	
	
}

