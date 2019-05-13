function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "1638", "1638", ConstraintType.MUST));     
	 
	
	
	 var valorDiarias="300";
	 var dataVencimento="26/03/2019";	 	
	 constraint.push(DatasetFactory.createConstraint("valor", valorDiarias, valorDiarias, ConstraintType.MUST));  
	 constraint.push(DatasetFactory.createConstraint("dataVencimento", dataVencimento, dataVencimento, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_REEMBOLSO_AUXILIO_CRECHE", null, constraint, null);
    
    return dataset;
	
	
}

