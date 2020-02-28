function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "17313", "17313", ConstraintType.MUST));     
	 
	
	var produto="28/02/2020";
	var valor="450";	 	
	constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
	constraint.push(DatasetFactory.createConstraint("dataVencimento", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_FINA050_SOLICITACAO_REEMBOLSO_AUXILIO_CRECHE", null, constraint, null);
    
    return dataset;
	
	
}

