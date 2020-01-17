function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	var getCentroCusto =  '7777';
	
	//var getCentroCusto = "20201";
	var atividades = DatasetFactory.createConstraint("CENTRO_CUSTO",getCentroCusto,getCentroCusto, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_CNTA300_SOLICITACAO_CONTRATO",null,new Array(atividades),null);
	
	return dataset;
	
}

function getConstraints(constraints, field){
	if(constraints == null)
		return null;
	
	for(var i=0;i<constraints.length;i++){
		if(constraints[i].fieldName == field){
			return constraints[i].initialValue;
		}
	}
	
	return null;
}