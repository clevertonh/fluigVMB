function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("produto");
	dataset.addColumn("quantidade");
	dataset.addColumn("valor");
	dataset.addColumn("dataViagem");
	
	
		var idDocumento = 6090;
		var codigoComprador = "wasley_santoswvi.org";
	
	
			
			 var constraintsUsuario   = new Array();
			 constraintsUsuario.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codigoComprador, codigoComprador, ConstraintType.MUST));
			 var datasetComprador = DatasetFactory.getDataset("colleague", null, constraintsUsuario, null);
			 					
			 			
			
			 var constraint = new Array();		  			 		  			
			 constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));
			
			 if (datasetComprador!= null && datasetComprador.rowsCount > 0){
				var emailComprador = datasetComprador.getValue(0, "mail");	  
				constraint.push(DatasetFactory.createConstraint("comprador", emailComprador, emailComprador, ConstraintType.MUST));	
			 }
	
				
			    constraint.push(DatasetFactory.createConstraint("produto", "DVPSG001", "DVPSG001", ConstraintType.MUST));  
				constraint.push(DatasetFactory.createConstraint("quantidade", 1, 1, ConstraintType.MUST));
				constraint.push(DatasetFactory.createConstraint("valor", "0", "0", ConstraintType.MUST));
				constraint.push(DatasetFactory.createConstraint("dataViagem", "08/05/2019", "08/05/2019", ConstraintType.MUST));
				
				
			 var resultDateset = DatasetFactory.getDataset("VM_MATA110_SOLICITACAO_VIAGEM", null, constraint, null);
			    
		     if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		    	 //dataset.addRow(new Array(resultDateset.getValue(0,"RETORNO")));
		    	 dataset.addRow(new Array("Erro na inclusão!"));
		    	 
		     }
		     else {
		    	 dataset.addRow(new Array("Incluido com sucesso!"));
		     }
				     
		     
		     
			 /*
			 if (aItemServico.length >0){ 
				 
			 //Cria constraints para enviar produtos e valores
				 for (var a=0; a<aItemServico.length; a++){
					constraint.push(DatasetFactory.createConstraint("produto", aItemServico[a].produto, aItemServico[a].produto, ConstraintType.MUST));  
					constraint.push(DatasetFactory.createConstraint("quantidade", aItemServico[a].quantidade, aItemServico[a].quantidade, ConstraintType.MUST));
					constraint.push(DatasetFactory.createConstraint("valor", aItemServico[a].valor, aItemServico[a].valor, ConstraintType.MUST));
					constraint.push(DatasetFactory.createConstraint("dataViagem", aItemServico[a].dtviagem, aItemServico[a].dtviagem, ConstraintType.MUST));
				
				
				 }	
			 }
			 else {
				    constraint.push(DatasetFactory.createConstraint("produto", "DVPSG001", "DVPSG001", ConstraintType.MUST));  
					constraint.push(DatasetFactory.createConstraint("quantidade", "1", "1", ConstraintType.MUST));
					constraint.push(DatasetFactory.createConstraint("valor", "0", "0", ConstraintType.MUST));
					constraint.push(DatasetFactory.createConstraint("dataViagem", "08/05/2019", "08/05/2019", ConstraintType.MUST));
			 }
			 
			 */

		
		
		 	return dataset;
	    
}