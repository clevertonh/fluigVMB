function createDataset(fields, constraints, sortFields) {

	//dataset usado para solicitações do tipo REMARCAÇÃO
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("SOLICITACAO");
	dataset.addColumn("SOLICITANTE");
	dataset.addColumn("DATA_SOLICITACAO");
	dataset.addColumn("DATA_RETIRADA");
	dataset.addColumn("DATA_DEVOLUCAO");
	dataset.addColumn("SOLICITACAO_ANTERIOR");
	dataset.addColumn("FINANEVENTO");
	
	
	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculo", null, constraints, null);
    
    for(var x = 0 ; x < retornoDataset.rowsCount; x++){
    	 var reservado = retornoDataset.getValue(x, "txtproduto");
    	 var solicitacaorenovada= retornoDataset.getValue(x, "dataset_solicitacaolocacao"); 
    	   	 
    	 if (reservado != "" && reservado != null){    		 
    		 var empresa = retornoDataset.getValue(x, "companyid");
        	 var carddocumentid =  retornoDataset.getValue(x, "metadata#id");
        	 var cardindexdocumentid = retornoDataset.getValue(x, "metadata#card_index_id");   	    
        	
        	 var historicoFormulario = retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa);        	 
        	 var numSolicitacao;
             var dataSolicitacao;
           	
             if (historicoFormulario.rowsCount > 0){
            	  numSolicitacao = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
    	          dataSolicitacao = historicoFormulario.getValue(0,"startDateProcess");
    	     	          
    	            var constraints2 = new Array();
	      		    constraints2.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	      		    constraints2.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
	      		    constraints2.push(DatasetFactory.createConstraint("dataset_solicitacaolocacao", numSolicitacao ,numSolicitacao, ConstraintType.MUST));
	      		    var retornoDataset2 = DatasetFactory.getDataset("VM_SolicitacoesLocacaoVeiculo", null, constraints2, null);
	      		 
	      		    if (retornoDataset2.rowsCount == 0){
	      		    	 dataset.addRow([numSolicitacao,
	       		     		             retornoDataset.getValue(x,"solicitante"),	     		                
	    	       	     		                dataSolicitacao.toString(),
	    	       	     		                retornoDataset.getValue(x,"dtRetirada"),
	    	       	     		                retornoDataset.getValue(x,"dtDevolucao"),
	    	       	     		                solicitacaorenovada,
	    	       	     		                retornoDataset.getValue(x,"finanEvento"),
	    	       	     		                ]);
	      		    }   	          
             } 	         
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



//recebe como parametro:metadata#card_index_id, metadate#id, companyid
function retornaSolicitacao(cardindexdocumentid,carddocumentid,empresa){
	  var constraintsHistorico  = new Array();	    	 
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", cardindexdocumentid , cardindexdocumentid, ConstraintType.MUST));
		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", carddocumentid , carddocumentid, ConstraintType.MUST));	    	
		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
		 
   var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 

   return historicoFormulario;
} 