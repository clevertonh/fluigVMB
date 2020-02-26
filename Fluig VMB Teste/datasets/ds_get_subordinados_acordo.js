function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	var getLider =  getConstraints(constraints, 'EMAIL_LIDER');
	
	//var getLider = "wasley_santos@wvi.org";
	var funcionario = DatasetFactory.createConstraint("EMAIL_LIDER",getLider,getLider, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_GestorFuncionariosAcordoDesempenho",null,new Array(funcionario),null);
	
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

