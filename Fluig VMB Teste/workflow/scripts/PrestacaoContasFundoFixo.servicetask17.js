function servicetask17(attempt, message) {
	//RECUPERA NUMERO DO DOCUMENTO
	var idDocumento = getValue("WKCardId");

	var constraint = new Array();		  			
	constraint.push(DatasetFactory.createConstraint("documentid", idDocumento, idDocumento, ConstraintType.MUST));						  			
	
	var resultDataset = DatasetFactory.getDataset("VM_PRESTACAO_CONTAS_FUNDO_FIXO", null, constraint, null);
	
	//log.info("DATASET VM_PRESTACAO_CONTAS_FUNDO_FIXO");
	//log.dir(resultDateset);
	
    if (resultDataset.getValue(0,"RETORNO") != "SUCESSO"){
        throw resultDataset.getValue(0,"RETORNO");
     }
     else {
        return "Integrado com sucesso!";
     }

}