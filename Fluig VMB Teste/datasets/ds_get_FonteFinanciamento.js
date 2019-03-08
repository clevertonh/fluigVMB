function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	  
	var getFonte =  getConstraints(constraints, 'PROJETO');
	

	var fonte = DatasetFactory.createConstraint("PROJETO",getFonte,getFonte, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("VM_FonteFinanciamento",null,new Array(fonte),null);
	
	return dataset;
	
}function onMobileSync(user) {

}