function createDataset(fields, constraints, sortFields) {

	//dataset usado para solicitações do tipo REMARCAÇÃO
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("solicitacao");
	dataset.addColumn("solicitante");
	dataset.addColumn("nomepassageiro");
	dataset.addColumn("dataSolicitacao");
	dataset.addColumn("tipoviagem");
	dataset.addColumn("finalidade");
	dataset.addColumn("solicitantepassageiro");
	dataset.addColumn("passageirofuncionarionao");
	dataset.addColumn("nomepassageiro");
	dataset.addColumn("nomemae");
	dataset.addColumn("datanasc");
	dataset.addColumn("cpfpassageiro");
	dataset.addColumn("rgpassageiro");
	dataset.addColumn("passaporte");
	dataset.addColumn("tipoPagamento");
	dataset.addColumn("rateioconfigurado");
	dataset.addColumn("codigorateio");
	dataset.addColumn("NumeroDocumento");
	
	var user = getValue("WKUser");	

	
	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("aprovacao", "aprovado" , "aprovado", ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("cancelarpassagem", "" , "", ConstraintType.MUST));
		
	//verificar se usuario logado faz parte do grupo de hospitalidade
	if(!existeGrupo(user)) {
		constraints.push(DatasetFactory.createConstraint("matriculasolicitante", user , user, ConstraintType.MUST));
		
	}		
		
    var retornoDataset = DatasetFactory.getDataset("VM_SolicitacoesViagens", null, constraints, null);
    
    for(var x = 0 ; x < retornoDataset.rowsCount; x++){
    	 var atendida = retornoDataset.getValue(x, "atendida");	
    	 var vooComprado = retornoDataset.getValue(x, "vooComprado");	
    	 var hotelComprado = retornoDataset.getValue(x, "hotelComprado");	
    	 var documentId =  retornoDataset.getValue(x, "documentid");
    	 var empresa = retornoDataset.getValue(x, "companyid");
    	 var formulario = retornoDataset.getValue(x, "metadata#parent_id")	         
	    	
    	     		
    	 if (vooComprado =='sim' || hotelComprado =='sim' || atendida =="atendida"){
    		 
    		 var constraintsHistorico  = new Array();	    	 
    		 constraintsHistorico.push(DatasetFactory.createConstraint("cardIndexDocumentId", formulario , formulario, ConstraintType.MUST));
    		 constraintsHistorico.push(DatasetFactory.createConstraint("cardDocumentId", documentId , documentId, ConstraintType.MUST));	    	
    		 constraintsHistorico.push(DatasetFactory.createConstraint("workflowProcessPK.companyId", empresa , empresa, ConstraintType.MUST));	    	
	    	   	   	 
	         var historicoFormulario = DatasetFactory.getDataset("workflowProcess", null, constraintsHistorico, null);	       		 
	         var numFormulario = historicoFormulario.getValue(0,"workflowProcessPK.processInstanceId");
	         var dataSolicitacao = historicoFormulario.getValue(0,"startDateProcess");
	         
     		dataset.addRow([numFormulario,
     		                retornoDataset.getValue(x,"solicitante"),
     		                retornoDataset.getValue(x,"nomepassageiro"),
     		                dataSolicitacao.toString(),
     		                retornoDataset.getValue(x,"tipoviagem"),
     		                retornoDataset.getValue(x,"finalidade"),    		                
     		                retornoDataset.getValue(x,"solicitantepassageiro"),
     		                retornoDataset.getValue(x,"passageirofuncionarionao"),
     		                retornoDataset.getValue(x,"nomepassageiro"),
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

function existeGrupo(usuario){
	var constraint = new Array();
	constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", usuario, usuario, ConstraintType.MUST));
	constraint.push(DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Hospitalidade", "Hospitalidade", ConstraintType.MUST));
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraint, null);
	return dataset.rowsCount > 0;
}
