function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("solicitacao");
	dataset.addColumn("solicitante");
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
	
	

	var constraintsActive = new Array();
	constraintsActive.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraintsActive, null);
    
    log.dir(constraints);
    
    if(constraints!==null && constraints.length){ //se tiver constraint filtra 
    	if(constraints[0].constraintType==ConstraintType.MUST) {
    		 for(var a=0;a < retornoDataset.rowsCount;a++){
    			 if(constraints[0].initialValue==retornoDataset.getValue(a,constraints[0].fieldName)){
    				 var atendida = retornoDataset.getValue(a, "atendida");	
    		    	 var solicitacao = retornoDataset.getValue(a, "solicitacao");	
    		    	 var vooComprado = retornoDataset.getValue(a, "vooComprado");	
    		    	 var hotelComprado = retornoDataset.getValue(a, "hotelComprado");	
    		    	 var documentId =  retornoDataset.getValue(a, "documentid");
    		    	 var empresa = retornoDataset.getValue(a, "companyid");
               		     
     		     		dataset.addRow([solicitacao,
     		     		                retornoDataset.getValue(a,"solicitante"),
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
     		     		                documentId
     		     		                ]);
     	
    		 }
    		
    		
    }
 }
    }
   
    else {
  	  for(var x = 0 ; x < retornoDataset.rowsCount; x++){
	    	 var atendida = retornoDataset.getValue(x, "atendida");	
	    	 var vooComprado = retornoDataset.getValue(x, "vooComprado");	
	    	 var hotelComprado = retornoDataset.getValue(x, "hotelComprado");	
	    	 var documentId =  retornoDataset.getValue(x, "documentid");
	    	 var empresa = retornoDataset.getValue(x, "companyid");
	    	 var solicitacao = retornoDataset.getValue(x, "solicitacao");	
	    	 
		     
	     		dataset.addRow([solicitacao,
	     		                retornoDataset.getValue(x,"solicitante"),
	     		                retornoDataset.getValue(x,"nomepassageiro"),
	    		                retornoDataset.getValue(x,"tipoviagem"),
	     		                retornoDataset.getValue(x,"finalidade"),    		                
	     		                retornoDataset.getValue(x,"solicitantepassageiro"),
	     		                retornoDataset.getValue(x,"passageirofuncionarionao"),
	     		                retornoDataset.getValue(x,"nomemae"),
	     		                retornoDataset.getValue(x,"datanasc"),
	     		                retornoDataset.getValue(x,"cpfpassageiro"),
	     		                retornoDataset.getValue(x,"rgpassageiro"),    		               
	     		                retornoDataset.getValue(x,"passaporte"),
	     		                retornoDataset.getValue(x,"tipoPagamento"),
	     		                retornoDataset.getValue(x,"rateioconfigurado"),
	     		                retornoDataset.getValue(x,"codigorateio"),
	     		                documentId
	     		                ]);
	    	
	    

	    }
    }
    
  
    	
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