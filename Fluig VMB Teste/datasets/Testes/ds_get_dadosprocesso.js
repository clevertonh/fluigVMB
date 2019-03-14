function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	
	
	//var getFuncionario = "wasley_santos@wvi.org";
	var processo = DatasetFactory.createConstraint("cardIndexDocumentId","304","304", ConstraintType.MUST);
	var idregistro = DatasetFactory.createConstraint("cardDocumentId","1610","1610", ConstraintType.MUST);
	
	var dataset = DatasetFactory.getDataset("VM_DadosProcesso",null,new Array(processo,idregistro),null);
	
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