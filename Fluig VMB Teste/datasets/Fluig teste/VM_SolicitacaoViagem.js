function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("SOLICITACAO");
	dataset.addColumn("solicitante");
	dataset.addColumn("emailsolicitante");
	dataset.addColumn("nomepassageiro");
	dataset.addColumn("tipoviagem");
	dataset.addColumn("finalidade");
	dataset.addColumn("solicitantepassageiro");
	dataset.addColumn("passageirofuncionarionao");
	dataset.addColumn("nomemae");
	dataset.addColumn("datanasc");
	dataset.addColumn("cpfpassageiro");
	dataset.addColumn("rgpassageiro");
	dataset.addColumn("passaporte");
	dataset.addColumn("tipoPagamento");
	dataset.addColumn("rateioconfigurado");
	dataset.addColumn("codigorateio");
	dataset.addColumn("metadata#id");
	dataset.addColumn("datasolicitacao");
	
	

	var constraintsActive = new Array();
	constraintsActive.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsActive, null);
    
    //log.dir(constraints);
    
    if(constraints!==null && constraints.length){ //se tiver constraint filtra 
    	if(constraints[0].constraintType==ConstraintType.MUST) {
    		 for(var a=0;a < retornoDataset.rowsCount;a++){
    			 if(constraints[0].initialValue==retornoDataset.getValue(a,constraints[0].fieldName)){    					    
     		     		dataset.addRow([retornoDataset.getValue(a,"solicitacao"),
     		     		                retornoDataset.getValue(a,"solicitante"),
     		     		                retornoDataset.getValue(a,"emailSolicitante"),
     		     		                retornoDataset.getValue(a,"nomepassageiro"),
     		    		                retornoDataset.getValue(a,"tipoviagem"),
     		     		                retornoDataset.getValue(a,"finalidade"),    		                
     		     		                retornoDataset.getValue(a,"solicitantepassageiro"),
     		     		                retornoDataset.getValue(a,"passageirofuncionarionao"),
     		     		                retornoDataset.getValue(a,"nomemae"),
     		     		                retornoDataset.getValue(a,"datanasc"),
     		     		                retornoDataset.getValue(a,"cpfpassageiro"),
     		     		                retornoDataset.getValue(a,"rgpassageiro"),    		               
     		     		                retornoDataset.getValue(a,"passaporte"),
     		     		                retornoDataset.getValue(a,"tipoPagamento"),
     		     		                retornoDataset.getValue(a,"rateioconfigurado"),
     		     		                retornoDataset.getValue(a,"codigorateio"),
     		     		                retornoDataset.getValue(a,"documentid"),,
     		     		                retornoDataset.getValue(a,"dataSolicitacao")
     		     		                ]);
     		     		
     		     		return dataset;
    			 }
    		
    		
    }
 }
    }
   
    else {
  	  for(var x = 0 ; x < retornoDataset.rowsCount; x++){
  		dataset.addRow([retornoDataset.getValue(a,"solicitacao"),
  		                retornoDataset.getValue(a,"solicitante"),
  		                retornoDataset.getValue(a,"emailSolicitante"),
  		                retornoDataset.getValue(a,"nomepassageiro"),
 		                retornoDataset.getValue(a,"tipoviagem"),
  		                retornoDataset.getValue(a,"finalidade"),    		                
  		                retornoDataset.getValue(a,"solicitantepassageiro"),
  		                retornoDataset.getValue(a,"passageirofuncionarionao"),
  		                retornoDataset.getValue(a,"nomemae"),
  		                retornoDataset.getValue(a,"datanasc"),
  		                retornoDataset.getValue(a,"cpfpassageiro"),
  		                retornoDataset.getValue(a,"rgpassageiro"),    		               
  		                retornoDataset.getValue(a,"passaporte"),
  		                retornoDataset.getValue(a,"tipoPagamento"),
  		                retornoDataset.getValue(a,"rateioconfigurado"),
  		                retornoDataset.getValue(a,"codigorateio"),
  		                retornoDataset.getValue(a,"documentid"),,
  		                retornoDataset.getValue(a,"dataSolicitacao")
  		                ]);
	    	
	    

	    }
    }
    
  
    	
	return dataset;
	
}