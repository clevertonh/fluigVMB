function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	var getServico =  getConstraints(constraints, 'TIPO');
	
	//var getServico = "PROJETO";
	var filtro = DatasetFactory.createConstraint("TIPO",getServico,getServico, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_ContaContabil",null,new Array(filtro),null);
	
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