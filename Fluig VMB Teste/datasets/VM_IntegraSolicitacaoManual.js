function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "9821", "9821", ConstraintType.MUST));     
	 
	 var valorDiarias="3.2";
	 var dataVencimento="11/10/2019";	 	
	// constraint.push(DatasetFactory.createConstraint("vl_tarifa", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 //constraint.push(DatasetFactory.createConstraint("dtTarifa", dataVencimento, dataVencimento, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_EVENTO", null, constraint, null);
    
    return dataset;
	
	
}

