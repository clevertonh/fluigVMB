function createDataset(fields, constraints, sortFields) {
	 var dataset = DatasetBuilder.newDataset();
	
	 dataset.addColumn("TIPO");
	
	  var dados = [
	              {TIPO:  'OUTROS'},
              	  {TIPO:  'GUESTHOUSE'},
              	  {TIPO:  'BALCAO'}
              	  ];
	  
	  
	    if(dados != null){
            for(var i in dados){
            	 dataset.addRow([dados[i].TIPO]);
            }
     }
	  
	    
	  
	  return dataset;

}