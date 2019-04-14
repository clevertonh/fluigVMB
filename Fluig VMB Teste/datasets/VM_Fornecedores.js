function defineStructure() {
	addColumn("CODIGO");
	addColumn("DESCRICAO");
	addColumn("CNPJ");
	
	setKey(["CODIGO"]);
	
}


function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	dataset.addColumn("CNPJ");
	
	return dataset;
	
}
