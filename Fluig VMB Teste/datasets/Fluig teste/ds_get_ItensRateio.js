function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
		  
	var Codigorateio =  getConstraints(constraints, 'Rateio');
	
	var codigo = DatasetFactory.createConstraint("Rateio",Codigorateio,Codigorateio, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_ItensRateio",null,new Array(codigo),null);
	
	return dataset;
	
	
}function onMobileSync(user) {

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