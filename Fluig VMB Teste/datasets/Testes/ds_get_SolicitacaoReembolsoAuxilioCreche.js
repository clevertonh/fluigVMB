function createDataset(fields, constraints, sortFields) {
	//var getSolicitacao =  getConstraints(constraints, 'metadata#id');
	var getSolicitacao = "1539";
	
	log.info("----RETORNO DATASET---");
	log.dir(getSolicitacao);
	
	  var c1 = DatasetFactory.createConstraint("metadata#id", getSolicitacao, getSolicitacao, ConstraintType.MUST);    
	   var dataset = DatasetFactory.getDataset("VM_SolicitacoesReembolsoAuxilioCrecheDadosPagamento", null, new Array(c1), null);
    
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