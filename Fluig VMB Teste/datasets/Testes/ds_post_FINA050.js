function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "9723", "9723", ConstraintType.MUST));     
	 
	
	
	 var valorDiarias="212.50";
	 var dataVencimento="11/10/2019";	 	
	 constraint.push(DatasetFactory.createConstraint("vl_tarifa", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("dtTarifa", dataVencimento, dataVencimento, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_FINA100_SOLICITACAO_VIAGEM", null, constraint, null);
    
    return dataset;
	
	
}

