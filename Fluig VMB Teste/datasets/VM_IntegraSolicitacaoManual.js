function createDataset(fields, constraints, sortFields) {
	var constraint = new Array();
	
	constraint.push(DatasetFactory.createConstraint("documentid", "12835", "12835", ConstraintType.MUST));     
	 
	
//	var produto="SVPRT066";
//	var valor="3000";	 	
//	constraint.push(DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST));  
//	constraint.push(DatasetFactory.createConstraint("produto", produto, produto, ConstraintType.MUST));
	
	
    var dataset = DatasetFactory.getDataset("VM_CNTA120_SOLICITACAO_LOCACAO_VEICULO", null, constraint, null);
    
    return dataset;
	
	
}

/*
 *ERRO: Inclusao de medicao: 
 *CNTA130Valor invalidos para Quantidade, Vlr. Unit�rio ou Vlr. Total para o item 1
 *Tabela CV0 31/01/20 15:53:07Inconsistencia nos Itens 
 */
