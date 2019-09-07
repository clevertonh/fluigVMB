function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "2211", "2211", ConstraintType.MUST));     
	 
	
	
	 var valorDiarias="300";
	 var dataVencimento="07/09/2019";	 	
	 constraint.push(DatasetFactory.createConstraint("vl_tarifa", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("dtTarifa", dataVencimento, dataVencimento, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_FINA100_SOLICITACAO_DIARIAS", null, constraint, null);
    
    return dataset;
	
	
}

