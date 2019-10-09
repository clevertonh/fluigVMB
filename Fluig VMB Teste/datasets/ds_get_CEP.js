function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	//var getFiltro =  getConstraints(constraints, 'CEP');
	
	var getFiltro = "50010340";
	var codigo = DatasetFactory.createConstraint("CEP",getFiltro,getFiltro, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_CEP",null,new Array(codigo),null);
	
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