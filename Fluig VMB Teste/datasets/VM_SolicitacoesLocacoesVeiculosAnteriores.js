function createDataset(fields, constraints, sortFields) {

	//dataset usado para solicitações do tipo REMARCAÇÃO
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("solicitacao");
	
	
	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	
	
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
    
    for(var x = 0 ; x < retornoDataset.rowsCount; x++){
    	 var atendida = retornoDataset.getValue(x, "atendida");	
    	 var vooComprado = retornoDataset.getValue(x, "vooComprado");	
    	 var hotelComprado = retornoDataset.getValue(x, "hotelComprado");	
    	 
    	    	 
    	 var passageiro = retornoDataset.getValue(x, "emailPassageiro");
    	 var matricula = retornoDataset.getValue(x, "matriculasolicitante");
    	 
    	 var empresa = retornoDataset.getValue(x, "companyid");
    	 var carddocumentid =  retornoDataset.getValue(x, "metadata#id");
    	 var cardindexdocumentid = retornoDataset.getValue(x, "metadata#card_index_id")
	    	
    	 		
	    			 dataset.addRow([numSolicitacao,
	    	     		                retornoDataset.getValue(x,"solicitante"),
	    	     		                retornoDataset.getValue(x,"nomepassageiro"),
	    	     		                dataSolicitacao.toString(),
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
	    	     		                retornoDataset.getValue(x, "documentid"),
	    	     		               retornoDataset.getValue(x, "cancelarpassagem"),
	    	     		                ]);	 
	    		
    

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



//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 

   return historicoFormulario;
} 