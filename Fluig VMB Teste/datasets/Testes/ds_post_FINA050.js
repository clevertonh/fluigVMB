function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("solicitacao", "1569", "1569", ConstraintType.MUST));     
	 
	 var valorDiarias ="500";
	 var dataVencimento="12/03/2019";
	 
	 
	 constraint.push(DatasetFactory.createConstraint("valorDiarias", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("dataVencimento", dataVencimento, dataVencimento, ConstraintType.MUST));

	
    var dataset = DatasetFactory.getDataset("VM_FINA050", null, constraint, null);
    
    return dataset;
	
	
}

