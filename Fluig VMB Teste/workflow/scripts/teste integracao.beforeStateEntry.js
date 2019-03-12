function beforeStateEntry(sequenceId){
	
	var getSolicitacao = "1579";
	
	var c1 = DatasetFactory.createConstraint("metadata#id", getSolicitacao, getSolicitacao, ConstraintType.MUST);    
    var resultDateset = DatasetFactory.getDataset("VM_MATA110", null, new Array(c1), null);
    
	

	if (resultDateset.getValue(0,"RETORNO") != "SUCESSO"){
		throw resultDateset.getValue(0,"RETORNO");
	} 
	
}