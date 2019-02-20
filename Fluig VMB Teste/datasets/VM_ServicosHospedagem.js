function createDataset(fields, constraints, sortFields) {
	 var dataset = DatasetBuilder.newDataset();
	
	 dataset.addColumn("CODIGO");
	 dataset.addColumn("DESCRICAO");
	 dataset.addColumn("PRODUTO");
	
	 
	 dataset.addRow(new Array("DVPSG001", "PASSAGEM NACIONAL", "DVPSG001-PASSAGEM NACIONAL"));
	 dataset.addRow(new Array("DVPSG002", "PASSAGEM INTERNACIONAL", "DVPSG002-PASSAGEM INTERNACIONAL"));
	 dataset.addRow(new Array("DVVIG002", "SEGURO VIAGEM", "DVVIG002-SEGURO VIAGEM"));
	 dataset.addRow(new Array("DVHOS001", "HOSPEDAGEM NACIONAL", "DVHOS001-HOSPEDAGEM NACIONAL"));
	 dataset.addRow(new Array("DVHOS002", "HOSPEDAGEM INTERNACIONAL", "DVHOS002-HOSPEDAGEM INTERNACIONAL"));
	 
	   
	    
	  
	  return dataset;

}