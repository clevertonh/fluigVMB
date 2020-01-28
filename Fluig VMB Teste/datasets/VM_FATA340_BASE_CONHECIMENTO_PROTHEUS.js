function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("RETORNO");
	dataset.addColumn("NUMERO");
	
	dataset.addRow(new Array("SUCESSO",""));		
	 
	 
	return dataset;
	
}